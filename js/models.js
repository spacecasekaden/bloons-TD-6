// Core game models and data structures

class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    multiply(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    distance(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    normalize() {
        const length = Math.sqrt(this.x * this.x + this.y * this.y);
        if (length === 0) return new Vector2(0, 0);
        return new Vector2(this.x / length, this.y / length);
    }

    clone() {
        return new Vector2(this.x, this.y);
    }
}

class GameState {
    constructor() {
        this.money = 650;
        this.lives = 150;
        this.round = 1;
        this.isPaused = false;
        this.isFastForward = false;
        this.selectedTower = null;
        this.towers = [];
        this.heroes = [];
        this.bloons = [];
        this.projectiles = [];
        this.effects = [];
        this.bosses = [];
        this.path = this.generatePath();
        this.lastTime = 0;
        this.bloonSpawnTimer = 0;
        this.bloonsInRound = 0;
        this.totalBloonsInRound = 0;
        
        // Game mode properties
        this.currentMode = 'Easy';
        this.incomeMultiplier = 1.0;
        this.bloonSpeedMultiplier = 1.0;
        this.bloonHealthMultiplier = 1.0;
        this.towerCostMultiplier = 1.0;
        this.sellMultiplier = 0.7;
        this.maxTowers = Infinity;
        this.maxHeroes = 1;
        this.allowPowers = true;
        this.allowInstaMonkeys = true;
        this.allowContinues = true;
        
        // Statistics
        this.totalBloonsPopped = 0;
        this.totalMoneyEarned = 0;
        this.gameTime = 0;
        this.mapsPlayed = new Set();
        this.expertMapsCompleted = 0;
        this.instaMonkeysCollected = 0;
        this.hasLegendaryInsta = false;
        this.dailyStreak = 0;
        this.dailiesCompleted = 0;
        this.bossesDefeated = 0;
        this.bossTypesDefeated = 0;
        this.odysseysCompleted = 0;
        this.perfectOdysseys = 0;
        this.powersUsed = 0;
    }

    generatePath() {
        // Create a simple path for the bloons to follow
        return [
            new Vector2(-50, 300),
            new Vector2(100, 300),
            new Vector2(150, 250),
            new Vector2(200, 200),
            new Vector2(250, 150),
            new Vector2(300, 100),
            new Vector2(350, 150),
            new Vector2(400, 200),
            new Vector2(450, 250),
            new Vector2(500, 300),
            new Vector2(550, 350),
            new Vector2(600, 400),
            new Vector2(650, 450),
            new Vector2(700, 500),
            new Vector2(750, 550),
            new Vector2(850, 600) // Exit point
        ];
    }

    update(deltaTime) {
        if (this.isPaused) return;

        const timeScale = this.isFastForward ? 2 : 1;
        const adjustedDeltaTime = deltaTime * timeScale;

        // Update game time
        this.gameTime += adjustedDeltaTime;

        // Update towers
        this.towers.forEach(tower => tower.update(adjustedDeltaTime, this));

        // Update heroes
        this.heroes.forEach(hero => hero.update(adjustedDeltaTime, this));

        // Update bloons
        this.bloons.forEach(bloon => bloon.update(adjustedDeltaTime, this));

        // Update projectiles
        this.projectiles = this.projectiles.filter(projectile => {
            projectile.update(adjustedDeltaTime);
            return projectile.isActive;
        });

        // Update effects
        this.effects = this.effects.filter(effect => {
            effect.update(adjustedDeltaTime);
            return effect.isActive;
        });

        // Update bosses
        this.bosses.forEach(boss => boss.update(adjustedDeltaTime, this));

        // Spawn bloons
        this.updateBloonSpawning(adjustedDeltaTime);
    }

    updateBloonSpawning(deltaTime) {
        if (this.bloonsInRound >= this.totalBloonsInRound) return;

        this.bloonSpawnTimer += deltaTime;
        if (this.bloonSpawnTimer >= 1000) { // Spawn every second
            this.spawnBloon();
            this.bloonSpawnTimer = 0;
        }
    }

    spawnBloon() {
        const bloonTypes = this.getBloonTypesForRound();
        const randomType = bloonTypes[Math.floor(Math.random() * bloonTypes.length)];
        const bloon = new Bloon(randomType, this.path[0]);
        this.bloons.push(bloon);
        this.bloonsInRound++;
    }

    getBloonTypesForRound() {
        const roundData = {
            1: ['red'],
            2: ['red', 'blue'],
            3: ['red', 'blue', 'green'],
            4: ['red', 'blue', 'green', 'yellow'],
            5: ['red', 'blue', 'green', 'yellow', 'pink'],
            6: ['blue', 'green', 'yellow', 'pink', 'black'],
            7: ['green', 'yellow', 'pink', 'black', 'white'],
            8: ['yellow', 'pink', 'black', 'white', 'zebra'],
            9: ['pink', 'black', 'white', 'zebra', 'rainbow'],
            10: ['black', 'white', 'zebra', 'rainbow', 'ceramic']
        };

        return roundData[this.round] || roundData[10];
    }

    startRound() {
        this.bloonsInRound = 0;
        this.totalBloonsInRound = this.round * 5 + 10; // More bloons per round
        this.bloonSpawnTimer = 0;
    }

    addMoney(amount) {
        this.money += amount;
        this.updateUI();
    }

    loseLife(amount = 1) {
        this.lives -= amount;
        this.updateUI();
        
        if (this.lives <= 0) {
            this.gameOver();
        }
    }

    gameOver() {
        alert('Game Over! You lost all your lives!');
        // Reset game or show game over screen
    }

    updateUI() {
        const moneyElement = document.getElementById('money');
        const livesElement = document.getElementById('lives');
        const roundElement = document.getElementById('round');

        if (moneyElement) moneyElement.textContent = `$${this.money}`;
        if (livesElement) livesElement.textContent = `❤️ ${this.lives}`;
        if (roundElement) roundElement.textContent = `Round ${this.round}`;
    }
}

class Projectile {
    constructor(position, target, speed, damage, type = 'dart') {
        this.position = position.clone();
        this.target = target;
        this.speed = speed;
        this.damage = damage;
        this.type = type;
        this.isActive = true;
        this.lifetime = 2000; // 2 seconds
        this.age = 0;
    }

    update(deltaTime) {
        this.age += deltaTime;
        if (this.age >= this.lifetime) {
            this.isActive = false;
            return;
        }

        const direction = this.target.subtract(this.position).normalize();
        this.position = this.position.add(direction.multiply(this.speed * deltaTime / 1000));

        // Check if projectile hit target
        if (this.position.distance(this.target) < 10) {
            this.isActive = false;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.getColor();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    getColor() {
        switch (this.type) {
            case 'dart': return '#333';
            case 'tack': return '#FF6B35';
            case 'bomb': return '#800000';
            case 'ice': return '#00FFFF';
            default: return '#333';
        }
    }
}

class Effect {
    constructor(position, type, duration = 1000) {
        this.position = position.clone();
        this.type = type;
        this.duration = duration;
        this.age = 0;
        this.isActive = true;
    }

    update(deltaTime) {
        this.age += deltaTime;
        if (this.age >= this.duration) {
            this.isActive = false;
        }
    }

    draw(ctx) {
        const progress = this.age / this.duration;
        const alpha = 1 - progress;
        const scale = 1 + progress;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(scale, scale);

        switch (this.type) {
            case 'pop':
                ctx.fillStyle = '#FF6B35';
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'freeze':
                ctx.fillStyle = '#00FFFF';
                ctx.beginPath();
                ctx.arc(0, 0, 15, 0, Math.PI * 2);
                ctx.fill();
                break;
        }

        ctx.restore();
    }
} 