"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Mic, MicOff, Bot, User, Leaf, Plus, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth"
import { useLanguage } from "@/lib/language-context"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "voice"
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { token, user } = useAuth()
  const { language, t } = useLanguage()

  useEffect(() => {
    const loadChatHistory = async () => {
      if (!token) return

      try {
        const response = await fetch("/api/chat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          const formattedMessages: Message[] = data.messages
            .map((msg: any) => ({
              id: msg._id,
              content: msg.message,
              sender: "user" as const,
              timestamp: new Date(msg.timestamp),
              type: msg.messageType,
            }))
            .concat(
              data.messages.map((msg: any) => ({
                id: msg._id + "_response",
                content: msg.response,
                sender: "bot" as const,
                timestamp: new Date(msg.timestamp),
                type: "text",
              })),
            )
            .sort((a: Message, b: Message) => a.timestamp.getTime() - b.timestamp.getTime())

          setMessages(formattedMessages)
        }
      } catch (error) {
        console.error("[v0] Error loading chat history:", error)
      }

      setIsLoadingHistory(false)
    }

    // Add welcome message if no history
    if (messages.length === 0 && !isLoadingHistory) {
      const welcomeMessage: Message = {
        id: "welcome",
        content:
          language === "ta"
            ? "வணக்கம்! நான் உங்கள் AI தாவர பராமரிப்பு உதவியாளர். தாவர நோய்கள், சிகிச்சை பரிந்துரைகள், வளர்ப்பு குறிப்புகள் மற்றும் பொதுவான தாவர பராமரிப்பு ஆலோசனைகளில் நான் உங்களுக்கு உதவ முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?"
            : "Hello! I'm your AI plant care assistant. I can help you with plant diseases, treatment recommendations, growing tips, and general plant care advice. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      }
      setMessages([welcomeMessage])
    }

    loadChatHistory()
  }, [token, language, messages.length, isLoadingHistory])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim() || !token) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      console.log('🤖 Sending chat message:', {
        message: content.trim(),
        language: language,
        hasToken: !!token
      });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: content.trim(),
          messageType: "text",
          language: language,
        }),
      })

      console.log('📡 Chat API Response status:', response.status);

      if (response.ok) {
        const data = await response.json()
        console.log('✅ Chat API response:', data);

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response || "I received your message but couldn't generate a response.",
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        }

        setMessages((prev) => [...prev, botMessage])
      } else {
        const errorText = await response.text();
        console.error('❌ Chat API Error:', response.status, errorText);
        
        // Fallback to local response if API fails
        const fallbackResponse =
          language === "ta"
            ? "மன்னிக்கவும், தற்போது சில தொழில்நுட்ப சிக்கல்கள் உள்ளன. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
            : "Sorry, I'm experiencing some technical difficulties. Please try again."

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: fallbackResponse,
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        }

        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error("💥 Chat error:", error)
      
      // Show error message to user
      const errorResponse =
        language === "ta"
          ? "மன்னிக்கவும், நெட்வொர்க் பிரச்சினை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
          : "Sorry, there was a network issue. Please try again."

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorResponse,
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      }

      setMessages((prev) => [...prev, botMessage])
    }

    setIsLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const toggleVoiceInput = () => {
    if (!isListening) {
      // Start voice recognition
      setIsListening(true)
      // Simulate voice input - in real app, would use Web Speech API
      setTimeout(() => {
        setIsListening(false)
        const voiceInput =
          language === "ta"
            ? "என் தக்காளி செடியின் இலைகளில் பழுப்பு நிற புள்ளிகள் உள்ளன"
            : "My tomato plant has brown spots on the leaves"
        setInputValue(voiceInput)
      }, 3000)
    } else {
      setIsListening(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const startNewChat = async () => {
    try {
      // Clear local messages
      setMessages([])
      setInputValue("")
      
      // Clear chat history on server if needed
      if (token) {
        await fetch("/api/chat/clear", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      }
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: language === "ta" 
          ? "வணக்கம்! நான் உங்கள் தாவர பராமரிப்பு உதவியாளர். தாவரங்கள், நோய்கள், சிகிச்சைகள் அல்லது வேளாண்மை பற்றி எதையும் கேளுங்கள்!"
          : "Hello! I'm your Plant Care Assistant. Ask me anything about plants, diseases, treatments, or agriculture!",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      }
      
      setMessages([welcomeMessage])
      
      // Focus input
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      
    } catch (error) {
      console.error("Error starting new chat:", error)
    }
  }

  if (isLoadingHistory) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading chat history...</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          {language === "ta" ? "தாவர பராமரிப்பு உதவியாளர்" : "Plant Care Assistant"}
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={startNewChat}
              className="h-8 px-3"
            >
              <Plus className="h-4 w-4 mr-1" />
              {language === "ta" ? "புதிய அரட்டை" : "New Chat"}
            </Button>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-muted-foreground">{language === "ta" ? "ஆன்லைன்" : "Online"}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4 p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-3", message.sender === "user" ? "justify-end" : "justify-start")}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Leaf className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {message.sender === "bot" ? (
                    <div className="leading-relaxed prose prose-sm max-w-none text-inherit
                      prose-headings:text-inherit prose-p:text-inherit prose-strong:text-inherit 
                      prose-ul:text-inherit prose-ol:text-inherit prose-li:text-inherit
                      prose-h1:text-xl prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-6 prose-h1:text-inherit
                      prose-h2:text-lg prose-h2:font-bold prose-h2:mb-3 prose-h2:mt-5 prose-h2:text-inherit
                      prose-h3:text-base prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-4 prose-h3:text-inherit
                      prose-h4:text-sm prose-h4:font-semibold prose-h4:mb-2 prose-h4:mt-3 prose-h4:text-inherit
                      prose-p:mb-3 prose-p:leading-relaxed prose-p:text-inherit
                      prose-ul:mb-3 prose-ol:mb-3 prose-li:mb-1 prose-li:text-inherit
                      prose-strong:font-bold prose-strong:text-inherit prose-em:italic
                      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                      prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                      [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => <h1 className="text-xl font-bold mb-4 mt-6 text-inherit leading-tight">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-lg font-bold mb-3 mt-5 text-inherit leading-tight">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-base font-semibold mb-2 mt-4 text-inherit leading-tight">{children}</h3>,
                          h4: ({ children }) => <h4 className="text-sm font-semibold mb-2 mt-3 text-inherit leading-tight">{children}</h4>,
                          p: ({ children }) => <p className="mb-3 leading-relaxed text-inherit">{children}</p>,
                          strong: ({ children }) => <strong className="font-bold text-inherit">{children}</strong>,
                          ul: ({ children }) => <ul className="mb-3 ml-4 list-disc space-y-1 text-inherit">{children}</ul>,
                          ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal space-y-1 text-inherit">{children}</ol>,
                          li: ({ children }) => <li className="text-inherit leading-relaxed">{children}</li>,
                          blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic mb-3 text-inherit">{children}</blockquote>,
                          code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-sm text-inherit">{children}</code>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="leading-relaxed whitespace-pre-wrap">{message.content}</div>
                  )}
                  <p
                    className={cn(
                      "text-xs mt-1 opacity-70",
                      message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground/70",
                    )}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>

                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Leaf className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span>{language === "ta" ? "AI சிந்திக்கிறது..." : "AI is thinking..."}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-border p-4">
          {messages.length > 1 && (
            <div className="mb-3 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={startNewChat}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                {language === "ta" ? "அரட்டையை அழிக்கவும்" : "Clear Chat"}
              </Button>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  isListening
                    ? language === "ta"
                      ? "கேட்கிறது..."
                      : "Listening..."
                    : language === "ta"
                      ? "தாவர பராமரிப்பு, நோய்கள் அல்லது சிகிச்சைகள் பற்றி கேளுங்கள்..."
                      : "Ask about plant care, diseases, or treatments..."
                }
                disabled={isLoading || isListening}
                className="pr-12"
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={toggleVoiceInput}
                className={cn("absolute right-1 top-1 h-8 w-8 p-0", isListening && "text-red-500")}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button type="submit" disabled={!inputValue.trim() || isLoading || isListening} className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>

          {isListening && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              </div>
              <span>{language === "ta" ? "குரல் உள்ளீட்டைக் கேட்கிறது..." : "Listening for voice input..."}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
