// Achievements system for Bloons TD 6
class Achievement {
    constructor(id, name, description, requirement, reward = null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.requirement = requirement;
        this.reward = reward;
        this.isCompleted = false;
        this.progress = 0;
        this.maxProgress = 1;
    }

    checkCompletion(gameState) {
        if (this.isCompleted) return false;
        
        const result = this.requirement(gameState);
        if (typeof result === 'object') {
            this.progress = result.current;
            this.maxProgress = result.max;
            if (result.current >= result.max) {
                this.complete();
                return true;
            }
        } else if (result) {
            this.progress = 1;
            this.complete();
            return true;
        }
        return false;
    }

    complete() {
        this.isCompleted = true;
        this.progress = this.maxProgress;
        if (this.reward) {
            this.reward();
        }
    }
}

class AchievementManager {
    constructor() {
        this.achievements = this.createAchievements();
        this.completedCount = 0;
    }

    createAchievements() {
        return [
            // Game Progress Achievements
            new Achievement(
                'first_win',
                'First Victory',
                'Complete your first game',
                (gameState) => gameState.round >= 40
            ),
            new Achievement(
                'round_100',
                'Century',
                'Reach round 100',
                (gameState) => gameState.round >= 100
            ),
            new Achievement(
                'round_200',
                'Double Century',
                'Reach round 200',
                (gameState) => gameState.round >= 200
            ),
            new Achievement(
                'round_500',
                'Half Millennium',
                'Reach round 500',
                (gameState) => gameState.round >= 500
            ),
            new Achievement(
                'round_1000',
                'Millennium',
                'Reach round 1000',
                (gameState) => gameState.round >= 1000
            ),

            // Tower Achievements
            new Achievement(
                'all_towers',
                'Tower Master',
                'Place every type of tower',
                (gameState) => {
                    const towerTypes = new Set(gameState.towers.map(t => t.type));
                    return towerTypes.size >= 22;
                }
            ),
            new Achievement(
                'max_upgrade',
                'Fully Upgraded',
                'Fully upgrade a tower',
                (gameState) => gameState.towers.some(t => t.level >= 5)
            ),
            new Achievement(
                'all_max_upgrades',
                'Perfectionist',
                'Fully upgrade all tower types',
                (gameState) => {
                    const maxUpgradedTypes = new Set(
                        gameState.towers.filter(t => t.level >= 5).map(t => t.type)
                    );
                    return maxUpgradedTypes.size >= 22;
                }
            ),

            // Hero Achievements
            new Achievement(
                'hero_level_20',
                'Heroic',
                'Get a hero to level 20',
                (gameState) => gameState.heroes.some(h => h.level >= 20)
            ),
            new Achievement(
                'all_heroes',
                'Hero Collector',
                'Unlock all heroes',
                (gameState) => gameState.heroes.length >= 14
            ),

            // Bloon Achievements
            new Achievement(
                'pop_10000',
                'Popper',
                'Pop 10,000 bloons',
                (gameState) => ({
                    current: gameState.totalBloonsPopped,
                    max: 10000
                })
            ),
            new Achievement(
                'pop_100000',
                'Master Popper',
                'Pop 100,000 bloons',
                (gameState) => ({
                    current: gameState.totalBloonsPopped,
                    max: 100000
                })
            ),
            new Achievement(
                'pop_1000000',
                'Legendary Popper',
                'Pop 1,000,000 bloons',
                (gameState) => ({
                    current: gameState.totalBloonsPopped,
                    max: 1000000
                })
            ),

            // Money Achievements
            new Achievement(
                'earn_10000',
                'Rich',
                'Earn $10,000 in a single game',
                (gameState) => gameState.totalMoneyEarned >= 10000
            ),
            new Achievement(
                'earn_100000',
                'Millionaire',
                'Earn $100,000 in a single game',
                (gameState) => gameState.totalMoneyEarned >= 100000
            ),

            // Game Mode Achievements
            new Achievement(
                'chimps_win',
                'CHIMPS Master',
                'Complete a CHIMPS game',
                (gameState) => gameState.currentMode === 'CHIMPS' && gameState.round >= 100
            ),
            new Achievement(
                'impoppable_win',
                'Impoppable',
                'Complete an Impoppable game',
                (gameState) => gameState.currentMode === 'Impoppable' && gameState.round >= 100
            ),

            // Map Achievements
            new Achievement(
                'all_maps',
                'Explorer',
                'Play on all maps',
                (gameState) => gameState.mapsPlayed.size >= 20
            ),
            new Achievement(
                'expert_maps',
                'Expert',
                'Complete all expert maps',
                (gameState) => gameState.expertMapsCompleted >= 5
            ),

            // Special Achievements
            new Achievement(
                'no_towers',
                'Naked Apes',
                'Complete a game without placing any towers',
                (gameState) => gameState.towers.length === 0 && gameState.round >= 40
            ),
            new Achievement(
                'one_tower',
                'Solo',
                'Complete a game with only one tower',
                (gameState) => gameState.towers.length === 1 && gameState.round >= 40
            ),
            new Achievement(
                'no_heroes',
                'Hero-less',
                'Complete a game without using heroes',
                (gameState) => gameState.heroes.length === 0 && gameState.round >= 40
            ),
            new Achievement(
                'no_upgrades',
                'Basic',
                'Complete a game without upgrading any towers',
                (gameState) => gameState.towers.every(t => t.level === 1) && gameState.round >= 40
            ),

            // Collection Achievements
            new Achievement(
                'insta_collector',
                'Collector',
                'Collect 100 insta-monkeys',
                (gameState) => ({
                    current: gameState.instaMonkeysCollected,
                    max: 100
                })
            ),
            new Achievement(
                'rare_insta',
                'Lucky',
                'Collect a legendary insta-monkey',
                (gameState) => gameState.hasLegendaryInsta
            ),

            // Daily Challenge Achievements
            new Achievement(
                'daily_streak',
                'Dedicated',
                'Complete 7 daily challenges in a row',
                (gameState) => ({
                    current: gameState.dailyStreak,
                    max: 7
                })
            ),
            new Achievement(
                'daily_master',
                'Daily Master',
                'Complete 30 daily challenges',
                (gameState) => ({
                    current: gameState.dailiesCompleted,
                    max: 30
                })
            ),

            // Boss Event Achievements
            new Achievement(
                'boss_slayer',
                'Boss Slayer',
                'Defeat a boss bloon',
                (gameState) => gameState.bossesDefeated >= 1
            ),
            new Achievement(
                'boss_master',
                'Boss Master',
                'Defeat all boss types',
                (gameState) => gameState.bossTypesDefeated >= 5
            ),

            // Odyssey Achievements
            new Achievement(
                'odyssey_complete',
                'Odyssey Master',
                'Complete an odyssey',
                (gameState) => gameState.odysseysCompleted >= 1
            ),
            new Achievement(
                'odyssey_perfect',
                'Perfect Odyssey',
                'Complete an odyssey without losing any lives',
                (gameState) => gameState.perfectOdysseys >= 1
            ),

            // Power Achievements
            new Achievement(
                'power_user',
                'Power User',
                'Use 50 powers',
                (gameState) => ({
                    current: gameState.powersUsed,
                    max: 50
                })
            ),
            new Achievement(
                'no_powers',
                'Natural',
                'Complete a game without using any powers',
                (gameState) => gameState.powersUsed === 0 && gameState.round >= 40
            ),

            // Speed Achievements
            new Achievement(
                'speed_demon',
                'Speed Demon',
                'Complete 40 rounds in under 10 minutes',
                (gameState) => gameState.round >= 40 && gameState.gameTime < 600000
            ),
            new Achievement(
                'marathon',
                'Marathon',
                'Play a game for over 2 hours',
                (gameState) => gameState.gameTime > 7200000
            )
        ];
    }

