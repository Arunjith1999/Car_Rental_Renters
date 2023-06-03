import React, { useEffect, useState } from 'react'
import Modal from '../Modal/WalletModal'
import AddCar from './RequestCar'
import Cookies from 'js-cookie'
import axios from '../../utils/axios'
import { carGet } from '../../utils/constants'
import './Cars.css'


const RequestHistory = () => {

    const [carlist, setCarlist] = useState([])
    const id = Cookies.get('renter_id')

    useEffect(()=>{
        axios.get(`${carGet}${id}/`).then((res)=>{
            setCarlist(res.data)
            console.log(res.data);
        })
    },[])
   
  return (
    <>
    <div>
   <h3 style={{fontFamily:'sans-serif',textAlign:'center'}}>Your Cars</h3>
{/* <button className='btn btn-success'style={{marginLeft:'50rem',marginBottom:'1rem',borderRadius:'20px'}}>
    Add New Car</button> */}
</div>

<div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Fuel Type</th>
                                    <th>Rent-Price</th>
                                    <th>Status</th>

                                </tr>
                            </thead>
                           
                               <tbody>
                               {carlist.map((r)=>(
                               <tr >
                                    <td>{r.id}</td>
                                   <td>{r.name}</td>
                                   <td><img style={{width:'120px',height:'90px'}} src={`https://ap.carrent.website${r.image}`} alt="" />  </td>
                                   <td>{r.fuel}</td>
                                   <td>{r.rent_price}</td>
                                   <td style={{width:'20em' }}>
                                    {r.is_accepted === 'accepted' ? (
                                        <button  className='accept' style={{borderRadius:'0px'}}  title='Your Request is Accepted ✅' >Accepted</button>
                                    ):r.is_accepted === 'rejected' ?(
                                      <button className='reject' title='Your Request is Rejected❌' >Rejected </button>
                                    ):(
                                         <button className='verify' title='Your Request is Under Verification ⌛'  style={{borderRadius:'0px'}}>Verifying</button>
                                    )}
                                  
                                 </td>
                               </tr>
                               ))}
                           </tbody>
                          
                                  
                        </table>
                    </div>
                </div>
                
         </>
  )
}

export default RequestHistory
