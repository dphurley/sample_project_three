import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Company extends Component {

  state = {
    company: {}
  }

  async componentWillMount() {
    const companyId = this.props.match.params.companyId
    const response = await axios.get(`/api/companies/${companyId}`)
    const company = response.data
    this.setState({company})
  }

  render () {
    return (
      <div>
        <h1>{this.state.company.name}</h1>
        <div>Country: {this.state.company.country}</div>

        <div>
          <Link to="/">Back to Companies</Link>
        </div>
        <div>
          <a href="/companies/{{company._id}}/edit">Edit</a>
        </div>
        <div>
          <a href="/companies/{{company._id}}/delete">Delete</a>
        </div>
      </div>
    )
  }
}

export default Company
