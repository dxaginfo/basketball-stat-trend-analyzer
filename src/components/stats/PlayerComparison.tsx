import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

// This is a placeholder for the actual chart component
// In a real implementation, you would use a charting library like Recharts
function LineChart({ data, dataKey, height = 300 }: { data: any[], dataKey: string, height?: number }) {
  return (
    <div 
      className="flex items-center justify-center" 
      style={{ height: `${height}px` }}
    >
      <p className="text-muted-foreground">
        Line chart would render here, showing {dataKey} over time
      </p>
    </div>
  );
}

export function PlayerComparison() {
  const { players, comparePlayersOverTime } = useData();
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>(['p1', 'p2']);
  const [selectedMetric, setSelectedMetric] = useState<string>('pointsPerGame');
  
  // Metrics with display names for the UI
  const metrics = [
    { key: 'pointsPerGame', name: 'Points Per Game' },
    { key: 'assistsPerGame', name: 'Assists Per Game' },
    { key: 'reboundsPerGame', name: 'Rebounds Per Game' },
    { key: 'fieldGoalPercentage', name: 'Field Goal %' },
    { key: 'threePointPercentage', name: '3-Point %' },
    { key: 'stealsPerGame', name: 'Steals Per Game' },
    { key: 'blocksPerGame', name: 'Blocks Per Game' },
    { key: 'plusMinus', name: 'Plus/Minus' },
  ];
  
  const togglePlayerSelection = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      // Remove player if already selected
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else {
      // Add player if not already selected (limit to 3 players for readability)
      if (selectedPlayers.length < 3) {
        setSelectedPlayers([...selectedPlayers, playerId]);
      }
    }
  };
  
  // Generate comparison data based on selected players and metric
  const comparisonData = comparePlayersOverTime(
    selectedPlayers,
    selectedMetric as any
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Comparison</CardTitle>
        <CardDescription>
          Compare statistical trends between players over seasons
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="comparison" className="space-y-4">
          <TabsList>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comparison" className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedPlayers.map(playerId => {
                const player = players.find(p => p.id === playerId);
                return player ? (
                  <div 
                    key={playerId}
                    className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm"
                  >
                    <span>{player.name}</span>
                  </div>
                ) : null;
              })}
              
              <div className="text-sm text-muted-foreground">
                {selectedPlayers.length === 0 && "No players selected"}
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">
                    {metrics.find(m => m.key === selectedMetric)?.name || 'Selected Metric'}
                  </h4>
                  <Button variant="outline" size="sm">
                    {metrics.find(m => m.key === selectedMetric)?.name}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <LineChart
                data={comparisonData}
                dataKey={selectedMetric}
                height={300}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="players" className="space-y-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {players.map(player => (
                <Button
                  key={player.id}
                  variant={selectedPlayers.includes(player.id) ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => togglePlayerSelection(player.id)}
                >
                  <span>{player.name}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map(metric => (
                <Button
                  key={metric.key}
                  variant={selectedMetric === metric.key ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setSelectedMetric(metric.key)}
                >
                  <span>{metric.name}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}