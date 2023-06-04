import { useEffect, useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import "./App.css";

const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [isffmpegReady, setIsffmpegReady] = useState<boolean>(false);
  const [video, setVideo] = useState<File>();
  const [gif, setGif] = useState<any>();

  const load = async () => {
    try {
      await ffmpeg.load();
      setIsffmpegReady(true);
    } catch (error) {
      console.error(error);
    }
  };

  const convertToGif = async () => {
    try {
      // write the file to memory
      // web assembly is managing its own in-memory file system
      // fetchFile fetches the actual video file
      ffmpeg.FS("writeFile", `temp-${video?.name}`, await fetchFile(video));

      // this functino's result will store to memory
      await ffmpeg.run(
        "-i",
        `temp-${video?.name}`,
        "-t",
        "41.0",
        "-ss",
        "3.0",
        "-f",
        "gif",
        "output.gif"
      );

      // read the result from story
      const data = ffmpeg.FS("readFile", "output.gif");

      // Create a URL
      const url = URL.createObjectURL(new Blob([data.buffer], { type: "gif" }));

      setGif(url);
    } catch (error) {
      console.error(error);
    }
  };

  const videoElement = document.getElementById("myVideo") as HTMLVideoElement;

  console.log(videoElement);
  // videoElement?.addEventListener("timeupdate", function (e) {
  //   console.log(e);
  // });

  useEffect(() => {
    load();
  }, []);

  if (!isffmpegReady) {
    return <>Loading...</>;
  }

  return (
    <div>
      {video && (
        <div>
          <video
            id="myVideo"
            controls
            width={250}
            src={URL.createObjectURL(video)}
          />
        </div>
      )}

      <input
        type="file"
        onChange={(e: InputEvent) => setVideo(e?.target?.files?.item(0))}
      />

      <h3>Result</h3>
      <button onClick={convertToGif}>Convert</button>

      {gif && <img src={gif} width="250" />}
    </div>
  );
}

export default App;
