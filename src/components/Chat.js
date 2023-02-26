import React from 'react'
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Cookies from 'universal-cookie';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';

const cookies = new Cookies();

const Chat = ( {setIsAuth, room, setRoom} ) => {
  
  const [newMessage, setNewMessage] = useState("");

  const messages = collection(db, "messages");

  const logout = async () => {
  try {
      await signOut(auth);
      setIsAuth(cookies.remove("auth-token"));
      setRoom(null);
  } catch(err) {
      console.error(err);
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(newMessage === "") return;
    await addDoc(messages, {
      content: newMessage || null,
      createdAt: serverTimestamp() || null,
      user: auth.currentUser.displayName || null,
      room: room || null,
    });
    setNewMessage("");
  };

  return (
    <div className='chat'>
      <form onSubmit={handleSubmit} className='new-message-form'>
        <input className='new-message-input' placeholder='Type...' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input>
        <button type="submit" className='send-button'>Send</button>
      </form>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Chat;