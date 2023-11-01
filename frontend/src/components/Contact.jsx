import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Contact({listing}) {
    const [agent, setAgent] = useState(null);
    const [message, setMessage] = useState('');

    const handleOnChange = (e) => {
        setMessage(e.target.value);
    }

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const res = await fetch(`/api/v1.0/user/${listing.userRef}`);
                const data = await res.json();
                console.log(data)
                setAgent(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAgent();

    }, [listing.userRef]);

    return (
        <>
            {agent && (
                <div className='flex flex-col gap-2'>
                    <p>
                        Contact <span className='font-semibold'>{agent.username}</span>{' '}
                        for{' '}
                        <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea
                        name='message'
                        id='message'
                        rows='2'
                        value={message}
                        onChange={handleOnChange}
                        placeholder='Enter message here...'
                        className='w-full border p-3 rounded-lg'
                    ></textarea>

                    <Link
                        to={`mailto:${agent.email}?subject=Regarding ${listing.name}&body=${message}`}
                        className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                    >
                        Send Message
                    </Link>
                </div>
            )}
        </>
    );
}