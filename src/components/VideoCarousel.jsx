import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
  // Refs to store references to video elements, progress bars, and their containers
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  // State to track video-related data
  const [video, setVideo] = useState({
    isEnd: false, // Checks if a video has ended
    startPlay: false, // Checks if playback should start
    videoId: 0, // Tracks the current video index
    isLastVideo: false, // Checks if the last video is playing
    isPlaying: false, // Tracks if a video is currently playing
  });

  const [loadedData, setLoadedData] = useState([]); // Stores metadata for loaded videos
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  // GSAP animation for sliding videos
  useGSAP(() => {
    gsap.to("#slider", {
      x: `-${100 * videoId}%`, // Moves the slider left based on videoId
      duration: 1.5,
      ease: "power2.inOut", // Smooth transition effect
    });

    gsap.to("#video", {
      onComplete: () => {
        // When animation completes, set video to play
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [videoId]);

  // Effect to update the progress indicator
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current[videoId];

    if (span) {
      // Animation for updating progress bar
      let anim = gsap.to(span, {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 1200 ? "10vw" : "4vw", // Different width for responsiveness
            });

            gsap.to(span, {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], { width: "12px" });
            gsap.to(span, { backgroundColor: "#afafaf" });
          }
        },
      });

      // Function to update progress based on video playback
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId]?.currentTime /
            hightlightsSlides[videoId]?.videoDuration
        );
      };

      gsap.ticker.add(animUpdate); // Add update function to GSAP's ticker

      return () => {
        gsap.ticker.remove(animUpdate); // Cleanup ticker on unmount
        anim.kill(); // Remove animation instance
      };
    }
  }, [videoId, isPlaying]);

  // Effect to handle video play/pause when metadata is loaded
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // Function to handle different video states (play, pause, reset, next video, etc.)
  const handleProcess = (type, i) => {
    setVideo((prev) => {
      switch (type) {
        case "video-end":
          return { ...prev, isEnd: true, videoId: i + 1 };
        case "video-last":
          return { ...prev, isLastVideo: true };
        case "video-reset":
          return { ...prev, videoId: 0, isLastVideo: false };
        case "pause":
        case "play":
          return { ...prev, isPlaying: !prev.isPlaying };
        default:
          return prev;
      }
    });
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((prev) => [...prev, e]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  className={`pointer-events-none ${
                    list.id === 2 && "translate-x-44"
                  }`}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((prev) => ({ ...prev, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={() =>
              handleProcess(
                isLastVideo ? "video-reset" : isPlaying ? "pause" : "play"
              )
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
