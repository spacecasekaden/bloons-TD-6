// Sound system for Bloons TD 6
class SoundManager {
    constructor() {
        this.sounds = {};
        this.music = {};
        this.currentMusic = null;
        this.soundEnabled = true;
        this.musicEnabled = true;
        this.soundVolume = 0.7;
        this.musicVolume = 0.5;
        this.initSounds();
    }

    initSounds() {
        // Tower sounds
        this.sounds['dart_shoot'] = this.createAudio('dart_shoot', 0.3);
        this.sounds['boomerang_throw'] = this.createAudio('boomerang_throw', 0.4);
        this.sounds['bomb_explosion'] = this.createAudio('bomb_explosion', 0.6);
        this.sounds['tack_shoot'] = this.createAudio('tack_shoot', 0.3);
        this.sounds['ice_freeze'] = this.createAudio('ice_freeze', 0.5);
        this.sounds['glue_splat'] = this.createAudio('glue_splat', 0.4);
        this.sounds['sniper_shot'] = this.createAudio('sniper_shot', 0.5);
        this.sounds['sub_torpedo'] = this.createAudio('sub_torpedo', 0.4);
        this.sounds['buccaneer_cannon'] = this.createAudio('buccaneer_cannon', 0.5);
        this.sounds['ace_bomb'] = this.createAudio('ace_bomb', 0.6);
        this.sounds['heli_rocket'] = this.createAudio('heli_rocket', 0.5);
        this.sounds['mortar_shell'] = this.createAudio('mortar_shell', 0.6);
        this.sounds['dartling_laser'] = this.createAudio('dartling_laser', 0.4);
        this.sounds['wizard_fireball'] = this.createAudio('wizard_fireball', 0.5);
        this.sounds['super_laser'] = this.createAudio('super_laser', 0.7);
        this.sounds['ninja_star'] = this.createAudio('ninja_star', 0.3);
        this.sounds['alchemist_potion'] = this.createAudio('alchemist_potion', 0.4);
        this.sounds['druid_nature'] = this.createAudio('druid_nature', 0.4);
        this.sounds['farm_banana'] = this.createAudio('farm_banana', 0.3);
        this.sounds['spike_factory'] = this.createAudio('spike_factory', 0.4);
        this.sounds['village_buff'] = this.createAudio('village_buff', 0.3);
        this.sounds['engineer_sentry'] = this.createAudio('engineer_sentry', 0.4);

        // Bloon sounds
        this.sounds['bloon_pop'] = this.createAudio('bloon_pop', 0.3);
        this.sounds['bloon_leak'] = this.createAudio('bloon_leak', 0.5);
        this.sounds['moab_hit'] = this.createAudio('moab_hit', 0.6);
        this.sounds['moab_pop'] = this.createAudio('moab_pop', 0.7);
        this.sounds['bfb_hit'] = this.createAudio('bfb_hit', 0.6);
        this.sounds['bfb_pop'] = this.createAudio('bfb_pop', 0.7);
        this.sounds['zomg_hit'] = this.createAudio('zomg_hit', 0.6);
        this.sounds['zomg_pop'] = this.createAudio('zomg_pop', 0.7);
        this.sounds['ddt_hit'] = this.createAudio('ddt_hit', 0.6);
        this.sounds['ddt_pop'] = this.createAudio('ddt_pop', 0.7);
        this.sounds['bad_hit'] = this.createAudio('bad_hit', 0.6);
        this.sounds['bad_pop'] = this.createAudio('bad_pop', 0.7);

        // UI sounds
        this.sounds['button_click'] = this.createAudio('button_click', 0.3);
        this.sounds['tower_place'] = this.createAudio('tower_place', 0.4);
        this.sounds['tower_sell'] = this.createAudio('tower_sell', 0.4);
        this.sounds['tower_upgrade'] = this.createAudio('tower_upgrade', 0.4);
        this.sounds['money_earned'] = this.createAudio('money_earned', 0.3);
        this.sounds['lives_lost'] = this.createAudio('lives_lost', 0.5);
        this.sounds['round_start'] = this.createAudio('round_start', 0.4);
        this.sounds['round_complete'] = this.createAudio('round_complete', 0.4);
        this.sounds['game_over'] = this.createAudio('game_over', 0.6);
        this.sounds['victory'] = this.createAudio('victory', 0.6);

        // Hero sounds
        this.sounds['hero_level_up'] = this.createAudio('hero_level_up', 0.4);
        this.sounds['hero_ability'] = this.createAudio('hero_ability', 0.5);

        // Power sounds
        this.sounds['power_activate'] = this.createAudio('power_activate', 0.5);
        this.sounds['cash_drop'] = this.createAudio('cash_drop', 0.4);
        this.sounds['monkey_boost'] = this.createAudio('monkey_boost', 0.5);

        // Boss sounds
        this.sounds['boss_spawn'] = this.createAudio('boss_spawn', 0.7);
        this.sounds['boss_hit'] = this.createAudio('boss_hit', 0.6);
        this.sounds['boss_death'] = this.createAudio('boss_death', 0.8);

        // Achievement sounds
        this.sounds['achievement_unlock'] = this.createAudio('achievement_unlock', 0.5);

        // Music tracks
        this.music['main_theme'] = this.createAudio('main_theme', 0.3, true);
        this.music['battle_theme'] = this.createAudio('battle_theme', 0.3, true);
        this.music['boss_theme'] = this.createAudio('boss_theme', 0.4, true);
        this.music['victory_theme'] = this.createAudio('victory_theme', 0.3, true);
        this.music['menu_theme'] = this.createAudio('menu_theme', 0.3, true);
    }

