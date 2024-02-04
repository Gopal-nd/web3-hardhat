import abi from './components/chai.json'
import {ethers} from "ethers"
import Memos from './components/Memos'
import Buy from './components/Buy'
import { useEffect, useState } from 'react'


function App() {
const [state, setState] = useState({
  provider:null,
  signer:null,
  contract:null 
})

const [account, setAccount] = useState("not connected");

useEffect(()=>{
  const template= async()=>{
    const contractAddress="0x14320A69afFe4bE8a749416aB5FEc033d4F4aa1D";
    const contractABI = abi.abi;
     //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try {
        const {ethereum} = window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
        })
        setAccount(account)
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        console.log(contract)
        setState({provider,signer,contract})
      } catch (error) {
        console.log(error)
      }
    }
    template()
},[])
  return (
    <>
    <div>
      <p>
        <small>connected account - {account}</small>

      </p>
      <Buy state={state}/>
      <Memos state={state}/>
    </div>

    </>
  )
}

export default App
