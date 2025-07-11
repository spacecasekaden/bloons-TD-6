// Hero system for Bloons TD 6

class Hero {
    constructor(type, position) {
        this.type = type;
        this.position = position.clone();
        this.level = 1;
        this.experience = 0;
        this.maxExperience = this.getLevelExperience(1);
        this.health = this.getMaxHealth();
        this.maxHealth = this.health;
        this.range = this.getRange();
        this.damage = this.getDamage();
        this.attackSpeed = this.getAttackSpeed();
        this.attackTimer = 0;
        this.cost = this.getCost();
        this.specialAbility = this.getSpecialAbility();
        this.abilityCooldown = 0;
        this.abilityTimer = 0;
        this.isActive = true;
        this.target = null;
        this.buffs = [];
    }

    getLevelExperience(level) {
        return level * 100 + (level - 1) * 50;
    }

    getMaxHealth() {
        const health = {
            'quincy': 100,
            'gwendolin': 80,
            'striker': 120,
            'obyn': 90,
            'churchill': 150,
            'benjamin': 70,
            'ezili': 85,
            'pat': 200,
            'adora': 110,
            'brickell': 95,
            'etienne': 75,
            'sauda': 130,
            'psi': 80,
            'geraldo': 65
        };
        return health[this.type] || 100;
    }

    getRange() {
        const ranges = {
            'quincy': 140,
            'gwendolin': 120,
            'striker': 100,
            'obyn': 130,
            'churchill': 160,
            'benjamin': 80,
            'ezili': 110,
            'pat': 90,
            'adora': 150,
            'brickell': 130,
            'etienne': 120,
            'sauda': 100,
            'psi': 140,
            'geraldo': 100
        };
        return ranges[this.type] || 120;
    }

    getDamage() {
        const damages = {
            'quincy': 2,
            'gwendolin': 1,
            'striker': 3,
            'obyn': 1,
            'churchill': 4,
            'benjamin': 0,
            'ezili': 2,
            'pat': 3,
            'adora': 3,
            'brickell': 2,
            'etienne': 1,
            'sauda': 4,
            'psi': 2,
            'geraldo': 1
        };
        return damages[this.type] || 1;
    }

    getAttackSpeed() {
        const speeds = {
            'quincy': 800,
            'gwendolin': 600,
            'striker': 1200,
            'obyn': 1000,
            'churchill': 1500,
            'benjamin': 0,
            'ezili': 900,
            'pat': 1000,
            'adora': 1000,
            'brickell': 1100,
            'etienne': 700,
            'sauda': 600,
            'psi': 800,
            'geraldo': 500
        };
        return speeds[this.type] || 1000;
    }

    getCost() {
        const costs = {
            'quincy': 500,
            'gwendolin': 600,
            'striker': 700,
            'obyn': 650,
            'churchill': 800,
            'benjamin': 1200,
            'ezili': 750,
            'pat': 850,
            'adora': 900,
            'brickell': 950,
            'etienne': 1000,
            'sauda': 1100,
            'psi': 1150,
            'geraldo': 1200
        };
        return costs[this.type] || 500;
    }

    getSpecialAbility() {
        const abilities = {
            'quincy': 'storm_of_arrows',
            'gwendolin': 'cocktail_of_fire',
            'striker': 'cluster_bomb',
            'obyn': 'brambles',
            'churchill': 'advanced_ammo',
            'benjamin': 'trojan',
            'ezili': 'soul_sacrifice',
            'pat': 'rallying_roar',
            'adora': 'ball_of_light',
            'brickell': 'naval_warfare',
            'etienne': 'uav',
            'sauda': 'leap_attack',
            'psi': 'psychic_assault',
            'geraldo': 'shop_items'
        };
        return abilities[this.type] || 'none';
    }

    gainExperience(amount) {
        this.experience += amount;
        while (this.experience >= this.maxExperience) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.experience -= this.maxExperience;
        this.maxExperience = this.getLevelExperience(this.level);
        
        // Increase stats
        this.damage = Math.floor(this.damage * 1.2);
        this.range = Math.floor(this.range * 1.1);
        this.attackSpeed = Math.floor(this.attackSpeed * 0.9);
        
        // Heal on level up
        this.health = this.maxHealth;
    }

