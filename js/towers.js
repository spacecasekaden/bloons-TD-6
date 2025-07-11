// Complete tower system for Bloons TD 6 with all tower types and upgrade paths

class Tower {
    constructor(type, position) {
        this.type = type;
        this.position = position.clone();
        this.level = 1;
        this.tier1 = 0;
        this.tier2 = 0;
        this.tier3 = 0;
        this.tier4 = 0;
        this.tier5 = 0;
        this.range = this.getRange();
        this.damage = this.getDamage();
        this.attackSpeed = this.getAttackSpeed();
        this.attackTimer = 0;
        this.cost = this.getCost();
        this.target = null;
        this.isActive = true;
        this.specialAbility = this.getSpecialAbility();
        this.buffs = [];
        this.projectileType = this.getProjectileType();
        this.pierce = this.getPierce();
        this.camoDetection = this.getCamoDetection();
        this.leadDetection = this.getLeadDetection();
        this.fortifiedDamage = this.getFortifiedDamage();
    }

    getRange() {
        const ranges = {
            'dart': 120,
            'tack': 80,
            'bomb': 100,
            'ice': 90,
            'glue': 110,
            'sniper': 200,
            'sub': 130,
            'buccaneer': 140,
            'ace': 160,
            'heli': 150,
            'mortar': 180,
            'dartling': 140,
            'wizard': 120,
            'super': 150,
            'ninja': 100,
            'alchemist': 110,
            'druid': 120,
            'farm': 0,
            'spike': 0,
            'village': 120,
            'engineer': 100
        };
        return ranges[this.type] || 100;
    }

    getDamage() {
        const damages = {
            'dart': 1,
            'tack': 1,
            'bomb': 3,
            'ice': 1,
            'glue': 0,
            'sniper': 2,
            'sub': 1,
            'buccaneer': 2,
            'ace': 1,
            'heli': 2,
            'mortar': 4,
            'dartling': 1,
            'wizard': 2,
            'super': 1,
            'ninja': 1,
            'alchemist': 1,
            'druid': 1,
            'farm': 0,
            'spike': 0,
            'village': 0,
            'engineer': 1
        };
        return damages[this.type] || 1;
    }

    getAttackSpeed() {
        const speeds = {
            'dart': 1000,
            'tack': 800,
            'bomb': 1500,
            'ice': 1200,
            'glue': 1000,
            'sniper': 2000,
            'sub': 1200,
            'buccaneer': 1500,
            'ace': 800,
            'heli': 1000,
            'mortar': 3000,
            'dartling': 600,
            'wizard': 1000,
            'super': 1200,
            'ninja': 900,
            'alchemist': 1200,
            'druid': 1000,
            'farm': 0,
            'spike': 0,
            'village': 0,
            'engineer': 1000
        };
        return speeds[this.type] || 1000;
    }

    getCost() {
        const costs = {
            'dart': 200,
            'tack': 280,
            'bomb': 500,
            'ice': 400,
            'glue': 300,
            'sniper': 350,
            'sub': 400,
            'buccaneer': 450,
            'ace': 500,
            'heli': 1200,
            'mortar': 400,
            'dartling': 850,
            'wizard': 400,
            'super': 2500,
            'ninja': 500,
            'alchemist': 550,
            'druid': 400,
            'farm': 1000,
            'spike': 1000,
            'village': 1200,
            'engineer': 400
        };
        return costs[this.type] || 200;
    }

    getSpecialAbility() {
        const abilities = {
            'dart': 'pierce',
            'tack': 'multi_shot',
            'bomb': 'explosion',
            'ice': 'freeze',
            'glue': 'slow',
            'sniper': 'pierce',
            'sub': 'submerge',
            'buccaneer': 'naval',
            'ace': 'air_attack',
            'heli': 'air_attack',
            'mortar': 'area_damage',
            'dartling': 'rapid_fire',
            'wizard': 'magic',
            'super': 'super_damage',
            'ninja': 'stealth',
            'alchemist': 'acid',
            'druid': 'nature',
            'farm': 'income',
            'spike': 'spikes',
            'village': 'support',
            'engineer': 'engineering'
        };
        return abilities[this.type] || 'none';
    }

