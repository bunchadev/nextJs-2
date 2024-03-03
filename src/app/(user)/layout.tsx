
import FooterApp from '@/components/footer/footer.app'
import HeaderApp from '@/components/header/header.app'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Khóa học by TrungAcademy',
  description: 'Wo ai ni',
}
export default function RootLayout({ children, }: { children: React.ReactNode}) {
  return (
    <>
       <HeaderApp/>
       {children}
       <FooterApp/>
    </>
  )
}
