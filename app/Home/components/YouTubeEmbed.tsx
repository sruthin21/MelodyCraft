import React, { useEffect, useRef } from 'react'

interface YouTubeEmbedProps {
  videoId: string
  onVideoEnd: () => void
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function YouTubeEmbed({ videoId, onVideoEnd }: YouTubeEmbedProps) {
  const playerRef = useRef<any>(null)

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = initializePlayer
    } else {
      initializePlayer()
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(videoId)
    }
  }, [videoId])

  const initializePlayer = () => {
    playerRef.current = new window.YT.Player('youtube-player', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      events: {
        onReady: (event: any) => {
          event.target.playVideo()
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            onVideoEnd()
          }
        },
      },
    })
  }

  return (
    <div className="aspect-video">
      <div id="youtube-player"></div>
    </div>
  )
}