    getProjectileType() {
        const types = {
            'dart': 'dart',
            'tack': 'tack',
            'bomb': 'bomb',
            'ice': 'ice',
            'glue': 'glue',
            'sniper': 'bullet',
            'sub': 'torpedo',
            'buccaneer': 'cannon',
            'ace': 'bomb',
            'heli': 'missile',
            'mortar': 'shell',
            'dartling': 'dart',
            'wizard': 'fireball',
            'super': 'laser',
            'ninja': 'shuriken',
            'alchemist': 'acid',
            'druid': 'nature',
            'farm': 'none',
            'spike': 'none',
            'village': 'none',
            'engineer': 'nail'
        };
        return types[this.type] || 'dart';
    }

    getPierce() {
        const pierce = {
            'dart': 1,
            'tack': 1,
            'bomb': 1,
            'ice': 1,
            'glue': 1,
            'sniper': 1,
            'sub': 1,
            'buccaneer': 1,
            'ace': 1,
            'heli': 1,
            'mortar': 1,
            'dartling': 1,
            'wizard': 1,
            'super': 1,
            'ninja': 1,
            'alchemist': 1,
            'druid': 1,
            'farm': 0,
            'spike': 0,
            'village': 0,
            'engineer': 1
        };
        return pierce[this.type] || 1;
    }

    getCamoDetection() {
        const camo = {
            'dart': false,
            'tack': false,
            'bomb': false,
            'ice': false,
            'glue': false,
            'sniper': true,
            'sub': true,
            'buccaneer': false,
            'ace': false,
            'heli': true,
            'mortar': false,
            'dartling': false,
            'wizard': true,
            'super': true,
            'ninja': true,
            'alchemist': false,
            'druid': false,
            'farm': false,
            'spike': false,
            'village': false,
            'engineer': false
        };
        return camo[this.type] || false;
    }

    getLeadDetection() {
        const lead = {
            'dart': false,
            'tack': false,
            'bomb': true,
            'ice': false,
            'glue': false,
            'sniper': true,
            'sub': true,
            'buccaneer': true,
            'ace': true,
            'heli': true,
            'mortar': true,
            'dartling': false,
            'wizard': true,
            'super': true,
            'ninja': false,
            'alchemist': true,
            'druid': false,
            'farm': false,
            'spike': true,
            'village': false,
            'engineer': true
        };
        return lead[this.type] || false;
    }

    getFortifiedDamage() {
        const fortified = {
            'dart': 1,
            'tack': 1,
            'bomb': 1,
            'ice': 1,
            'glue': 1,
            'sniper': 1,
            'sub': 1,
            'buccaneer': 1,
            'ace': 1,
            'heli': 1,
            'mortar': 1,
            'dartling': 1,
            'wizard': 1,
            'super': 1,
            'ninja': 1,
            'alchemist': 1,
            'druid': 1,
            'farm': 1,
            'spike': 1,
            'village': 1,
            'engineer': 1
        };
        return fortified[this.type] || 1;
    }

