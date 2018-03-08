import React, { Component } from 'react';

export default class Form extends Component {
	constructor(props) {
    super(props);
    this.state = {sport: '', location: ''};
    }
    
	render(){
		return (
				<form onSubmit = {this.props.handler}>
					<table><tbody>
					<tr>
					<th colSpan="3">
					<label>
						Location <input type="text"  id ="location"/>
					</label>
					</th>
					</tr>
					<tr>
					<td><input type="button" value="Sail" id ="sport" onClick={this.props.handler}/></td>
					<td><input type="button" value="Surf" id ="sport" onClick={this.props.handler}/></td>
					<td><input type="button" value="Swim" id ="sport" onClick={this.props.handler}/></td>
					</tr>
					<tr>
					<td><input type="button" value="Scuba" id ="sport" onClick={this.props.handler}/></td>
					<td><input type="button" value="Row" id ="sport" onClick={this.props.handler}/></td>
					<td><input type="button" value="Windsurf" id ="sport" onClick={this.props.handler}/></td>
					</tr>
					<tr>
					<td colSpan="3"><input type="submit" value="Submit"/></td>
					</tr>
					</tbody></table>
				</form>
		);
	}
}
