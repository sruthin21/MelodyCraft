"use client"
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import YouTubeEmbed from './YouTubeEmbed'
import Playlist from './Playlist'
import CurrentlyPlaying from './CurrentlyPlaying'
interface Song {
  id: string
  title: string
  likes: number
  imageUrl: string
  youtubeId: string
}
export interface StreamPageProps {
    spaceId: string;
}
  
export default  function StreamPage({spaceId}:{
    spaceId: string
}) {

  const [currentVideo, setCurrentVideo] = useState<Song | null>(null)
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const handleSongLiked = (likedSong: Song) => {
    if (currentVideo && currentVideo.id === likedSong.id) {
      setCurrentVideo({ ...currentVideo, likes: currentVideo.likes + 1 })
    } else {
      const updatedPlaylist = playlist.map(song => 
        song.id === likedSong.id ? { ...song, likes: song.likes + 1 } : song
      )
      setPlaylist(updatedPlaylist)
    }
  }

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault()
    const youtubeId = extractYoutubeId(youtubeUrl)
    if (youtubeId) {
      const newSong: Song = {
        id: Date.now().toString(),
        title: `New Video ${playlist.length + 1}`,
        likes: 0,
        imageUrl: `/placeholder.svg?height=80&width=80`,
        youtubeId: youtubeId
      }
      if (!currentVideo) {
        setCurrentVideo(newSong)
      } else {
        setPlaylist([...playlist, newSong])
      }
      setYoutubeUrl('')
    }
  }

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const handleVideoEnd = () => {
    if (playlist.length > 0) {
      const [nextVideo, ...remainingPlaylist] = playlist
      setCurrentVideo(nextVideo)
      setPlaylist(remainingPlaylist)
    } else {
      setCurrentVideo(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-indigo-600">
      <div className="container mx-auto p-4">
        <form onSubmit={handleAddVideo} className="mb-4">
          <Label htmlFor="youtube-url" className="text-white mb-2 block">Add YouTube Video</Label>
          <div className="flex gap-2">
            <Input
              id="youtube-url"
              placeholder="Enter YouTube URL"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="bg-white flex-grow"
            />
            <Button type="submit" className="bg-white text-black hover:bg-gray-200">Add</Button>
          </div>
        </form>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-grow">
            {currentVideo ? (
              <>
                <YouTubeEmbed videoId={currentVideo.youtubeId} onVideoEnd={handleVideoEnd} />
                <CurrentlyPlaying song={currentVideo} onLike={handleSongLiked} />
              </>
            ) : (
              <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
                No video selected. Add a video to start playing.
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/3">
            <Playlist playlist={playlist} onSongLiked={handleSongLiked} />
          </div>
        </div>
      </div>
    </div>
  )
}

