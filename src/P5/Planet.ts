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
    distanceTo(other: Planet) {
        return Math.sqrt(Math.pow(this.drawInfo.x - other.drawInfo.x, 2) + Math.pow(this.drawInfo.y - other.drawInfo.y, 2))
    }
    isCollision(other: Planet) {
        return this.distanceTo(other) < this.planetInfo.r + other.planetInfo.r;
    }
    angle(other: Planet): number {
        let thisDir = this.movement.direction
        let otherDir = other.movement.direction;

        let dotProduct = (thisDir.x * thisDir.y) + (otherDir.x * otherDir.y);
        let thisMagnitude = Math.sqrt(Math.pow(thisDir.x, 2) + Math.pow(thisDir.y,2))
        let otherMagnitude = Math.sqrt(Math.pow(otherDir.x, 2) + Math.pow(otherDir.y, 2))

        let angle = Math.acos(dotProduct / (thisMagnitude * otherMagnitude));

        return angle;
    }
    combine(p: Planet) {
        let newColor = Math.random() < 0.5 ? this.drawInfo.color : p.drawInfo.color;
        let newMass = (p.planetInfo.m + this.planetInfo.m) / 2;
        let newRadius = (p.planetInfo.r + this.planetInfo.r) / 2;
        let newX = (this.drawInfo.x + p.drawInfo.x) / 2;
        let newY = (this.drawInfo.y + p.drawInfo.y) / 2;
        let newA = (this.movement.a + p.movement.a) / 2;
        let newV = (this.movement.v + p.movement.v) / 2;
        let newDirX = (this.movement.direction.x + p.movement.direction.x) / 2;
        let newDirY = (this.movement.direction.y + p.movement.direction.y) / 2;

		return new Planet({ planet: { r: newRadius, m: newMass }, draw: { x: newX, y: newY, color: newColor}, movement: { a: newA, v: newV, direction: { x: newDirX, y: newDirY } } })
    }
    attractTo(other: Planet) {
        let d = this.distanceTo(other);

        let F = (G * this.planetInfo.m * other.planetInfo.m) / (d * d);
        
        let dirV = { x: other.drawInfo.x - this.drawInfo.x, y: other.drawInfo.y - this.drawInfo.y };

        if ((dirV.x / d) - this.movement.direction.x < 0 || (dirV.y / d) - this.movement.direction.y < 0) {
            this.movement.a -= F / this.planetInfo.m;

        }
        
        this.movement.a += F / this.planetInfo.m;
        this.movement.direction.x += (dirV.x / d);
        this.movement.direction.y += (dirV.y / d);

        this.calculateXYChange();
    }

    calculateXYChange() {
        //this.movement.v += this.movement.a;
        this.drawInfo.x += this.movement.direction.x * this.movement.v;
        this.drawInfo.y += this.movement.direction.y * this.movement.v;
    }

    draw(p5: p5Types) {
        p5.fill(this.drawInfo.color!);
        p5.circle(this.drawInfo.x, this.drawInfo.y, 2 * this.planetInfo.r);
    }
}