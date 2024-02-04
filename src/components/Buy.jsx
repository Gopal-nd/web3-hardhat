
import { ethers } from 'ethers';
import React, { useState } from 'react'

const Buy = ({state}) => {
    const [money,setmoney] = useState(0.001)
    const [feild, setfeild] = useState({
        name:'',
        message:'',
        imageURL:''
    })
    const buyChai = async()=>{
        event.preventDefault();
        const {contract} = state;
        const amount = {value:ethers.utils.parseEther(money)}
      
        const transaction = await contract.buyChai(feild.name,feild.message,feild.imageURL,amount)
        await transaction.wait();
        alert('transaction is succesful');
        window.location.reload();

    }

  return (
<div className="center">
       <h1>Thanks</h1>
        <form onSubmit={buyChai}>
          <div className="inputbox">
            <input type="text" value={feild.name} onChange={(e)=>setfeild({...feild,name:e.target.value})} required="required" id="name" />
            <span>Name</span>
          </div>
          <div className="inputbox">
            <input type="text"  value={feild.message} onChange={(e)=>setfeild({...feild,message:e.target.value})} required="required" id="message" />
            <span>Message</span>
          </div>
          <div className="inputbox">
            <input type="number"  value={money} onChange={(e)=>setmoney(e.target.value)} required="required" id="message" min={0.001} max={1000} step={0.001} />
            <span>amount</span>
          </div>
          <div className="inputbox">
            <input type="text"  value={feild.imageURL} onChange={(e)=>setfeild({...feild,imageURL:e.target.value})} required="required" id="message" />
            <span>image url</span>
          </div>
          <div className="inputbox">
            <input type="submit" value="Pay"  disabled={!state.contract}/>
          </div>
        </form>
          
        </div>
  )
}

export default Buy