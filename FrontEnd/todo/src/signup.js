import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'

const Signup = ()=>{
    const history = useHistory()
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
 



    const uploadFields =()=>{
       
        fetch('http://localhost:5000/signup',{
            
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name,
                password,
                email,
     
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
               
            }
            else{
               
                history.push('/signin')
            }
            
        }).catch(err=>{
            console.log(err)
        })

    }
   
    return (
        <div className="col-6 mx-auto">
        <div className="">
            <h2>Sign Up</h2>
            <input 
            type="text"
            placeholder="Name"
            value={name}
            className='form-control'
            onChange={(e)=>setName(e.target.value) }
            />
           
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
            className='form-control'
            value={password}
            onChange={(e)=>setPassword(e.target.value) }
            />
         

            <button className="form-control" 
            onClick={()=>uploadFields()}
            >
                
                <i className="">send</i>
            </button>
            <h5>
                {/* <Link to='/signin'>Already have an account</Link> */}
            </h5>
      </div>
      </div>
    )
}
export default Signup