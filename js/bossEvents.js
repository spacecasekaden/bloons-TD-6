// Boss Events system for Bloons TD 6
class BossBloon {
    constructor(type, health, abilities = []) {
        this.type = type;
        this.maxHealth = health;
        this.health = health;
        this.abilities = abilities;
        this.isActive = false;
        this.position = new Vector2(0, 300);
        this.speed = 0.5;
        this.pathIndex = 0;
        this.phase = 1;
        this.lastAbilityTime = 0;
    }

    update(deltaTime, gameState) {
        if (!this.isActive) return;

        // Move along path
        if (this.pathIndex < gameState.path.length - 1) {
            const targetPoint = gameState.path[this.pathIndex + 1];
            const direction = targetPoint.subtract(this.position).normalize();
            this.position = this.position.add(direction.multiply(this.speed * deltaTime));
            
            if (this.position.distance(targetPoint) < 10) {
                this.pathIndex++;
            }
        }

        // Use abilities
        this.lastAbilityTime += deltaTime;
        if (this.lastAbilityTime > 5000) { // Every 5 seconds
            this.useRandomAbility(gameState);
            this.lastAbilityTime = 0;
        }

        // Phase transitions
        if (this.health < this.maxHealth * 0.5 && this.phase === 1) {
            this.phase = 2;
            this.activatePhase2();
        }
        if (this.health < this.maxHealth * 0.25 && this.phase === 2) {
            this.phase = 3;
            this.activatePhase3();
        }
    }

    useRandomAbility(gameState) {
        if (this.abilities.length > 0) {
            const ability = this.abilities[Math.floor(Math.random() * this.abilities.length)];
            ability(this, gameState);
        }
    }

    activatePhase2() {
        this.speed *= 1.5;
        // Add phase 2 abilities
    }

    activatePhase3() {
        this.speed *= 1.5;
        // Add phase 3 abilities
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        this.isActive = false;
        // Drop rewards
    }

    draw(ctx) {
        if (!this.isActive) return;

        ctx.save();
        
        // Draw boss health bar
        const barWidth = 100;
        const barHeight = 10;
        const healthPercent = this.health / this.maxHealth;
        
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.position.x - barWidth/2, this.position.y - 40, barWidth, barHeight);
        
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(this.position.x - barWidth/2, this.position.y - 40, barWidth * healthPercent, barHeight);
        
        // Draw boss
        ctx.fillStyle = this.getBossColor();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw phase indicator
        ctx.fillStyle = '#FFFF00';
        ctx.font = '12px Arial';
        ctx.fillText(`Phase ${this.phase}`, this.position.x - 20, this.position.y - 50);
        
        ctx.restore();
    }

    getBossColor() {
        switch (this.type) {
            case 'bloonarius': return '#FF6B35';
            case 'lych': return '#9C27B0';
            case 'vortex': return '#2196F3';
            case 'dreadbloon': return '#F44336';
            case 'phayze': return '#00BCD4';
            default: return '#FF0000';
        }
    }
}

class BossEvent {
    constructor(name, bossType, rounds, rewards = []) {
        this.name = name;
        this.bossType = bossType;
        this.rounds = rounds; // Rounds where boss appears
        this.rewards = rewards;
        this.isActive = false;
        this.currentBoss = null;
        this.completedRounds = [];
    }

    startEvent(gameState) {
        this.isActive = true;
        this.spawnBoss(gameState);
    }

    spawnBoss(gameState) {
        const boss = this.createBoss(this.bossType);
        boss.isActive = true;
        this.currentBoss = boss;
        gameState.bosses.push(boss);
    }

    createBoss(type) {
        switch (type) {
            case 'bloonarius':
                return new BossBloon('bloonarius', 50000, [
                    (boss, gameState) => this.spawnBloons(boss, gameState, 20),
                    (boss, gameState) => this.heal(boss, 5000),
                    (boss, gameState) => this.speedUp(boss)
                ]);
            case 'lych':
                return new BossBloon('lych', 75000, [
                    (boss, gameState) => this.spawnBloons(boss, gameState, 30),
                    (boss, gameState) => this.heal(boss, 10000),
                    (boss, gameState) => this.speedUp(boss),
                    (boss, gameState) => this.spawnChildren(boss, gameState)
                ]);
            case 'vortex':
                return new BossBloon('vortex', 60000, [
                    (boss, gameState) => this.spawnBloons(boss, gameState, 25),
                    (boss, gameState) => this.heal(boss, 7500),
                    (boss, gameState) => this.speedUp(boss),
                    (boss, gameState) => this.windEffect(boss, gameState)
                ]);
            case 'dreadbloon':
                return new BossBloon('dreadbloon', 80000, [
                    (boss, gameState) => this.spawnBloons(boss, gameState, 35),
                    (boss, gameState) => this.heal(boss, 12000),
                    (boss, gameState) => this.speedUp(boss),
                    (boss, gameState) => this.fearEffect(boss, gameState)
                ]);
            case 'phayze':
                return new BossBloon('phayze', 90000, [
                    (boss, gameState) => this.spawnBloons(boss, gameState, 40),
                    (boss, gameState) => this.heal(boss, 15000),
                    (boss, gameState) => this.speedUp(boss),
                    (boss, gameState) => this.phaseShift(boss, gameState)
                ]);
            default:
                return new BossBloon('bloonarius', 50000);
        }
    }

