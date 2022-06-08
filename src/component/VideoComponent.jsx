import {useEffect, useMemo, useRef} from "react";

const VideoComponent = (props) => {
  const {images, audioFile} = props;
  const timeSlice = (images.length * 3000) + 2000;
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const img = useMemo(() => new Image(), []);
  
  const audioTrim = () => {
    const audio = audioRef.current
    const chunks = [];
    audio.oncanplay = (e) => {
      const stream = audio.captureStream();
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => {
        if (recorder.state === "recording") {
          recorder.stop()
        };
        chunks.push(e.data)
      }
      recorder.onstop = e => {
        const url = window.URL.createObjectURL(new Blob(chunks));
        audio.src = url;
      }
      recorder.start( timeSlice );
    }
  }
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d");
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 300, 400);
    }
    audioTrim()
  }, [img]);
  
  images.forEach((image, i)=>{
    setTimeout(()=>{
      img.src = image
    }, i*3000)
  })
  
  return (
    <div style={{display: "flex", flexDirection: 'column'}}>
      <div>
        <canvas
          ref={canvasRef}
          width="300"
          height="400"
          style={{border: '1px solid #d3d3d3'}}
          onClick={()=>audioRef.current?.play()}
        >
          <audio
            ref={audioRef}
            crossOrigin="anonymous"
            autoPlay
            loop
            style={{backgroundColor: "transparent"}}
          >
            <source src={audioFile} type="audio/mpeg"/>
            Your browser does not support the audio element
          </audio>
        </canvas>
      </div>
    </div>
  )
};

export default VideoComponent;
