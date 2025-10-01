# EmailJS Auto-Reply Setup Guide

## 🚨 **Current Issue:**
Auto-replies are not working because your EmailJS template `template_5lmsvar` is configured to send emails TO you, not TO users.

## ✅ **Solution Options:**

### **Option 1: Create Separate Auto-Reply Template (Recommended)**

1. **Go to EmailJS Dashboard**
2. **Create New Template** (e.g., `template_autoreply`)
3. **Configure Auto-Reply Template:**

```
To: {{to_email}}
From: PlantCare AI Support <naveenramesh157@gmail.com>
Subject: {{subject}}

{{message}}

---
PlantCare AI Support Team
```

4. **Update Code** - Replace in `email-service.ts`:
```typescript
autoReplyTemplateId: 'template_autoreply', // Your new auto-reply template ID
```

### **Option 2: Modify Existing Template (Advanced)**

Update your current template `template_5lmsvar` to handle both directions:

```
To: {{to_email}}
From: {{from_email}}
Subject: {{subject}}

{{message}}
```

This allows the same template to send:
- TO you (when `to_email` = your email)
- TO user (when `to_email` = user's email)

### **Option 3: Use Different EmailJS Service**

Create a separate EmailJS service specifically for auto-replies with different email configuration.

## 🔧 **Quick Fix Instructions:**

### **Step 1: Create Auto-Reply Template**
1. Login to EmailJS Dashboard
2. Go to "Email Templates"
3. Click "Create New Template"
4. Name it: `PlantCare AI Auto-Reply`
5. Set Template ID: `template_autoreply`

### **Step 2: Configure Template**
```
To: {{to_email}}
From: PlantCare AI Support <naveenramesh157@gmail.com>
Subject: Thank you for contacting PlantCare AI! 🌱

Dear {{user_name}},

Thank you for reaching out to PlantCare AI!

We have received your message regarding "{{user_subject}}" and our agricultural experts will review it shortly.

📧 What happens next:
• Our team will review your inquiry within 24 hours
• You'll receive a detailed response during business hours (9:00 AM - 6:00 PM IST)
• For urgent technical issues, you can also try our AI chat feature

🌾 PlantCare AI is committed to helping farmers succeed with AI-powered solutions.

Best regards,
PlantCare AI Support Team

---
This is an automated confirmation email.
```

### **Step 3: Update Code**
Replace the template ID in the code:
```typescript
autoReplyTemplateId: 'template_autoreply', // Your new template ID
```

### **Step 4: Test**
1. Submit contact form
2. Check user's email for auto-reply
3. Check your email for the original message

## 📧 **Expected Result:**

**User submits form** →
1. **You receive:** Original message with user details
2. **User receives:** Professional auto-reply confirmation

## 🔍 **Troubleshooting:**

**If auto-replies still don't work:**
1. Check EmailJS dashboard for failed sends
2. Verify template variables match code parameters
3. Check spam folder for auto-replies
4. Ensure `to_email` parameter is correctly set to user's email

**Template Variables Used:**
- `{{to_email}}` - User's email address
- `{{user_name}}` - User's name
- `{{subject}}` - Auto-reply subject
- `{{message}}` - Auto-reply message content
- `{{from_email}}` - Your email address

## ✅ **Success Indicators:**
- User receives confirmation email immediately
- You receive the original inquiry
- Console shows "Auto-reply sent successfully"
- No errors in browser console
