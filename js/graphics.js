// Graphics system for authentic Bloons TD 6 visuals
class GraphicsManager {
    constructor() {
        this.sprites = {};
        this.animations = {};
        this.effects = {};
        this.loadSprites();
    }

    loadSprites() {
        // Tower sprites with authentic Bloons TD 6 colors and designs
        this.sprites = {
            // Dart Monkey - Red base with white details
            dart: this.createTowerSprite('#FF4444', '#FFFFFF', '#CC0000'),
            // Tack Shooter - Orange with black center
            tack: this.createTowerSprite('#FF8800', '#000000', '#CC6600'),
            // Bomb Tower - Dark gray with red accents
            bomb: this.createTowerSprite('#666666', '#FF0000', '#444444'),
            // Ice Tower - Light blue with white center
            ice: this.createTowerSprite('#88CCFF', '#FFFFFF', '#4488CC'),
            // Glue Gunner - Green with yellow details
            glue: this.createTowerSprite('#88FF88', '#FFFF00', '#44CC44'),
            // Sniper Monkey - Brown with black scope
            sniper: this.createTowerSprite('#8B4513', '#000000', '#654321'),
            // Monkey Sub - Blue with white details
            sub: this.createTowerSprite('#4682B4', '#FFFFFF', '#2E4A6B'),
            // Monkey Buccaneer - Brown with gold accents
            buccaneer: this.createTowerSprite('#8B4513', '#FFD700', '#654321'),
            // Monkey Ace - Gray with red details
            ace: this.createTowerSprite('#808080', '#FF0000', '#404040'),
            // Heli Pilot - Green with black details
            heli: this.createTowerSprite('#32CD32', '#000000', '#228B22'),
            // Mortar Tower - Dark gray with orange
            mortar: this.createTowerSprite('#696969', '#FF8C00', '#404040'),
            // Dartling Gunner - Red with black
            dartling: this.createTowerSprite('#FF4500', '#000000', '#CC3300'),
            // Wizard Monkey - Purple with white
            wizard: this.createTowerSprite('#9370DB', '#FFFFFF', '#6A5ACD'),
            // Super Monkey - Gold with black
            super: this.createTowerSprite('#FFD700', '#000000', '#DAA520'),
            // Ninja Monkey - Black with red
            ninja: this.createTowerSprite('#000000', '#FF0000', '#333333'),
            // Alchemist - Green with yellow
            alchemist: this.createTowerSprite('#32CD32', '#FFFF00', '#228B22'),
            // Druid - Brown with green
            druid: this.createTowerSprite('#8B4513', '#228B22', '#654321'),
            // Banana Farm - Yellow with green
            farm: this.createTowerSprite('#FFDD00', '#228B22', '#DAA520'),
            // Spike Factory - Gray with red
            spike: this.createTowerSprite('#8B4513', '#FF0000', '#654321'),
            // Monkey Village - Red with white
            village: this.createTowerSprite('#FF6347', '#FFFFFF', '#DC143C'),
            // Engineer Monkey - Orange with black
            engineer: this.createTowerSprite('#A0522D', '#000000', '#8B4513'),

            // Bloon sprites
            red: this.createBloonSprite('#FF0000'),
            blue: this.createBloonSprite('#0000FF'),
            green: this.createBloonSprite('#00FF00'),
            yellow: this.createBloonSprite('#FFFF00'),
            pink: this.createBloonSprite('#FF69B4'),
            black: this.createBloonSprite('#000000'),
            white: this.createBloonSprite('#FFFFFF'),
            purple: this.createBloonSprite('#800080'),
            lead: this.createBloonSprite('#696969', true),
            zebra: this.createBloonSprite('#FFFFFF', false, true),
            rainbow: this.createBloonSprite('#FF69B4', false, false, true),
            ceramic: this.createBloonSprite('#8B4513'),
            moab: this.createMoabSprite('#FF69B4'),
            bfb: this.createMoabSprite('#FF4500'),
            zomg: this.createMoabSprite('#8A2BE2'),
            ddt: this.createMoabSprite('#000000'),
            bad: this.createMoabSprite('#FF0000'),

            // Hero sprites
            quincy: this.createHeroSprite('#8B4513', '#FFD700'),
            gwendolin: this.createHeroSprite('#FF69B4', '#FFD700'),
            striker: this.createHeroSprite('#FF4500', '#FFD700'),
            obyn: this.createHeroSprite('#228B22', '#FFD700'),
            captain: this.createHeroSprite('#4682B4', '#FFD700'),
            churchill: this.createHeroSprite('#8B4513', '#FFD700'),
            benjamin: this.createHeroSprite('#32CD32', '#FFD700'),
            ezili: this.createHeroSprite('#800080', '#FFD700'),
            pat: this.createHeroSprite('#FF6347', '#FFD700'),
            adora: this.createHeroSprite('#FF69B4', '#FFD700'),
            sauda: this.createHeroSprite('#000000', '#FFD700'),
            psi: this.createHeroSprite('#9370DB', '#FFD700'),
            geraldo: this.createHeroSprite('#8B4513', '#FFD700'),
            etienne: this.createHeroSprite('#32CD32', '#FFD700'),

            // Projectile sprites
            dart: this.createProjectileSprite('#333333', 4),
            tack: this.createProjectileSprite('#FF8800', 3),
            bomb: this.createProjectileSprite('#FF0000', 6),
            ice: this.createProjectileSprite('#88CCFF', 5),
            glue: this.createProjectileSprite('#88FF88', 4),
            sniper: this.createProjectileSprite('#8B4513', 3),
            torpedo: this.createProjectileSprite('#4682B4', 5),
            cannon: this.createProjectileSprite('#8B4513', 6),
            bomb_ace: this.createProjectileSprite('#FF0000', 8),
            rocket: this.createProjectileSprite('#32CD32', 7),
            shell: this.createProjectileSprite('#696969', 8),
            laser: this.createProjectileSprite('#FF4500', 4),
            fireball: this.createProjectileSprite('#9370DB', 6),
            super_laser: this.createProjectileSprite('#FFD700', 8),
            star: this.createProjectileSprite('#000000', 4),
            potion: this.createProjectileSprite('#32CD32', 5),
            nature: this.createProjectileSprite('#228B22', 5),
            banana: this.createProjectileSprite('#FFDD00', 4),
            spike: this.createProjectileSprite('#8B4513', 3),
            buff: this.createProjectileSprite('#FF6347', 4),
            sentry: this.createProjectileSprite('#A0522D', 5),

            // Effect sprites
            explosion: this.createEffectSprite('#FF4500', 20),
            freeze: this.createEffectSprite('#88CCFF', 15),
            glue_splat: this.createEffectSprite('#88FF88', 12),
            pop: this.createEffectSprite('#FF69B4', 10),
            money: this.createEffectSprite('#FFD700', 8),
            upgrade: this.createEffectSprite('#32CD32', 12),
            ability: this.createEffectSprite('#9370DB', 15),
            boss_hit: this.createEffectSprite('#FF0000', 25),
        };
    }

