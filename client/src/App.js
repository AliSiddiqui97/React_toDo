import React,{useEffect,createContext,useReducer,useContext} from 'react'; 
import Signup from './signup';
import Signin from './signin';
import {BrowserRouter,Route,Switch,useHistory,Redirect} from 'react-router-dom';
import './App.css';
import AllItem from './All_Item';
import AddItem from './AddItem';

import {reducer,initialState} from './reducer'

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  const clear =()=>{
    localStorage.clear()
  }
  return (
    <div className='bg-light '>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <a className="navbar-brand" href="#">To-Do List</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link float-right" href="/signin">Sign in <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link float-right" href="/signup">Sign up</a>
        </li>
        <li className="nav-item">
          <a className="nav-link float-right" href="/signin"  onClick={()=>clear()}>Sign out</a>
        </li>
      </ul>
      </nav>

      <div  className='col-12'>
        <div className="navbar-nav">
        <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
        <Routing/>    
        </BrowserRouter>
        </UserContext.Provider>
        </div>
      </div>
    
          
  </div>
  );
}


export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({
        type:"USER",payload:user
      })
      // history.push('/')

    } else{
      
      history.push('/signup')
    }
  },[])
  return (
        <Switch>
        <Route path='/AddItem'>
          <AddItem/>
        </Route>
        <Route path='/AllItem'>
          <AllItem/>
        </Route>
        <Route path='/signup'>
          <Signup/>
        </Route>
        <Route path='/signin'>
          <Signin/>
        </Route>
        </Switch>
  )

}


export default App;