import React from 'react';
import { useState } from 'react';
import { Auth } from './components/Auth';
import { auth } from './config/firebase';
import { signOut } from 'firebase/auth';
import Chat from './components/Chat';
import Cookies from 'universal-cookie';

const cookies = new Cookies();



function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(0);

  const logout = async () => {
    try {
        const result = await signOut(auth);
        cookies.set("auth-token", null);
        setIsAuth(cookies.remove("auth-token"));
    } catch(err) {
        console.error(err);
    }
  }

  if(!isAuth)
    return (
      <Auth setIsAuth={setIsAuth}/>
    );
    return (
      <div>
        { room? (
          <Chat/>
        ) : (
          <div>
            <label for="roomIn">Enter room name/id</label>
            <input/>
            <button>Enter</button>
            <button onClick={logout}>Logout</button>
          </div>
        )
          
        }
      </div>
    )
}

export default App;