    update(deltaTime, gameState) {
        if (!this.isActive) return;

        this.attackTimer += deltaTime;
        this.abilityTimer += deltaTime;

        // Update buffs
        this.buffs = this.buffs.filter(buff => {
            buff.duration -= deltaTime;
            return buff.duration > 0;
        });

        // Find target
        if (!this.target || !this.target.isActive) {
            this.findTarget(gameState);
        }

        // Attack if ready and have target
        if (this.attackTimer >= this.attackSpeed && this.target) {
            this.attack(gameState);
            this.attackTimer = 0;
        }

        // Use special ability
        if (this.abilityTimer >= this.abilityCooldown && this.specialAbility !== 'none') {
            this.useSpecialAbility(gameState);
            this.abilityTimer = 0;
        }
    }

    findTarget(gameState) {
        let closestBloon = null;
        let closestDistance = this.range;

        gameState.bloons.forEach(bloon => {
            if (!bloon.isActive) return;

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
            case 'storm_of_arrows':
                this.stormOfArrows(gameState);
                break;
            case 'cocktail_of_fire':
                this.cocktailOfFire(gameState);
                break;
            case 'cluster_bomb':
                this.clusterBomb(gameState);
                break;
            case 'brambles':
                this.brambles(gameState);
                break;
            case 'advanced_ammo':
                this.advancedAmmo(gameState);
                break;
            case 'trojan':
                this.trojan(gameState);
                break;
            case 'soul_sacrifice':
                this.soulSacrifice(gameState);
                break;
            case 'rallying_roar':
                this.rallyingRoar(gameState);
                break;
            case 'ball_of_light':
                this.ballOfLight(gameState);
                break;
            case 'naval_warfare':
                this.navalWarfare(gameState);
                break;
            case 'uav':
                this.uav(gameState);
                break;
            case 'leap_attack':
                this.leapAttack(gameState);
                break;
            case 'psychic_assault':
                this.psychicAssault(gameState);
                break;
            case 'shop_items':
                this.shopItems(gameState);
                break;
            default:
                this.basicAttack(gameState);
        }
    }

    basicAttack(gameState) {
        const projectile = new Projectile(
            this.position.clone(),
            this.target.position.clone(),
            600,
            this.damage,
            'hero'
        );
        gameState.projectiles.push(projectile);
    }

    // Hero-specific abilities
    stormOfArrows(gameState) {
        // Quincy's ability - fires multiple arrows
        for (let i = 0; i < 5; i++) {
            const angle = (i - 2) * 15 * Math.PI / 180;
            const direction = new Vector2(Math.cos(angle), Math.sin(angle));
            const endPoint = this.position.add(direction.multiply(this.range));
            
            const projectile = new Projectile(
                this.position.clone(),
                endPoint,
                800,
                this.damage,
                'hero'
            );
            gameState.projectiles.push(projectile);
        }
    }

    cocktailOfFire(gameState) {
        // Gwendolin's ability - fire damage over time
        const fireRadius = 80;
        gameState.bloons.forEach(bloon => {
            if (!bloon.isActive) return;
            
            const distance = this.position.distance(bloon.position);
            if (distance <= fireRadius) {
                bloon.takeDamage(this.damage * 2, gameState);
                // Add fire effect
                bloon.addEffect('fire', 3000);
            }
        });
    }

    clusterBomb(gameState) {
        // Striker Jones' ability - explosive cluster
        const explosionRadius = 100;
        const affectedBloons = [];

        gameState.bloons.forEach(bloon => {
            if (!bloon.isActive) return;
            
            const distance = this.position.distance(bloon.position);
            if (distance <= explosionRadius) {
                affectedBloons.push(bloon);
            }
        });

        affectedBloons.forEach(bloon => {
            bloon.takeDamage(this.damage * 3, gameState);
        });
    }

    brambles(gameState) {
        // Obyn's ability - creates brambles that slow and damage
        const brambleRadius = 120;
        gameState.bloons.forEach(bloon => {
            if (!bloon.isActive) return;
            
            const distance = this.position.distance(bloon.position);
            if (distance <= brambleRadius) {
                bloon.takeDamage(this.damage, gameState);
                bloon.slow(0.5, 2000); // Slow by 50% for 2 seconds
            }
        });
    }

    advancedAmmo(gameState) {
        // Captain Churchill's ability - high damage single shot
        const projectile = new Projectile(
            this.position.clone(),
            this.target.position.clone(),
            1000,
            this.damage * 5,
            'hero'
        );
        gameState.projectiles.push(projectile);
    }

    trojan(gameState) {
        // Benjamin's ability - generates money
        gameState.addMoney(50);
        // Also damages bloons slightly
        if (this.target) {
            this.target.takeDamage(1, gameState);
        }
    }

    soulSacrifice(gameState) {
        // Ezili's ability - sacrifices health for damage
        this.health = Math.max(1, this.health - 10);
        const damageRadius = 150;
        
        gameState.bloons.forEach(bloon => {
            if (!bloon.isActive) return;
            
            const distance = this.position.distance(bloon.position);
            if (distance <= damageRadius) {
                bloon.takeDamage(this.damage * 4, gameState);
            }
        });
    }

    rallyingRoar(gameState) {
        // Pat Fusty's ability - buffs nearby towers
        const buffRadius = 150;
        gameState.towers.forEach(tower => {
            const distance = this.position.distance(tower.position);
            if (distance <= buffRadius) {
                tower.addBuff('damage', 2.0, 5000); // Double damage for 5 seconds
            }
        });
    }

    ballOfLight(gameState) {
        // Adora's ability - powerful light beam
        const beamLength = 200;
        const direction = this.target.position.subtract(this.position).normalize();
        const endPoint = this.position.add(direction.multiply(beamLength));
        
        const projectile = new Projectile(
            this.position.clone(),
            endPoint,
            1200,
            this.damage * 3,
            'hero'
        );
        gameState.projectiles.push(projectile);
    }

    navalWarfare(gameState) {
        // Admiral Brickell's ability - naval mines
        const mineRadius = 80;
        gameState.bloons.forEach(bloon => {
            if (!bloon.isActive) return;
            
            const distance = this.position.distance(bloon.position);
            if (distance <= mineRadius) {
                bloon.takeDamage(this.damage * 2, gameState);
                // Create mine explosion effect
                gameState.effects.push(new Effect(bloon.position, 'explosion', 1000));
            }
        });
    }

    uav(gameState) {
        // Etienne's ability - reveals all bloons and damages them
        gameState.bloons.forEach(bloon => {
            if (!bloon.isActive) return;
            bloon.takeDamage(this.damage, gameState);
        });
    }

    leapAttack(gameState) {
        // Sauda's ability - leaps to target and damages
        if (this.target) {
            this.position = this.target.position.clone();
            this.target.takeDamage(this.damage * 3, gameState);
            
            // Damage nearby bloons
            const leapRadius = 60;
            gameState.bloons.forEach(bloon => {
                if (!bloon.isActive || bloon === this.target) return;
                
                const distance = this.position.distance(bloon.position);
                if (distance <= leapRadius) {
                    bloon.takeDamage(this.damage, gameState);
                }
            });
        }
    }

    psychicAssault(gameState) {
        // Psi's ability - psychic damage to all bloons
        gameState.bloons.forEach(bloon => {
            if (!bloon.isActive) return;
            bloon.takeDamage(this.damage * 2, gameState);
        });
    }

    shopItems(gameState) {
        // Geraldo's ability - provides shop items
        gameState.addMoney(100);
        // Could add shop items here
    }

    useSpecialAbility(gameState) {
        this.abilityCooldown = this.getAbilityCooldown();
        // Special abilities are handled in the attack method
    }

    getAbilityCooldown() {
        const cooldowns = {
            'quincy': 10000,
            'gwendolin': 15000,
            'striker': 12000,
            'obyn': 8000,
            'churchill': 20000,
            'benjamin': 5000,
            'ezili': 18000,
            'pat': 10000,
            'adora': 15000,
            'brickell': 12000,
            'etienne': 10000,
            'sauda': 8000,
            'psi': 12000,
            'geraldo': 6000
        };
        return cooldowns[this.type] || 10000;
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

        // Draw hero base
        ctx.fillStyle = this.getHeroColor();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw hero level
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.level.toString(), this.position.x, this.position.y + 5);

        // Draw health bar
        const barWidth = 50;
        const barHeight = 6;
        const barX = this.position.x - barWidth / 2;
        const barY = this.position.y - 35;
        
        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = healthPercent > 0.5 ? '#00FF00' : healthPercent > 0.25 ? '#FFFF00' : '#FF0000';
        ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);

