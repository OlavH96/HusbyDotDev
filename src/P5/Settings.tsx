import React from 'react'
import { useState } from 'react';
import './Settings.css';

export type Options = {
	planetSize: number;
	planetMass: number;
	planetColor: string;
}

type Props = {
	settingsChanged: (options: Options) => void,
	options: Options
};

export default function Settings(props: Props) {

	return (
		<div className='settings'>
			<h1>Settings</h1>

			<section>
				<label>Planet size</label>
				<input type="number" value={props.options.planetSize} onChange={e => { props.settingsChanged({ ...props.options, planetSize: Number.parseInt(e.target.value) }) }} />
				<button onClick={e => { props.settingsChanged({ ...props.options, planetSize: 10 }) }}>Reset</button>
			</section>
			<section>
				<label>Planet mass</label>
				<input type="range" min="0.1" max="10" value={props.options.planetMass} onChange={e => { props.settingsChanged({ ...props.options, planetMass: Number.parseInt(e.target.value) }) }} />
				<p>{props.options.planetMass}</p>
				<button onClick={e => { props.settingsChanged({ ...props.options, planetMass: 1 }) }}>Reset</button>
			</section>
			<section>
				<label>Planet color</label>
				<input type="color" value={props.options.planetColor} onChange={e => { props.settingsChanged({ ...props.options, planetColor: e.target.value }) }} />
				<button onClick={e => { props.settingsChanged({ ...props.options, planetColor: "random" }) }}>Reset</button>
			</section>
		</div>
	)
}
