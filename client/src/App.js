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

  const [empList, setEmpList] = useState([]);

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
        setEmpList(
          [
            ...empList,
            {
              name: name,
              age: age,
              position: position,
              techStack: techStack,
              salary: salary,
            },
          ].reverse()
        );
      });
  };

  const getEmployees = () => {
    axios.get('http://localhost:5000/employees').then((response) => {
      const res = response.data;
      console.log(res);
      setEmpList(res.reverse());
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
      <br />
      <div className='showEmployees'>
        <button onClick={getEmployees}>Show Employees</button>
        {empList.map((employee) => (
          <div key={employee.id} className='emp__list'>
            <h3>name: {employee.name} </h3>
            <p>age: {employee.age}</p>
            <p>position: {employee.position}</p>
            <p>tech stack: {employee.techStack}</p>
            <p>salary: {employee.salary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
