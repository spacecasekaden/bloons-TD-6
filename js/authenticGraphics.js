// Authentic Bloons TD 6 Graphics System
class AuthenticGraphicsManager {
    constructor() {
        this.sprites = {};
        this.animations = {};
        this.effects = {};
        this.loadAuthenticSprites();
    }

    loadAuthenticSprites() {
        // Authentic Bloons TD 6 tower sprites with exact colors and designs
        this.sprites = {
            // Dart Monkey - Classic red with white details
            dart: this.createAuthenticTowerSprite('#E74C3C', '#FFFFFF', '#C0392B', 'dart'),
            // Tack Shooter - Orange with black center
            tack: this.createAuthenticTowerSprite('#F39C12', '#000000', '#E67E22', 'tack'),
            // Bomb Tower - Dark gray with red accents
            bomb: this.createAuthenticTowerSprite('#7F8C8D', '#E74C3C', '#5D6D7E', 'bomb'),
            // Ice Tower - Light blue with white center
            ice: this.createAuthenticTowerSprite('#3498DB', '#FFFFFF', '#2980B9', 'ice'),
            // Glue Gunner - Green with yellow details
            glue: this.createAuthenticTowerSprite('#27AE60', '#F1C40F', '#229954', 'glue'),
            // Sniper Monkey - Brown with black scope
            sniper: this.createAuthenticTowerSprite('#8B4513', '#000000', '#654321', 'sniper'),
            // Monkey Sub - Blue with white details
            sub: this.createAuthenticTowerSprite('#3498DB', '#FFFFFF', '#2980B9', 'sub'),
            // Monkey Buccaneer - Brown with gold accents
            buccaneer: this.createAuthenticTowerSprite('#8B4513', '#F39C12', '#654321', 'buccaneer'),
            // Monkey Ace - Gray with red details
            ace: this.createAuthenticTowerSprite('#95A5A6', '#E74C3C', '#7F8C8D', 'ace'),
            // Heli Pilot - Green with black details
            heli: this.createAuthenticTowerSprite('#27AE60', '#000000', '#229954', 'heli'),
            // Mortar Tower - Dark gray with orange
            mortar: this.createAuthenticTowerSprite('#7F8C8D', '#F39C12', '#5D6D7E', 'mortar'),
            // Dartling Gunner - Red with black
            dartling: this.createAuthenticTowerSprite('#E74C3C', '#000000', '#C0392B', 'dartling'),
            // Wizard Monkey - Purple with white
            wizard: this.createAuthenticTowerSprite('#9B59B6', '#FFFFFF', '#8E44AD', 'wizard'),
            // Super Monkey - Gold with black
            super: this.createAuthenticTowerSprite('#F1C40F', '#000000', '#F39C12', 'super'),
            // Ninja Monkey - Black with red
            ninja: this.createAuthenticTowerSprite('#2C3E50', '#E74C3C', '#1B2631', 'ninja'),
            // Alchemist - Green with yellow
            alchemist: this.createAuthenticTowerSprite('#27AE60', '#F1C40F', '#229954', 'alchemist'),
            // Druid - Brown with green
            druid: this.createAuthenticTowerSprite('#8B4513', '#27AE60', '#654321', 'druid'),
            // Banana Farm - Yellow with green
            farm: this.createAuthenticTowerSprite('#F1C40F', '#27AE60', '#F39C12', 'farm'),
            // Spike Factory - Gray with red
            spike: this.createAuthenticTowerSprite('#7F8C8D', '#E74C3C', '#5D6D7E', 'spike'),
            // Monkey Village - Red with white
            village: this.createAuthenticTowerSprite('#E74C3C', '#FFFFFF', '#C0392B', 'village'),
            // Engineer Monkey - Orange with black
            engineer: this.createAuthenticTowerSprite('#F39C12', '#000000', '#E67E22', 'engineer'),

            // Authentic Bloons TD 6 bloon sprites
            red: this.createAuthenticBloonSprite('#E74C3C'),
            blue: this.createAuthenticBloonSprite('#3498DB'),
            green: this.createAuthenticBloonSprite('#27AE60'),
            yellow: this.createAuthenticBloonSprite('#F1C40F'),
            pink: this.createAuthenticBloonSprite('#E91E63'),
            black: this.createAuthenticBloonSprite('#2C3E50'),
            white: this.createAuthenticBloonSprite('#ECF0F1'),
            purple: this.createAuthenticBloonSprite('#9B59B6'),
            lead: this.createAuthenticBloonSprite('#7F8C8D', true),
            zebra: this.createAuthenticBloonSprite('#ECF0F1', false, true),
            rainbow: this.createAuthenticBloonSprite('#E91E63', false, false, true),
            ceramic: this.createAuthenticBloonSprite('#8B4513'),
            moab: this.createAuthenticMoabSprite('#E91E63'),
            bfb: this.createAuthenticMoabSprite('#F39C12'),
            zomg: this.createAuthenticMoabSprite('#9B59B6'),
            ddt: this.createAuthenticMoabSprite('#2C3E50'),
            bad: this.createAuthenticMoabSprite('#E74C3C'),

            // Authentic Bloons TD 6 hero sprites
            quincy: this.createAuthenticHeroSprite('#8B4513', '#F1C40F', 'quincy'),
            gwendolin: this.createAuthenticHeroSprite('#E91E63', '#F1C40F', 'gwendolin'),
            striker: this.createAuthenticHeroSprite('#F39C12', '#F1C40F', 'striker'),
            obyn: this.createAuthenticHeroSprite('#27AE60', '#F1C40F', 'obyn'),
            captain: this.createAuthenticHeroSprite('#3498DB', '#F1C40F', 'captain'),
            churchill: this.createAuthenticHeroSprite('#8B4513', '#F1C40F', 'churchill'),
            benjamin: this.createAuthenticHeroSprite('#27AE60', '#F1C40F', 'benjamin'),
            ezili: this.createAuthenticHeroSprite('#9B59B6', '#F1C40F', 'ezili'),
            pat: this.createAuthenticHeroSprite('#E74C3C', '#F1C40F', 'pat'),
            adora: this.createAuthenticHeroSprite('#E91E63', '#F1C40F', 'adora'),
            sauda: this.createAuthenticHeroSprite('#2C3E50', '#F1C40F', 'sauda'),
            psi: this.createAuthenticHeroSprite('#9B59B6', '#F1C40F', 'psi'),
            geraldo: this.createAuthenticHeroSprite('#8B4513', '#F1C40F', 'geraldo'),
            etienne: this.createAuthenticHeroSprite('#27AE60', '#F1C40F', 'etienne'),

            // Authentic Bloons TD 6 projectile sprites
            dart: this.createAuthenticProjectileSprite('#2C3E50', 4),
            tack: this.createAuthenticProjectileSprite('#F39C12', 3),
            bomb: this.createAuthenticProjectileSprite('#E74C3C', 6),
            ice: this.createAuthenticProjectileSprite('#3498DB', 5),
            glue: this.createAuthenticProjectileSprite('#27AE60', 4),
            sniper: this.createAuthenticProjectileSprite('#8B4513', 3),
            torpedo: this.createAuthenticProjectileSprite('#3498DB', 5),
            cannon: this.createAuthenticProjectileSprite('#8B4513', 6),
            bomb_ace: this.createAuthenticProjectileSprite('#E74C3C', 8),
            rocket: this.createAuthenticProjectileSprite('#27AE60', 7),
            shell: this.createAuthenticProjectileSprite('#7F8C8D', 8),
            laser: this.createAuthenticProjectileSprite('#F39C12', 4),
            fireball: this.createAuthenticProjectileSprite('#9B59B6', 6),
            super_laser: this.createAuthenticProjectileSprite('#F1C40F', 8),
            star: this.createAuthenticProjectileSprite('#2C3E50', 4),
            potion: this.createAuthenticProjectileSprite('#27AE60', 5),
            nature: this.createAuthenticProjectileSprite('#27AE60', 5),
            banana: this.createAuthenticProjectileSprite('#F1C40F', 4),
            spike: this.createAuthenticProjectileSprite('#8B4513', 3),
            buff: this.createAuthenticProjectileSprite('#E74C3C', 4),
            sentry: this.createAuthenticProjectileSprite('#F39C12', 5),

            // Authentic Bloons TD 6 effect sprites
            explosion: this.createAuthenticEffectSprite('#F39C12', 20),
            freeze: this.createAuthenticEffectSprite('#3498DB', 15),
            glue_splat: this.createAuthenticEffectSprite('#27AE60', 12),
            pop: this.createAuthenticEffectSprite('#E91E63', 10),
            money: this.createAuthenticEffectSprite('#F1C40F', 8),
            upgrade: this.createAuthenticEffectSprite('#27AE60', 12),
            ability: this.createAuthenticEffectSprite('#9B59B6', 15),
            boss_hit: this.createAuthenticEffectSprite('#E74C3C', 25),
        };
    }

