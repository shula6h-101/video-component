/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import Konva from "konva";

const GenerateVideo = (allImage) => {
  const duration = (allImage.length * 3000) + 3000;
  let layer = new Konva.Layer();
  const canvas = document.createElement('canvas');
  
  function exportVid(blob) {
    const vid = document.getElementById('video');
    vid.src = URL.createObjectURL(blob);
  }
  
  function startRecording() {
    const vidChunks = []; // here we will store our recorded media chunks (Blobs)
    const canvasStream = canvas.captureStream(); // grab our canvas MediaStream
    const canvasRec = new MediaRecorder(canvasStream); // init the recorder
    // every time the recorder has new data, we will store it in our array
    canvasRec.ondataavailable = e => vidChunks.push(e.data);
    // only when the recorder stops, we construct a complete Blob from all the chunks
    canvasRec.onstop = e => exportVid(new Blob(vidChunks, {type: 'video/webm'}));
  
    canvasRec.start();
    setTimeout(()=>canvasRec.stop(), duration);
  }
  
  const generateGif = () => {
    function onDrawFrame(ctx, frame) {
      // update canvas size
      canvas.width = frame.width;
      canvas.height = frame.height;
      // update canvas that we are using for Konva.Image
      ctx.drawImage(frame.buffer, 0, 0);
      // redraw the layer
      layer.draw();
    }
    
    gifshot.createGIF({
      'images': allImage,
      'gifWidth': 300,
      'gifHeight': 400,
      'numFrames': 3,
      'frameDuration': 30,
    },function(obj) {
      if(!obj.error) {
        gifler(obj.image).frames(canvas, onDrawFrame);
      }
    });
    startRecording();
  }
  
  generateGif();
};

export default GenerateVideo;


