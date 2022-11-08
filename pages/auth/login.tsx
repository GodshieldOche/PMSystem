import React from 'react'

const login = () => {
  return (
    <div className='login'>
        <p className="welcome">Welcome To PM System, Enter Details To Login</p>

        <div className="form">
            <input type="text" placeholder='Enter Email' />
            <input type="text" placeholder='Enter Password' /><br />
            <button className="btn-primary">Login</button>
        </div>
    </div>
  )
}

export default login