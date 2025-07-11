// Complete bloon system for Bloons TD 6 with all bloon types and properties

class Bloon {
    constructor(type, position) {
        this.type = type;
        this.position = position.clone();
        this.pathIndex = 0;
        this.speed = this.getSpeed();
        this.health = this.getHealth();
        this.maxHealth = this.health;
        this.size = this.getSize();
        this.color = this.getColor();
        this.isFrozen = false;
        this.freezeTimer = 0;
        this.isActive = true;
        this.isCamo = this.getCamoStatus();
        this.isLead = this.getLeadStatus();
        this.isFortified = this.getFortifiedStatus();
        this.isRegrow = this.getRegrowStatus();
        this.effects = [];
        this.slowMultiplier = 1.0;
        this.slowTimer = 0;
    }

    getSpeed() {
        const speeds = {
            'red': 1.0,
            'blue': 1.4,
            'green': 1.8,
            'yellow': 3.2,
            'pink': 3.5,
            'black': 1.8,
            'white': 2.0,
            'zebra': 1.8,
            'rainbow': 2.2,
            'ceramic': 1.0,
            'moab': 0.5,
            'bfb': 0.3,
            'zomg': 0.2,
            'ddt': 2.5,
            'bad': 0.1
        };
        return speeds[this.type] || 1.0;
    }

    getHealth() {
        const health = {
            'red': 1,
            'blue': 1,
            'green': 1,
            'yellow': 1,
            'pink': 1,
            'black': 1,
            'white': 1,
            'zebra': 1,
            'rainbow': 1,
            'ceramic': 10,
            'moab': 200,
            'bfb': 700,
            'zomg': 4000,
            'ddt': 400,
            'bad': 20000
        };
        return health[this.type] || 1;
    }

    getSize() {
        const sizes = {
            'red': 15,
            'blue': 18,
            'green': 20,
            'yellow': 22,
            'pink': 25,
            'black': 20,
            'white': 20,
            'zebra': 22,
            'rainbow': 25,
            'ceramic': 30,
            'moab': 80,
            'bfb': 120,
            'zomg': 160,
            'ddt': 40,
            'bad': 200
        };
        return sizes[this.type] || 15;
    }

    getColor() {
        const colors = {
            'red': '#FF0000',
            'blue': '#0000FF',
            'green': '#00FF00',
            'yellow': '#FFFF00',
            'pink': '#FF69B4',
            'black': '#000000',
            'white': '#FFFFFF',
            'zebra': '#C0C0C0',
            'rainbow': '#FF69B4',
            'ceramic': '#8B4513',
            'moab': '#8B0000',
            'bfb': '#4B0082',
            'zomg': '#FFD700',
            'ddt': '#2F4F4F',
            'bad': '#FF0000'
        };
        return colors[this.type] || '#FF0000';
    }

    getCamoStatus() {
        const camo = {
            'red': false,
            'blue': false,
            'green': false,
            'yellow': false,
            'pink': false,
            'black': false,
            'white': false,
            'zebra': false,
            'rainbow': false,
            'ceramic': false,
            'moab': false,
            'bfb': false,
            'zomg': false,
            'ddt': true,
            'bad': false
        };
        return camo[this.type] || false;
    }

    getLeadStatus() {
        const lead = {
            'red': false,
            'blue': false,
            'green': false,
            'yellow': false,
            'pink': false,
            'black': true,
            'white': false,
            'zebra': false,
            'rainbow': false,
            'ceramic': false,
            'moab': true,
            'bfb': true,
            'zomg': true,
            'ddt': true,
            'bad': true
        };
        return lead[this.type] || false;
    }

    getFortifiedStatus() {
        const fortified = {
            'red': false,
            'blue': false,
            'green': false,
            'yellow': false,
            'pink': false,
            'black': false,
            'white': false,
            'zebra': false,
            'rainbow': false,
            'ceramic': false,
            'moab': false,
            'bfb': false,
            'zomg': false,
            'ddt': false,
            'bad': false
        };
        return fortified[this.type] || false;
    }

    getRegrowStatus() {
        const regrow = {
            'red': false,
            'blue': false,
            'green': false,
            'yellow': false,
            'pink': false,
            'black': false,
            'white': false,
            'zebra': false,
            'rainbow': false,
            'ceramic': false,
            'moab': false,
            'bfb': false,
            'zomg': false,
            'ddt': false,
            'bad': false
        };
        return regrow[this.type] || false;
    }