    createAuthenticTowerSprite(baseColor, accentColor, shadowColor, type) {
        const canvas = document.createElement('canvas');
        canvas.width = 50;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');

        // Authentic Bloons TD 6 tower design
        // Shadow
        ctx.fillStyle = shadowColor;
        ctx.fillRect(3, 3, 44, 44);
        
        // Base tower body
        ctx.fillStyle = baseColor;
        ctx.fillRect(0, 0, 44, 44);
        
        // Tower details based on type
        ctx.fillStyle = accentColor;
        
        switch(type) {
            case 'dart':
                // Dart monkey has a dart gun
                ctx.fillRect(15, 10, 14, 20);
                ctx.fillRect(20, 5, 4, 8);
                break;
            case 'tack':
                // Tack shooter has multiple barrels
                for(let i = 0; i < 8; i++) {
                    const angle = (i * Math.PI * 2) / 8;
                    const x = 22 + Math.cos(angle) * 8;
                    const y = 22 + Math.sin(angle) * 8;
                    ctx.fillRect(x-1, y-1, 2, 2);
                }
                break;
            case 'bomb':
                // Bomb tower has a cannon
                ctx.fillRect(12, 15, 20, 15);
                ctx.fillRect(15, 10, 14, 8);
                break;
            case 'ice':
                // Ice tower has ice crystals
                ctx.fillRect(18, 15, 8, 15);
                for(let i = 0; i < 4; i++) {
                    ctx.fillRect(15 + i*5, 10, 3, 8);
                }
                break;
            case 'glue':
                // Glue gunner has a glue gun
                ctx.fillRect(15, 12, 14, 18);
                ctx.fillRect(18, 8, 8, 6);
                break;
            default:
                // Default tower design
                ctx.fillRect(12, 12, 20, 20);
                ctx.fillRect(18, 8, 8, 8);
        }
        
        return canvas;
    }

