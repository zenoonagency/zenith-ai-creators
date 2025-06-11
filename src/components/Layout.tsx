
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { UserHeader } from "./UserHeader"
import { HelpButton } from "./HelpButton"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between border-b bg-white px-6 shadow-sm">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold text-gray-800">
                Dashboard
              </h1>
            </div>
            <UserHeader />
          </header>
          
          <main className="flex-1 p-6 bg-gray-50">
            {children}
          </main>
        </div>
        
        <HelpButton />
      </div>
    </SidebarProvider>
  )
}