    update(deltaTime, gameState) {
        if (!this.isActive) return;

        // Update freeze effect
        if (this.isFrozen) {
            this.freezeTimer -= deltaTime;
            if (this.freezeTimer <= 0) {
                this.isFrozen = false;
            } else {
                return; // Frozen bloons don't move
            }
        }

        // Update slow effect
        if (this.slowTimer > 0) {
            this.slowTimer -= deltaTime;
            if (this.slowTimer <= 0) {
                this.slowMultiplier = 1.0;
            }
        }

        // Update effects
        this.effects = this.effects.filter(effect => {
            effect.duration -= deltaTime;
            return effect.duration > 0;
        });

        // Move along path
        const currentSpeed = this.isFrozen ? 0 : this.speed * this.slowMultiplier;
        const moveDistance = currentSpeed * deltaTime / 1000;

        if (this.pathIndex < gameState.path.length - 1) {
            const currentPoint = gameState.path[this.pathIndex];
            const nextPoint = gameState.path[this.pathIndex + 1];
            const direction = nextPoint.subtract(currentPoint).normalize();
            
            this.position = this.position.add(direction.multiply(moveDistance));

            // Check if we've reached the next path point
            if (this.position.distance(nextPoint) < 10) {
                this.pathIndex++;
                this.position = nextPoint.clone();
            }
        } else {
            // Reached the end
            gameState.loseLife(this.getLifeLoss());
            this.isActive = false;
        }
    }

    getLifeLoss() {
        const lifeLoss = {
            'red': 1,
            'blue': 1,
            'green': 1,
            'yellow': 1,
            'pink': 1,
            'black': 1,
            'white': 1,
            'zebra': 1,
            'rainbow': 1,
            'ceramic': 1,
            'moab': 1,
            'bfb': 1,
            'zomg': 1,
            'ddt': 1,
            'bad': 1
        };
        return lifeLoss[this.type] || 1;
    }

    takeDamage(damage, gameState) {
        // Apply fortified damage multiplier
        const actualDamage = this.isFortified ? damage * 2 : damage;
        
        this.health -= actualDamage;
        
        // Create pop effect
        gameState.effects.push(new Effect(this.position, 'pop'));

        if (this.health <= 0) {
            this.pop(gameState);
        }
    }

    pop(gameState) {
        this.isActive = false;
        
        // Give money for popping
        const moneyReward = this.getMoneyReward();
        gameState.addMoney(moneyReward);

        // Create child bloons if applicable
        const children = this.getChildBloons();
        children.forEach(childType => {
            const childBloon = new Bloon(childType, this.position.clone());
            childBloon.pathIndex = this.pathIndex;
            gameState.bloons.push(childBloon);
        });
    }

    getMoneyReward() {
        const rewards = {
            'red': 1,
            'blue': 2,
            'green': 3,
            'yellow': 4,
            'pink': 5,
            'black': 11,
            'white': 11,
            'zebra': 23,
            'rainbow': 47,
            'ceramic': 104,
            'moab': 1000,
            'bfb': 3000,
            'zomg': 10000,
            'ddt': 5000,
            'bad': 50000
        };
        return rewards[this.type] || 1;
    }

    getChildBloons() {
        const children = {
            'blue': ['red'],
            'green': ['blue'],
            'yellow': ['green'],
            'pink': ['yellow'],
            'black': ['pink'],
            'white': ['pink'],
            'zebra': ['black', 'white'],
            'rainbow': ['zebra'],
            'ceramic': ['rainbow'],
            'moab': ['ceramic', 'ceramic', 'ceramic', 'ceramic'],
            'bfb': ['moab', 'moab', 'moab', 'moab'],
            'zomg': ['bfb', 'bfb', 'bfb', 'bfb'],
            'ddt': ['ceramic', 'ceramic', 'ceramic', 'ceramic'],
            'bad': ['zomg', 'zomg', 'zomg', 'zomg']
        };
        return children[this.type] || [];
    }

    freeze(duration = 3000) {
        this.isFrozen = true;
        this.freezeTimer = duration;
    }

    slow(multiplier, duration) {
        this.slowMultiplier = multiplier;
        this.slowTimer = duration;
    }

    addEffect(type, duration) {
        this.effects.push({
            type: type,
            duration: duration
        });
    }

    makeCamo() {
        this.isCamo = true;
    }

    makeLead() {
        this.isLead = true;
    }

    makeFortified() {
        this.isFortified = true;
        this.health *= 2;
        this.maxHealth *= 2;
    }

    makeRegrow() {
        this.isRegrow = true;
    }

