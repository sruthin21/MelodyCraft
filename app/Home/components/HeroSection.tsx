import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeroSection() {
  // This would typically come from an API or database
  const topStreams = [
    { id: 1, title: "Jazz Night", viewers: 1200 },
    { id: 2, title: "Rock Classics", viewers: 980 },
    { id: 3, title: "EDM Party", viewers: 1500 },
  ]

  const currentStreams = [
    { id: 4, title: "Acoustic Covers", viewers: 750 },
    { id: 5, title: "Hip Hop Beats", viewers: 1100 },
  ]

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Top Streams</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topStreams.map((stream) => (
          <Card key={stream.id}>
            <CardHeader>
              <CardTitle>{stream.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{stream.viewers} viewers</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-white mt-8">Currently Running Streams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentStreams.map((stream) => (
          <Card key={stream.id}>
            <CardHeader>
              <CardTitle>{stream.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{stream.viewers} viewers</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

