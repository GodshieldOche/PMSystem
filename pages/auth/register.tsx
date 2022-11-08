import React from 'react'

const register = () => {
  return (
    <div className='login'>
        <p className="welcome">Welcome To PM System, Enter Detail To Create Organization Account</p>

        <div className="form">
            <input type="text" placeholder='Enter Full Name' />
            <input type="text" placeholder='Enter Email' />
            <input type="text" placeholder='Enter Password' />
            <input type="text" placeholder='Enter Organization Name' />
            <input type="text" placeholder='Describe your organization' /> <br />

            <button className="btn-primary">Register</button>

        </div>
    </div>
  )
}

export default register