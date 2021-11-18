import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [position, setPosition] = useState('');
  const [techStack, setTechStack] = useState('');
  const [salary, setSalary] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, age, position, techStack, salary);
  };

  const addEmployee = (e) => {
    e.preventDefault();
    console.log(name);
    axios
      .post('http://localhost:5000/create', {
        name: name,
        age: age,
        position: position,
        techStack: techStack,
        salary: salary,
      })
      .then(() => {
        console.log('Success');
      });
  };

  return (
    <div className='App'>
      <Header />
      <div className='container'>
        <img src={logo} className='App-logo' alt='logo' />
        <form onSubmit={addEmployee}>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor=''>Age:</label>
          <input
            type='number'
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <label htmlFor=''>Position:</label>
          <input
            type='text'
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          />
          <label htmlFor=''>Tech Stack:</label>
          <input
            type='text'
            onChange={(e) => {
              setTechStack(e.target.value);
            }}
          />
          <label htmlFor=''>Salary:</label>
          <input
            type='number'
            onChange={(e) => {
              setSalary(e.target.value);
            }}
          />
          <button type='submit'>Add Employee</button>
        </form>
      </div>
    </div>
  );
}

export default App;
