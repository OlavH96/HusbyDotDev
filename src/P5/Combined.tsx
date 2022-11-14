import { useState } from "react";
import PlanetsCanvas from "./PlanetsCanvas";
import Settings, { Options } from './Settings';
import './Combined.css';

const Combined = () => {

	let [options, setOptions] = useState({
		planetSize: 5,
		planetMass: 0.00001,
		planetColor: "random"
	} as Options)

	return <div className="wrapper">
		<PlanetsCanvas options={options} />
		<Settings settingsChanged={setOptions} options={options} />
	</div> 
}

export default Combined;