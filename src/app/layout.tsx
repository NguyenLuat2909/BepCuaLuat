import '../index.css'
import Providers from '@/components/Providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bếp của Luật ✿ Sổ tay nấu ăn ấm áp',
  description: 'Sổ tay công thức nấu ăn, thực đơn tuần kéo thả và danh sách đi chợ tiện lợi cùng trợ lý AI của bạn.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: "#FAF4F1", color: "#664226" }}>
        <Providers>
          <div className="min-h-screen w-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
