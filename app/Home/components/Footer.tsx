import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2023 MusicStream. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Button variant="ghost" size="icon">
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Discord</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}

