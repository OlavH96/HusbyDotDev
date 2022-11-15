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
			<div>Settings</div>

			<label>Planet size</label>
			<input type="number" value={props.options.planetSize} onChange={e => { props.settingsChanged({ ...props.options, planetSize: Number.parseInt(e.target.value) }) }} />
			<label>Planet color</label>
			<div>
				<input type="color" value={props.options.planetColor} onChange={e => { props.settingsChanged({ ...props.options, planetColor: e.target.value }) }} />
				<button onClick={e => { props.settingsChanged({ ...props.options, planetColor: "random" }) }}>Reset</button>
			</div>
		</div>
	)
}
