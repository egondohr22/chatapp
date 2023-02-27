import React from 'react'
import { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, where, query, orderBy } from 'firebase/firestore';
import Cookies from 'universal-cookie';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import '../styles/Chat.css';

const cookies = new Cookies();

const Chat = ( {setIsAuth, room, setRoom} ) => {
  
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let snapMessages = [];
      snapshot.forEach((doc) => {
        snapMessages.push({...doc.data(), id: doc.id});
      });
      setMessages(snapMessages);
      console.log(snapMessages);
    })

    return () => unsubscribe();
  }, []);


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
    await addDoc(messagesRef, {
      content: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });
    setNewMessage("");
  };

  return (
    <div className='chat-app'>
      <div>
        {messages.map((message) => (
          <h4 key={message.id}>{message.content}</h4>
        ))}
      </div>
      <form onSubmit={handleSubmit} className='new-message-form'>
        <input className='new-message-input' placeholder='Type...' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input>
        <button type="submit" className='send-button'>Send</button>
      </form>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Chat;