    createAuthenticBloonSprite(color, isLead = false, isZebra = false, isRainbow = false) {
        const canvas = document.createElement('canvas');
        canvas.width = 35;
        canvas.height = 35;
        const ctx = canvas.getContext('2d');

        if (isRainbow) {
            // Authentic rainbow bloon effect
            const gradient = ctx.createRadialGradient(17.5, 17.5, 0, 17.5, 17.5, 17.5);
            gradient.addColorStop(0, '#FF0000');
            gradient.addColorStop(0.17, '#FF8800');
            gradient.addColorStop(0.33, '#FFFF00');
            gradient.addColorStop(0.5, '#00FF00');
            gradient.addColorStop(0.67, '#0088FF');
            gradient.addColorStop(0.83, '#8000FF');
            gradient.addColorStop(1, '#FF0088');
            ctx.fillStyle = gradient;
        } else if (isZebra) {
            // Authentic zebra bloon with stripes
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 35, 35);
            ctx.fillStyle = '#2C3E50';
            for (let i = 0; i < 35; i += 7) {
                ctx.fillRect(i, 0, 3.5, 35);
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 35, 35);
        }

        if (isLead) {
            // Authentic lead bloon metallic effect
            ctx.fillStyle = '#95A5A6';
            ctx.fillRect(5, 5, 25, 25);
            ctx.fillStyle = '#BDC3C7';
            ctx.fillRect(8, 8, 19, 19);
        }

