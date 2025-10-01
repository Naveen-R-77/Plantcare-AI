"use client"

import { Leaf, Camera, MessageCircle, TrendingUp, User, Settings, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { SimpleLanguageSwitcher } from "./simple-language-switcher"
import { MobileNavigation } from "./mobile-navigation"
import { TranslatedText } from "./translated-text"

export function Navigation() {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                <TranslatedText context="app-title">PlantCare AI</TranslatedText>
              </h1>
              <p className="text-sm text-muted-foreground">
                <TranslatedText context="app-subtitle">Plant Disease Detection</TranslatedText>
              </p>
            </div>
          </Link>
          
          <MobileNavigation />

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("gap-2", pathname === "/dashboard" && "bg-accent text-accent-foreground")}
                >
                  <Camera className="h-4 w-4" />
                  <TranslatedText context="nav-menu">Detection</TranslatedText>
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("gap-2", pathname === "/chat" && "bg-accent text-accent-foreground")}
                >
                  <MessageCircle className="h-4 w-4" />
                  <TranslatedText context="nav-menu">Chat</TranslatedText>
                </Button>
              </Link>
              <Link href="/advisory">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("gap-2", pathname === "/advisory" && "bg-accent text-accent-foreground")}
                >
                  <TrendingUp className="h-4 w-4" />
                  <TranslatedText context="nav-menu">Advisory</TranslatedText>
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("gap-2", pathname === "/contact" && "bg-accent text-accent-foreground")}
                >
                  <Mail className="h-4 w-4" />
                  <TranslatedText context="nav-menu">Contact</TranslatedText>
                </Button>
              </Link>
            </nav>
            
            {/* Language Switcher - Always Visible */}
            <SimpleLanguageSwitcher />
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">JF</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <TranslatedText context="nav-menu">Profile</TranslatedText>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <TranslatedText context="nav-menu">Settings</TranslatedText>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <TranslatedText context="nav-menu">Sign out</TranslatedText>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
