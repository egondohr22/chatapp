import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'universal-cookie';
import { useState } from 'react';
import '../styles/Auth.css';


const cookies = new Cookies();

export const Auth = ( {setIsAuth} ) => {
    const [email, setEmail] = useState("");   
    const [password, setPassword] = useState("");    
    const createAccount = async () => {
        try {
          const result = await createUserWithEmailAndPassword(auth, email, password);
          console.log(result);
          cookies.set("auth-token", result.user.refreshToken);
          setIsAuth(cookies.get("auth-token"));
        } catch(err) {
            console.error(err);
        }
    };
    const googleSingIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(cookies.get("auth-token"));

          } catch(err) {
              console.error(err);
          }

    };
    const login = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(cookies.get("auth-token"));
        } catch(err) {
            console.error(err);
        }
    }
    // const logout = async () => {
    //     try {
    //         const result = await signOut(auth);
    //         cookies.set("auth-token", result.user.refreshToken);
    //         setIsAuth(cookies.get("auth-token"));
    //     } catch(err) {
    //         console.error(err);
    //     }
    // }

    return (
        <div className='login-box'>
            <h2>Login Page</h2>
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
            <span className='line'></span>
            <button onClick={createAccount}> Sign In </button>
            <button onClick={googleSingIn}>Sign in with Google</button>
            <button onClick={login}> Login </button>
            </div>
        </div>
    )
}