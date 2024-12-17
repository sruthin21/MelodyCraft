"use client"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function AppBar() {
  const session = useSession();
  return (
    <header className="bg-zinc-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">MusicStream</h1>
        <nav>
          <Button variant="ghost" asChild>
            <Link href="/Home/Profile">View Profile</Link>
          </Button>
         {session.data?.user && <Button variant="destructive" onClick={()=> signOut()}>Logout</Button> } 
         {!(session.data?.user) && <Button variant="destructive" onClick={()=> signIn()}>SignIn</Button> } 
        </nav>
      </div>
    </header>
  )
}

