import type { p5 } from 'p5-svelte';

export const g = 9.81;
export const G = 0.01; // Scaled for pixel-based simulation

export interface PlanetInfo {
	r: number;
	m: number;
}

export interface DrawInfo {
	x: number;
	y: number;
	color?: string;
}
export interface Velocity {
	x: number; // velocity in x direction (pixels per frame)
	y: number; // velocity in y direction (pixels per frame)
}
export interface MovementInfo {
	v: Velocity; // velocity vector
}

export interface PlanetProps {
	planet: PlanetInfo;
	draw: DrawInfo;
	movement: MovementInfo;
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
		return Math.sqrt(
			Math.pow(this.drawInfo.x - other.drawInfo.x, 2) +
				Math.pow(this.drawInfo.y - other.drawInfo.y, 2)
		);
	}
	isCollision(other: Planet) {
		return this.distanceTo(other) < this.planetInfo.r + other.planetInfo.r;
	}
	angle(other: Planet): number {
		let thisV = this.movement.v;
		let otherV = other.movement.v;

		let dotProduct = thisV.x * otherV.x + thisV.y * otherV.y;
		let thisMagnitude = Math.sqrt(Math.pow(thisV.x, 2) + Math.pow(thisV.y, 2));
		let otherMagnitude = Math.sqrt(Math.pow(otherV.x, 2) + Math.pow(otherV.y, 2));

		let angle = Math.acos(dotProduct / (thisMagnitude * otherMagnitude));

		return angle;
	}
	combine(p: Planet) {
		let newColor = Math.random() < 0.5 ? this.drawInfo.color : p.drawInfo.color;
		// Conservation of mass: add masses
		let newMass = p.planetInfo.m + this.planetInfo.m;
		// Volume-based radius calculation (assuming spheres)
		let newRadius = Math.cbrt(Math.pow(this.planetInfo.r, 3) + Math.pow(p.planetInfo.r, 3));
		// Center of mass position
		let totalMass = newMass;
		let newX = (this.drawInfo.x * this.planetInfo.m + p.drawInfo.x * p.planetInfo.m) / totalMass;
		let newY = (this.drawInfo.y * this.planetInfo.m + p.drawInfo.y * p.planetInfo.m) / totalMass;
		// Conservation of momentum: p_total = m1*v1 + m2*v2
		let newVx = (this.movement.v.x * this.planetInfo.m + p.movement.v.x * p.planetInfo.m) / totalMass;
		let newVy = (this.movement.v.y * this.planetInfo.m + p.movement.v.y * p.planetInfo.m) / totalMass;

		return new Planet({
			planet: { r: newRadius, m: newMass },
			draw: { x: newX, y: newY, color: newColor },
			movement: { v: { x: newVx, y: newVy } }
		});
	}
	attractTo(other: Planet) {
		let d = this.distanceTo(other);
		
		// Prevent division by zero for very close objects
		if (d < 1) d = 1;

		// Calculate gravitational force magnitude: F = G * m1 * m2 / r^2
		let F = (G * this.planetInfo.m * other.planetInfo.m) / (d * d);

		// Direction vector from this planet to other (normalized)
		let dirX = (other.drawInfo.x - this.drawInfo.x) / d;
		let dirY = (other.drawInfo.y - this.drawInfo.y) / d;

		// Calculate acceleration: a = F / m
		let ax = (F / this.planetInfo.m) * dirX;
		let ay = (F / this.planetInfo.m) * dirY;

		// Update velocity: v = v + a (assuming dt = 1 frame)
		this.movement.v.x += ax;
		this.movement.v.y += ay;
	}

	updatePosition() {
		// Update position: x = x + v * dt (dt = 1 frame)
		this.drawInfo.x += this.movement.v.x;
		this.drawInfo.y += this.movement.v.y;
	}

	draw(p5: p5) {
		p5.fill(this.drawInfo.color!);
		p5.circle(this.drawInfo.x, this.drawInfo.y, 2 * this.planetInfo.r);
	}
}
