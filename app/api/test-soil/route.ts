import { NextRequest, NextResponse } from 'next/server'

const soilDatabase: { [key: string]: any } = {
  'punjab': { pH: 7.8, nitrogen: 220, phosphorus: 12, potassium: 350, zinc: 0.6 },
  'kerala': { pH: 5.2, nitrogen: 180, phosphorus: 8, potassium: 180, zinc: 1.2 },
  'tamil nadu': { pH: 6.5, nitrogen: 200, phosphorus: 15, potassium: 250, zinc: 0.8 },
  'maharashtra': { pH: 7.2, nitrogen: 190, phosphorus: 18, potassium: 320, zinc: 0.9 },
  'rajasthan': { pH: 8.1, nitrogen: 150, phosphorus: 10, potassium: 280, zinc: 0.5 }
}

export async function POST(request: NextRequest) {
  const { location } = await request.json()
  const locationKey = location.toLowerCase().replace(/,.*/, '').trim()
  
  let soilData = null
  for (const key in soilDatabase) {
    if (locationKey.includes(key)) {
      soilData = soilDatabase[key]
      break
    }
  }
  
  if (!soilData) {
    soilData = { pH: 6.8, nitrogen: 185, phosphorus: 12, potassium: 260, zinc: 0.9 }
  }
  
  return NextResponse.json({
    location,
    soilData,
    message: `Soil parameters for ${location}`,
    timestamp: new Date().toISOString()
  })
}
