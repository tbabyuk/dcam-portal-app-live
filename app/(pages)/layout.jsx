import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"


export default function DashboardLayout({children}) {
  return (
    <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-[200px] md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
          <Sidebar />
        </div>
        <div className="md:pl-[200px]">
          <Navbar />
          <main className="h-[calc(100vh-52px)]">
            {children}
          </main>
        </div>
    </div>
  )
}