import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Dashboard } from '@/components/layout/Dashboard'
import { useData } from '@/context/DataContext'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlayerComparison } from '@/components/stats/PlayerComparison'
import { StatTrendChart } from '@/components/stats/StatTrendChart'

function App() {
  const { loading } = useData()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12 animate-ball-bounce">
            <div className="absolute inset-0 bg-orange-500 rounded-full" />
            <div className="absolute inset-0 bg-black rounded-full opacity-20 blur-sm" />
          </div>
          <p className="text-lg font-medium">Loading statistics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
              <TabsTrigger value="comparison">Player Comparison</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>
            <TabsContent value="trends">
              <StatTrendChart />
            </TabsContent>
            <TabsContent value="comparison">
              <PlayerComparison />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

export default App