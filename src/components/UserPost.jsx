import { useEffect, useRef } from "react";

function UserPost({ viewed }) {
  const videoRef = useRef();
  const handleHover = () => {
    videoRef.current.play();
  };
  const handleUnHover = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };
  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("mouseenter", handleHover);
    video.addEventListener("mouseleave", handleUnHover);
    return () => {
      video.removeEventListener("mouseenter", handleHover);
      video.removeEventListener("mouseleave", handleUnHover);
    };
  }, []);

  return (
    <div className='user-post'>
      <video src='video.mp4' ref={videoRef} loop muted />
      <div className='user-post__viewed'>
        <svg
          width='18'
          height='18'
          viewBox='0 0 48 48'
          fill='#fff'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z'
          ></path>
        </svg>
        {" " + viewed > 999
          ? viewed > 1000000
            ? parseFloat(viewed / 1000000).toFixed(1) + "M"
            : parseFloat(viewed / 1000).toFixed(1) + "K"
          : viewed}
      </div>
    </div>
  );
}
export default UserPost;
