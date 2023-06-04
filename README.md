# Using FFmpeg in Frontend

## Why

Normally we have a server set up for the FE to pass the video data to the server, and the server will run ffmpeg to convert the video then pass the video back to frontend.

## How

This project implement ffmeg (web assembly) in the FE side directly, in order to test out the integration between JS and WASM.

## Note

This project is built with vite, run

```
pnpm install
```

to install the dependency.

Then run

```
pnpm run dev
```

to start the server.
