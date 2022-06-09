import './App.css';
import VideoComponent from "./component/video-component";

function App() {
  const imgList = [
    "https://homingos-magik.s3.ap-south-1.amazonaws.com/vibo/dev/base/928e0050-72c2-46d3-9aa2-83618e0d19cd.jpg",
    "https://homingos-magik.s3.ap-south-1.amazonaws.com/vibo/dev/base/9131a622-73dd-4933-8751-04ffb1287edf.jpg",
    "https://homingos-magik.s3.ap-south-1.amazonaws.com/vibo/dev/base/f3897800-a768-45dd-9690-ac3b1abb95d8.jpg"
  ];
  
  const audioFile = "https://homingos-magik.s3.ap-south-1.amazonaws.com/vibo/homingos-movie/homingos-movie-bg1.mp3"
  return (
    <div className="App">
      <header className="App-header">
        <VideoComponent images={imgList} audioFile={audioFile}/>
      </header>
    </div>
  );
}

export default App;
