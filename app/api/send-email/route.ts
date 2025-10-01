import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Log the contact form submission
    const contactData = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    }

    console.log('🌱 === PLANTCARE AI CONTACT SUBMISSION ===')
    console.log('📧 From:', name, `<${email}>`)
    console.log('📋 Subject:', subject)
    console.log('💬 Message:', message)
    console.log('⏰ Time:', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))
    console.log('🌐 User Agent:', request.headers.get('user-agent')?.substring(0, 100))
    console.log('==========================================')

    // Store contact submission for production use
    // In production, you might want to:
    // 1. Save to database (MongoDB, PostgreSQL, etc.)
    // 2. Send notification email to admin
    // 3. Integrate with CRM system
    // 4. Send auto-reply to user
    
    // For now, we ensure the submission is logged and tracked

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully! We will get back to you soon.',
      data: {
        id: `contact_${Date.now()}`,
        timestamp: contactData.timestamp
      }
    })

  } catch (error) {
    console.error('Contact form API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
