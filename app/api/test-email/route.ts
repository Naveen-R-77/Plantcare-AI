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

    // Log the email data for testing
    console.log('Test email data received:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    })

    // Simulate email sending success
    return NextResponse.json({
      success: true,
      message: 'Test email logged successfully',
      data: {
        name,
        email,
        subject,
        messageLength: message.length,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Test email API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