    getUpgradeCost(path, tier) {
        const costs = {
            'dart': { 1: [150, 150], 2: [300, 300], 3: [1200, 1200], 4: [5000, 5000], 5: [25000, 25000] },
            'tack': { 1: [200, 200], 2: [400, 400], 3: [1500, 1500], 4: [6000, 6000], 5: [30000, 30000] },
            'bomb': { 1: [300, 300], 2: [600, 600], 3: [2000, 2000], 4: [8000, 8000], 5: [40000, 40000] },
            'ice': { 1: [250, 250], 2: [500, 500], 3: [1800, 1800], 4: [7000, 7000], 5: [35000, 35000] },
            'glue': { 1: [200, 200], 2: [400, 400], 3: [1500, 1500], 4: [6000, 6000], 5: [30000, 30000] },
            'sniper': { 1: [250, 250], 2: [500, 500], 3: [1800, 1800], 4: [7000, 7000], 5: [35000, 35000] },
            'sub': { 1: [300, 300], 2: [600, 600], 3: [2000, 2000], 4: [8000, 8000], 5: [40000, 40000] },
            'buccaneer': { 1: [350, 350], 2: [700, 700], 3: [2500, 2500], 4: [10000, 10000], 5: [50000, 50000] },
            'ace': { 1: [400, 400], 2: [800, 800], 3: [3000, 3000], 4: [12000, 12000], 5: [60000, 60000] },
            'heli': { 1: [500, 500], 2: [1000, 1000], 3: [4000, 4000], 4: [15000, 15000], 5: [75000, 75000] },
            'mortar': { 1: [300, 300], 2: [600, 600], 3: [2000, 2000], 4: [8000, 8000], 5: [40000, 40000] },
            'dartling': { 1: [400, 400], 2: [800, 800], 3: [3000, 3000], 4: [12000, 12000], 5: [60000, 60000] },
            'wizard': { 1: [300, 300], 2: [600, 600], 3: [2000, 2000], 4: [8000, 8000], 5: [40000, 40000] },
            'super': { 1: [1000, 1000], 2: [2000, 2000], 3: [8000, 8000], 4: [30000, 30000], 5: [150000, 150000] },
            'ninja': { 1: [350, 350], 2: [700, 700], 3: [2500, 2500], 4: [10000, 10000], 5: [50000, 50000] },
            'alchemist': { 1: [300, 300], 2: [600, 600], 3: [2000, 2000], 4: [8000, 8000], 5: [40000, 40000] },
            'druid': { 1: [300, 300], 2: [600, 600], 3: [2000, 2000], 4: [8000, 8000], 5: [40000, 40000] },
            'farm': { 1: [200, 200], 2: [400, 400], 3: [1500, 1500], 4: [6000, 6000], 5: [30000, 30000] },
            'spike': { 1: [200, 200], 2: [400, 400], 3: [1500, 1500], 4: [6000, 6000], 5: [30000, 30000] },
            'village': { 1: [300, 300], 2: [600, 600], 3: [2000, 2000], 4: [8000, 8000], 5: [40000, 40000] },
            'engineer': { 1: [300, 300], 2: [600, 600], 3: [2000, 2000], 4: [8000, 8000], 5: [40000, 40000] }
        };
        
        const towerCosts = costs[this.type];
        if (!towerCosts || !towerCosts[tier]) return 0;
        
        return towerCosts[tier][path - 1] || 0;
    }

    canUpgrade(path, tier, gameState) {
        const cost = this.getUpgradeCost(path, tier);
        return gameState.money >= cost;
    }

    upgrade(path, tier) {
        const cost = this.getUpgradeCost(path, tier);
        
        switch(path) {
            case 1:
                this.tier1 = tier;
                break;
            case 2:
                this.tier2 = tier;
                break;
            case 3:
                this.tier3 = tier;
                break;
            case 4:
                this.tier4 = tier;
                break;
            case 5:
                this.tier5 = tier;
                break;
        }
        
        this.applyUpgradeEffects(path, tier);
    }

    applyUpgradeEffects(path, tier) {
        // Apply upgrade effects based on tower type and path
        switch(this.type) {
            case 'dart':
                if (path === 1) {
                    this.damage += tier;
                    this.pierce += tier;
                } else if (path === 2) {
                    this.attackSpeed = Math.floor(this.attackSpeed * (0.9 ** tier));
                }
                break;
            case 'tack':
                if (path === 1) {
                    this.damage += tier;
                } else if (path === 2) {
                    this.range += tier * 20;
                }
                break;
            case 'bomb':
                if (path === 1) {
                    this.damage += tier * 2;
                } else if (path === 2) {
                    this.attackSpeed = Math.floor(this.attackSpeed * (0.8 ** tier));
                }
                break;
            case 'ice':
                if (path === 1) {
                    this.damage += tier;
                } else if (path === 2) {
                    this.range += tier * 15;
                }
                break;
            // Add more tower upgrade effects...
        }
    }

    update(deltaTime, gameState) {
        if (!this.isActive) return;

        this.attackTimer += deltaTime;

        // Find target
        if (!this.target || !this.target.isActive) {
            this.findTarget(gameState);
        }

        // Attack if ready and have target
        if (this.attackTimer >= this.attackSpeed && this.target) {
            this.attack(gameState);
            this.attackTimer = 0;
        }

        // Update buffs
        this.buffs = this.buffs.filter(buff => {
            buff.duration -= deltaTime;
            return buff.duration > 0;
        });
    }

    findTarget(gameState) {
        let closestBloon = null;
        let closestDistance = this.range;

        gameState.bloons.forEach(bloon => {
            if (!bloon.isActive) return;

            // Check camo detection
            if (bloon.isCamo && !this.camoDetection) return;

            // Check lead detection
            if (bloon.isLead && !this.leadDetection) return;

            const distance = this.position.distance(bloon.position);
            if (distance <= this.range && distance < closestDistance) {
                closestBloon = bloon;
                closestDistance = distance;
            }
        });

        this.target = closestBloon;
    }

