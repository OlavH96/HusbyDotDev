import { useState } from "react";
import PlanetsCanvas from "./PlanetsCanvas";
import Settings, { Options } from './Settings';
import './Combined.css';

const Combined = () => {

	let [options, setOptions] = useState({
		planetSize: 10,
		planetMass: 1,
		planetColor: "random"
	} as Options)

	return <div className="wrapper">
		<PlanetsCanvas options={options} />
		<Settings settingsChanged={setOptions} options={options} />
	</div> 
}

export default Combined;