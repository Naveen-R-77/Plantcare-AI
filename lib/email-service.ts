// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_gxyj95p',
  templateId: 'template_5lmsvar', // Main template (sends TO you)
  autoReplyTemplateId: 'template_5lmsvar', // Using same template for now
  publicKey: 'kLnqJPfFGZtYv6KC1'
}

// Load EmailJS dynamically
declare global {
  interface Window {
    emailjs: any;
  }
}

// Load EmailJS script dynamically
function loadEmailJS(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.emailjs) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_CONFIG.publicKey);
        resolve();
      } else {
        reject(new Error('EmailJS failed to load'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load EmailJS script'));
    document.head.appendChild(script);
  });
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface EmailResponse {
  success: boolean
  message: string
  error?: string
}

export async function sendContactEmail(formData: ContactFormData): Promise<EmailResponse> {
  try {
    // Load EmailJS if not already loaded
    await loadEmailJS();

    // Prepare template parameters - using exact EmailJS template variable names
    const templateParams = {
      // Core template variables (match your EmailJS template exactly)
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      
      // Alternative naming conventions
      from_name: formData.name,
      from_email: formData.email,
      user_name: formData.name,
      user_email: formData.email,
      
      // Additional fields
      to_name: 'PlantCare AI Support',
      reply_to: formData.email,
      
      // Timestamp
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    }

    console.log('EmailJS Config:', EMAILJS_CONFIG)
    console.log('Sending main email with params:', templateParams)

    // Send main email to you
    const response = await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )

    console.log('Main email response:', response)

    if (response.status === 200) {
      return {
        success: true,
        message: 'Email sent successfully! We will get back to you within 24 hours.'
      }
    } else {
      throw new Error(`EmailJS returned status: ${response.status} - ${response.text}`)
    }
  } catch (error) {
    console.error('Email sending failed:', error)
    
    return {
      success: false,
      message: 'Failed to send email. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Auto-reply functionality - using same template with different parameters
async function sendAutoReply(formData: ContactFormData): Promise<void> {
  const autoReplyParams = {
    // Core template variables - but reversed for auto-reply
    name: 'PlantCare AI Support',
    email: 'plantcareai78@gmail.com',
    subject: 'Thank you for contacting PlantCare AI! 🌱',
    message: `Dear ${formData.name},

Thank you for reaching out to PlantCare AI! 

We have successfully received your message regarding "${formData.subject}" and our agricultural experts will review it shortly.

Your submitted message:
"${formData.message}"

📧 What happens next:
• Our team will review your inquiry within 24 hours
• You'll receive a detailed response during business hours (9:00 AM - 6:00 PM IST)
• For urgent technical issues, you can also try our AI chat feature in the app

🌾 PlantCare AI is committed to helping farmers succeed with AI-powered agricultural solutions.

Best regards,
PlantCare AI Support Team

---
This is an automated confirmation email.
If you have any urgent concerns, please reply to this email.`,
    
    // Alternative naming conventions
    from_name: 'PlantCare AI Support',
    from_email: 'plantcareai78@gmail.com',
    user_name: formData.name,
    user_email: formData.email,
    
    // Additional fields
    to_name: formData.name,
    reply_to: 'plantcareai78@gmail.com',
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  }

  console.log('Sending auto-reply to user:', formData.email)
  console.log('Auto-reply params:', autoReplyParams)

  // Send auto-reply using the same template (configured to handle both directions)
  const autoReplyResponse = await window.emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.autoReplyTemplateId,
    autoReplyParams,
    EMAILJS_CONFIG.publicKey
  )

  console.log('Auto-reply response:', autoReplyResponse)
}

// Test email function for debugging
export async function testEmailService(): Promise<EmailResponse> {
  const testData: ContactFormData = {
    name: 'Test User from PlantCare AI',
    email: 'plantcareai78@gmail.com', // Your actual email address for testing
    subject: 'EmailJS Connection Test',
    message: 'This is a test message to verify EmailJS integration with your credentials. If you receive this, the connection is working!'
  }

  console.log('Testing with credentials:', {
    serviceId: EMAILJS_CONFIG.serviceId,
    templateId: EMAILJS_CONFIG.templateId,
    publicKey: EMAILJS_CONFIG.publicKey.substring(0, 5) + '...' // Hide full key in logs
  })

  return sendContactEmail(testData)
}

// Function to test auto-reply separately
export async function testAutoReply(userEmail: string): Promise<EmailResponse> {
  try {
    await loadEmailJS();
    
    const autoReplyParams = {
      // Try different parameter combinations to match your template
      name: 'PlantCare AI Support',
      email: 'plantcareai78@gmail.com',
      subject: 'Thank you for contacting PlantCare AI! 🌱',
      message: `Dear User,

Thank you for reaching out to PlantCare AI! This is an automated test of our auto-reply system.

Best regards,
PlantCare AI Support Team`,
      
      // Alternative naming
      from_name: 'PlantCare AI Support',
      from_email: 'plantcareai78@gmail.com',
      to_name: 'User',
      to_email: userEmail,
      user_name: 'User',
      user_email: userEmail,
      reply_to: 'plantcareai78@gmail.com'
    }

    console.log('Testing auto-reply to:', userEmail)
    console.log('Auto-reply params:', autoReplyParams)

    const response = await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      autoReplyParams,
      EMAILJS_CONFIG.publicKey
    )

    console.log('Auto-reply test response:', response)

    if (response.status === 200) {
      return {
        success: true,
        message: 'Auto-reply test sent successfully!'
      }
    } else {
      throw new Error(`Auto-reply test failed: ${response.status}`)
    }
  } catch (error) {
    console.error('Auto-reply test failed:', error)
    return {
      success: false,
      message: 'Auto-reply test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