    attack(gameState) {
        if (!this.target || !this.target.isActive) return;

        switch (this.specialAbility) {
            case 'pierce':
                this.pierceAttack(gameState);
                break;
            case 'multi_shot':
                this.multiShotAttack(gameState);
                break;
            case 'explosion':
                this.explosionAttack(gameState);
                break;
            case 'freeze':
                this.freezeAttack(gameState);
                break;
            case 'slow':
                this.slowAttack(gameState);
                break;
            case 'submerge':
                this.submergeAttack(gameState);
                break;
            case 'naval':
                this.navalAttack(gameState);
                break;
            case 'air_attack':
                this.airAttack(gameState);
                break;
            case 'area_damage':
                this.areaDamageAttack(gameState);
                break;
            case 'rapid_fire':
                this.rapidFireAttack(gameState);
                break;
            case 'magic':
                this.magicAttack(gameState);
                break;
            case 'super_damage':
                this.superDamageAttack(gameState);
                break;
            case 'stealth':
                this.stealthAttack(gameState);
                break;
            case 'acid':
                this.acidAttack(gameState);
                break;
            case 'nature':
                this.natureAttack(gameState);
                break;
            case 'income':
                this.incomeGeneration(gameState);
                break;
            case 'spikes':
                this.spikeAttack(gameState);
                break;
            case 'support':
                this.supportBuff(gameState);
                break;
            case 'engineering':
                this.engineeringAttack(gameState);
                break;
            default:
                this.basicAttack(gameState);
        }
    }

    basicAttack(gameState) {
        const projectile = new Projectile(
            this.position.clone(),
            this.target.position.clone(),
            500,
            this.damage,
            this.projectileType
        );
        gameState.projectiles.push(projectile);
    }

    // Tower-specific attack methods
    pierceAttack(gameState) {
        const direction = this.target.position.subtract(this.position).normalize();
        const endPoint = this.position.add(direction.multiply(this.range));
        
        const projectile = new Projectile(
            this.position.clone(),
            endPoint,
            800,
            this.damage,
            this.projectileType
        );
        gameState.projectiles.push(projectile);
    }

    multiShotAttack(gameState) {
        const directions = [
            new Vector2(1, 0), new Vector2(0.7, 0.7), new Vector2(0, 1), new Vector2(-0.7, 0.7),
            new Vector2(-1, 0), new Vector2(-0.7, -0.7), new Vector2(0, -1), new Vector2(0.7, -0.7)
        ];

        directions.forEach(dir => {
            const endPoint = this.position.add(dir.multiply(this.range));
            const projectile = new Projectile(
                this.position.clone(),
                endPoint,
                600,
                this.damage,
                this.projectileType
            );
            gameState.projectiles.push(projectile);
        });
    }

    explosionAttack(gameState) {
        const explosionRadius = 60;
        const affectedBloons = [];

        gameState.bloons.forEach(bloon => {
            if (!bloon.isActive) return;
            
            const distance = this.target.position.distance(bloon.position);
            if (distance <= explosionRadius) {
                affectedBloons.push(bloon);
            }
        });

        gameState.effects.push(new Effect(this.target.position, 'explosion', 500));

        affectedBloons.forEach(bloon => {
            bloon.takeDamage(this.damage, gameState);
        });
    }

    freezeAttack(gameState) {
        const freezeRadius = 80;
        const affectedBloons = [];

        gameState.bloons.forEach(bloon => {
            if (!bloon.isActive) return;
            
            const distance = this.position.distance(bloon.position);
            if (distance <= freezeRadius) {
                affectedBloons.push(bloon);
            }
        });

        gameState.effects.push(new Effect(this.position, 'freeze', 1000));

        affectedBloons.forEach(bloon => {
            bloon.freeze(3000);
        });

        if (this.target) {
            this.target.takeDamage(this.damage, gameState);
        }
    }

    slowAttack(gameState) {
        if (this.target) {
            this.target.takeDamage(this.damage, gameState);
            this.target.slow(0.5, 2000);
        }
    }

