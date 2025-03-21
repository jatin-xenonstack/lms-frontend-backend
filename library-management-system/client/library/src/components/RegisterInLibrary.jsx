import React, { useEffect } from 'react'
import Header from './Header'
import image from './logo3.png'
import './RegisterInLibrary.css'
import { ToastContainer,toast } from 'react-toastify'
import SearchBar from './SearchBar'
import axios from 'axios'
import { useState } from 'react'

function RegisterInLibrary() {
    const [res,setRes] = useState([]);
    // const [register,setRegister] = useState('Register'0)
    const [check,setCheck] = useState(true)
  const fetchLibrary = async() => {
    try{
    const data = await axios.get(`http://localhost:8000/getalllibrary`)
    console.log(data.data.data)
    setRes(data.data.data)
}catch(err)
{
    console.log(err)
}
  }

const registerHandler = (e) => {
    // setCheck(!check);
    console.log();
    const btn = document.getElementById(e.target.id)
    const status = document.getElementById(e.target.id+'status')
    console.log(e.target.id)
    console.log(btn.innerText)
    if(btn.innerText === 'Register'){
        // console.log("unregister")
        status.innerText = 'Registered'
        btn.innerText = 'Unregister'
        console.log(btn.innerText)
        toast.success("User Registered Successfully")
        setCheck(false)
    }
    else if(btn.innerText === 'Unregister'){
        btn.innerText = 'Register'
        status.innerText = 'unregistered'
        toast.success("User UnRegistered Successfully")
        setCheck(true)
    }
    // console.log(btn.innerText)
    // change(e)

} 


useEffect(()=>{
    fetchLibrary()
},[])

// useEffect(()=>{
// //    change()
    
// },[check])

  return (
    <div>
        <Header/>
        <ToastContainer/>
        <div className='main-register'>
            <img src={image} alt="" style = {{width:"200px"}}/>
            <div className="search-library">
            <SearchBar content = {"Search Library"}/>
            </div>
            <div className="library-list">
                <table className = "table-design">
                    <thead>
                    <tr>
                    <th>Libarary Name</th>
                    <th>Status</th>
                    <th>Register/Unregister</th>
                    </tr>
                    </thead>
                    <tbody>{
                        res?.map((key,index) => {
                            return <tr>
                            <td>{key.name}</td>
                            <td id = {key.id+"status"}> Unregistered</td>
                            {/* <td>Unregister</td> */}
                           <td ><button onClick= {registerHandler} id ={key.id}>Register</button></td>
                        </tr>
                        })
                    }
                    
       
                    </tbody>
                </table>
            </div>
        </div>
      
    </div>
  )
}

export default RegisterInLibrary
