import React from 'react'
import './Content.css'
import Link from '../Components/Link';
import Bio from './Bio/Bio';


export default function Content() {
	return (
		<div className='content'>
			<Bio/>
			<div className='links'>
				<Link url="https://github.com/OlavH96" text='GitHub' />
				<Link url="https://www.linkedin.com/in/olav-husby-7039489a/" text='LinkedIn' />
			</div>
		</div>
	)
}
