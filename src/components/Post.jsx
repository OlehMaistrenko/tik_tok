import { useRef, useEffect } from "react";
import PostControlls from "./PostControlls";
import { Link } from "react-router-dom";

function Post({ data }) {
  const videoRef = useRef();

  let postDesc = data.desc;
  data.textExtra.length > 0 &&
    data.textExtra.forEach((text) => {
      text.hashtagName.length > 0
        ? (postDesc = postDesc.replace("#" + text.hashtagName, ""))
        : (postDesc = postDesc.replace("@" + text.userUniqueId, ""));
    });

  const playVideo = () => {
    if (
      videoRef.current.getBoundingClientRect().top + 30 > 0 &&
      videoRef.current.getBoundingClientRect().top +
        videoRef.current.clientHeight <
        window.innerHeight
    ) {
      videoRef.current.play();
    }
  };
  const pauseVideo = () => {
    videoRef.current.pause();
  };
  const handleScroll = (e) => {
    if (
      videoRef.current.getBoundingClientRect().top + 30 > 0 &&
      videoRef.current.getBoundingClientRect().top +
        videoRef.current.clientHeight <
        window.innerHeight
    ) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  const handleVideoClick = () => {
    videoRef.current.paused ? playVideo() : pauseVideo();
  };
  useEffect(() => {
    const video = videoRef.current;
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("focus", playVideo);
    window.addEventListener("blur", pauseVideo);
    video.addEventListener("click", handleVideoClick);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("focus", playVideo);
      window.removeEventListener("blur", pauseVideo);
      video.removeEventListener("click", handleVideoClick);
    };
  }, []);

  return (
    <div className='post' data-id={data.id}>
      <div className='post__avatar-holder'>
        {/* <img src={data.author.avatarThumb} className='post__avatar' alt='' /> */}
        <img src='avatar.jpeg' className='post__avatar' alt='' />
      </div>
      <div>
        <div className='post__author-holder'>
          <Link to={"/@" + data.author.uniqueId}>
            <strong>{data.author.uniqueId}</strong>
            {" " + data.author.nickname}
          </Link>
        </div>
        <div className='post__desc-holder'>
          <div className='post__desc'>
            {postDesc}{" "}
            {data.textExtra.length > 0 &&
              Object.values(data.textExtra).map((tag) => {
                return tag.hashtagName.length > 0 ? (
                  <a href={"/tag/" + tag.hashtagName}>
                    <strong>#{tag.hashtagName + " "}</strong>
                  </a>
                ) : (
                  <Link to={"/@" + tag.userUniqueId}>
                    <strong>@{tag.userUniqueId + " "}</strong>
                  </Link>
                );
              })}
          </div>
          <div className='post__hashtags'></div>
        </div>
        <div className='post__music-title'>
          <svg
            width='18'
            height='18'
            viewBox='0 0 48 48'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M35.0001 10.7587C35.0001 10.1169 34.4041 9.64129 33.7784 9.78359L17.7902 13.4192C17.335 13.5227 17.0119 13.9275 17.0119 14.3943V37.9972H17.0109C17.0374 40.1644 14.8022 42.4189 11.612 43.2737C8.05093 44.2279 4.64847 43.0769 4.01236 40.7028C3.37624 38.3288 5.74735 35.6308 9.30838 34.6766C10.606 34.3289 11.8826 34.2608 13.0119 34.4294V14.3943C13.0119 12.0601 14.6271 10.0364 16.9033 9.5188L32.8914 5.88317C36.0204 5.17165 39.0001 7.54986 39.0001 10.7587V33.1191C39.084 35.3108 36.8331 37.6109 33.6032 38.4763C30.0421 39.4305 26.6397 38.2795 26.0036 35.9055C25.3675 33.5315 27.7386 30.8334 31.2996 29.8792C32.5961 29.5319 33.8715 29.4635 35.0001 29.6316V10.7587Z'
            ></path>
          </svg>
          {" " + data.music.title}
        </div>
      </div>
      <div className='post__video-holder'>
        <video src='video.mp4' ref={videoRef} loop />
        <PostControlls isLiked={data.digged} data={data.stats}></PostControlls>
      </div>
    </div>
  );
}
export default Post;
