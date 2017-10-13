import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Companies extends Component {

  state = {
    companies: []
  }

  async componentWillMount () {
    const response = await axios.get('/api/companies')
    const companies = response.data
    this.setState({companies})
  }

  render () {
    return (
      <div>
        <h1>The Snowboard Store</h1>

        <h3>Companies:</h3>
        <div>
          <a href="/companies/new">Add New Company</a>
        </div>

        {
          this.state.companies.map((company, index) => {
            return (
              <div key={index}>
                {`${company.name} - ${company.country}`}
                <Link to={`/companies/${company._id}`}> {company.name}'s Info </Link>
              </div>
            )
          })
        }

      </div>
    )
  }
}

export default Companies