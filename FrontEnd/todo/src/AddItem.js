import React,{useState,useEffect} from 'react';



const Home = ()=>{
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")



    const uploadFields =()=>{
   
        fetch('/createpost',{
            
            method:'post',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,body
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
               console.log(data.error)
            }
            else{
               
                console.log(data)
            }
            
        }).catch(err=>{
            console.log(err)
        })
    
    }

    return(
        <div>
            <form>
            <div class="form-group row" style={{'display':'flex', 'alignItems':'center'}}>
                <label for="staticEmail" class="col-sm-2 col-form-label">Title</label>
                <div class="col-6">
                
                <input 
                type="text"
                className='form-control'
                placeholder="Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value) }
                />
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Body</label>
                <div class="col-6">
                <input 
                type="text"
                className='form-control'
                placeholder="Body"
                value={body}
                onChange={(e)=>setBody(e.target.value) }
                />
                </div>
            </div>
            <a href='/AllItem' class="btn btn-success mx-auto " onClick={()=>uploadFields() } >Add </a>
            </form>
            
        </div>
    )
}

export default Home