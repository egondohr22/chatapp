import React from 'react';
import { useState } from 'react';
import { Auth } from './components/Auth';
import Chat from './components/Chat';
import ChooseRoom from './components/ChooseRoom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  if(!isAuth)
    return (
      <Auth setIsAuth={setIsAuth}/>
    );
    return (
      <div>
        { room? (
          <Chat setIsAuth={setIsAuth} room={room} setRoom={setRoom}/>
        ) : (
          <ChooseRoom setIsAuth={setIsAuth} setRoom={setRoom}/>
        )
        }
      </div>
    )
}

export default App;
