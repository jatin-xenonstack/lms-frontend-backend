import React, { useEffect } from 'react'
import { useState } from 'react'
import './Create.css'
import image from './logo3.png'

import Header from './Header'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const token = localStorage.getItem('token')
function CreateLibrary() {
    const [val, setVal] = useState('')
    const [email, setEmail] = useState('')
 
  

   
    const assignLibrary = async (val,email) => {
        try{
            const data = await axios.post('http://localhost:8000/owner/create-library', {
            "name": val,
            "email": email
            },{
            headers: {  
                'Authorization': `Bearer ${token}`
            }
            })
            console.log(data)
            toast.success("Library Created Successfully")
        } catch(err){
            console.log(err)
            toast.error(err.response.data.message);
        }
    }
  

    const handler = (e) => {
     
        e.preventDefault();
        assignLibrary(val,email);
     
    }


    return (
        <div className='main-create'>
            <ToastContainer/>
            <Header/>
            <img src={image} alt="" style = {{width:"200px"}}/>
        <div className='create'>
            <div className="library-form">
                <div className="library-input">
                    <input type="text" placeholder='Enter Library Name' onChange={(e) => setVal(e.target.value)} value={val} />
                </div>
                <div className="library-input">
                    <input type="email" placeholder='Enter Admin email-id' onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="library-input">
                    <button onClick={handler}>Submit</button>

                </div>
            </div>
        </div>
     
         </div>
    )
}
export default CreateLibrary
