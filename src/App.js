import './App.css';
import { useState, useEffect } from 'react';
import UserTable from './components/UserTable'

function App() {
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')
  const [title, setTitle] = useState('')
  const [completed, setCompleted] = useState()
  const [id,setId] = useState(null)
  
  useEffect(()=>{
    getUsers()
  },[])

function getUsers(){
  fetch('https://jsonplaceholder.typicode.com/todos/').then((result)=>{
      result.json().then((response)=>{
          setUsers(response)
      })
    })
}

  function addUser() {
    let userObj = { userId, title, completed }
    fetch('https://jsonplaceholder.typicode.com/todos/', {
      method: 'POST',
      headers: {
        'Accept': 'Application/json',
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(userObj)
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp)
      })
    })
    //e.preventDefault()
  }
  
  function deleteUser(id){
    fetch('https://jsonplaceholder.typicode.com/todos/'+id).then((result)=>{
      result.json().then((resp)=>{
        console.warn('user deleted with id : ',id,resp)
        getUsers()
      })
    })
  }

  function updateUser(id){
    setUserId(users[id-1].userId)
    setTitle(users[id-1].title)
    setCompleted(users[id-1].completed)
    setId(users[id-1].id)
  }

  function editUser(){
    let userInfo = {userId,title,completed,id}
    fetch('https://jsonplaceholder.typicode.com/todos/'+id,{
      method:'PUT',
      headers:{
        'Accept':'Application/json',
        'Content-Type':'Application/json'
      },
      body:JSON.stringify(userInfo)
    }).then((result)=>{
        result.json().then((resp)=>{
          console.log(resp)
          getUsers()
        })
    })
  }
  return (
    <div className="App">
      <h1>App </h1>
      {/* <form onSubmit={addUser}> POST form */}
      <input type='text' onChange={(e) => setUserId(e.target.value)} /> <br /><br />
      <input type='text' onChange={(e) => setTitle(e.target.value)} /> <br /><br />
      <input type='checkbox' onChange={(e) => setCompleted(e.target.checked)} /> <br /><br />
      <button type='button' onClick={()=>addUser()}>Submit User</button>
      {/* </form> */}
      
      <h1>pre-filled Form</h1> {/* update API data */}
          
                <input type='text' value={userId} onChange={(e)=>setUserId(e.target.value)} />
                <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} />
                <input type='checkbox' value={completed} onChange={(e)=>setCompleted(e.target.checked)} /><br />
                <button onClick={()=>editUser()}>Update User</button>
            
      
      <UserTable data={users} delete={deleteUser} formData={{userId,title,completed}} update={updateUser} />
    </div>
  );
}

export default App;