        // Draw ability cooldown indicator
        if (this.abilityCooldown > 0) {
            const cooldownPercent = this.abilityTimer / this.abilityCooldown;
            ctx.fillStyle = 'rgba(255, 107, 53, 0.7)';
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, 30, 0, Math.PI * 2 * cooldownPercent);
            ctx.fill();
        }

        ctx.restore();
    }

    getHeroColor() {
        const colors = {
            'quincy': '#8B4513',
            'gwendolin': '#FF4500',
            'striker': '#4169E1',
            'obyn': '#228B22',
            'churchill': '#8B0000',
            'benjamin': '#FFD700',
            'ezili': '#800080',
            'pat': '#FF6347',
            'adora': '#FF69B4',
            'brickell': '#4682B4',
            'etienne': '#32CD32',
            'sauda': '#FF1493',
            'psi': '#9370DB',
            'geraldo': '#DAA520'
        };
        return colors[this.type] || '#8B4513';
    }
}

// Hero factory
class HeroFactory {
    static createHero(type, position) {
        return new Hero(type, position);
    }

    static getHeroTypes() {
        return ['quincy', 'gwendolin', 'striker', 'obyn', 'churchill', 'benjamin', 'ezili', 'pat', 'adora', 'brickell', 'etienne', 'sauda', 'psi', 'geraldo'];
    }