    submergeAttack(gameState) {
        // Submarine can attack from underwater
        const projectile = new Projectile(
            this.position.clone(),
            this.target.position.clone(),
            700,
            this.damage,
            'torpedo'
        );
        gameState.projectiles.push(projectile);
    }

    navalAttack(gameState) {
        // Buccaneer naval attack
        const projectile = new Projectile(
            this.position.clone(),
            this.target.position.clone(),
            600,
            this.damage,
            'cannon'
        );
        gameState.projectiles.push(projectile);
    }

    airAttack(gameState) {
        // Air-based attack
        const projectile = new Projectile(
            this.position.clone(),
            this.target.position.clone(),
            800,
            this.damage,
            'missile'
        );
        gameState.projectiles.push(projectile);
    }

    areaDamageAttack(gameState) {
        // Mortar area damage
        const areaRadius = 100;
        const affectedBloons = [];

        gameState.bloons.forEach(bloon => {
            if (!bloon.isActive) return;
            
            const distance = this.target.position.distance(bloon.position);
            if (distance <= areaRadius) {
                affectedBloons.push(bloon);
            }
        });

        gameState.effects.push(new Effect(this.target.position, 'explosion', 800));

        affectedBloons.forEach(bloon => {
            bloon.takeDamage(this.damage * 2, gameState);
        });
    }

    rapidFireAttack(gameState) {
        // Dartling rapid fire
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const projectile = new Projectile(
                    this.position.clone(),
                    this.target.position.clone(),
                    1000,
                    this.damage,
                    this.projectileType
                );
                gameState.projectiles.push(projectile);
            }, i * 100);
        }
    }

    magicAttack(gameState) {
        // Wizard magic attack
        const projectile = new Projectile(
            this.position.clone(),
            this.target.position.clone(),
            600,
            this.damage,
            'fireball'
        );
        gameState.projectiles.push(projectile);
    }

    superDamageAttack(gameState) {
        // Super monkey laser
        const projectile = new Projectile(
            this.position.clone(),
            this.target.position.clone(),
            1200,
            this.damage * 3,
            'laser'
        );
        gameState.projectiles.push(projectile);
    }

    stealthAttack(gameState) {
        // Ninja stealth attack
        const projectile = new Projectile(
            this.position.clone(),
            this.target.position.clone(),
            900,
            this.damage,
            'shuriken'
        );
        gameState.projectiles.push(projectile);
    }

    acidAttack(gameState) {
        // Alchemist acid attack
        const projectile = new Projectile(
            this.position.clone(),
            this.target.position.clone(),
            500,
            this.damage,
            'acid'
        );
        gameState.projectiles.push(projectile);
    }

    natureAttack(gameState) {
        // Druid nature attack
        const projectile = new Projectile(
            this.position.clone(),
            this.target.position.clone(),
            600,
            this.damage,
            'nature'
        );
        gameState.projectiles.push(projectile);
    }

    incomeGeneration(gameState) {
        // Banana farm generates money
        gameState.addMoney(25);
    }

    spikeAttack(gameState) {
        // Spike factory creates spikes
        // This would be handled differently in a full implementation
    }

    supportBuff(gameState) {
        // Village provides support buffs
        const buffRadius = 150;
        gameState.towers.forEach(tower => {
            const distance = this.position.distance(tower.position);
            if (distance <= buffRadius) {
                tower.addBuff('damage', 1.5, 5000);
            }
        });
    }

    engineeringAttack(gameState) {
        // Engineer engineering attack
        const projectile = new Projectile(
            this.position.clone(),
            this.target.position.clone(),
            700,
            this.damage,
            'nail'
        );
        gameState.projectiles.push(projectile);
    }

    addBuff(type, multiplier, duration) {
        this.buffs.push({
            type: type,
            multiplier: multiplier,
            duration: duration
        });
    }

    draw(ctx) {
        if (!this.isActive) return;

        ctx.save();

        // Draw tower base
        ctx.fillStyle = this.getTowerColor();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw upgrade indicators
        this.drawUpgradeIndicators(ctx);

        // Draw range indicator when selected
        if (window.selectedTower === this) {
            ctx.strokeStyle = 'rgba(255, 107, 53, 0.5)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.range, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        ctx.restore();
    }

    drawUpgradeIndicators(ctx) {
        const indicators = [];
        if (this.tier1 > 0) indicators.push(`1-${this.tier1}`);
        if (this.tier2 > 0) indicators.push(`2-${this.tier2}`);
        if (this.tier3 > 0) indicators.push(`3-${this.tier3}`);
        if (this.tier4 > 0) indicators.push(`4-${this.tier4}`);
        if (this.tier5 > 0) indicators.push(`5-${this.tier5}`);

        ctx.fillStyle = '#FFF';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(indicators.join(' '), this.position.x, this.position.y + 4);
    }

    getTowerColor() {
        const colors = {
            'dart': '#7F4B00',
            'tack': '#FF6B00',
            'bomb': '#800000',
            'ice': '#00FFFF',
            'glue': '#FFD700',
            'sniper': '#8B4513',
            'sub': '#4682B4',
            'buccaneer': '#8B4513',
            'ace': '#4169E1',
            'heli': '#32CD32',
            'mortar': '#696969',
            'dartling': '#FF4500',
            'wizard': '#9370DB',
            'super': '#FFD700',
            'ninja': '#000000',
            'alchemist': '#32CD32',
            'druid': '#228B22',
            'farm': '#FFD700',
            'spike': '#8B4513',
            'village': '#FF6347',
            'engineer': '#A0522D'
        };
        return colors[this.type] || '#7F4B00';
    }
}

