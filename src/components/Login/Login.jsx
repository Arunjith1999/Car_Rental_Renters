import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { toast } from 'react-hot-toast'
import axios from '../../utils/axios'
import { loginPost } from '../../utils/constants'
import Cookies from 'js-cookie'

const Login = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState : {errors}} = useForm()
    const onSubmit = (data)=>{
        axios.post(loginPost,data,{
            headers:{'content-Type':'application/json'},
        }).then((res)=>{
            console.log(res.data);
            if (res.data.status === 'true'){
              toast.success('Login success')
              Cookies.set('jwt',String(res.data.jwt_token))
              Cookies.set('renter_id',String(res.data.renter_id))
              navigate('/home')
            }
            else{
              toast.error('Incorrect password or email')
            }
        })

    }
  return (
    <div>
      <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p style={{fontFamily:'fantasy', fontSize:'45px', color:'blue'}} >Sign in</p>
          </div>


          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input type="email" id='email' className="form-control form-control-lg"
              placeholder="Enter a valid email address" {...register('email',{required:true})} name='email' />
            <label className="form-label" for="form3Example3">Email address</label>
            {errors.email && <p className='text-danger'>This Field is Required</p>}
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-3">
            <input type="password" id="password" className="form-control form-control-lg"
              placeholder="Enter password" name='password' {...register('password',{required:true})} />
            <label className="form-label" for="form3Example4">Password</label>
            {errors.password && <p className='text-danger'>This Field is Required</p>}
          </div>

          <div className="d-flex justify-content-between align-items-center">
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg"
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                className="link-danger" onClick={()=>{navigate('/signup')}}>Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
  <div
    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
    {/* <!-- Copyright --> */}
    <div className="text-white mb-3 mb-md-0">
      {/* Copyright © 2020. All rights reserved. */}
    </div>
    {/* <!-- Copyright --> */}

    {/* <!-- Right --> */}
    <div>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-google"></i>
      </a>
      <a href="#!" className="text-white">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
    {/* <!-- Right --> */}
  </div>
</section>
    </div>
  )
}

export default Login
