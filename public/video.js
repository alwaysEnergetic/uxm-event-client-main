
window.InitPlayer = function() {
  // Set up IVS playback tech and quality plugin
  const loadInterval = setInterval(() => {
    if(registerIVSTech==undefined || videojs==undefined ) return
    loadPlayer()
    clearInterval(loadInterval);
  }, 1000)
}

window.loadPlayer = function() {
    // Set up IVS playback tech and quality plugin    
    
    registerIVSTech(videojs);
    registerIVSQualityPlugin(videojs);
    
    console.log('test')

  
    // Initialize video.js player
    const videoJSPlayer = videojs("amazon-ivs-videojs", {
        techOrder: ["AmazonIVS"],
        controlBar: {
            playToggle: {
                replay: false
            }, // Hides the replay button for VOD
            pictureInPictureToggle: false // Hides the PiP button
        }
    });
  
    // Use the player API once the player instance's ready callback is fired
    const readyCallback = function () {
        // This executes after video.js is initialized and ready
        window.videoJSPlayer = videoJSPlayer;
  
        // Get reference to Amazon IVS player
        const ivsPlayer = videoJSPlayer.getIVSPlayer();
  
        // Show the "big play" button when the stream is paused
        const videoContainerEl = document.querySelector("#amazon-ivs-videojs");
        videoContainerEl.addEventListener("click", () => {
            if (videoJSPlayer.paused()) {
                videoContainerEl.classList.remove("vjs-has-started");
            } else {
                videoContainerEl.classList.add("vjs-has-started");
            }
        });
  
        // Logs low latency setting and latency value 5s after playback starts
        const PlayerState = videoJSPlayer.getIVSEvents().PlayerState;
        ivsPlayer.addEventListener(PlayerState.PLAYING, () => {
            console.log("Player State - PLAYING");
            setTimeout(() => {
                console.log(
                    `This stream is ${
                        ivsPlayer.isLiveLowLatency() ? "" : "not "
                    }playing in ultra low latency mode`
                );
                console.log(`Stream Latency: ${ivsPlayer.getLiveLatency()}s`);
            }, 5000);
        });
  
        // Log errors
        const PlayerEventType = videoJSPlayer.getIVSEvents().PlayerEventType;
        ivsPlayer.addEventListener(PlayerEventType.ERROR, (type, source) => {
            console.warn("Player Event - ERROR: ", type, source);
        });
  
        // Log and display timed metadata
        ivsPlayer.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
            const metadataText = cue.text;
            const position = ivsPlayer.getPosition().toFixed(2);
            console.log(
                `Player Event - TEXT_METADATA_CUE: "${metadataText}". Observed ${position}s after playback started.`
            );
        });
  
        // Enables manual quality selection plugin
        videoJSPlayer.enableIVSQualityPlugin();
  
        // Set volume and play default stream
        videoJSPlayer.volume(0.5);
        videoJSPlayer.src(DEFAULT_STREAM);
    };
  
    // Register ready callback
    videoJSPlayer.ready(readyCallback);
  }
  

// window.InitPlayer = InitPlayer

// Sets up input box for Amazon IVS manifest
// function SetupInputBox () {
//   const containerEl = document.querySelector(".video-container");
//   const directSrcFormEl = containerEl.querySelector(".src-container-direct");
//   const directSrcInputEl = containerEl.querySelector(".src-input");
//   directSrcFormEl.addEventListener("submit", (e) => {
//       e.preventDefault();
//       videoJSPlayer.src(directSrcInputEl.value);
//   });
// }


// window.onload = function() {
//  console.log("Init Player")
//   InitPlayer()
//   // SetupInputBox()
// }