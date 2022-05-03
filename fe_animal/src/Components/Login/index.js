import { Button, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../Assets/logo.png"
import GoogleIcon from '@mui/icons-material/Google';
const LoginPage = () => {
  return (
    <div className='top-0 absolute w-full flex justify-center items-center py-40 bg-bg-login text-white bg-cover bg-center'>
        <div className='flex flex-col justify-center items-center w-1/3 border-2 rounded-xl bg-slate-600 bg-opacity-50'>
            <img width={200} height={200} src={Logo} alt="logo" className='py-3'/>
            <h2 className='text-3xl font-bold py-4'>Contributor Login</h2>
            <TextField label="Email"  className="w-5/6 bg-white"/>
            <TextField label="Password" className='w-5/6 mt-3 bg-white'/>
            <Button variant='contained' color="primary" className='w-1/2 mt-3'>Log In</Button>
            <Link className='my-4 border-b-2 w-5/6 flex justify-center' to="/register">Forgot your password?</Link>
        
            <Button startIcon={<GoogleIcon/>} className='mb-5' variant='contained' color='error'>Login with google account</Button>
        </div>
    </div>
  )
}

export default LoginPage