    createAudio(name, volume = 0.5, isMusic = false) {
        // Create a simple audio element for demonstration
        // In a real implementation, you would load actual audio files
        const audio = {
            name: name,
            volume: volume,
            isMusic: isMusic,
            play: () => {
                if (isMusic ? this.musicEnabled : this.soundEnabled) {
                    console.log(`Playing ${name}`);
                    // In real implementation, this would play actual audio
                }
            },
            stop: () => {
                console.log(`Stopping ${name}`);
            },
            setVolume: (vol) => {
                audio.volume = vol;
            }
        };
        return audio;
    }

    playSound(soundName) {
        if (this.sounds[soundName] && this.soundEnabled) {
            this.sounds[soundName].play();
        }
    }

    playMusic(musicName) {
        if (this.music[musicName] && this.musicEnabled) {
            if (this.currentMusic) {
                this.currentMusic.stop();
            }
            this.currentMusic = this.music[musicName];
            this.currentMusic.play();
        }
    }

    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.stop();
            this.currentMusic = null;
        }
    }

    setSoundVolume(volume) {
        this.soundVolume = Math.max(0, Math.min(1, volume));
        Object.values(this.sounds).forEach(sound => {
            sound.setVolume(this.soundVolume);
        });
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        Object.values(this.music).forEach(music => {
            music.setVolume(this.musicVolume);
        });
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (!this.musicEnabled) {
            this.stopMusic();
        }
        return this.musicEnabled;
    }

    // Game event sound triggers
    onTowerShoot(towerType) {
        const soundMap = {
            'dartMonkey': 'dart_shoot',
            'boomerangMonkey': 'boomerang_throw',
            'bombTower': 'bomb_explosion',
            'tackShooter': 'tack_shoot',
            'iceTower': 'ice_freeze',
            'glueGunner': 'glue_splat',
            'sniperMonkey': 'sniper_shot',
            'monkeySub': 'sub_torpedo',
            'monkeyBuccaneer': 'buccaneer_cannon',
            'monkeyAce': 'ace_bomb',
            'heliPilot': 'heli_rocket',
            'mortarMonkey': 'mortar_shell',
            'dartlingGunner': 'dartling_laser',
            'wizardMonkey': 'wizard_fireball',
            'superMonkey': 'super_laser',
            'ninjaMonkey': 'ninja_star',
            'alchemist': 'alchemist_potion',
            'druid': 'druid_nature',
            'bananaFarm': 'farm_banana',
            'spikeFactory': 'spike_factory',
            'monkeyVillage': 'village_buff',
            'engineerMonkey': 'engineer_sentry'
        };
        
        const soundName = soundMap[towerType];
        if (soundName) {
            this.playSound(soundName);
        }
    }

    onBloonPop(bloonType) {
        const soundMap = {
            'red': 'bloon_pop',
            'blue': 'bloon_pop',
            'green': 'bloon_pop',
            'yellow': 'bloon_pop',
            'pink': 'bloon_pop',
            'black': 'bloon_pop',
            'white': 'bloon_pop',
            'purple': 'bloon_pop',
            'lead': 'bloon_pop',
            'zebra': 'bloon_pop',
            'rainbow': 'bloon_pop',
            'ceramic': 'bloon_pop',
            'moab': 'moab_pop',
            'bfb': 'bfb_pop',
            'zomg': 'zomg_pop',
            'ddt': 'ddt_pop',
            'bad': 'bad_pop'
        };
        
        const soundName = soundMap[bloonType];
        if (soundName) {
            this.playSound(soundName);
        }
    }

    onBloonLeak() {
        this.playSound('bloon_leak');
    }

    onTowerPlace() {
        this.playSound('tower_place');
    }

    onTowerSell() {
        this.playSound('tower_sell');
    }

    onTowerUpgrade() {
        this.playSound('tower_upgrade');
    }

    onMoneyEarned() {
        this.playSound('money_earned');
    }

    onLivesLost() {
        this.playSound('lives_lost');
    }

    onRoundStart() {
        this.playSound('round_start');
    }

    onRoundComplete() {
        this.playSound('round_complete');
    }

    onGameOver() {
        this.playSound('game_over');
        this.playMusic('game_over_theme');
    }

    onVictory() {
        this.playSound('victory');
        this.playMusic('victory_theme');
    }

    onHeroLevelUp() {
        this.playSound('hero_level_up');
    }

    onHeroAbility() {
        this.playSound('hero_ability');
    }

    onPowerActivate() {
        this.playSound('power_activate');
    }

    onBossSpawn() {
        this.playSound('boss_spawn');
        this.playMusic('boss_theme');
    }

    onBossHit() {
        this.playSound('boss_hit');
    }

    onBossDeath() {
        this.playSound('boss_death');
        this.playMusic('battle_theme');
    }

    onAchievementUnlock() {
        this.playSound('achievement_unlock');
    }

    onButtonClick() {
        this.playSound('button_click');
    }
} 