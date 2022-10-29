import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"
import app from './firebase/firebase.init';
import { useState } from 'react';
const auth=getAuth(app)
function App() {
  const [user,setUser]=useState({})
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider= new GithubAuthProvider()
  const handleGoogleAuthentication = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user
        setUser(user)
        console.log(user)
      })
      .catch(error => {
        console.error("error:",error)
    })
  }
  const handleGoogleLogOut = () =>{
    signOut(auth)
      .then(() => {
      setUser({})
      })
      .catch(() => {
      setUser({})
    })
  }
  const handleGithubAuthentication = () => {
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const user = result.user
        setUser(user)
        console.log(user)
      })
      .catch(error => {
      console.error("error: ",error)
    })
  }

  return (
    
    <div className="App">
      {
        user.uid ?
        <button onClick={handleGoogleLogOut}>Google Logout</button>
        :
          <>
            <button onClick={handleGoogleAuthentication}>Google LogIn</button>
            <button onClick={handleGithubAuthentication }>Github LogIn</button>
          </>
      }
    {user.uid && <div>
      <p>User Name : {user.displayName}</p>
      <p>User Email : {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>}
    </div>
  );
}

export default App;
