import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from '../../utils/axios'
import { signupPost } from '../../utils/constants'
import { toast } from 'react-hot-toast'


const Signup = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState : {errors}} = useForm()
    const onSubmit = (data)=>{
        axios.post(signupPost,data,{ headers:{"Content-Type": "application/json"},
    }).then((res)=>{
        console.log(res.data);
        if(res.data.status === 'renter created'){
            toast.success('user Created')
            navigate('/')
        }
        if (res.data.status === 'email already taken'){
            toast.error('Email already registered ')

        }
    })

    }
  return (
    <div>
      <section className="vh-100" style={{backgroundColor: '#eee'}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: '25px'}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={handleSubmit(onSubmit)}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text"  className="form-control" {...register('name',{required:'true'})} name ='name' id ='name' />
                      <label className="form-label" for="form3Example1c">Your Name</label>
                      {errors.name && <p className='text-danger'>This field is Required</p>}
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control" {...register('email',{required:'true'})} name= 'email' />
                      <label className="form-label" for="form3Example3c">Your Email</label>
                      {errors.email && <p className='text-danger'> This field is Required</p>}
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="number" id="form3Example4c" className="form-control" {...register('phone',{required:'true'})} name='phone' />
                      <label className="form-label" for="form3Example4c">Number</label>
                      {errors.number && <p className='text-danger'>This Field is required</p>}
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" className="form-control" {...register('password',{required:true})} name ='password' />
                      <label className="form-label" for="form3Example4cd">password</label>
                      {errors.password && <p className='text-danger'>This Field is Required</p>}
                    </div>
                   
                  </div>

                   <p>Already have an account <span style={{color:'red',fontWeight:'700'}} onClick={()=>{navigate('/')}}><u>Login here</u></span></p>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Signup
