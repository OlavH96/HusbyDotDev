import p5Types from 'p5';

export const g = 9.81;
export const G = 6.6743 * 10e-11;

export interface PlanetInfo {
    r: number,
    m: number,
}

export interface DrawInfo {
    x: number,
    y: number,
    color?: string
}
export interface Direction {
    x: number, // 0-1 scale to indicate direction
    y: number, // 0-1 scale to indicate direction
}
export interface MovementInfo {
    a: number, // Accelleration
    v: number, // Speed,
    direction: Direction
}

export interface PlanetProps {
    planet: PlanetInfo,
    draw: DrawInfo,
    movement: MovementInfo
}

export default class Planet {

    planetInfo;
    drawInfo;
    movement;

    constructor(props: PlanetProps) {

        this.planetInfo = props.planet;
        this.drawInfo = props.draw;
        this.movement = props.movement;
    }

    attractTo(other: Planet) {
        let d = Math.sqrt(Math.pow(this.drawInfo.x - other.drawInfo.x, 2) + Math.pow(this.drawInfo.y - other.drawInfo.y, 2));

        let F = (G * this.planetInfo.m * other.planetInfo.m) / (d * d);
        
        let dirV = { x: other.drawInfo.x - this.drawInfo.x, y: other.drawInfo.y - this.drawInfo.y };
        
        this.movement.a += F;
        this.movement.direction.x += (dirV.x / d);
        this.movement.direction.y += (dirV.y / d);

        this.calculateXYChange();
    }
    calculateXYChange() {
        console.log("Calculate XY Change");
        console.log("Movement",this.movement.direction);
        console.log("V",this.movement.v);
        
        
        //this.movement.v += this.movement.a;
        this.drawInfo.x += this.movement.direction.x * this.movement.v;
        this.drawInfo.y += this.movement.direction.y * this.movement.v;
    }

    draw(p5: p5Types) {
        p5.fill(this.drawInfo.color!);
        p5.circle(this.drawInfo.x, this.drawInfo.y, 2 * this.planetInfo.r);
        p5.point(this.drawInfo.x, this.drawInfo.y, 2 * this.planetInfo.r);
    }
}