import spinner from './assets/spinner.gif';

const Spinner = () => {
    return (
        <div className='mt-20'>
            <img
                src={spinner}
                alt='loading...'
                className='text-center mx-auto'
                width={180}
            />
        </div>
    );
};

export default Spinner;