    static getHeroInfo(type) {
        const info = {
            'quincy': {
                name: 'Quincy',
                description: 'Son of Quincy - Basic hero with arrow storm ability',
                cost: 500
            },
            'gwendolin': {
                name: 'Gwendolin',
                description: 'Fire-based hero with cocktail of fire ability',
                cost: 600
            },
            'striker': {
                name: 'Striker Jones',
                description: 'Explosive hero with cluster bomb ability',
                cost: 700
            },
            'obyn': {
                name: 'Obyn Greenfoot',
                description: 'Nature hero with brambles ability',
                cost: 650
            },
            'churchill': {
                name: 'Captain Churchill',
                description: 'Military hero with advanced ammo ability',
                cost: 800
            },
            'benjamin': {
                name: 'Benjamin',
                description: 'Support hero that generates money',
                cost: 1200
            },
            'ezili': {
                name: 'Ezili',
                description: 'Dark hero with soul sacrifice ability',
                cost: 750
            },
            'pat': {
                name: 'Pat Fusty',
                description: 'Support hero with rallying roar ability',
                cost: 850
            },
            'adora': {
                name: 'Adora',
                description: 'Light hero with ball of light ability',
                cost: 900
            },
            'brickell': {
                name: 'Admiral Brickell',
                description: 'Naval hero with naval warfare ability',
                cost: 950
            },
            'etienne': {
                name: 'Etienne',
                description: 'Tech hero with UAV ability',
                cost: 1000
            },
            'sauda': {
                name: 'Sauda',
                description: 'Melee hero with leap attack ability',
                cost: 1100
            },
            'psi': {
                name: 'Psi',
                description: 'Psychic hero with psychic assault ability',
                cost: 1150
            },
            'geraldo': {
                name: 'Geraldo',
                description: 'Shop hero with item shop ability',
                cost: 1200
            }
        };
        return info[type] || {};
    }
} 