    checkAchievements(gameState) {
        let newlyCompleted = 0;
        this.achievements.forEach(achievement => {
            if (achievement.checkCompletion(gameState)) {
                newlyCompleted++;
                this.completedCount++;
                this.showAchievementNotification(achievement);
            }
        });
        return newlyCompleted;
    }

    showAchievementNotification(achievement) {
        // Create notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #FFD700, #FFA500);
            color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.5s ease-out;
        `;
        notification.innerHTML = `
            <h4>🏆 Achievement Unlocked!</h4>
            <p><strong>${achievement.name}</strong></p>
            <p>${achievement.description}</p>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-in';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    getProgress() {
        return {
            completed: this.completedCount,
            total: this.achievements.length,
            percentage: Math.round((this.completedCount / this.achievements.length) * 100)
        };
    }

    getAchievementsByCategory(category) {
        const categories = {
            'progress': ['first_win', 'round_100', 'round_200', 'round_500', 'round_1000'],
            'towers': ['all_towers', 'max_upgrade', 'all_max_upgrades'],
            'heroes': ['hero_level_20', 'all_heroes'],
            'bloons': ['pop_10000', 'pop_100000', 'pop_1000000'],
            'money': ['earn_10000', 'earn_100000'],
            'modes': ['chimps_win', 'impoppable_win'],
            'maps': ['all_maps', 'expert_maps'],
            'special': ['no_towers', 'one_tower', 'no_heroes', 'no_upgrades'],
            'collection': ['insta_collector', 'rare_insta'],
            'daily': ['daily_streak', 'daily_master'],
            'boss': ['boss_slayer', 'boss_master'],
            'odyssey': ['odyssey_complete', 'odyssey_perfect'],
            'powers': ['power_user', 'no_powers'],
            'speed': ['speed_demon', 'marathon']
        };
        
        if (categories[category]) {
            return this.achievements.filter(achievement => 
                categories[category].includes(achievement.id)
            );
        }
        return [];
    }
} 