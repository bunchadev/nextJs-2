
import StyledComponentsRegistry from '@/lib/antd.registry'
import { CourseContextProvider } from '@/lib/course.wrapper'
import NextAuthWrapper from '@/lib/next.auth.wrapper'
import NProgressWrapper from '@/lib/nprogress.wrapper'
export default function RootLayout({ children, }: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
         <NProgressWrapper>
          <NextAuthWrapper>
            <CourseContextProvider>
                {children}   
            </CourseContextProvider>
          </NextAuthWrapper>
         </NProgressWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
