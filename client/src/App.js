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

  const [newName, setNewName] = useState('');
  const [newPosition, setNewPosition] = useState('');

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
  const updateEmployee = (id) => {
    console.log(id);
    axios
      .put('http://localhost:5000/update', {
        name: newName,
        position: newPosition,
        id: id,
      })
      .then((resp) => {
        alert('updated');
        setEmpList(
          empList.map((employee) => {
            return employee.id === id
              ? {
                  id: employee.id,
                  name: newName,
                  position: newPosition,
                  salary: employee.salary,
                  age: employee.age,
                  techStack: employee.techStack,
                }
              : employee;
          })
        );
      });
  };
  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then((res) => {
      setEmpList(
        empList.filter((employee) => {
          return employee.id !== id;
        })
      );
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
            <div className='showInfo__section'>
              <h3>name: {employee.name} </h3>
              <p>age: {employee.age}</p>
              <p>position: {employee.position}</p>
              <p>tech stack: {employee.techStack}</p>
              <p>salary: {employee.salary}</p>
            </div>
            <div className='update__section'>
              <input
                type='text'
                placeholder='update employee name'
                onChange={(e) => {
                  e.preventDefault();
                  setNewName(e.target.value);
                }}
              />
              <input type='number' placeholder='update employee age' />
              <input
                type='text'
                placeholder='update employee position'
                onChange={(e) => {
                  e.preventDefault();
                  setNewPosition(e.target.value);
                }}
              />
              <input type='text' placeholder='update employee tech stack' />
              <input type='number' placeholder='update employee salary' />
              <button onClick={() => updateEmployee(employee.id)}>
                Update
              </button>
            </div>
            <div className=''>
              <button
                onClick={() => {
                  deleteEmployee(employee.id);
                }}>
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
