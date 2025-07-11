// Game Modes system for Bloons TD 6
class GameMode {
    constructor(name, description, rules = {}) {
        this.name = name;
        this.description = description;
        this.rules = {
            startingMoney: 650,
            startingLives: 150,
            incomeMultiplier: 1.0,
            bloonSpeedMultiplier: 1.0,
            bloonHealthMultiplier: 1.0,
            towerCostMultiplier: 1.0,
            sellMultiplier: 0.7,
            maxTowers: Infinity,
            maxHeroes: 1,
            allowPowers: true,
            allowInstaMonkeys: true,
            allowContinues: true,
            ...rules
        };
    }

    applyRules(gameState) {
        gameState.money = this.rules.startingMoney;
        gameState.lives = this.rules.startingLives;
        gameState.incomeMultiplier = this.rules.incomeMultiplier;
        gameState.bloonSpeedMultiplier = this.rules.bloonSpeedMultiplier;
        gameState.bloonHealthMultiplier = this.rules.bloonHealthMultiplier;
        gameState.towerCostMultiplier = this.rules.towerCostMultiplier;
        gameState.sellMultiplier = this.rules.sellMultiplier;
        gameState.maxTowers = this.rules.maxTowers;
        gameState.maxHeroes = this.rules.maxHeroes;
        gameState.allowPowers = this.rules.allowPowers;
        gameState.allowInstaMonkeys = this.rules.allowInstaMonkeys;
        gameState.allowContinues = this.rules.allowContinues;
    }
}

class GameModeManager {
    constructor() {
        this.gameModes = this.createGameModes();
        this.currentMode = this.gameModes[0];
    }

    createGameModes() {
        return [
            // Standard Modes
            new GameMode(
                "Easy",
                "Standard difficulty with normal bloon health and speed",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0
                }
            ),
            new GameMode(
                "Medium",
                "Increased difficulty with faster and stronger bloons",
                {
                    startingMoney: 650,
                    startingLives: 100,
                    incomeMultiplier: 0.85,
                    bloonSpeedMultiplier: 1.2,
                    bloonHealthMultiplier: 1.5
                }
            ),
            new GameMode(
                "Hard",
                "High difficulty with much stronger and faster bloons",
                {
                    startingMoney: 650,
                    startingLives: 80,
                    incomeMultiplier: 0.7,
                    bloonSpeedMultiplier: 1.4,
                    bloonHealthMultiplier: 2.0
                }
            ),

            // Special Modes
            new GameMode(
                "Impoppable",
                "Extreme difficulty - no continues, no powers, no insta-monkeys",
                {
                    startingMoney: 650,
                    startingLives: 1,
                    incomeMultiplier: 0.5,
                    bloonSpeedMultiplier: 1.6,
                    bloonHealthMultiplier: 2.5,
                    allowPowers: false,
                    allowInstaMonkeys: false,
                    allowContinues: false
                }
            ),
            new GameMode(
                "CHIMPS",
                "C.H.I.M.P.S. - No continues, no income, no powers, no insta-monkeys, no selling",
                {
                    startingMoney: 650,
                    startingLives: 1,
                    incomeMultiplier: 0.0,
                    bloonSpeedMultiplier: 1.8,
                    bloonHealthMultiplier: 3.0,
                    allowPowers: false,
                    allowInstaMonkeys: false,
                    allowContinues: false,
                    sellMultiplier: 0.0
                }
            ),
            new GameMode(
                "Half Cash",
                "Half starting money, normal difficulty",
                {
                    startingMoney: 325,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0
                }
            ),
            new GameMode(
                "Apopalypse",
                "No income, bloons come continuously",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 0.0,
                    bloonSpeedMultiplier: 1.2,
                    bloonHealthMultiplier: 1.5
                }
            ),
            new GameMode(
                "Alternate Bloons Rounds",
                "Alternate bloon types each round",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0
                }
            ),
            new GameMode(
                "Reverse",
                "Bloons travel backwards through the track",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0
                }
            ),
            new GameMode(
                "Military Only",
                "Only military towers allowed",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0,
                    maxTowers: 0 // Will be handled by tower restrictions
                }
            ),
            new GameMode(
                "Magic Monkeys Only",
                "Only magic towers allowed",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0,
                    maxTowers: 0 // Will be handled by tower restrictions
                }
            ),
            new GameMode(
                "Double HP MOABs",
                "MOAB-class bloons have double health",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0
                }
            ),
            new GameMode(
                "Fast Cooldowns",
                "All tower cooldowns are reduced",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0
                }
            ),
            new GameMode(
                "Monkey Teams",
                "Only specific tower types allowed",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0,
                    maxTowers: 0 // Will be handled by tower restrictions
                }
            ),

            // Boss Events
            new GameMode(
                "Boss Event",
                "Special boss bloons appear at specific rounds",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0
                }
            ),

            // Odyssey
            new GameMode(
                "Odyssey",
                "Multi-map challenge with shared resources",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0
                }
            ),

            // Daily Challenges
            new GameMode(
                "Daily Challenge",
                "Special daily challenge with unique rules",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0
                }
            ),

            // Collection Events
            new GameMode(
                "Collection Event",
                "Seasonal event with special rewards",
                {
                    startingMoney: 650,
                    startingLives: 150,
                    incomeMultiplier: 1.0,
                    bloonSpeedMultiplier: 1.0,
                    bloonHealthMultiplier: 1.0
                }
            )
        ];
    }

    getModeByName(name) {
        return this.gameModes.find(mode => mode.name === name);
    }

    getModesByCategory(category) {
        const categories = {
            'standard': ['Easy', 'Medium', 'Hard'],
            'special': ['Impoppable', 'CHIMPS', 'Half Cash', 'Apopalypse', 'Alternate Bloons Rounds', 'Reverse'],
            'restricted': ['Military Only', 'Magic Monkeys Only', 'Monkey Teams'],
            'events': ['Boss Event', 'Odyssey', 'Daily Challenge', 'Collection Event']
        };
        
        if (categories[category]) {
            return this.gameModes.filter(mode => categories[category].includes(mode.name));
        }
        return [];
    }

    setCurrentMode(modeName) {
        const mode = this.getModeByName(modeName);
        if (mode) {
            this.currentMode = mode;
            return true;
        }
        return false;
    }

    applyCurrentMode(gameState) {
        this.currentMode.applyRules(gameState);
    }
} 