    createTowerSprite(baseColor, accentColor, shadowColor) {
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 40;
        const ctx = canvas.getContext('2d');

        // Base tower body
        ctx.fillStyle = shadowColor;
        ctx.fillRect(2, 2, 36, 36);
        
        ctx.fillStyle = baseColor;
        ctx.fillRect(0, 0, 36, 36);
        
        // Tower details
        ctx.fillStyle = accentColor;
        ctx.fillRect(8, 8, 20, 20);
        
        // Tower top
        ctx.fillStyle = accentColor;
        ctx.fillRect(15, 5, 6, 8);
        
        return canvas;
    }

    createBloonSprite(color, isLead = false, isZebra = false, isRainbow = false) {
        const canvas = document.createElement('canvas');
        canvas.width = 30;
        canvas.height = 30;
        const ctx = canvas.getContext('2d');

        if (isRainbow) {
            // Rainbow effect
            const gradient = ctx.createRadialGradient(15, 15, 0, 15, 15, 15);
            gradient.addColorStop(0, '#FF0000');
            gradient.addColorStop(0.2, '#FF8800');
            gradient.addColorStop(0.4, '#FFFF00');
            gradient.addColorStop(0.6, '#00FF00');
            gradient.addColorStop(0.8, '#0088FF');
            gradient.addColorStop(1, '#8000FF');
            ctx.fillStyle = gradient;
        } else if (isZebra) {
            // Zebra stripes
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 30, 30);
            ctx.fillStyle = '#000000';
            for (let i = 0; i < 30; i += 6) {
                ctx.fillRect(i, 0, 3, 30);
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 30, 30);
        }

        if (isLead) {
            // Lead bloon has metallic effect
            ctx.fillStyle = '#C0C0C0';
            ctx.fillRect(5, 5, 20, 20);
        }

