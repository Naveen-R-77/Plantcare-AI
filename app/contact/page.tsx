"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, MessageSquare, Wrench, Leaf, Send } from "lucide-react"
import { sendContactEmail, type ContactFormData } from "@/lib/email-service"

export default function ContactPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields')
      }

      // Send email using EmailJS
      const emailData: ContactFormData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      }

      console.log('Sending contact form:', emailData)
      
      try {
        // Try EmailJS first
        const result = await sendContactEmail(emailData)
        
        if (result.success) {
          setSubmitStatus('success')
          // Clear form fields after successful submission
          setFormData({ ...formData, subject: '', message: '' })
        } else {
          throw new Error(result.error || 'EmailJS failed')
        }
      } catch (emailError) {
        console.warn('EmailJS failed, trying fallback API:', emailError)
        
        // Fallback to backup email API endpoint
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData)
        })
        
        const fallbackResult = await response.json()
        
        if (fallbackResult.success) {
          setSubmitStatus('success')
          setFormData({ ...formData, subject: '', message: '' })
          console.log('Fallback email API succeeded:', fallbackResult)
        } else {
          throw new Error('Both EmailJS and fallback API failed')
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (submitStatus !== 'idle') setSubmitStatus('idle')
  }



  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
            <h2 className="text-xl text-primary font-semibold">Get Expert Agricultural Support</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions about plant diseases, need technical support, or want to provide feedback? Our team of agricultural experts is here to help farmers succeed with AI-powered solutions.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="What can we help you with?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please describe your question or issue in detail..."
                      rows={5}
                      required
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm">
                      Message sent successfully! We'll get back to you within 24 hours.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                      Failed to send message. Please try again or contact us directly.
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">plantcareai78@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+91 (Available on request)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">India - Supporting farmers nationwide</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">Within 24 hours (IST timezone)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support Categories */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Support Categories</CardTitle>
                  <CardDescription>
                    Choose the right category for faster assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Wrench className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Technical Support</p>
                      <p className="text-sm text-muted-foreground">App issues, camera problems, AI analysis errors</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Leaf className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">Agricultural Advice</p>
                      <p className="text-sm text-muted-foreground">Plant diseases, treatment recommendations, farming practices</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium">Feedback & Suggestions</p>
                      <p className="text-sm text-muted-foreground">Feature requests, improvements, general feedback</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