// Tower factory with all tower types
class TowerFactory {
    static createTower(type, position) {
        return new Tower(type, position);
    }

    static getTowerTypes() {
        return ['dart', 'tack', 'bomb', 'ice', 'glue', 'sniper', 'sub', 'buccaneer', 'ace', 'heli', 'mortar', 'dartling', 'wizard', 'super', 'ninja', 'alchemist', 'druid', 'farm', 'spike', 'village', 'engineer'];
    }

    static getTowerInfo(type) {
        const info = {
            'dart': {
                name: 'Dart Monkey',
                description: 'Basic tower with piercing darts',
                cost: 200
            },
            'tack': {
                name: 'Tack Shooter',
                description: 'Fires tacks in 8 directions',
                cost: 280
            },
            'bomb': {
                name: 'Bomb Tower',
                description: 'Explosive area damage',
                cost: 500
            },
            'ice': {
                name: 'Ice Tower',
                description: 'Freezes and slows bloons',
                cost: 400
            },
            'glue': {
                name: 'Glue Gunner',
                description: 'Slows down bloons',
                cost: 300
            },
            'sniper': {
                name: 'Sniper Monkey',
                description: 'Long range with camo detection',
                cost: 350
            },
            'sub': {
                name: 'Monkey Sub',
                description: 'Underwater tower with camo detection',
                cost: 400
            },
            'buccaneer': {
                name: 'Monkey Buccaneer',
                description: 'Naval tower with lead popping',
                cost: 450
            },
            'ace': {
                name: 'Monkey Ace',
                description: 'Air-based tower',
                cost: 500
            },
            'heli': {
                name: 'Heli Pilot',
                description: 'Advanced air tower with camo detection',
                cost: 1200
            },
            'mortar': {
                name: 'Mortar Tower',
                description: 'Area damage artillery',
                cost: 400
            },
            'dartling': {
                name: 'Dartling Gunner',
                description: 'Rapid fire tower',
                cost: 850
            },
            'wizard': {
                name: 'Wizard Monkey',
                description: 'Magic tower with camo detection',
                cost: 400
            },
            'super': {
                name: 'Super Monkey',
                description: 'Powerful tower with camo detection',
                cost: 2500
            },
            'ninja': {
                name: 'Ninja Monkey',
                description: 'Stealth tower with camo detection',
                cost: 500
            },
            'alchemist': {
                name: 'Alchemist',
                description: 'Acid-based tower with lead popping',
                cost: 550
            },
            'druid': {
                name: 'Druid',
                description: 'Nature-based tower',
                cost: 400
            },
            'farm': {
                name: 'Banana Farm',
                description: 'Generates income',
                cost: 1000
            },
            'spike': {
                name: 'Spike Factory',
                description: 'Creates spikes for lead popping',
                cost: 1000
            },
            'village': {
                name: 'Monkey Village',
                description: 'Support tower that buffs others',
                cost: 1200
            },
            'engineer': {
                name: 'Engineer Monkey',
                description: 'Engineering tower with lead popping',
                cost: 400
            }
        };
        return info[type] || {};
    }
} 