        return canvas;
    }

    createMoabSprite(color) {
        const canvas = document.createElement('canvas');
        canvas.width = 60;
        canvas.height = 40;
        const ctx = canvas.getContext('2d');

        // MOAB body
        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 10, 60, 20);
        
        ctx.fillStyle = color;
        ctx.fillRect(2, 12, 56, 16);
        
        // MOAB details
        ctx.fillStyle = '#000000';
        ctx.fillRect(10, 15, 40, 10);
        
        return canvas;
    }

    createHeroSprite(baseColor, accentColor) {
        const canvas = document.createElement('canvas');
        canvas.width = 50;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');

        // Hero body
        ctx.fillStyle = baseColor;
        ctx.fillRect(10, 20, 30, 25);
        
        // Hero head
        ctx.fillStyle = baseColor;
        ctx.fillRect(15, 10, 20, 15);
        
        // Hero details
        ctx.fillStyle = accentColor;
        ctx.fillRect(18, 12, 14, 11);
        
        return canvas;
    }

    createProjectileSprite(color, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = color;
        ctx.fillRect(0, 0, size, size);
        
        return canvas;
    }

    createEffectSprite(color, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        
        return canvas;
    }

    drawTower(ctx, tower, position) {
        const sprite = this.sprites[tower.type];
        if (sprite) {
            ctx.drawImage(sprite, position.x - 20, position.y - 20, 40, 40);
        }
    }

    drawBloon(ctx, bloon) {
        const sprite = this.sprites[bloon.type];
        if (sprite) {
            ctx.drawImage(sprite, bloon.position.x - 15, bloon.position.y - 15, 30, 30);
        }
    }

    drawHero(ctx, hero, position) {
        const sprite = this.sprites[hero.type];
        if (sprite) {
            ctx.drawImage(sprite, position.x - 25, position.y - 25, 50, 50);
        }
    }

    drawProjectile(ctx, projectile) {
        const sprite = this.sprites[projectile.type];
        if (sprite) {
            ctx.drawImage(sprite, projectile.position.x - 2, projectile.position.y - 2, 4, 4);
        }
    }

    drawEffect(ctx, effect) {
        const sprite = this.sprites[effect.type];
        if (sprite) {
            ctx.globalAlpha = effect.alpha || 1;
            ctx.drawImage(sprite, effect.position.x - effect.size/2, effect.position.y - effect.size/2, effect.size, effect.size);
            ctx.globalAlpha = 1;
        }
    }

    drawMap(ctx, map) {
        // Draw background with gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradient.addColorStop(0, '#87CEEB'); // Sky blue
        gradient.addColorStop(1, '#90EE90'); // Light green
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw water areas with wave effect
        map.water.forEach(waterArea => {
            ctx.fillStyle = '#4682B4';
            ctx.fillRect(waterArea.x, waterArea.y, waterArea.width, waterArea.height);
            
            // Wave effect
            ctx.strokeStyle = '#5F9EA0';
            ctx.lineWidth = 2;
            for (let i = 0; i < waterArea.width; i += 20) {
                ctx.beginPath();
                ctx.moveTo(waterArea.x + i, waterArea.y);
                ctx.quadraticCurveTo(waterArea.x + i + 10, waterArea.y + 5, waterArea.x + i + 20, waterArea.y);
                ctx.stroke();
            }
        });

        // Draw obstacles with texture
        map.obstacles.forEach(obstacle => {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            
            // Add texture
            ctx.strokeStyle = '#654321';
            ctx.lineWidth = 1;
            for (let i = 0; i < obstacle.width; i += 5) {
                ctx.beginPath();
                ctx.moveTo(obstacle.x + i, obstacle.y);
                ctx.lineTo(obstacle.x + i, obstacle.y + obstacle.height);
                ctx.stroke();
            }
        });

        // Draw path with authentic Bloons TD 6 style
        ctx.save();
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 50;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(map.path[0].x, map.path[0].y);
        
        for (let i = 1; i < map.path.length; i++) {
            ctx.lineTo(map.path[i].x, map.path[i].y);
        }
        
        ctx.stroke();

        // Add path border
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 54;
        ctx.globalCompositeOperation = 'destination-over';
        ctx.stroke();
        
        ctx.restore();
    }

    drawUI(ctx, gameState) {
        // Draw money display
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`$${gameState.money}`, 10, 30);
        
        // Draw lives display
        ctx.fillStyle = '#FF0000';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`❤️ ${gameState.lives}`, 10, 60);
        
        // Draw round display
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Round ${gameState.currentRound}`, 10, 90);
    }

    createAnimation(type, duration, frames) {
        return {
            type,
            duration,
            frames,
            currentFrame: 0,
            startTime: Date.now()
        };
    }

    updateAnimation(animation) {
        const elapsed = Date.now() - animation.startTime;
        const frameIndex = Math.floor((elapsed / animation.duration) * animation.frames.length);
        
        if (frameIndex >= animation.frames.length) {
            return null; // Animation complete
        }
        
        return animation.frames[frameIndex];
    }
} 