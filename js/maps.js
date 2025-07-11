// Maps system for Bloons TD 6
class Map {
    constructor(name, difficulty, path, obstacles = [], water = [], validTowerPositions = []) {
        this.name = name;
        this.difficulty = difficulty; // 'beginner', 'intermediate', 'advanced', 'expert'
        this.path = path;
        this.obstacles = obstacles;
        this.water = water;
        this.validTowerPositions = validTowerPositions;
        this.background = this.getBackgroundColor();
    }

    getBackgroundColor() {
        switch (this.difficulty) {
            case 'beginner': return '#8BC34A'; // Green
            case 'intermediate': return '#FF9800'; // Orange
            case 'advanced': return '#F44336'; // Red
            case 'expert': return '#9C27B0'; // Purple
            default: return '#8BC34A';
        }
    }

    draw(ctx) {
        // Draw background
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw water areas
        this.water.forEach(waterArea => {
            ctx.fillStyle = '#2196F3';
            ctx.fillRect(waterArea.x, waterArea.y, waterArea.width, waterArea.height);
        });

        // Draw obstacles
        this.obstacles.forEach(obstacle => {
            ctx.fillStyle = '#795548';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });

        // Draw path
        ctx.save();
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 40;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(this.path[0].x, this.path[0].y);
        
        for (let i = 1; i < this.path.length; i++) {
            ctx.lineTo(this.path[i].x, this.path[i].y);
        }
        
        ctx.stroke();
        ctx.restore();
    }

    isValidTowerPosition(position) {
        // Check if position is on water (only water towers allowed)
        const onWater = this.water.some(waterArea => 
            position.x >= waterArea.x && position.x <= waterArea.x + waterArea.width &&
            position.y >= waterArea.y && position.y <= waterArea.y + waterArea.height
        );

        // Check if position is on obstacle
        const onObstacle = this.obstacles.some(obstacle => 
            position.x >= obstacle.x && position.x <= obstacle.x + obstacle.width &&
            position.y >= obstacle.y && position.y <= obstacle.y + obstacle.height
        );

        // Check if position is too close to path
        const tooCloseToPath = this.path.some(pathPoint => 
            position.distance(pathPoint) < 40
        );

        return !onObstacle && !tooCloseToPath;
    }

    canPlaceWaterTower(position) {
        return this.water.some(waterArea => 
            position.x >= waterArea.x && position.x <= waterArea.x + waterArea.width &&
            position.y >= waterArea.y && position.y <= waterArea.y + waterArea.height
        );
    }
}

class MapManager {
    constructor() {
        this.maps = this.createMaps();
        this.currentMap = this.maps[0];
    }

