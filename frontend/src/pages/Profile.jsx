import {useSelector} from 'react-redux';
import {useRef, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    getDownloadURL, getStorage, ref, uploadBytesResumable,
} from 'firebase/storage';
import {app} from '../firebase.js';
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure
} from '../redux/user/userSlice';

export default function Profile() {
    const fileRef = useRef(null);
    const {currentUser, loading, error} = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [filePercentage, setFilePercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const dispatch = useDispatch();


    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePercentage(Math.round(progress));
        }, (error) => {
            setFileUploadError(true);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({
                ...formData, avatar: downloadURL
            }));
        });
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});

    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/v1.0/user/update-user/${currentUser._id}`, {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
            setTimeout(() => {
                setUpdateSuccess(false);
            },5000);

        } catch (err) {
            dispatch(updateUserFailure(err.message));
        }
    }

    async function handleSignOut() {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('/api/v1.0/auth/sign-out');
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess(data));
        } catch (err) {
            dispatch(signOutUserFailure(err.message));
        }
    }

    async function handleDeleteUser() {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/v1.0/user/delete-user/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (err) {
            dispatch(deleteUserFailure(err.message));
        }
    }

    async function handleShowListings() {
        try {
            setShowListingsError(false);
            const res = await fetch(`/api/v1.0/user/get-listings/${currentUser._id}`);
            const data = await res.json();

            if (data.success === false) {
                setShowListingsError(true);
                setTimeout(() => {
                    setShowListingsError(false);
                }, 5000)
                return;
            }

            console.log(data)
            setUserListings(data);
        } catch (err) {
            setShowListingsError(true);
            setTimeout(() => {
                setShowListingsError(false);
            }, 5000)
            return;
        }
    }

    async function handleDeleteListing(listingId) {
        try {
            const res = await fetch(`/api/v1.0/listing/delete-listing/${listingId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }

            setUserListings((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            );
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    return (<div className='p-3 max-w-lg mx-auto'>
        <h2 className='text-3xl font-semibold text-center my-7'>{currentUser.username} Profile</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
                onChange={(e) => setFile(e.target.files[0])}
                type='file'
                ref={fileRef}
                hidden
                accept='image/*'
            />
            <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser.avatar}
                alt='profile avatar'
                className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
            />
            <p className='text-sm self-center'>
                {fileUploadError ? (<span className='text-red-700'>
              Error Uploading Image (image must be less than 2MB)
            </span>) : filePercentage > 0 && filePercentage < 100 ? (<span
                    className='text-slate-700'>{`Uploading ${filePercentage}%`}</span>) : filePercentage === 100 ? (
                    <span className='text-green-700'>Image Successfully Uploaded!</span>) : ('')}
            </p>
            <input
                type='text'
                placeholder='username'
                defaultValue={currentUser.username}
                id='username'
                className='border p-3 rounded-lg'
                onChange={handleChange}
            />
            <input
                type='email'
                placeholder='email'
                id='email'
                defaultValue={currentUser.email}
                className='border p-3 rounded-lg'
                onChange={handleChange}
            />
            <input
                type='password'
                placeholder='password'
                onChange={handleChange}
                id='password'
                className='border p-3 rounded-lg'
            />
            <button
                disabled={loading}
                className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
            >
                {loading ? 'Loading...' : 'Update'}
            </button>
            <Link
                className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
                to={'/create-listing'}
            >
                Create Listing
            </Link>
        </form>
        <div className='flex justify-between mt-5'>
        <span
            onClick={handleDeleteUser}
            className='text-red-700 font-bold cursor-pointer'
        >
          Delete Account
        </span>
            <span onClick={handleSignOut} className='text-slate-600 font-bold cursor-pointer'>
          Sign Out
        </span>
        </div>

        <p className='text-red-700 text-center mt-5'>{error ? error : ''}</p>
        <p className='text-green-700 text-center mt-5'>
            {updateSuccess ? 'User Updated Successfully!' : ''}
        </p>
        <button onClick={handleShowListings} className='text-green-700 w-full'>
            Show Listings
        </button>
        <p className='text-red-700 mt-5'>
            {showListingsError ? 'Error showing listings' : ''}
        </p>

        {userListings && userListings.length > 0 && (<div className='flex flex-col gap-4'>
            <h3 className='text-center mt-7 text-2xl font-semibold'>
                {currentUser.username} Listings
            </h3>
            {userListings.map((listing) => (<div
                key={listing._id}
                className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
                <Link to={`/listing/${listing._id}`}>
                    <img
                        src={listing.imageURLs[0]}
                        alt='listing cover'
                        className='h-16 w-16 object-contain'
                    />
                </Link>
                <Link
                    className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                    to={`/listing/${listing._id}`}
                >
                    <p>{listing.name}</p>
                </Link>

                <div className='flex flex-row gap-5 item-center'>
                    <Link to={`/update-listing/${listing._id}`}>
                        <button className='text-yellow-400 font-bold uppercase'>Edit</button>
                    </Link>
                    <button
                        onClick={() => handleDeleteListing(listing._id)}
                        className='text-red-700 font-bold uppercase'
                    >
                        Delete
                    </button>

                </div>
            </div>))}
        </div>)}
    </div>);
}