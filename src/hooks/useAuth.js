import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { useState } from 'react';

import { useUser } from '../contexts/UserContext';

import { auth } from '../firebase-config';
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const { setUser, authError, setAuthError } = useUser();
    const navigate = useNavigate()

    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const [signUpUsername, setSignUpUsername] = useState()
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const handleSignIn = async (signInMethod, e = {}) => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        try {
            switch (signInMethod) {
                case 'email':
                    e.preventDefault();
                    await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
                    setAuthError('');
                    break;

                case 'google':
                    await signInWithPopup(auth, provider)
                    setAuthError('')
                    break;

                default:
                    return;
            }
        } catch (error) {
            setAuthError(error?.code);
        }
    };

    const handleSignUp = async (signUpMethod, event = {}) => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        try {
            switch (signUpMethod) {
                case 'email':
                    event.preventDefault();
                    await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
                    updateProfile(auth.currentUser, { displayName: signUpUsername })
                    setAuthError('');
                    break;

                case 'google':
                    await signInWithPopup(auth, provider)
                    setAuthError('')
                    break;

                default:
                    return;
            }
        } catch (error) {
            setAuthError(error?.code);
        }
    };

    const signout = () => {
        signOut(auth)
        navigate("/")
    };

    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

    return {
        signInEmail,
        setSignInEmail,
        signInPassword,
        setSignInPassword,
        signUpEmail,
        setSignUpEmail,
        signUpPassword,
        setSignUpPassword,
        setSignUpUsername,
        authError,
        setAuthError,
        handleSignIn,
        handleSignUp,
        signout,
    };
};

export default useAuth;
