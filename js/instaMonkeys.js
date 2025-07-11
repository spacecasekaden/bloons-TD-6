// Insta-Monkeys system for Bloons TD 6
class InstaMonkey {
    constructor(towerType, tier, rarity) {
        this.towerType = towerType;
        this.tier = tier; // 0-5, represents upgrade tier
        this.rarity = rarity; // 'common', 'uncommon', 'rare', 'epic', 'legendary'
        this.isUsed = false;
        this.towerInfo = TowerFactory.getTowerInfo(towerType);
    }

    getDisplayName() {
        const tierNames = ['', 'I', 'II', 'III', 'IV', 'V'];
        return `${this.towerInfo.name} ${tierNames[this.tier]}`;
    }

    getRarityColor() {
        switch (this.rarity) {
            case 'common': return '#FFFFFF';
            case 'uncommon': return '#00FF00';
            case 'rare': return '#0080FF';
            case 'epic': return '#8000FF';
            case 'legendary': return '#FF8000';
            default: return '#FFFFFF';
        }
    }

    use(gameState, position) {
        if (!this.isUsed) {
            const tower = TowerFactory.createTower(this.towerType, position);
            
            // Apply tier upgrades
            for (let i = 0; i < this.tier; i++) {
                tower.upgrade();
            }
            
            gameState.towers.push(tower);
            this.isUsed = true;
            return true;
        }
        return false;
    }
}

class InstaMonkeyManager {
    constructor() {
        this.instaMonkeys = [];
        this.rarityChances = {
            'common': 0.6,
            'uncommon': 0.25,
            'rare': 0.1,
            'epic': 0.04,
            'legendary': 0.01
        };
    }

    addInstaMonkey(towerType, tier, rarity) {
        const instaMonkey = new InstaMonkey(towerType, tier, rarity);
        this.instaMonkeys.push(instaMonkey);
        return instaMonkey;
    }

    generateRandomInstaMonkey() {
        const towerTypes = [
            'dartMonkey', 'boomerangMonkey', 'bombTower', 'tackShooter', 'iceTower',
            'glueGunner', 'sniperMonkey', 'monkeySub', 'monkeyBuccaneer', 'monkeyAce',
            'heliPilot', 'mortarMonkey', 'dartlingGunner', 'wizardMonkey', 'superMonkey',
            'ninjaMonkey', 'alchemist', 'druid', 'bananaFarm', 'spikeFactory',
            'monkeyVillage', 'engineerMonkey'
        ];

        const towerType = towerTypes[Math.floor(Math.random() * towerTypes.length)];
        const tier = Math.floor(Math.random() * 6); // 0-5
        const rarity = this.getRandomRarity();

        return this.addInstaMonkey(towerType, tier, rarity);
    }

    getRandomRarity() {
        const rand = Math.random();
        let cumulative = 0;
        
        for (const [rarity, chance] of Object.entries(this.rarityChances)) {
            cumulative += chance;
            if (rand <= cumulative) {
                return rarity;
            }
        }
        
        return 'common';
    }

    getAvailableInstaMonkeys() {
        return this.instaMonkeys.filter(insta => !insta.isUsed);
    }

    useInstaMonkey(index, gameState, position) {
        const available = this.getAvailableInstaMonkeys();
        if (index >= 0 && index < available.length) {
            return available[index].use(gameState, position);
        }
        return false;
    }

    // Collection events and rewards
    addCollectionReward(towerType, tier, rarity) {
        return this.addInstaMonkey(towerType, tier, rarity);
    }

    // Daily challenges
    addDailyChallengeReward(towerType, tier, rarity) {
        return this.addInstaMonkey(towerType, tier, rarity);
    }

    // Boss events
    addBossEventReward(towerType, tier, rarity) {
        return this.addInstaMonkey(towerType, tier, rarity);
    }

    // Odyssey rewards
    addOdysseyReward(towerType, tier, rarity) {
        return this.addInstaMonkey(towerType, tier, rarity);
    }
} 