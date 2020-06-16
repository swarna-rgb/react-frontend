import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toyData: [], //storage/ state
      newToyName: '',
      newToyCategory: '',

      newEditName: '', //when edit form is updated add to this string
    };
    //  bind method in constructor
    this.nameChange = this.nameChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteToy = this.deleteToy.bind(this);
    this.editName = this.editName.bind(this);
  }

  //  calling a asyncronusly
  async componentDidMount() {
    try {
      const { data } = await axios.get('http://127.0.0.1:8000/toys/'); //waiting for data to add to storage
      console.log(data); //
      this.setState({ toyData: data }); //if success update storage/state
    } catch (err) {
      // error handling
      console.log(err);
    }
  }

  nameChange(e) {
    this.setState({ newToyName: e.target.value });
  }

  categoryChange(e) {
    this.setState({ newToyCategory: e.target.value });
  }

  async handleSubmit(e) {
    const { newToyCategory, newToyName } = this.state;
    e.preventDefault();
    try {
      const { data } = await axios.post('http://127.0.0.1:8000/toys/', {
        name: newToyName,
        category: newToyCategory,
      });
      this.setState({ newToyCategory: '', newToyName: '' });

      // create new array
      // take old state information, and new data that was from post
      // add this information to new array and set that as the new state
      // as opposed to mutating state

      //spread operator
      this.setState({ toyData: [...this.state.toyData, data] });
      console.log('data', data);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteToy(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/toys/${id}`);
      // filter out toy to delete
      const newToyArr = this.state.toyData.filter((toy) => toy.id !== id);
      // set new state by using clone of old array with deleted toy removed
      this.setState({ toyData: newToyArr });
    } catch (err) {
      console.log(err, 'ERROR');
    }
  }

  editName(e) {
    this.setState({ newEditName: e.target.value });
    console.log(e.target.value, '<><><><><><>');
  }

  async updateToyName(e, id) {
    e.preventDefault();
    const { editName } = this.state;
    console.log(id, '<><><><><>', editName);
  }

  render() {
    // grabbing toy date from our storage
    const { toyData, newToyName, newToyCategory, newEditName } = this.state;
    return (
      <div className='App'>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.nameChange}
              name={newToyName}
              value={newToyName}
            />
            <input
              onChange={this.categoryChange}
              name={newToyCategory}
              value={newToyCategory}
            />
            <button type='submit'>Add new toy</button>
          </form>
        </div>
        <ul>
          {
            // iterate over toy data
            toyData.map(({ id, name, category }) => (
              <li key={id}>
                <h3>{name}</h3>
                <h6>{category}</h6>
                {/* event is not being used by delete toy this is why we let the function return deleteToy with id */}
                <button onClick={(event) => this.deleteToy(id)}>
                  Delete Toy
                </button>
                <form onSubmit={(e) => this.updateToyName(e, id)}>
                  {/* edit section */}
                  <input onChange={this.editName} value={name} />
                  <button>Update Toy Name</button>
                </form>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
