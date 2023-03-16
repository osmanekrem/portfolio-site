import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { setToken } from '../../redux/auth'
import "./styles.css"

export default function Login() {

  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const token = useSelector(state => state.auth.token)

  const dispatch = useDispatch()

  const handleLogin = async e => {
    e.preventDefault()
    const response = await fetch(process.env.REACT_APP_API_BASE_URL+'/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      if(data.token) {
        console.log(token);
        dispatch(setToken(data.token));
       
      }
    } else {
      alert('Kullanıcı adı veya şifre yanlış.');
    }

  }

  if(token) {
    return <Navigate to="/dashboard" replace={true} />
  }

  console.log(token);

  return (
    <div className='login'>
        <h1>Log in</h1>
        <form className='form' onSubmit={handleLogin}>
            <input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Log in</button>
        </form>
    </div>
  )
}
