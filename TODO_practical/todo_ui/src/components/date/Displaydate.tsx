import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import './displaydate.css'

type Props = {}

type State = {}

class Displaydate extends Component<Props, State> {
	state = {}
	todayDate: Date = new Date()
	render() {
		return (
			<div className='container-fluid p-0'>
				<div className='row justify-content-between'>
					<div className='col col-5 d-flex'>
						<div className="row">
							<div className="col pe-1">
								<p className='day'>{this.todayDate.getDate()}</p>
							</div>
							<div className="col d-flex flex-column justify-content-center">
								<p className='dayDate'><strong> {this.todayDate.toLocaleString('default', { month: 'short' })} </strong></p>
								<p className='dayDate text-muted'> {this.todayDate.getFullYear()}</p>
							</div>
						</div>
					</div>
					<div className='col col-4 text-end d-flex align-items-center justify-content-end'>
						<p><strong>{this.todayDate.toLocaleString('default', { weekday: 'long' })}</strong></p>
					</div>
				</div>
			</div>
		)
	}
}

export default Displaydate

