import {useRef, useEffect} from "react";
import GenerateVideo from "../../utils/generateVideoUtil";
import './VideoComponent.css';

const VideoComponent = (props) => {
  const {images, audioFile} = props;
  const duration = (images.length * 3000) + 1800;
  const audioRef = useRef(null);
  
  const audioTrim = () => {
    const audio = audioRef.current;
    const chunks = [];
    audio.oncanplay = () => {
      const stream = audio.captureStream();
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => {
        if (recorder.state === "recording") {
          recorder.stop()
        };
        chunks.push(e.data)
      }
      recorder.onstop = () => {
        console.log(chunks);
        const url = window.URL.createObjectURL(new Blob(chunks));
        audio.src = url;
      }
      recorder.start( duration );
    }
  } //TODO not working now
  
  const handleVideoPlay = () => {
    const audio = document.getElementById('audio');
    // audioTrim();
    audio.play();
  }
  
  const handleVideoPause = () => {
    const audio = document.getElementById('audio');
    audio.pause();
  }
  
  useEffect(()=>{
    GenerateVideo(images)
  }, [images])
  
  return (
    <div style={{display: "flex", flexDirection: 'column', position: 'relative'}}>
      <div
        id="container"
        className="video-div"
      >
        <video onPlay={handleVideoPlay} onPause={handleVideoPause} id="video" controls loop/>
        <audio ref={audioRef} autoPlay loop id="audio" crossOrigin="anonymous" src={audioFile}/>
      </div>
    </div>
  )
};

export default VideoComponent;
