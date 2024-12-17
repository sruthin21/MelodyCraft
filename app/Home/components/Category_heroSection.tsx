import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const spaces = [
  { name: 'Studio Sessions', description: 'Collaborate with artists in real-time', popularity: 95 },
  { name: 'Live Performances', description: 'Stream live music events', popularity: 88 },
  { name: 'Music Production', description: 'Create and mix tracks online', popularity: 92 },
  { name: 'Learning Hub', description: 'Learn from top musicians', popularity: 85 },
]

export function HeroSection() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Discover Music Spaces</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spaces.map((space) => (
            <Card key={space.name} className="bg-white/10 border-none text-white">
              <CardHeader>
                <CardTitle>{space.name}</CardTitle>
                <CardDescription className="text-gray-300">{space.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Popularity: {space.popularity}%</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

