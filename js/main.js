// Main entry point for the game

let game;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('Canvas not found!');
        return;
    }

    // Initialize game
    game = new GameEngine(canvas);
    
    // Start the game loop
    game.start();
    
    console.log('Bloons TD 6 game started!');
    
    // Add some helpful instructions
    showInstructions();
    
    // Setup additional event listeners for new systems
    setupAdditionalEventListeners();
});

function showInstructions() {
    setTimeout(() => {
        const instructions = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border: 3px solid #FF6B35;
                border-radius: 15px;
                padding: 20px;
                z-index: 10000;
                max-width: 400px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            ">
                <h3 style="color: #FF6B35; margin-bottom: 15px;">Welcome to Bloons TD 6!</h3>
                <p><strong>How to play:</strong></p>
                <ul style="text-align: left;">
                    <li>Click on a tower to select it</li>
                    <li>Click on the game area to place the tower</li>
                    <li>Click on placed towers to upgrade or sell them</li>
                    <li>Click "Start Round" to begin the wave</li>
                    <li>Use "Pause" and "Fast Forward" to control game speed</li>
                </ul>
                <p><strong>Towers:</strong></p>
                <ul style="text-align: left;">
                    <li><strong>Dart Monkey:</strong> Basic tower with piercing darts</li>
                    <li><strong>Tack Shooter:</strong> Fires tacks in 8 directions</li>
                    <li><strong>Bomb Tower:</strong> Explosive area damage</li>
                    <li><strong>Ice Tower:</strong> Freezes and slows bloons</li>
                </ul>
                <button onclick="this.parentElement.remove()" style="
                    background: #FF6B35;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 15px;
                ">Got it!</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', instructions);
    }, 1000);
}

// Global functions for tower upgrade menu
window.upgradeTower = function() {
    if (game) {
        game.upgradeTower();
    }
};

window.sellTower = function() {
    if (game) {
        game.sellTower();
    }
};

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (!game) return;
    
    switch(e.key) {
        case ' ':
            e.preventDefault();
            game.togglePause();
            break;
        case 'Enter':
            e.preventDefault();
            if (!game.gameState.isPaused) {
                game.startRound();
            }
            break;
        case 'Escape':
            e.preventDefault();
            game.hideTowerUpgradeMenu();
            game.placingTower = false;
            game.towerToPlace = null;
            game.canvas.style.cursor = 'default';
            document.querySelectorAll('.tower-option').forEach(opt => opt.classList.remove('selected'));
            break;
    }
});

// Add some visual feedback for tower placement
document.addEventListener('mousemove', (e) => {
    if (!game || !game.placingTower) return;
    
    const rect = game.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const position = new Vector2(x, y);
    
    // Update cursor based on valid placement
    if (game.isValidTowerPosition(position)) {
        game.canvas.style.cursor = 'crosshair';
    } else {
        game.canvas.style.cursor = 'not-allowed';
    }
});

// Add sound effects (optional)
function playSound(type) {
    // This would play sound effects
    // For now, we'll just log the sound type
    console.log(`Playing sound: ${type}`);
}

// Add particle effects for better visual feedback
function createParticleEffect(position, type) {
    if (!game) return;
    
    const effect = new Effect(position, type);
    game.gameState.effects.push(effect);
}

// Add some cheat codes for testing
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        if (game) {
            game.gameState.addMoney(1000);
            console.log('Added $1000 (cheat code)');
        }
    }
    
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        if (game) {
            game.gameState.lives = 999;
            game.gameState.updateUI();
            console.log('Set lives to 999 (cheat code)');
        }
    }
});

function setupAdditionalEventListeners() {
    // Map selection
    document.getElementById('change-map').addEventListener('click', () => {
        showMapSelection();
    });

    // Game mode selection
    document.getElementById('change-mode').addEventListener('click', () => {
        showGameModeSelection();
    });

    // Powers menu
    document.getElementById('powers-menu').addEventListener('click', () => {
        showPowersMenu();
    });

    // Insta-monkeys
    document.getElementById('insta-monkeys').addEventListener('click', () => {
        showInstaMonkeysMenu();
    });

    // Achievements
    document.getElementById('achievements').addEventListener('click', () => {
        showAchievementsMenu();
    });

    // Boss events
    document.getElementById('boss-events').addEventListener('click', () => {
        showBossEventsMenu();
    });

    // Sound toggle
    document.getElementById('sound-toggle').addEventListener('click', () => {
        const isEnabled = game.soundManager.toggleSound();
        document.getElementById('sound-toggle').textContent = isEnabled ? '🔊' : '🔇';
    });
}

function showMapSelection() {
    const maps = game.mapManager.maps;
    let mapList = 'Select a map:\n\n';
    maps.forEach((map, index) => {
        mapList += `${index + 1}. ${map.name} (${map.difficulty})\n`;
    });
    
    const selection = prompt(mapList);
    if (selection && !isNaN(selection)) {
        const mapIndex = parseInt(selection) - 1;
        if (mapIndex >= 0 && mapIndex < maps.length) {
            game.mapManager.setCurrentMap(maps[mapIndex].name);
            game.gameState.path = maps[mapIndex].path;
            alert(`Map changed to: ${maps[mapIndex].name}`);
        }
    }
}

