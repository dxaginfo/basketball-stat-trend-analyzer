import { 
  Users, 
  Building2, 
  TrendingUp, 
  BarChart, 
  LineChart,
  Activity,
  ClipboardList,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col gap-2 p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Analysis Tools</h2>
          <p className="text-sm text-muted-foreground">Explore basketball statistics</p>
        </div>
        
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveCategory('players')}>
            <Users className="mr-2 h-4 w-4" />
            <span>Players</span>
          </Button>
          
          {activeCategory === 'players' && (
            <div className="ml-4 space-y-1 border-l pl-4">
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Activity className="mr-2 h-4 w-4" />
                <span>Performance Metrics</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <TrendingUp className="mr-2 h-4 w-4" />
                <span>Career Progression</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <LineChart className="mr-2 h-4 w-4" />
                <span>Shooting Analysis</span>
              </Button>
            </div>
          )}
          
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveCategory('teams')}>
            <Building2 className="mr-2 h-4 w-4" />
            <span>Teams</span>
          </Button>
          
          {activeCategory === 'teams' && (
            <div className="ml-4 space-y-1 border-l pl-4">
              <Button variant="ghost" className="w-full justify-start text-sm">
                <BarChart className="mr-2 h-4 w-4" />
                <span>Team Statistics</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Season Comparisons</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <ClipboardList className="mr-2 h-4 w-4" />
                <span>Roster Analysis</span>
              </Button>
            </div>
          )}
          
          <Button variant="ghost" className="w-full justify-start">
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Trends</span>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start">
            <LineChart className="mr-2 h-4 w-4" />
            <span>Advanced Analytics</span>
          </Button>
        </div>
        
        <div className="mt-auto border-t pt-4">
          <div className="rounded-md bg-secondary p-4">
            <h3 className="font-medium">Need Help?</h3>
            <p className="text-sm text-muted-foreground">
              Check out our documentation or contact support for assistance.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}