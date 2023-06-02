import React, { useState } from 'react'
import './Home.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar,  faHistory, faLock,  faWallet} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import Profile from '../Profile/Profile'

import Wallet from '../Wallet/Wallet'
import RequestCar from '../Cars/RequestCar'
import RequestHistory from '../Cars/RequestHistory'
import Cookies from 'js-cookie'

const Home = () => {
    const [status,setstatus]  = useState('')
    const [showDeleteSwal, setShowDeleteSwal] = useState(false);
    const handleClick =(s)=>{
    setstatus(s)
  }
  const navigate = useNavigate()


  const logoutHandler = ()=>{
    setShowDeleteSwal(true);
    {showDeleteSwal && (
        Swal.fire({
          title: 'Are you sure you want to logout ?',
          text: '!!!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, confirm!',
          cancelButtonText: 'cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/')
            Cookies.remove('jwt')
            Cookies.remove('renter_id')
              setShowDeleteSwal(false);
            }else {
              // User clicked the cancel button, hide the swal
              setShowDeleteSwal(false);
            }
          })
        )}
    
  }
  return (
    <div class="container" style={{zoom:'1.34'}}>
    <div class="profile">
        <div class="profile-header">
            <div class="profile-header-cover"></div>
            <div class="profile-header-content">
                <div class="profile-header-img">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                </div>
                <ul class="profile-header-tab nav nav-tabs nav-tabs-v2">
                    <li class="nav-item">
                        <Link  className="nav-link" href="index.html">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span onClick={()=>handleClick('Cars')}><div className='nav-field' style={{color:'tomato'}}> Request Car<div className='nav-value'><FontAwesomeIcon style={{color:'orangered'}} icon={faCar}/></div> </div></span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link  className="nav-link" href="index.html">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span onClick={()=>handleClick('Request')}><div className='nav-field' style={{color:'tomato'}}>History<div className='nav-value'><FontAwesomeIcon style={{color:'orangered'}} icon={faHistory}/></div> </div></span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link  className="nav-link" href="index.html">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span onClick={()=>handleClick('Wallet')}><div className='nav-field' style={{color:'tomato'}}>Wallet<div className='nav-value'><FontAwesomeIcon style={{color:'orangered'}} icon={faWallet}/></div> </div></span>
                        </Link>
                    </li>
                    <li class="nav-item">
                          <Link  className="nav-link" >
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span ><div className='nav-field' onClick={logoutHandler} style={{color:'tomato'}}>Logout <div className='nav-value'><FontAwesomeIcon style={{color:'orangered'}} icon={faLock}/></div> </div></span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
      
        <div class="profile-container">
            <div class="profile-sidebar">
                <div class="desktop-sticky-top">
                    <h4>John Smith</h4>
                    <div class="font-weight-600 mb-3 text-muted mt-n2">@johnsmith</div>
                    <p>
                        Principal UXUI Design &amp; Brand Architecture for Studio. Creator of SeanTheme. Bringing the world closer together. Studied Computer Science and Psychology at Harvard University.
                    </p>
                    <div class="mb-1"><i class="fa fa-map-marker-alt fa-fw text-muted"></i> New York, NY</div>
                    <div class="mb-3"><i class="fa fa-link fa-fw text-muted"></i> seantheme.com/studio</div>
                    <hr class="mt-4 mb-4" />
                </div>
            </div>

            <div class="profile-content">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="tab-content p-0">
                            <div class="tab-pane fade active show" id="profile-followers">
                               
     {(() => {
        switch (status) {
        //   case 'Profile':
        //     return <Profile/>
          case 'Cars':
            return <RequestCar/>
          case 'Request':
            return <RequestHistory/>
          case 'Wallet':
            return <Wallet/>
          default:
            return <RequestCar/>
        }
      })()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Home
