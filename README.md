# Plant Disease Detection App

A comprehensive web application for AI-powered plant disease detection with multilingual support, chatbot assistance, and crop advisory features.

## Features

- 🔐 **User Authentication** - Secure login/signup with MongoDB
- 📸 **Disease Detection** - AI-powered plant disease analysis from leaf images
- 💬 **AI Chatbot** - Conversational AI for plant care advice
- 🌾 **Crop Advisory** - Personalized recommendations based on soil and weather
- 🌍 **Multilingual Support** - Tamil and English language support
- 📊 **Data Storage** - Complete user history and analysis storage

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/plant_disease_app?retryWrites=true&w=majority

# JWT Secret for Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Optional: For development redirects
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
\`\`\`

## MongoDB Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster and database named `plant_disease_app`
3. Get your connection string and add it to `MONGODB_URI`
4. The app will automatically create the following collections:
   - `users` - User accounts and profiles
   - `disease_detections` - Plant disease analysis history
   - `chat_messages` - Chatbot conversation history
   - `soil_analyses` - Soil parameter data
   - `crop_recommendations` - Crop advisory results

## Required Dependencies

The app uses the following key dependencies:

\`\`\`json
{
  "mongodb": "^6.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0"
}
\`\`\`

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see above)
4. Run the development server: `npm run dev`
5. Open http://localhost:3000

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/disease-detection` - Save disease detection results
- `GET /api/disease-detection` - Get user's detection history
- `POST /api/chat` - Send chat message and get AI response
- `GET /api/chat` - Get user's chat history

## Architecture

The app follows a modular architecture with:

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Next.js API routes with MongoDB
- **Authentication**: JWT-based authentication
- **Database**: MongoDB with proper schemas and indexes
- **Internationalization**: Context-based language switching
- **State Management**: React hooks and context
\`\`\`

```tsx file="" isHidden
