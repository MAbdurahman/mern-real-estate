export default function OAuthButton() {


    async function handleClick() {
        try {


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