    draw(ctx) {
        if (!this.isActive) return;

        ctx.save();
        
        // Draw bloon base
        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw camo effect
        if (this.isCamo) {
            ctx.strokeStyle = '#00FFFF';
            ctx.lineWidth = 3;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.size + 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Draw lead effect
        if (this.isLead) {
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.size + 8, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Draw fortified effect
        if (this.isFortified) {
            ctx.strokeStyle = '#FF4500';
            ctx.lineWidth = 5;
            ctx.setLineDash([10, 5]);
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.size + 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Draw regrow effect
        if (this.isRegrow) {
            ctx.fillStyle = '#32CD32';
            ctx.beginPath();
            ctx.arc(this.position.x - this.size/2, this.position.y - this.size/2, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw health bar for MOAB-class bloons
        if (this.type === 'moab' || this.type === 'bfb' || this.type === 'zomg' || this.type === 'ddt' || this.type === 'bad') {
            const barWidth = this.size * 2;
            const barHeight = 6;
            const barX = this.position.x - barWidth / 2;
            const barY = this.position.y - this.size - 15;
            
            // Background
            ctx.fillStyle = '#333';
            ctx.fillRect(barX, barY, barWidth, barHeight);
            
            // Health
            const healthPercent = this.health / this.maxHealth;
            ctx.fillStyle = healthPercent > 0.5 ? '#00FF00' : healthPercent > 0.25 ? '#FFFF00' : '#FF0000';
            ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
        }

        // Draw health bar for ceramic bloons
        if (this.type === 'ceramic') {
            const barWidth = this.size * 2;
            const barHeight = 4;
            const barX = this.position.x - barWidth / 2;
            const barY = this.position.y - this.size - 10;
            
            // Background
            ctx.fillStyle = '#333';
            ctx.fillRect(barX, barY, barWidth, barHeight);
            
            // Health
            const healthPercent = this.health / this.maxHealth;
            ctx.fillStyle = healthPercent > 0.5 ? '#00FF00' : healthPercent > 0.25 ? '#FFFF00' : '#FF0000';
            ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
        }

        // Draw freeze effect
        if (this.isFrozen) {
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = '#00FFFF';
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.size + 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw slow effect
        if (this.slowMultiplier < 1.0) {
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.size + 3, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

// Bloon factory for creating different types
class BloonFactory {
    static createBloon(type, position) {
        return new Bloon(type, position);
    }

    static getBloonTypes() {
        return ['red', 'blue', 'green', 'yellow', 'pink', 'black', 'white', 'zebra', 'rainbow', 'ceramic', 'moab', 'bfb', 'zomg', 'ddt', 'bad'];
    }

    static getBloonCost(type) {
        const costs = {
            'red': 0,
            'blue': 0,
            'green': 0,
            'yellow': 0,
            'pink': 0,
            'black': 0,
            'white': 0,
            'zebra': 0,
            'rainbow': 0,
            'ceramic': 0,
            'moab': 0,
            'bfb': 0,
            'zomg': 0,
            'ddt': 0,
            'bad': 0
        };
        return costs[type] || 0;
    }

    static getBloonInfo(type) {
        const info = {
            'red': {
                name: 'Red Bloon',
                description: 'Basic bloon',
                properties: []
            },
            'blue': {
                name: 'Blue Bloon',
                description: 'Faster than red',
                properties: []
            },
            'green': {
                name: 'Green Bloon',
                description: 'Even faster',
                properties: []
            },
            'yellow': {
                name: 'Yellow Bloon',
                description: 'Very fast',
                properties: []
            },
            'pink': {
                name: 'Pink Bloon',
                description: 'Fastest basic bloon',
                properties: []
            },
            'black': {
                name: 'Black Bloon',
                description: 'Lead bloon - immune to sharp objects',
                properties: ['lead']
            },
            'white': {
                name: 'White Bloon',
                description: 'Immune to freezing',
                properties: []
            },
            'zebra': {
                name: 'Zebra Bloon',
                description: 'Immune to explosions and freezing',
                properties: []
            },
            'rainbow': {
                name: 'Rainbow Bloon',
                description: 'Advanced bloon',
                properties: []
            },
            'ceramic': {
                name: 'Ceramic Bloon',
                description: 'High health bloon',
                properties: []
            },
            'moab': {
                name: 'MOAB',
                description: 'Massive Ornary Air Blimp',
                properties: ['lead']
            },
            'bfb': {
                name: 'BFB',
                description: 'Brutal Flying Behemoth',
                properties: ['lead']
            },
            'zomg': {
                name: 'ZOMG',
                description: 'Zeppelin of Mighty Gargantuaness',
                properties: ['lead']
            },
            'ddt': {
                name: 'DDT',
                description: 'Dark Dirigible Titan',
                properties: ['lead', 'camo']
            },
            'bad': {
                name: 'BAD',
                description: 'Big Airship of Doom',
                properties: ['lead']
            }
        };
        return info[type] || {};
    }
} 