        return canvas;
    }

    createAuthenticMoabSprite(color) {
        const canvas = document.createElement('canvas');
        canvas.width = 70;
        canvas.height = 45;
        const ctx = canvas.getContext('2d');

        // Authentic MOAB design
        ctx.fillStyle = '#34495E';
        ctx.fillRect(0, 10, 70, 25);
        
        ctx.fillStyle = color;
        ctx.fillRect(2, 12, 66, 21);
        
        // MOAB details
        ctx.fillStyle = '#2C3E50';
        ctx.fillRect(10, 15, 50, 15);
        
        // MOAB windows
        ctx.fillStyle = '#ECF0F1';
        ctx.fillRect(15, 17, 8, 8);
        ctx.fillRect(30, 17, 8, 8);
        ctx.fillRect(45, 17, 8, 8);
        
        return canvas;
    }

    createAuthenticHeroSprite(baseColor, accentColor, type) {
        const canvas = document.createElement('canvas');
        canvas.width = 60;
        canvas.height = 60;
        const ctx = canvas.getContext('2d');

        // Authentic hero design
        // Body
        ctx.fillStyle = baseColor;
        ctx.fillRect(15, 25, 30, 30);
        
        // Head
        ctx.fillRect(20, 15, 20, 15);
        
        // Hero details based on type
        ctx.fillStyle = accentColor;
        
        switch(type) {
            case 'quincy':
                // Quincy has a bow
                ctx.fillRect(25, 20, 10, 8);
                ctx.fillRect(35, 18, 2, 12);
                break;
            case 'gwendolin':
                // Gwendolin has fire
                ctx.fillRect(22, 18, 16, 10);
                break;
            case 'striker':
                // Striker has bombs
                ctx.fillRect(20, 20, 20, 8);
                break;
            default:
                // Default hero design
                ctx.fillRect(22, 18, 16, 12);
        }
        
        return canvas;
    }

    createAuthenticProjectileSprite(color, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = color;
        ctx.fillRect(0, 0, size, size);
        
        return canvas;
    }

    createAuthenticEffectSprite(color, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.7, color + '80');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        
        return canvas;
    }

    drawAuthenticTower(ctx, tower, position) {
        const sprite = this.sprites[tower.type];
        if (sprite) {
            ctx.drawImage(sprite, position.x - 25, position.y - 25, 50, 50);
        }
    }

    drawAuthenticBloon(ctx, bloon) {
        const sprite = this.sprites[bloon.type];
        if (sprite) {
            ctx.drawImage(sprite, bloon.position.x - 17.5, bloon.position.y - 17.5, 35, 35);
        }
    }

    drawAuthenticHero(ctx, hero, position) {
        const sprite = this.sprites[hero.type];
        if (sprite) {
            ctx.drawImage(sprite, position.x - 30, position.y - 30, 60, 60);
        }
    }

    drawAuthenticProjectile(ctx, projectile) {
        const sprite = this.sprites[projectile.type];
        if (sprite) {
            ctx.drawImage(sprite, projectile.position.x - 2, projectile.position.y - 2, 4, 4);
        }
    }

    drawAuthenticEffect(ctx, effect) {
        const sprite = this.sprites[effect.type];
        if (sprite) {
            ctx.globalAlpha = effect.alpha || 1;
            ctx.drawImage(sprite, effect.position.x - effect.size/2, effect.position.y - effect.size/2, effect.size, effect.size);
            ctx.globalAlpha = 1;
        }
    }

    drawAuthenticMap(ctx, map) {
        // Authentic Bloons TD 6 map background
        const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradient.addColorStop(0, '#87CEEB'); // Sky blue
        gradient.addColorStop(0.7, '#90EE90'); // Light green
        gradient.addColorStop(1, '#228B22'); // Forest green
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Authentic water areas with wave effect
        map.water.forEach(waterArea => {
            ctx.fillStyle = '#4682B4';
            ctx.fillRect(waterArea.x, waterArea.y, waterArea.width, waterArea.height);
            
            // Authentic wave effect
            ctx.strokeStyle = '#5F9EA0';
            ctx.lineWidth = 2;
            for (let i = 0; i < waterArea.width; i += 25) {
                ctx.beginPath();
                ctx.moveTo(waterArea.x + i, waterArea.y);
                ctx.quadraticCurveTo(waterArea.x + i + 12.5, waterArea.y + 8, waterArea.x + i + 25, waterArea.y);
                ctx.stroke();
            }
        });

        // Authentic obstacles with texture
        map.obstacles.forEach(obstacle => {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            
            // Authentic texture
            ctx.strokeStyle = '#654321';
            ctx.lineWidth = 1;
            for (let i = 0; i < obstacle.width; i += 8) {
                ctx.beginPath();
                ctx.moveTo(obstacle.x + i, obstacle.y);
                ctx.lineTo(obstacle.x + i, obstacle.y + obstacle.height);
                ctx.stroke();
            }
        });

        // Authentic Bloons TD 6 path
        ctx.save();
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 60;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(map.path[0].x, map.path[0].y);
        
        for (let i = 1; i < map.path.length; i++) {
            ctx.lineTo(map.path[i].x, map.path[i].y);
        }
        
        ctx.stroke();

        // Authentic path border
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 66;
        ctx.globalCompositeOperation = 'destination-over';
        ctx.stroke();
        
        ctx.restore();
    }

    drawAuthenticUI(ctx, gameState) {
        // Authentic Bloons TD 6 UI
        ctx.fillStyle = '#F1C40F';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(`$${gameState.money}`, 15, 35);
        
        ctx.fillStyle = '#E74C3C';
        ctx.fillText(`❤️ ${gameState.lives}`, 15, 65);
        
        ctx.fillStyle = '#2C3E50';
        ctx.fillText(`Round ${gameState.currentRound}`, 15, 95);
    }

    createAuthenticAnimation(type, duration, frames) {
        return {
            type,
            duration,
            frames,
            currentFrame: 0,
            startTime: Date.now()
        };
    }

    updateAuthenticAnimation(animation) {
        const elapsed = Date.now() - animation.startTime;
        const frameIndex = Math.floor((elapsed / animation.duration) * animation.frames.length);
        
        if (frameIndex >= animation.frames.length) {
            return null; // Animation complete
        }
        
        return animation.frames[frameIndex];
    }
} 