    spawnBloons(boss, gameState, count) {
        for (let i = 0; i < count; i++) {
            const bloon = new Bloon('red', boss.position.clone());
            gameState.bloons.push(bloon);
        }
    }

    heal(boss, amount) {
        boss.health = Math.min(boss.maxHealth, boss.health + amount);
    }

    speedUp(boss) {
        boss.speed *= 1.5;
        setTimeout(() => boss.speed /= 1.5, 10000);
    }

    spawnChildren(boss, gameState) {
        // Lych spawns children bloons
        for (let i = 0; i < 5; i++) {
            const child = new Bloon('ceramic', boss.position.clone());
            gameState.bloons.push(child);
        }
    }

    windEffect(boss, gameState) {
        // Vortex creates wind that affects projectiles
        gameState.projectiles.forEach(projectile => {
            projectile.velocity = projectile.velocity.add(new Vector2(-1, 0));
        });
    }

    fearEffect(boss, gameState) {
        // Dreadbloon causes fear, reducing tower attack speed
        gameState.towers.forEach(tower => {
            tower.attackSpeed *= 0.8;
        });
        setTimeout(() => {
            gameState.towers.forEach(tower => {
                tower.attackSpeed /= 0.8;
            });
        }, 15000);
    }

    phaseShift(boss, gameState) {
        // Phayze shifts phases, making towers miss
        gameState.towers.forEach(tower => {
            tower.accuracy *= 0.5;
        });
        setTimeout(() => {
            gameState.towers.forEach(tower => {
                tower.accuracy /= 0.5;
            });
        }, 20000);
    }

    update(deltaTime, gameState) {
        if (!this.isActive) return;

        if (this.currentBoss) {
            this.currentBoss.update(deltaTime, gameState);
            
            if (!this.currentBoss.isActive) {
                this.completeRound(gameState);
            }
        }
    }

    completeRound(gameState) {
        this.completedRounds.push(gameState.round);
        this.currentBoss = null;
        
        if (this.completedRounds.length >= this.rounds.length) {
            this.completeEvent(gameState);
        } else {
            // Spawn next boss at next round
            const nextRound = this.rounds[this.completedRounds.length];
            if (gameState.round >= nextRound) {
                this.spawnBoss(gameState);
            }
        }
    }

    completeEvent(gameState) {
        this.isActive = false;
        // Give rewards
        this.rewards.forEach(reward => reward(gameState));
    }
}

class BossEventManager {
    constructor() {
        this.bossEvents = this.createBossEvents();
        this.currentEvent = null;
    }

    createBossEvents() {
        return [
            new BossEvent(
                'Bloonarius Event',
                'bloonarius',
                [40, 60, 80, 100, 120],
                [
                    (gameState) => gameState.addMoney(5000),
                    (gameState) => gameState.instaMonkeyManager.generateRandomInstaMonkey()
                ]
            ),
            new BossEvent(
                'Lych Event',
                'lych',
                [50, 75, 100, 125, 150],
                [
                    (gameState) => gameState.addMoney(7500),
                    (gameState) => gameState.instaMonkeyManager.generateRandomInstaMonkey(),
                    (gameState) => gameState.instaMonkeyManager.generateRandomInstaMonkey()
                ]
            ),
            new BossEvent(
                'Vortex Event',
                'vortex',
                [45, 70, 95, 120, 145],
                [
                    (gameState) => gameState.addMoney(6000),
                    (gameState) => gameState.instaMonkeyManager.generateRandomInstaMonkey()
                ]
            ),
            new BossEvent(
                'Dreadbloon Event',
                'dreadbloon',
                [55, 85, 115, 145, 175],
                [
                    (gameState) => gameState.addMoney(8000),
                    (gameState) => gameState.instaMonkeyManager.generateRandomInstaMonkey(),
                    (gameState) => gameState.instaMonkeyManager.generateRandomInstaMonkey()
                ]
            ),
            new BossEvent(
                'Phayze Event',
                'phayze',
                [60, 90, 120, 150, 180],
                [
                    (gameState) => gameState.addMoney(10000),
                    (gameState) => gameState.instaMonkeyManager.generateRandomInstaMonkey(),
                    (gameState) => gameState.instaMonkeyManager.generateRandomInstaMonkey(),
                    (gameState) => gameState.instaMonkeyManager.generateRandomInstaMonkey()
                ]
            )
        ];
    }

    startBossEvent(eventName, gameState) {
        const event = this.bossEvents.find(e => e.name === eventName);
        if (event) {
            this.currentEvent = event;
            event.startEvent(gameState);
            return true;
        }
        return false;
    }

    update(deltaTime, gameState) {
        if (this.currentEvent) {
            this.currentEvent.update(deltaTime, gameState);
        }
    }

    getActiveEvent() {
        return this.currentEvent;
    }

    getAvailableEvents() {
        return this.bossEvents.filter(event => !event.isActive);
    }
} 