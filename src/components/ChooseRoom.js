import React from 'react'
import { useRef } from 'react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ChooseRoom = ( {setIsAuth, setRoom} ) => {

    const inputRef = useRef(null);

    const logout = async () => {
    try {
        await signOut(auth);
        setIsAuth(cookies.remove("auth-token"));
    } catch(err) {
        console.error(err);
    }
};
  return (
    <div>
        <label for="roomIn">Enter room name/id</label>
        <input ref={inputRef}/>
        <button onClick={() => setRoom(inputRef.current.value)}>Enter</button>
        <button onClick={logout}>Logout</button>
    </div>
  )
};

export default ChooseRoom;