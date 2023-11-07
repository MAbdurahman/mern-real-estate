import {Link} from 'react-router-dom';

export default function PageNotFound() {

    return (<>
            <div
                className="h-screen w-screen bg-blue-600 flex flex-col text-center justify-center content-center flex-wrap">
                <p className="font-sans text-9xl text-white error-text">404</p>
                <p className="font-sans text-5xl text-white">Page Not Found!</p>
                <p className="font-sans text-4xl text-white capitalize">back to</p>
                <Link
                    to={'/'}
                    className="bg-transparent text-white hover:bg-blue-300 outline-2 font-semibold text-lg uppercase text-center font-sans"
                >

                    home
                </Link>
            </div>
        </>

    );
}