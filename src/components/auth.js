import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export const Auth = ({user, setUser}) => {
    const [email, setEmail] = useState("");   
    const [password, setPassword] = useState("");    
    const createAccount = async () => {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          setUser(auth.currentUser);

        } catch(err) {
            console.error(err);
        }
    };
    const googleSingIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setUser(auth.currentUser);
          } catch(err) {
              console.error(err);
          }

    };
    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setUser(auth.currentUser);
        } catch(err) {
            console.error(err);
        }
    }
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(auth.currentUser);

        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
            <input 
                type="email"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={createAccount}> Sign In </button>
            <button onClick={googleSingIn}>Sign in with Google</button>
            <button onClick={login}> Login </button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}