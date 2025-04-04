
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react"

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(false) // Default to light mode
  
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <footer className="relative border-t bg-white text-foreground transition-colors duration-300 z-0 font-kanit">
      <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="relative">
            <h2 className="mb-3 text-2xl font-bold tracking-tight">FashionWeek</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative max-w-[200px]">
              <Input
                type="email"
                placeholder="Your email"
                className="pr-10 backdrop-blur-sm h-9 text-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-7 w-7 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-3 w-3" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
          <div>
            <h3 className="mb-2 text-base font-semibold">Quick Links</h3>
            <nav className="space-y-1 text-xs">
              <a href="/" className="block transition-colors hover:text-primary">Home</a>
              <a href="/brands" className="block transition-colors hover:text-primary">Brands</a>
              <a href="/liked" className="block transition-colors hover:text-primary">Liked</a>
            </nav>
          </div>
          <div>
            <h3 className="mb-2 text-base font-semibold">Contact Us</h3>
            <address className="space-y-1 text-xs not-italic">
              <p>Fashion Week HQ</p>
              <p>New York, NY 10001</p>
              <p>Email: hello@fashionweek.com</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-2 text-base font-semibold">Follow Us</h3>
            <div className="mb-4 flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Facebook className="h-3.5 w-3.5" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Twitter className="h-3.5 w-3.5" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Instagram className="h-3.5 w-3.5" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Linkedin className="h-3.5 w-3.5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-3 w-3" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="h-4 w-8"
              />
              <Moon className="h-3 w-3" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center justify-between gap-2 border-t pt-4 text-center md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2024 FashionWeek. All rights reserved.
          </p>
          <nav className="flex gap-4 text-xs">
            <a href="#" className="transition-colors hover:text-primary">Privacy</a>
            <a href="#" className="transition-colors hover:text-primary">Terms</a>
            <a href="#" className="transition-colors hover:text-primary">Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
