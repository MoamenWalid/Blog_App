
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const NotFoundPage = () => {
  const isMinWidth992 = useMediaQuery({ query: '(min-width: 670px)' });
  const isMaxWidth765 = useMediaQuery({ query: '(max-width: 670px)' });

  return (
    <div className='404-page relative bg-cover bg-center w-screen h-[calc(100vh-60px)] font-rajdhani'
      style={{ backgroundImage: isMinWidth992 && "url('/imgs/404-page-lg.jpg')" }}>
      <div className={`text ${ isMaxWidth765 ? 'w-full text-center left-0' : 'left-[10%]' } absolute top-[50%] px-[12px] translate-y-[-50%]`}>
        { isMaxWidth765 && <div className="photo flex items-center justify-center">
          <img src='/imgs/404-page-sm.png' alt="not-found-page" />
        </div> }
        <h1 className='text-[48px] font-medium'>it's a 404, mate.</h1>
        <p className='text-[24px] font-normal mb-[35px]'>yeah, you've reached the end of the road.</p>
        <Link to='/' className='bg-[#111] text-[#FFF] p-[10px]'>Back to home</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
