import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { getBalance } from '../../utils/constants'
import axios from '../../utils/axios'

const WalletBalance = () => {
    const [balance,setBalance] = useState('')
    const id = Cookies.get('renter_id')
    useEffect(()=>{
     axios.get(`${getBalance}${id}/`).then((res)=>{
        console.log(res.data);
        setBalance(res.data)

     })
    },[id])
  return (
    <div>
      <h1>
        Available balance: ₹ {balance.balance}
      </h1>
    </div>
  )
}

export default WalletBalance
