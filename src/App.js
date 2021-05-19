import React, { Component } from 'react'
import { FiPlus, FiMinus } from "react-icons/fi";
import './App.css';

class App extends Component {
  constructor(props) {
    super()
    this.detail = {
      firstName: '',
      lastName: ''
    }

    this.state = {
      form: [{ ...this.detail }],
      nameList: []
    }
  }

  resetForm = () => {
    this.setState({
      form: [{ ...this.detail }]
    })
  }

  handleAddForm = (e) => {
    e.preventDefault();
    let arr = this.state.form.map(i => ({ ...i }));
    arr.push({ ...this.detail })
    this.setState({
      form: arr
    })
  }

  handleRemoveForm = (e, index) => {
    e.preventDefault();
    let arr = this.state.form.map(i => ({ ...i }));
    arr.splice(index, 1)
    this.setState({
      form: arr
    })
  }

  handleChange = (e, index) => {
    let arr = this.state.form.slice()
    arr[index][e.target.name] = e.target.value
    this.setState({
      form: arr
    })
  }

  handleSumbit = (e) => {
    e.preventDefault()
    let nameArr = this.state.nameList.map(i => ({ ...i }));
    let formArr = this.state.form.slice();
    this.state.form.map((value, index) => {
      nameArr.push(value)
    })
    this.setState({
      nameList: nameArr
    })
    this.resetForm()
  }

  componentDidMount() {
    console.log(this.state, ' state')
  }

  render() {
    const { form, nameList } = this.state
    return (
      <div className="App">
        <div className='divBody'>
          {
            form.length && form.map((value, index) => {
              return (
                <form key={index}>
                  <ul>
                    <li>
                      <label for="name">Name:</label>
                      <input
                        type="text"
                        value={value.firstName}
                        name="firstName"
                        onChange={(e) => this.handleChange(e, index)}
                        placeholder="First Name"
                      />
                    </li>
                    <li>
                      <label for="mail">E-mail:</label>
                      <input
                        type="text"
                        value={value.lastName}
                        name="lastName"
                        onChange={(e) => this.handleChange(e, index)}
                        placeholder="Last Name" />
                    </li>
                    {
                      form.length === index + 1
                        ?
                        <li>
                          <FiPlus color={'green'} size={20} onClick={this.handleAddForm} />
                        </li>
                        :
                        <li>
                          <FiMinus color={'red'} size={20} onClick={(e) => this.handleRemoveForm(e, index)} />
                        </li>
                    }
                  </ul>
                </form>
              )
            })
          }
          <button
            type="submit"
            value="Submit"
            style={{ marginTop: '10px' }}
            onClick={this.handleSumbit}>Submit</button>
        </div>

        <div className="nameList">

          <table style={{ marginTop: '10px' }}>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
            </tr>
            {
              nameList.length > 0 && nameList.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.firstName}</td>
                    <td>{value.lastName}</td>
                  </tr>
                )
              })
            }
          </table>
        </div>

      </div>
    );
  }
}

export default App;