    createMaps() {
        return [
            // Beginner Maps
            new Map(
                "Monkey Meadow",
                "beginner",
                [
                    new Vector2(0, 300),
                    new Vector2(200, 300),
                    new Vector2(200, 100),
                    new Vector2(400, 100),
                    new Vector2(400, 500),
                    new Vector2(600, 500),
                    new Vector2(600, 300),
                    new Vector2(800, 300),
                    new Vector2(800, 100),
                    new Vector2(1000, 100),
                    new Vector2(1000, 500),
                    new Vector2(1200, 500)
                ]
            ),
            new Map(
                "Tree Stump",
                "beginner",
                [
                    new Vector2(0, 300),
                    new Vector2(150, 300),
                    new Vector2(150, 150),
                    new Vector2(450, 150),
                    new Vector2(450, 450),
                    new Vector2(750, 450),
                    new Vector2(750, 150),
                    new Vector2(1050, 150),
                    new Vector2(1050, 450),
                    new Vector2(1200, 450)
                ],
                [
                    {x: 300, y: 250, width: 300, height: 200} // Tree stump obstacle
                ]
            ),
            new Map(
                "Town Center",
                "beginner",
                [
                    new Vector2(0, 300),
                    new Vector2(200, 300),
                    new Vector2(200, 100),
                    new Vector2(400, 100),
                    new Vector2(400, 500),
                    new Vector2(600, 500),
                    new Vector2(600, 100),
                    new Vector2(800, 100),
                    new Vector2(800, 500),
                    new Vector2(1000, 500),
                    new Vector2(1000, 100),
                    new Vector2(1200, 100)
                ],
                [
                    {x: 300, y: 200, width: 200, height: 200} // Building
                ]
            ),

            // Intermediate Maps
            new Map(
                "In The Loop",
                "intermediate",
                [
                    new Vector2(0, 300),
                    new Vector2(200, 300),
                    new Vector2(200, 100),
                    new Vector2(400, 100),
                    new Vector2(400, 500),
                    new Vector2(600, 500),
                    new Vector2(600, 100),
                    new Vector2(800, 100),
                    new Vector2(800, 500),
                    new Vector2(1000, 500),
                    new Vector2(1000, 100),
                    new Vector2(1200, 100)
                ],
                [
                    {x: 350, y: 150, width: 100, height: 100},
                    {x: 350, y: 350, width: 100, height: 100},
                    {x: 550, y: 150, width: 100, height: 100},
                    {x: 550, y: 350, width: 100, height: 100},
                    {x: 750, y: 150, width: 100, height: 100},
                    {x: 750, y: 350, width: 100, height: 100},
                    {x: 950, y: 150, width: 100, height: 100},
                    {x: 950, y: 350, width: 100, height: 100}
                ]
            ),
            new Map(
                "Cargo",
                "intermediate",
                [
                    new Vector2(0, 300),
                    new Vector2(200, 300),
                    new Vector2(200, 100),
                    new Vector2(400, 100),
                    new Vector2(400, 500),
                    new Vector2(600, 500),
                    new Vector2(600, 100),
                    new Vector2(800, 100),
                    new Vector2(800, 500),
                    new Vector2(1000, 500),
                    new Vector2(1000, 100),
                    new Vector2(1200, 100)
                ],
                [
                    {x: 250, y: 200, width: 300, height: 200} // Cargo container
                ]
            ),

            // Advanced Maps
            new Map(
                "Muddy Puddles",
                "advanced",
                [
                    new Vector2(0, 300),
                    new Vector2(150, 300),
                    new Vector2(150, 150),
                    new Vector2(450, 150),
                    new Vector2(450, 450),
                    new Vector2(750, 450),
                    new Vector2(750, 150),
                    new Vector2(1050, 150),
                    new Vector2(1050, 450),
                    new Vector2(1200, 450)
                ],
                [
                    {x: 200, y: 100, width: 200, height: 100},
                    {x: 200, y: 400, width: 200, height: 100},
                    {x: 500, y: 100, width: 200, height: 100},
                    {x: 500, y: 400, width: 200, height: 100},
                    {x: 800, y: 100, width: 200, height: 100},
                    {x: 800, y: 400, width: 200, height: 100}
                ]
            ),
            new Map(
                "Geared",
                "advanced",
                [
                    new Vector2(0, 300),
                    new Vector2(200, 300),
                    new Vector2(200, 100),
                    new Vector2(400, 100),
                    new Vector2(400, 500),
                    new Vector2(600, 500),
                    new Vector2(600, 100),
                    new Vector2(800, 100),
                    new Vector2(800, 500),
                    new Vector2(1000, 500),
                    new Vector2(1000, 100),
                    new Vector2(1200, 100)
                ],
                [
                    {x: 300, y: 200, width: 100, height: 100},
                    {x: 500, y: 200, width: 100, height: 100},
                    {x: 700, y: 200, width: 100, height: 100},
                    {x: 900, y: 200, width: 100, height: 100}
                ]
            ),

            // Expert Maps
            new Map(
                "#ouch",
                "expert",
                [
                    new Vector2(0, 300),
                    new Vector2(100, 300),
                    new Vector2(100, 100),
                    new Vector2(300, 100),
                    new Vector2(300, 500),
                    new Vector2(500, 500),
                    new Vector2(500, 100),
                    new Vector2(700, 100),
                    new Vector2(700, 500),
                    new Vector2(900, 500),
                    new Vector2(900, 100),
                    new Vector2(1100, 100),
                    new Vector2(1100, 500),
                    new Vector2(1200, 500)
                ],
                [
                    {x: 150, y: 150, width: 100, height: 100},
                    {x: 150, y: 350, width: 100, height: 100},
                    {x: 350, y: 150, width: 100, height: 100},
                    {x: 350, y: 350, width: 100, height: 100},
                    {x: 550, y: 150, width: 100, height: 100},
                    {x: 550, y: 350, width: 100, height: 100},
                    {x: 750, y: 150, width: 100, height: 100},
                    {x: 750, y: 350, width: 100, height: 100},
                    {x: 950, y: 150, width: 100, height: 100},
                    {x: 950, y: 350, width: 100, height: 100}
                ]
            ),
            new Map(
                "Quad",
                "expert",
                [
                    new Vector2(0, 300),
                    new Vector2(200, 300),
                    new Vector2(200, 100),
                    new Vector2(400, 100),
                    new Vector2(400, 500),
                    new Vector2(600, 500),
                    new Vector2(600, 100),
                    new Vector2(800, 100),
                    new Vector2(800, 500),
                    new Vector2(1000, 500),
                    new Vector2(1000, 100),
                    new Vector2(1200, 100)
                ],
                [
                    {x: 250, y: 150, width: 100, height: 100},
                    {x: 450, y: 150, width: 100, height: 100},
                    {x: 650, y: 150, width: 100, height: 100},
                    {x: 850, y: 150, width: 100, height: 100},
                    {x: 250, y: 350, width: 100, height: 100},
                    {x: 450, y: 350, width: 100, height: 100},
                    {x: 650, y: 350, width: 100, height: 100},
                    {x: 850, y: 350, width: 100, height: 100}
                ]
            )
        ];
    }

    getMapByName(name) {
        return this.maps.find(map => map.name === name);
    }

    getMapsByDifficulty(difficulty) {
        return this.maps.filter(map => map.difficulty === difficulty);
    }

    setCurrentMap(mapName) {
        const map = this.getMapByName(mapName);
        if (map) {
            this.currentMap = map;
            return true;
        }
        return false;
    }
} 