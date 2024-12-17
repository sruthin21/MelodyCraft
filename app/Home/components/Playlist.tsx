'use client'

import React from 'react'
import { Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Song {
  id: string
  title: string
  likes: number
  imageUrl: string
  youtubeId: string
}

interface PlaylistProps {
  playlist: Song[]
  onSongLiked: (song: Song) => void
}

export default function Playlist({ playlist, onSongLiked }: PlaylistProps) {
  const handleLike = (song: Song) => {
    onSongLiked({ ...song, likes: song.likes + 1 })
  }

  const sortedPlaylist = [...playlist].sort((a, b) => b.likes - a.likes)

  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Playlist</h2>
      {sortedPlaylist.length === 0 ? (
        <p className="text-white">No videos in queue. Add a video to get started!</p>
      ) : (
        <ul className="space-y-4">
          {sortedPlaylist.map((song) => (
            <li key={song.id} className="flex items-center bg-white bg-opacity-20 p-2 rounded">
              <Image
                src={song.imageUrl}
                alt={`${song.title} cover`}
                width={80}
                height={80}
                className="rounded mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-white font-semibold">{song.title}</h3>
                <div className="flex items-center mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleLike(song)} 
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                  >
                    <Heart className="h-4 w-4 mr-2" fill={song.likes > 0 ? "currentColor" : "none"} />
                    <span>{song.likes}</span>
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

