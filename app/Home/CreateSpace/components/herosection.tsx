'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from "axios"
import { useSession } from 'next-auth/react'
import { useToast } from "@/hooks/use-toast"

export function HeroSection() {
    const { toast } = useToast()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      setEmail(session.user.email)
    }
  }, [session, status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !category) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)
    try {
      const res = await axios.post('/api/spaces', {
        name,
        category,
        email
      })
      console.log(res)
      toast({
        title: "Success",
        description: "Your music space has been created!",
      })
      // Reset form
      setName('')
      setCategory('')
    } catch (error) {
      console.error('Error creating space:', error)
      toast({
        title: "Error",
        description: "Failed to create music space. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <h1 className="mb-8 text-4xl font-bold text-center text-white md:text-5xl">
        Create Your Music Space
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">
            Space Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your space name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-zinc-800 text-white border-zinc-700"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category" className="text-white">
            Category
          </Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="category" className="bg-zinc-800 text-white border-zinc-700">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white border-zinc-700">
              <SelectItem value="rock">Rock</SelectItem>
              <SelectItem value="pop">Pop</SelectItem>
              <SelectItem value="jazz">Jazz</SelectItem>
              <SelectItem value="classical">Classical</SelectItem>
              <SelectItem value="electronic">Electronic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading || status !== 'authenticated'}>
          {isLoading ? 'Creating...' : 'Create Space'}
        </Button>
      </form>
      {status !== 'authenticated' && (
        <p className="mt-4 text-red-500">Please sign in to create a music space.</p>
      )}
    </div>
  )
}

