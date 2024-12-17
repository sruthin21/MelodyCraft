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

interface CurrentlyPlayingProps {
  song: Song
  onLike: (song: Song) => void
}

export default function CurrentlyPlaying({ song, onLike }: CurrentlyPlayingProps) {
  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4 text-white">Currently Playing</h2>
      <div className="flex items-center bg-white bg-opacity-20 p-2 rounded">
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
              onClick={() => onLike(song)} 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
            >
              <Heart className="h-4 w-4 mr-2" fill={song.likes > 0 ? "currentColor" : "none"} />
              <span>{song.likes}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

