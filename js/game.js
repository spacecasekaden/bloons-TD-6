// Main game engine and rendering

class GameEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gameState = new GameState();
        this.lastTime = 0;
        this.isRunning = false;
        this.selectedTower = null;
        this.placingTower = false;
        this.towerToPlace = null;
        
        // Initialize all systems
        this.mapManager = new MapManager();
        this.gameModeManager = new GameModeManager();
        this.powerManager = new PowerManager();
        this.instaMonkeyManager = new InstaMonkeyManager();
        this.achievementManager = new AchievementManager();
        this.bossEventManager = new BossEventManager();
        this.soundManager = new SoundManager();
        
        // Apply current game mode
        this.gameModeManager.applyCurrentMode(this.gameState);
        
        this.setupEventListeners();
        this.setupUI();
    }

    setupEventListeners() {
        // Canvas click events
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Tower selection
        document.querySelectorAll('.tower-option').forEach(option => {
            option.addEventListener('click', (e) => this.handleTowerSelection(e));
        });

        // Game controls
        document.getElementById('start-round').addEventListener('click', () => this.startRound());
        document.getElementById('pause-game').addEventListener('click', () => this.togglePause());
        document.getElementById('fast-forward').addEventListener('click', () => this.toggleFastForward());
    }

    setupUI() {
        this.gameState.updateUI();
    }

    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const clickPos = new Vector2(x, y);

        if (this.placingTower) {
            this.placeTower(clickPos);
        } else {
            this.selectTowerAt(clickPos);
        }
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (this.placingTower) {
            this.updateTowerPreview(x, y);
        }
    }

    handleTowerSelection(e) {
        const towerType = e.currentTarget.dataset.tower;
        const towerInfo = TowerFactory.getTowerInfo(towerType);
        
        if (this.gameState.money >= towerInfo.cost) {
            this.placingTower = true;
            this.towerToPlace = towerType;
            this.canvas.style.cursor = 'crosshair';
            
            // Update UI
            document.querySelectorAll('.tower-option').forEach(opt => opt.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
        } else {
            alert('Not enough money!');
        }
    }

    placeTower(position) {
        if (!this.placingTower || !this.towerToPlace) return;

        const towerInfo = TowerFactory.getTowerInfo(this.towerToPlace);
        
        // Check if position is valid (not on path)
        if (this.isValidTowerPosition(position)) {
            const tower = TowerFactory.createTower(this.towerToPlace, position);
            this.gameState.towers.push(tower);
            this.gameState.addMoney(-towerInfo.cost);
            
            this.placingTower = false;
            this.towerToPlace = null;
            this.canvas.style.cursor = 'default';
            
            // Clear selection
            document.querySelectorAll('.tower-option').forEach(opt => opt.classList.remove('selected'));
        } else {
            alert('Cannot place tower on the path!');
        }
    }

    isValidTowerPosition(position) {
        // Check if position is too close to the path
        for (let i = 0; i < this.gameState.path.length - 1; i++) {
            const pathPoint = this.gameState.path[i];
            const distance = position.distance(pathPoint);
            if (distance < 40) { // Minimum distance from path
                return false;
            }
        }
        return true;
    }

    selectTowerAt(position) {
        // Find tower at position
        const tower = this.gameState.towers.find(t => {
            const distance = position.distance(t.position);
            return distance < 25; // Tower radius
        });

        if (tower) {
            this.selectedTower = tower;
            this.showTowerUpgradeMenu(tower);
        } else {
            this.selectedTower = null;
            this.hideTowerUpgradeMenu();
        }
    }

    showTowerUpgradeMenu(tower) {
        // Create or update upgrade menu
        let menu = document.getElementById('tower-upgrade-menu');
        if (!menu) {
            menu = document.createElement('div');
            menu.id = 'tower-upgrade-menu';
            menu.style.cssText = `
                position: absolute;
                background: white;
                border: 2px solid #FF6B35;
                border-radius: 8px;
                padding: 10px;
                z-index: 1000;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            `;
            document.body.appendChild(menu);
        }

        const towerInfo = TowerFactory.getTowerInfo(tower.type);
        menu.innerHTML = `
            <h4>${towerInfo.name} (Level ${tower.level})</h4>
            <p>Damage: ${tower.damage}</p>
            <p>Range: ${tower.range}</p>
            <p>Attack Speed: ${Math.round(1000 / tower.attackSpeed)}/sec</p>
            ${tower.canUpgrade(this.gameState) ? 
                `<button onclick="game.upgradeTower()">Upgrade ($${tower.upgradeCost})</button>` : 
                '<p style="color: red;">Not enough money for upgrade</p>'
            }
            <button onclick="game.sellTower()">Sell ($${Math.floor(tower.cost * 0.7)})</button>
        `;

        // Position menu near tower
        const rect = this.canvas.getBoundingClientRect();
        menu.style.left = (rect.left + tower.position.x + 30) + 'px';
        menu.style.top = (rect.top + tower.position.y - 50) + 'px';
    }

    hideTowerUpgradeMenu() {
        const menu = document.getElementById('tower-upgrade-menu');
        if (menu) {
            menu.remove();
        }
    }

    upgradeTower() {
        if (this.selectedTower && this.selectedTower.canUpgrade(this.gameState)) {
            this.gameState.addMoney(-this.selectedTower.upgradeCost);
            this.selectedTower.upgrade();
            this.showTowerUpgradeMenu(this.selectedTower);
        }
    }

    sellTower() {
        if (this.selectedTower) {
            const sellValue = Math.floor(this.selectedTower.cost * 0.7);
            this.gameState.addMoney(sellValue);
            
            const index = this.gameState.towers.indexOf(this.selectedTower);
            if (index > -1) {
                this.gameState.towers.splice(index, 1);
            }
            
            this.selectedTower = null;
            this.hideTowerUpgradeMenu();
        }
    }

    updateTowerPreview(x, y) {
        // This would update a preview of where the tower would be placed
        // For now, we'll just update the cursor position
    }

    startRound() {
        this.gameState.startRound();
        document.getElementById('start-round').disabled = true;
    }

    togglePause() {
        this.gameState.isPaused = !this.gameState.isPaused;
        const button = document.getElementById('pause-game');
        button.textContent = this.gameState.isPaused ? 'Resume' : 'Pause';
    }

    toggleFastForward() {
        this.gameState.isFastForward = !this.gameState.isFastForward;
        const button = document.getElementById('fast-forward');
        button.textContent = this.gameState.isFastForward ? 'Normal Speed' : 'Fast Forward';
    }

    start() {
        this.isRunning = true;
        this.gameLoop();
    }

    stop() {
        this.isRunning = false;
    }

    gameLoop(currentTime = 0) {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Update all systems
        this.gameState.update(deltaTime);
        this.powerManager.update(deltaTime);
        this.bossEventManager.update(deltaTime, this.gameState);
        this.achievementManager.checkAchievements(this.gameState);

        // Check if round is complete
        if (this.gameState.bloonsInRound >= this.gameState.totalBloonsInRound && 
            this.gameState.bloons.filter(b => b.isActive).length === 0) {
            this.completeRound();
        }

        // Render
        this.render();

        // Continue loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    completeRound() {
        this.gameState.round++;
        this.gameState.addMoney(100 + this.gameState.round * 10); // Round bonus
        document.getElementById('start-round').disabled = false;
        this.gameState.updateUI();
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw current map
        this.mapManager.currentMap.draw(this.ctx);

        // Draw towers
        this.gameState.towers.forEach(tower => tower.draw(this.ctx));

        // Draw heroes
        this.gameState.heroes.forEach(hero => hero.draw(this.ctx));

        // Draw bloons
        this.gameState.bloons.forEach(bloon => bloon.draw(this.ctx));

        // Draw projectiles
        this.gameState.projectiles.forEach(projectile => projectile.draw(this.ctx));

        // Draw effects
        this.gameState.effects.forEach(effect => effect.draw(this.ctx));

        // Draw bosses
        this.gameState.bosses.forEach(boss => boss.draw(this.ctx));

        // Draw tower preview if placing
        if (this.placingTower) {
            this.drawTowerPreview();
        }

        // Draw UI overlays
        this.drawUI();
    }

    drawUI() {
        // Draw game mode indicator
        this.ctx.save();
        this.ctx.fillStyle = '#FF6B35';
        this.ctx.font = '16px Arial';
        this.ctx.fillText(`Mode: ${this.gameModeManager.currentMode.name}`, 10, 30);
        this.ctx.fillText(`Map: ${this.mapManager.currentMap.name}`, 10, 50);
        this.ctx.restore();

        // Draw achievement progress
        const progress = this.achievementManager.getProgress();
        this.ctx.save();
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`Achievements: ${progress.completed}/${progress.total} (${progress.percentage}%)`, 10, 70);
        this.ctx.restore();
    }

    drawTowerPreview() {
        // Draw preview of tower being placed
        this.ctx.save();
        this.ctx.globalAlpha = 0.7;
        this.ctx.fillStyle = '#FF6B35';
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 20, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
} 