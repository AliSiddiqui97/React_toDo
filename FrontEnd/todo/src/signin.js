import React,{useState,useContext,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'


const Signin = ()=>{
    
    const history = useHistory()
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
 



    const uploadFields =()=>{
       
        fetch('/signin',{
            
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                password,
                email,
     
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
               
            }
            else{
                localStorage.setItem("jwt",data.token)
                
                localStorage.setItem("user",JSON.stringify(data.user))
                history.push('/AllItem')
            }
            
        }).catch(err=>{
            console.log(err)
        })

    }
   

 
    return (
        <div className="col-6 mx-auto">
        <div className="">
            <h2>Sign In</h2>
            <input 
            type="text"
            placeholder="Email"
            value={email}
            className='form-control'
            onChange={(e)=>setEmail(e.target.value) }
            />
           
            <input 
            type="password"
            placeholder="Password"
            value={password}
            className='form-control'
            onChange={(e)=>setPassword(e.target.value) }
            />

          


            <button className='form-control'
            onClick={()=>uploadFields()} >
                Submit
                
            </button>
            <h5 >
                {/* <Link to='/signup' >Don't have an account</Link> */}
            </h5>
      </div>
      </div>
    )
}
export default Signin