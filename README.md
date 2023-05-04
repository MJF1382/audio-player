# Audio Player
This is an audio player that created with react.js.

## How to use?
Downlaod AudioPicker.jsx and use AudioPicker components like this:

```jsx
import React from "react";
import AudioPlayer from "./AudioPlayer";
import song1 from "../audios/song1.MP3";

const App = () => {
    return (
        <AudioPlayer audio={song1} title="Audio 1" />
    )
}

export default App
```

**audio:** Your audio file.  
**title:** Title of audio player.

## Gallery

![audio player image](https://github.com/MJF1382/audio-player/raw/main/images/AudioPlayer.png)

**Point:** "Audio1" is the ***title***.
