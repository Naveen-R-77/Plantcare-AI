import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '-10px' }}>🌱</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>AI</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