function showGameModeSelection() {
    const modes = game.gameModeManager.gameModes;
    let modeList = 'Select a game mode:\n\n';
    modes.forEach((mode, index) => {
        modeList += `${index + 1}. ${mode.name} - ${mode.description}\n`;
    });
    
    const selection = prompt(modeList);
    if (selection && !isNaN(selection)) {
        const modeIndex = parseInt(selection) - 1;
        if (modeIndex >= 0 && modeIndex < modes.length) {
            game.gameModeManager.setCurrentMode(modes[modeIndex].name);
            game.gameModeManager.applyCurrentMode(game.gameState);
            alert(`Game mode changed to: ${modes[modeIndex].name}`);
        }
    }
}

function showPowersMenu() {
    const powers = game.powerManager.powers;
    let powerList = 'Available Powers:\n\n';
    powers.forEach((power, index) => {
        const cooldownText = power.currentCooldown > 0 ? ` (${Math.ceil(power.currentCooldown/1000)}s)` : '';
        powerList += `${index + 1}. ${power.name} - $${power.cost}${cooldownText}\n`;
    });
    
    const selection = prompt(powerList + '\nEnter power number to use (or cancel):');
    if (selection && !isNaN(selection)) {
        const powerIndex = parseInt(selection) - 1;
        if (powerIndex >= 0 && powerIndex < powers.length) {
            const power = powers[powerIndex];
            if (power.canUse(game.gameState)) {
                power.use(game.gameState);
                game.soundManager.onPowerActivate();
                alert(`${power.name} activated!`);
            } else {
                alert('Cannot use this power!');
            }
        }
    }
}

function showInstaMonkeysMenu() {
    const instaMonkeys = game.instaMonkeyManager.getAvailableInstaMonkeys();
    if (instaMonkeys.length === 0) {
        alert('No insta-monkeys available!');
        return;
    }
    
    let instaList = 'Available Insta-Monkeys:\n\n';
    instaMonkeys.forEach((insta, index) => {
        instaList += `${index + 1}. ${insta.getDisplayName()} (${insta.rarity})\n`;
    });
    
    const selection = prompt(instaList + '\nEnter number to use (or cancel):');
    if (selection && !isNaN(selection)) {
        const instaIndex = parseInt(selection) - 1;
        if (instaIndex >= 0 && instaIndex < instaMonkeys.length) {
            alert('Click where you want to place the insta-monkey!');
            game.placingInstaMonkey = true;
            game.instaMonkeyIndex = instaIndex;
        }
    }
}

function showAchievementsMenu() {
    const progress = game.achievementManager.getProgress();
    let achievementList = `Achievement Progress: ${progress.completed}/${progress.total} (${progress.percentage}%)\n\n`;
    
    const categories = ['progress', 'towers', 'heroes', 'bloons', 'money', 'modes', 'maps', 'special'];
    categories.forEach(category => {
        const achievements = game.achievementManager.getAchievementsByCategory(category);
        if (achievements.length > 0) {
            achievementList += `${category.toUpperCase()}:\n`;
            achievements.forEach(achievement => {
                const status = achievement.isCompleted ? '✅' : '❌';
                achievementList += `${status} ${achievement.name}\n`;
            });
            achievementList += '\n';
        }
    });
    
    alert(achievementList);
}

function showBossEventsMenu() {
    const events = game.bossEventManager.getAvailableEvents();
    if (events.length === 0) {
        alert('No boss events available!');
        return;
    }
    
    let eventList = 'Available Boss Events:\n\n';
    events.forEach((event, index) => {
        eventList += `${index + 1}. ${event.name}\n`;
    });
    
    const selection = prompt(eventList + '\nEnter event number to start (or cancel):');
    if (selection && !isNaN(selection)) {
        const eventIndex = parseInt(selection) - 1;
        if (eventIndex >= 0 && eventIndex < events.length) {
            const event = events[eventIndex];
            game.bossEventManager.startBossEvent(event.name, game.gameState);
            game.soundManager.onBossSpawn();
            alert(`${event.name} started! Boss will appear at round ${event.rounds[0]}`);
        }
    }
}

// Add auto-save functionality
setInterval(() => {
    if (game) {
        const saveData = {
            money: game.gameState.money,
            lives: game.gameState.lives,
            round: game.gameState.round,
            towers: game.gameState.towers.map(tower => ({
                type: tower.type,
                position: tower.position,
                level: tower.level
            }))
        };
        localStorage.setItem('bloonsTD6_save', JSON.stringify(saveData));
    }
}, 30000); // Save every 30 seconds

// Load save data on startup
window.addEventListener('load', () => {
    const saveData = localStorage.getItem('bloonsTD6_save');
    if (saveData && game) {
        try {
            const data = JSON.parse(saveData);
            game.gameState.money = data.money || 650;
            game.gameState.lives = data.lives || 100;
            game.gameState.round = data.round || 1;
            
            // Restore towers
            if (data.towers) {
                data.towers.forEach(towerData => {
                    const tower = TowerFactory.createTower(towerData.type, new Vector2(towerData.position.x, towerData.position.y));
                    tower.level = towerData.level;
                    game.gameState.towers.push(tower);
                });
            }
            
            game.gameState.updateUI();
            console.log('Game data loaded from save');
        } catch (e) {
            console.log('Could not load save data');
        }
    }
}); 