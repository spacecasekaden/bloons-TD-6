// Powers system for Bloons TD 6
class Power {
    constructor(name, description, cost, cooldown, effect) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.cooldown = cooldown;
        this.effect = effect;
        this.currentCooldown = 0;
        this.isActive = false;
    }

    canUse(gameState) {
        return this.currentCooldown <= 0 && gameState.money >= this.cost;
    }

    use(gameState) {
        if (this.canUse(gameState)) {
            gameState.addMoney(-this.cost);
            this.currentCooldown = this.cooldown;
            this.effect(gameState);
            return true;
        }
        return false;
    }

    update(deltaTime) {
        if (this.currentCooldown > 0) {
            this.currentCooldown -= deltaTime;
        }
    }
}

class PowerManager {
    constructor() {
        this.powers = this.createPowers();
        this.activePowers = [];
    }

    createPowers() {
        return [
            // Instant Powers
            new Power(
                "Cash Drop",
                "Instantly gain $2000",
                100,
                0,
                (gameState) => gameState.addMoney(2000)
            ),
            new Power(
                "Monkey Boost",
                "All towers attack 50% faster for 10 seconds",
                200,
                30000,
                (gameState) => {
                    gameState.towers.forEach(tower => {
                        tower.attackSpeed *= 1.5;
                    });
                    setTimeout(() => {
                        gameState.towers.forEach(tower => {
                            tower.attackSpeed /= 1.5;
                        });
                    }, 10000);
                }
            ),
            new Power(
                "Camo Trap",
                "Reveals all camo bloons for 10 seconds",
                150,
                45000,
                (gameState) => {
                    gameState.bloons.forEach(bloon => {
                        if (bloon.isCamo) {
                            bloon.isCamo = false;
                        }
                    });
                }
            ),
            new Power(
                "Road Spikes",
                "Places spikes that damage bloons",
                100,
                60000,
                (gameState) => {
                    // Add road spikes effect
                }
            ),
            new Power(
                "Glue Trap",
                "Slows all bloons for 10 seconds",
                150,
                45000,
                (gameState) => {
                    gameState.bloons.forEach(bloon => {
                        bloon.speed *= 0.5;
                    });
                    setTimeout(() => {
                        gameState.bloons.forEach(bloon => {
                            bloon.speed *= 2;
                        });
                    }, 10000);
                }
            ),
            new Power(
                "Banana Farm",
                "Instantly gain $500",
                50,
                0,
                (gameState) => gameState.addMoney(500)
            ),
            new Power(
                "Monkey Buccaneer",
                "Summons a temporary Monkey Buccaneer",
                300,
                60000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Monkey Ace",
                "Summons a temporary Monkey Ace",
                400,
                90000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Dart Monkey",
                "Summons a temporary Dart Monkey",
                100,
                30000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Boomerang Monkey",
                "Summons a temporary Boomerang Monkey",
                150,
                45000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Bomb Tower",
                "Summons a temporary Bomb Tower",
                200,
                60000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Tack Shooter",
                "Summons a temporary Tack Shooter",
                150,
                45000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Ice Tower",
                "Summons a temporary Ice Tower",
                200,
                60000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Glue Gunner",
                "Summons a temporary Glue Gunner",
                150,
                45000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Sniper Monkey",
                "Summons a temporary Sniper Monkey",
                200,
                60000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Monkey Sub",
                "Summons a temporary Monkey Sub",
                250,
                75000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Monkey Village",
                "Summons a temporary Monkey Village",
                300,
                90000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Super Monkey",
                "Summons a temporary Super Monkey",
                500,
                120000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Ninja Monkey",
                "Summons a temporary Ninja Monkey",
                200,
                60000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Alchemist",
                "Summons a temporary Alchemist",
                250,
                75000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Druid",
                "Summons a temporary Druid",
                200,
                60000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Banana Farm",
                "Summons a temporary Banana Farm",
                150,
                45000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Engineer Monkey",
                "Summons a temporary Engineer Monkey",
                300,
                90000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Spike Factory",
                "Summons a temporary Spike Factory",
                250,
                75000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Monkey Village",
                "Summons a temporary Monkey Village",
                300,
                90000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Heli Pilot",
                "Summons a temporary Heli Pilot",
                400,
                120000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Mortar Monkey",
                "Summons a temporary Mortar Monkey",
                300,
                90000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Dartling Gunner",
                "Summons a temporary Dartling Gunner",
                350,
                105000,
                (gameState) => {
                    // Add temporary tower
                }
            ),
            new Power(
                "Wizard Monkey",
                "Summons a temporary Wizard Monkey",
                200,
                60000,
                (gameState) => {
                    // Add temporary tower
                }
            )
        ];
    }

    getPowerByName(name) {
        return this.powers.find(power => power.name === name);
    }

    usePower(powerName, gameState) {
        const power = this.getPowerByName(powerName);
        if (power) {
            return power.use(gameState);
        }
        return false;
    }

    update(deltaTime) {
        this.powers.forEach(power => power.update(deltaTime));
    }
} 