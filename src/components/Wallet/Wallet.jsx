import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios'
import { editcreditWallet, getBookingDetails } from '../../utils/constants'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import WalletModal from '../Modal/WalletModal'
import WalletBalance from './WalletBalance'

const Wallet = () => {
  const renter_id = Cookies.get('renter_id')
  const [bookedCars,setBookedCars] = useState([])
  const [walletPopUp,setWalletPopUp] = useState(false)
  useEffect(()=>{
    axios.get(`${getBookingDetails}${renter_id}/`).then((res)=>{
      console.log(res.data);
      setBookedCars(res.data)
    })
  },[renter_id])
  const creditWallet = (id,revenue)=>{
    console.log('onclick');
    const data= {revenue,id,renter_id}
           axios.patch(editcreditWallet,data).then((res)=>{
            console.log(res.data);
            toast.success('Money is credited to your wallet')
           })
  }
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };
  const getStatus = (start_date, end_date) =>{

     const start = new Date(start_date)
     const end = new Date(end_date)
     const today = new Date()
     const withdrawalDate = new Date(end);
          withdrawalDate.setDate(withdrawalDate.getDate() + 7);

    if (today >= withdrawalDate){
      return 'Withdraw Money'
    }
    if (start <= today && end >= today){
      return 'Started'
    }
    if (end < today){
      return 'Ended'
    }
    else{
      return 'Pending'
    }
    
  }
  return (
    <div>
      <div>
   <h3 style={{fontFamily:'sans-serif',textAlign:'center'}}>Booked Cars</h3>
          <button style={{marginBottom:'2rem',backgroundColor:'orangered', border:'0',color:'white'}} className='btn btn-info' onClick={()=>setWalletPopUp(true)}>
   Wallet <FontAwesomeIcon icon={faWallet}/></button>
</div>

<div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Your Revenue</th>
                                    <th>StartDate</th>
                                    <th>EndDate</th>
                                    <th>Money</th>

                                </tr>
                            </thead>
                           
                               <tbody>
                               {bookedCars.map((r)=>(
                                     <tr >
                                     <td>{r.id}</td>
                                    <td>{r.car_name}</td>
                                    <td>{r.total_rent/100 * 40}</td>
                                    <td>{formatDate(r.start_date)}</td>
                                    <td>{formatDate(r.end_date)}</td>
                                    <td>
                                    {r.withdrawal_status === true ?
                                    <button className='btn btn-success'>Withdrawed</button>:(
                                         <button  className='accept' style={{borderRadius:'10px', color:'white',height:'3rem',width:'7rem',backgroundColor:'orangered'}}
                                         onClick={()=> {
                                          if (getStatus(r.start_date,r.end_date) === 'Withdraw Money'){
                                                creditWallet(r.id,r.total_rent/100 * 40)
                                          }
                                         }}
                                         >{getStatus(r.start_date,r.end_date)}</button>
                                   
                                       
                                    )}
                                   
                                  </td>
                                </tr>
                            
                               ))}
                              
                           </tbody>
                          
                                  
                        </table>
                    </div>
                </div>
         <WalletModal
         walletPopUp ={walletPopUp}
         setWalletPopUp = {setWalletPopUp}
         title ='Your Wallet'>
            <WalletBalance/> 
         </WalletModal>
    </div>
  )
}

export default Wallet
