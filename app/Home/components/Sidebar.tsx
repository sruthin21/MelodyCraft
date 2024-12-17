import { Button } from "@/components/ui/button"
import { Home, Play, Users, Grid, List } from 'lucide-react'
import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="bg-zinc-900 text-white w-64 p-4 flex flex-col space-y-4">
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/Home"><Home className="mr-2" size={20} /> Home</Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/Home/CreateSpace"><Play className="mr-2" size={20} /> Create A Space</Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/Home/JoinSpace"><Users className="mr-2" size={20} /> Join A Space</Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/Home/Categories"><Grid className="mr-2" size={20} /> Categories</Link>
      </Button>
      {/* <Button variant="ghost" className="justify-start" asChild>
        <Link href="/my-streams"><List className="mr-2" size={20} /> My Spaces</Link>
      </Button> */}
    </aside>
  )
}

