# Plant Disease Detection App - Setup Guide

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Required: Gemini AI API Key for plant disease detection
GEMINI_API_KEY=your_gemini_api_key_here

# Required: MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/plant-disease-app

# Required: JWT secret for authentication
JWT_SECRET=your_jwt_secret_here

# Optional: Weather API key for enhanced predictions
NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key_here
```

### 3. Get Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key and paste it in your `.env.local` file

### 4. Start the Development Server
```bash
npm run dev
```

## 🔧 Troubleshooting Camera Issues

### Camera Not Working?
The app includes comprehensive camera debugging. If you encounter issues:

1. **Check Browser Permissions**: Ensure camera access is allowed
2. **Try Different Browsers**: Chrome and Edge work best
3. **Check Console Logs**: Open Developer Tools to see detailed error messages
4. **Use the Test Button**: Click "🧪 Test Camera Access" to diagnose issues

### Common Camera Errors:
- **NotAllowedError**: Camera permission denied - allow camera access
- **NotFoundError**: No camera detected - connect a camera device
- **NotReadableError**: Camera in use by another app - close other apps

## 🤖 AI Analysis Features

### Gemini AI Integration
- **Primary Method**: Uses Google's Gemini 2.0 Flash for accurate plant disease detection
- **Fallback System**: Automatically falls back to demo analysis if API fails
- **Detailed Logging**: Check browser console for detailed API interaction logs

### What the AI Analyzes:
1. **Plant Type Identification**
2. **Disease Detection** (fungal, bacterial, viral)
3. **Severity Assessment** (Low/Medium/High)
4. **Treatment Recommendations**
5. **Prevention Strategies**
6. **Affected Plant Parts**

## 📱 Camera Features

### Enhanced Camera Support:
- **Progressive Constraints**: Tries multiple camera configurations for compatibility
- **Environment Camera**: Prefers back camera for better plant photos
- **Quality Control**: Captures high-quality JPEG images
- **Real-time Feedback**: Shows camera status and loading states

### Camera Workflow:
1. Click "Open Camera" → Camera initializes with loading indicator
2. Wait for "Take Photo" button to become green
3. Capture photo → Image automatically processed
4. Analyze with AI → Get detailed disease analysis

## 🌾 Location-Based Features

### Crop Advisory System:
- Enter your location to get region-specific farming advice
- AI analyzes local climate, soil conditions, and growing seasons
- Provides comprehensive recommendations for:
  - Suitable crops for your area
  - Soil management tips
  - Water management strategies
  - Pest and disease prevention
  - Market intelligence
  - Government schemes and subsidies

## 🔍 Debugging Tips

### Enable Detailed Logging:
The app includes extensive console logging. Open Developer Tools (F12) to see:
- Camera initialization steps
- Image capture details
- API request/response data
- Error messages with solutions

### Common Issues:
1. **"Gemini API not configured"**: Add your API key to `.env.local`
2. **"Camera not available"**: Check permissions and device connections
3. **"Analysis failed"**: Check internet connection and API key validity
4. **"Demo analysis shown"**: Normal fallback when API is unavailable

## 📊 Performance Tips

### For Best Results:
- **Good Lighting**: Take photos in well-lit conditions
- **Clear Images**: Ensure plant leaves are clearly visible
- **Stable Connection**: Ensure good internet for AI analysis
- **Updated Browser**: Use latest Chrome, Firefox, or Edge

### Image Requirements:
- **Format**: JPEG or PNG
- **Size**: Automatically optimized
- **Quality**: Higher quality = better AI analysis
- **Focus**: Clear focus on affected plant parts

## 🛠️ Development Notes

### Architecture:
- **Frontend**: Next.js 14 with TypeScript
- **AI Integration**: Google Gemini 2.0 Flash API
- **Database**: MongoDB for storing analysis results
- **Authentication**: JWT-based user system
- **Camera**: WebRTC with progressive fallbacks

### Key Files:
- `components/disease-detection.tsx`: Main camera and analysis UI
- `lib/ai-services.ts`: Gemini AI integration and fallbacks
- `app/api/ai-detection/route.ts`: API endpoint for analysis
- `app/api/soil-analysis/route.ts`: Location-based crop advisory

## 📞 Support

If you encounter issues:
1. Check the browser console for detailed error messages
2. Verify your `.env.local` configuration
3. Test camera access with the built-in test button
4. Ensure your Gemini API key has sufficient quota

The app is designed to work even without API keys by providing demo analysis results for testing purposes.
