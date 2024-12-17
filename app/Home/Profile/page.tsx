import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Disc3, Globe, Instagram, Twitter } from 'lucide-react'

// Mock user data
const user = {
  name: "Alice Johnson",
  username: "alicejazz",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Jazz enthusiast and amateur pianist. Always on the lookout for new melodies and rhythms.",
  stats: {
    playlists: 23,
    followers: 1420,
    following: 645
  },
  favoriteGenres: ["Jazz", "Classical", "Blues"],
  recentTracks: [
    { title: "So What", artist: "Miles Davis" },
    { title: "Take Five", artist: "Dave Brubeck" },
    { title: "All Blues", artist: "Miles Davis" },
    { title: "Round Midnight", artist: "Thelonious Monk" }
  ],
  socialMedia: {
    twitter: "alicejazz",
    instagram: "alice.jazz",
    website: "www.alicejohnson.com"
  }
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          <p className="mt-4 text-center sm:text-left">{user.bio}</p>
          <div className="mt-4 flex justify-center space-x-4 sm:justify-start">
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
            <Button size="sm">Follow</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Music Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.playlists}</p>
                <p className="text-sm text-muted-foreground">Playlists</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Favorite Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.favoriteGenres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tracks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {user.recentTracks.map((track, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Disc3 className="h-4 w-4 text-muted-foreground" />
                  <span>{track.title} - {track.artist}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Twitter className="h-5 w-5 text-muted-foreground" />
                <span>{user.socialMedia.twitter}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram className="h-5 w-5 text-muted-foreground" />
                <span>{user.socialMedia.instagram}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span>{user.socialMedia.website}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

