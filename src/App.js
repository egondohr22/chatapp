import React from 'react';
import { useState } from 'react';
import { Auth } from './components/Auth';
import { auth } from './config/firebase';
import Chat from './components/Chat';



function App() {
  const [user, setUser] = useState(auth?.currentUser);
  return (
    <div className="App">
        {user ? <Chat/> : <Auth user={user} setUser={setUser}/>}
    </div>
  );
}

export default App;
