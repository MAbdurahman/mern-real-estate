import {useEffect, useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {FaSearch} from 'react-icons/fa';

export default function Header() {

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        console.log('header handleSubmit', e.target);
    }

    return (<header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Real</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                <form
                    onSubmit={handleSubmit}
                    className='bg-slate-100 p-3 rounded-lg flex items-center'
                >
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <FaSearch className='text-slate-600'/>
                    </button>
                </form>
                <ul className='flex gap-4'>
                    <NavLink to='/'>
                        <li className='header-link-item hidden sm:inline text-slate-700 hover:underline'>
                            Home
                        </li>
                    </NavLink>
                    <NavLink to='/about'>
                        <li className='header-link-item hidden sm:inline text-slate-700 hover:underline'>
                            About
                        </li>
                    </NavLink>
                    <NavLink to='/sign-in'>
{/*                        {currentUser ? (<img
                                className='rounded-full h-7 w-7 object-cover'
                                src={currentUser.avatar}
                                alt='profile'
                            />) : (<li className=' text-slate-700 hover:underline'> Sign in</li>)}*/}
                        <li className='header-link-item text-slate-700 hover:underline'>Sign in</li>
                    </NavLink>
                </ul>
            </div>
        </header>);
}