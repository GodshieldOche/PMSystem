import React, {useState} from 'react'
import axios from 'axios'


const register = () => {

  const [inputs, setInputs] = useState({
    fullName: '',
    email: '',
    password: '',
    
  });

  const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (event:  React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

      try {
        const response =  (!inputs.fullName || !inputs.fullName || !inputs.password)? alert('All Fields are required'): await axios.post('/api/auth', inputs);
        
        setInputs({
          fullName: '',
          email: '',
          password: '',
        });
        window.location.href = "http://localhost:3000/auth/login";


      } catch (error) {
        alert(error);
      }
  }

  return (
    <div className='login'>
        <p className="welcome">Welcome To PM System, Enter Detail To Create Organization Account</p>

        <div className="form">
            <input type="text" onChange={handleChange} name="fullName" value={inputs.fullName || ""} placeholder='Enter Full Name' />
            <input type="text" onChange={handleChange} placeholder='Enter Email' name="email" value={inputs.email || ""} />
            <input type="text" onChange={handleChange} placeholder='Enter Password'  name="password" value={inputs.password || ""}/> <br />
            <button className="btn-primary" onClick={handleSubmit}>Register</button>

        </div>
    </div>
  )
}

export default register