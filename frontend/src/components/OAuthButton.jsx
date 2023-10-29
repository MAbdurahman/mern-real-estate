import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {app} from '../firebase.js';
import {signInSuccess} from "../redux/user/userSlice.js";

export default function OAuthButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleClick() {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/v1.0/auth/sign-in-with-google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');

        } catch (err) {
            console.log('Cannot sign in with OAuth', err.message);
        }
    }

    return (
        <button
            onClick={handleClick}
            type='button'
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        >
            Sign In With Google
        </button>

    );
}