import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, BarChart4, Users, TrendingUp, Calendar } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatChangeCard } from '@/components/stats/StatChangeCard';
import { SeasonSelector } from '@/components/common/SeasonSelector';

export function Dashboard() {
  const { players, teams, getAllSeasons } = useData();
  const [selectedSeason, setSelectedSeason] = useState<string>(getAllSeasons()[getAllSeasons().length - 1]);
  const [previousSeason, setPreviousSeason] = useState<string>(getAllSeasons()[getAllSeasons().length - 2]);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Statistics Dashboard</h2>
          <p className="text-muted-foreground">
            Analyze trends and performance metrics across seasons.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <SeasonSelector 
            seasons={getAllSeasons()}
            value={selectedSeason}
            onChange={setSelectedSeason}
            label="Season"
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Players Tracked</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
            <p className="text-xs text-muted-foreground">
              With detailed statistics across multiple seasons
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teams Analyzed</CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-muted-foreground">
              Detailed team performance data
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seasons</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAllSeasons().length}</div>
            <p className="text-xs text-muted-foreground">
              Historical data for trend analysis
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Metrics Tracked</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24+</div>
            <p className="text-xs text-muted-foreground">
              Advanced and traditional statistics
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>League Scoring Trends</CardTitle>
            <CardDescription>
              Points per game across seasons
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>League scoring visualization</p>
              <p className="text-sm">(Chart would be rendered here)</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Shooting Efficiency</CardTitle>
            <CardDescription>
              Field goal and three-point percentages
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Shooting efficiency visualization</p>
              <p className="text-sm">(Chart would be rendered here)</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pace and Possessions</CardTitle>
            <CardDescription>
              Game tempo across teams
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Pace factor visualization</p>
              <p className="text-sm">(Chart would be rendered here)</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Performance Changes</CardTitle>
            <CardDescription>Season-to-season changes in key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <StatChangeCard 
                title="League Scoring" 
                current={115.3} 
                previous={113.8} 
                unit="PPG"
                description="League-wide points per game"
              />
              
              <StatChangeCard 
                title="Three-Point Attempts" 
                current={34.2} 
                previous={32.1} 
                unit="3PA"
                description="Average 3-point attempts per game"
              />
              
              <StatChangeCard 
                title="Pace Factor" 
                current={100.2} 
                previous={99.8} 
                unit=""
                description="Possessions per 48 minutes"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Leading players in key statistical categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Points Per Game</p>
                  <div className="flex items-center">
                    <span className="font-semibold">Giannis Antetokounmpo</span>
                    <ArrowUpRight className="ml-2 h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">31.1 PPG</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Assists Per Game</p>
                  <div className="flex items-center">
                    <span className="font-semibold">LeBron James</span>
                    <ArrowUpRight className="ml-2 h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">8.3 APG</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Three-Point Percentage</p>
                  <div className="flex items-center">
                    <span className="font-semibold">Stephen Curry</span>
                    <ArrowUpRight className="ml-2 h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">42.9%</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}