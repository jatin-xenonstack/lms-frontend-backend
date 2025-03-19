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
    const [checklibrary, setCheckLibrary] = useState(false)    
    const [checkEmail, setCheckEmail] = useState(false)
    const [id,setID] = useState('')
    const [isDetail ,SetIsDetail] = useState(false)

  

    const handler = (e) => {
        SetIsDetail(false)
        e.preventDefault();
        libraryExist(val)
        userExist(email)
        SetIsDetail(true)
        
    }

    const  libraryExist = async (val) => {
        try{
            const data = await axios.post('http://localhost:8000/searchlibrary', {
            "name": val
            },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            console.log(data)
            if(data.status === 200){
                setCheckLibrary(true)
            }
        }
        catch(err){ 
            setCheckLibrary(false)
            console.log(err.response.data)
            toast.error(err.response.data.error);
        }
    }
    const userExist = async (checkEmail) => {
        try{
            const data = await axios.post('http://localhost:8000/checkuser', {
            "email": checkEmail
            })
            if(data.status === 200){
                setCheckEmail(true)
            }
        }
        catch(err){ 
            setCheckEmail(false)
            setID(err.response.data.id)
            console.log(err)
            toast.error(err.response.data.message);
        }
    }
    useEffect(() => {   
        console.log(checklibrary)
        console.log(checkEmail)
        if(isDetail){
        if(checklibrary && checkEmail)
        {
            // submitform(val,email)
            console.log(id)
            toast.success("Library Created Successfully")
        }
    }
        
    }, [checklibrary, checkEmail,isDetail])

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
