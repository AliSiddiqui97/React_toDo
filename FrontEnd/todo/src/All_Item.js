import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { disconnect } from 'mongoose'
    
    const Home = ()=>{
        const [data,setData] = useState([])
        const [statusDone,setStatusDone]= useState([])
        useEffect(()=>{
            fetch('http://localhost:5000/mypost',{
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            }).then(res=>res.json())
            .then(result=>{
                console.log(result.mypost)
                setData(result.mypost)
                
                
            })
            
        },[])
        const deletePost =(postId)=>{
            fetch(`http://localhost:5000/deletePost/${postId}`,{
                method:"delete",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            } ).then(res=>res.json())
            .then(result=>{
                console.log(result)
                const newData= data.filter(item=>{
                    return item._id !== result._id
                })
                setData(newData)
                window.location.reload(false);
            })
        }
        const update =(postId)=>{
            fetch(`/updatestatusdone/${postId}`,{
                method:"PATCH",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:
                    {"status":"true"}
                
            } ).then(res=>res.json()).then(result=>{
                console.log(result)
                window.location.reload(false);
            })
            
        }
        const updateundone =(postId)=>{
            fetch(`/updatestatusundone/${postId}`,{
                method:"PATCH",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:
                    {"status":"true"}
                
            } ).then(res=>res.json()).then(result=>{
                console.log(result)
                window.location.reload(false);
            })
            
        }

        
        
        return (
            <div>
            {data.map(item => (
                
                <div class="card-body border">
                 
                    <h5 class="card-title">Title: {item.title}</h5>

                    <p class="card-text"> Description: {item.body}</p>
                    <p class="card-text">Status: {item.status}</p>
                    <a class="btn btn-success mr-2"  onClick={()=>update(item._id) }>Done</a>
                    <a class="btn btn-secondary mr-2"  onClick={()=>updateundone(item._id) }>Un-done</a>
                    <a class="btn btn-danger" onClick={()=>deletePost(item._id)}>Delete</a>
                    <div class=" text-muted">
                        Date: {item.createdAt}
                    </div>
                </div>
              
            ))}
            <a href='/AddItem' class="btn btn-success float-right mt-2" >Add new</a>

            </div>
        )
    }
    
    


export default Home