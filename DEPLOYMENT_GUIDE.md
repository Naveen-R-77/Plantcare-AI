# PlantCare AI - Deployment Guide

## Environment Variables Required

Your Vercel deployment needs the following environment variables to work properly:

### Required Environment Variables:

1. **MONGODB_URI** - Your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/plant_disease_app`

2. **JWT_SECRET** - Secret key for JWT token generation
   - Example: `your-super-secret-jwt-key-here`

3. **GEMINI_API_KEY** - Google Gemini AI API key for plant disease detection
   - Get from: https://makersuite.google.com/app/apikey
   - Example: `AIzaSyC...`

4. **NEXT_PUBLIC_WEATHER_API_KEY** - OpenWeatherMap API key (optional)
   - Get from: https://openweathermap.org/api
   - Example: `your-weather-api-key`

5. **NEXT_PUBLIC_GEMINI_API_KEY** - Same as GEMINI_API_KEY (for client-side usage)
   - Same value as GEMINI_API_KEY

## Setting Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project: `Plantcare-AI`
3. Go to Settings → Environment Variables
4. Add each variable with the following names:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_WEATHER_API_KEY`
   - `NEXT_PUBLIC_GEMINI_API_KEY`

## Common Issues and Solutions

### Internal Server Error 500
- **Cause**: Missing environment variables
- **Solution**: Ensure all required environment variables are set in Vercel

### MongoDB Connection Issues
- **Cause**: Invalid MONGODB_URI or network restrictions
- **Solution**: 
  - Check MongoDB Atlas network access settings
  - Allow all IP addresses (0.0.0.0/0) for Vercel deployments
  - Verify connection string format

### Gemini API Issues
- **Cause**: Invalid or missing GEMINI_API_KEY
- **Solution**:
  - Get a valid API key from Google AI Studio
  - Ensure the key has proper permissions
  - Check API quota limits

### JWT Token Issues
- **Cause**: Missing or weak JWT_SECRET
- **Solution**: Use a strong, random secret key (at least 32 characters)

## Testing Your Deployment

After setting environment variables:

1. Redeploy your application in Vercel
2. Test the following endpoints:
   - `/api/auth/login` - User authentication
   - `/api/ai-detection` - Plant disease detection
   - `/api/chat` - AI chat functionality

## Monitoring

Check Vercel function logs for any runtime errors:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Functions tab
4. Check logs for any errors

## Support

If you encounter issues:
1. Check Vercel function logs
2. Verify all environment variables are set
3. Test API keys independently
4. Check MongoDB Atlas connection
