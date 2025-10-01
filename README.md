# 🌱 PlantCare AI - Plant Disease Detection & Crop Advisory

> **Status**: Production Ready - Deployed on Vercel

AI-powered plant disease detection and crop advisory platform with multilingual support for farmers and gardeners worldwide.

## Features

- **User Authentication** - Secure login/signup with MongoDB
- **Disease Detection** - AI-powered plant disease analysis using Google Gemini
- **AI Chatbot** - Conversational AI for plant care advice in multiple languages
- **Crop Advisory** - Location-based recommendations with weather integration
- **Multilingual Support** - English, Tamil, Hindi, Telugu, Kannada, Malayalam
- **Contact System** - EmailJS integration for farmer support
- **Analytics Dashboard** - User insights and detection history
- **Mobile Optimized** - Responsive design with PWA support

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Naveen-R-77/Plantcare-AI.git
   cd Plantcare-AI
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your API keys
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```
5. **Open in browser**
   ```
   http://localhost:3000
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/plantcare_ai

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# JWT Secret for Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Weather API (Optional)
NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
```
