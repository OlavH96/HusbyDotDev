import React from 'react'
import './Link.css'

interface LinkProps {
	url: string,
	text: string
}

export default function Link(props: LinkProps) {
	return (
		<a className='link' href={props.url}>{props.text}</a>

	)
}
