import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Music, Mic, Headphones, Radio, Users, Tv } from 'lucide-react'

const categories = [
  { name: 'Pop', icon: Music, description: 'Chart-topping hits and catchy tunes' },
  { name: 'Rock', icon: Mic, description: 'Guitar-driven anthems and powerful vocals' },
  { name: 'Hip Hop', icon: Headphones, description: 'Rhythmic beats and expressive lyrics' },
  { name: 'Electronic', icon: Radio, description: 'Synthesized sounds and pulsating rhythms' },
  { name: 'Jazz', icon: Users, description: 'Improvisational melodies and smooth rhythms' },
  { name: 'Classical', icon: Tv, description: 'Timeless compositions and orchestral arrangements' },
]

export function Categories() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Explore Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="bg-white/10 border-none text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <category.icon className="h-6 w-6" />
                  <span>{category.name}</span>
                </CardTitle>
                <CardDescription className="text-gray-300">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full">Explore {category.name}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

