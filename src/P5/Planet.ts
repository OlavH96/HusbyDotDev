import p5 from 'p5';
import p5Types from 'p5';

// = 6.6743 * 10e-11;
export const G = 6.6743 * 10e-3;

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
        let thisMagnitude = Math.sqrt(Math.pow(thisDir.x, 2) + Math.pow(thisDir.y, 2))
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

        return new Planet({ planet: { r: newRadius, m: newMass }, draw: { x: newX, y: newY, color: newColor }, movement: { a: newA, v: newV, direction: { x: newDirX, y: newDirY } } })
    }

    drawDirectionLine(p5: p5) {
        p5.stroke(0,255,0)
        p5.line(this.drawInfo.x, this.drawInfo.y, this.drawInfo.x+this.movement.direction.x*50, this.drawInfo.y+this.movement.direction.y*50)
    }
    attractTo(other: Planet, p5: p5) {
        let d = this.distanceTo(other);

        let F = (G * this.planetInfo.m * other.planetInfo.m) / (d * d);

        let dirV = { x: (other.drawInfo.x - this.drawInfo.x) / d, y: (other.drawInfo.y - this.drawInfo.y) / d };
        this.movement.direction.x = dirV.x;
        this.movement.direction.y = dirV.y;

        console.log(this.movement.direction.x, d);

        // acceleration should go up if we are heading towards the target, down if we are heading away
        if (dirV.x + dirV.y > 0) {
            // 
            this.movement.a += F / this.planetInfo.m; // F = m*a. a = F/m
        }
        else {

            this.movement.a -= F / this.planetInfo.m;
          }
        
        //}
        //else {
        //this.movement.a += F / this.planetInfo.m;
        //}
        console.log("Force", F, this.planetInfo.m, "Distance", d, "Acceleration", this.movement.a);


        this.movement.v += this.movement.a;
        this.drawDirectionLine(p5);
        this.calculateXYChange();
    }

    calculateXYChange() {


        let deltaX = this.movement.direction.x * this.movement.v;
        let deltaY = this.movement.direction.y * this.movement.v;

        console.log("Acceleration", this.movement.a);
        console.log("Velocity", this.movement.v);

        console.log("Delta x", deltaX);
        console.log("Delta y", deltaY);
        this.drawInfo.x += deltaX;
        this.drawInfo.y += deltaY;
    }

    draw(p5: p5Types) {
        p5.fill(this.drawInfo.color!);
        p5.circle(this.drawInfo.x, this.drawInfo.y, 2 * this.planetInfo.r);
    }
}