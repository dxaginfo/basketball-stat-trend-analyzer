import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SeasonSelector } from '@/components/common/SeasonSelector';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/context/DataContext';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Player, PlayerStats, Team, TeamStats } from '@/types';

// This is a placeholder for the actual chart component
// In a real implementation, you would use a charting library like Recharts
function LineChart({ data, xKey, yKey, height = 300 }: { data: any[], xKey: string, yKey: string, height?: number }) {
  return (
    <div 
      className="flex items-center justify-center" 
      style={{ height: `${height}px` }}
    >
      <p className="text-muted-foreground">
        Line chart would render here, showing {yKey} over {xKey}
      </p>
    </div>
  );
}

export function StatTrendChart() {
  const { players, teams, getAllSeasons } = useData();
  const [entityType, setEntityType] = useState<'player' | 'team'>('player');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(players[0]?.id || '');
  const [selectedTeamId, setSelectedTeamId] = useState<string>(teams[0]?.id || '');
  const [selectedStat, setSelectedStat] = useState<string>(entityType === 'player' ? 'pointsPerGame' : 'pace');
  
  const seasons = getAllSeasons();
  
  // Define available stats based on entity type
  const playerStats = [
    { key: 'pointsPerGame', label: 'Points Per Game' },
    { key: 'assistsPerGame', label: 'Assists Per Game' },
    { key: 'reboundsPerGame', label: 'Rebounds Per Game' },
    { key: 'stealsPerGame', label: 'Steals Per Game' },
    { key: 'blocksPerGame', label: 'Blocks Per Game' },
    { key: 'fieldGoalPercentage', label: 'Field Goal %' },
    { key: 'threePointPercentage', label: '3-Point %' },
    { key: 'plusMinus', label: 'Plus/Minus' },
    { key: 'playerEfficiencyRating', label: 'Player Efficiency Rating' },
  ];
  
  const teamStats = [
    { key: 'pointsPerGame', label: 'Points Per Game' },
    { key: 'pointsAllowedPerGame', label: 'Points Allowed Per Game' },
    { key: 'pace', label: 'Pace' },
    { key: 'offensiveRating', label: 'Offensive Rating' },
    { key: 'defensiveRating', label: 'Defensive Rating' },
    { key: 'netRating', label: 'Net Rating' },
    { key: 'fieldGoalPercentage', label: 'Field Goal %' },
    { key: 'threePointPercentage', label: '3-Point %' },
  ];
  
  const availableStats = entityType === 'player' ? playerStats : teamStats;
  
  // Get the selected entity
  const selectedEntity: Player | Team | null = 
    entityType === 'player' 
      ? players.find(p => p.id === selectedPlayerId) || null
      : teams.find(t => t.id === selectedTeamId) || null;
  
  // Generate data for the chart
  const chartData = seasons.map(season => {
    let value = null;
    
    if (selectedEntity) {
      if (entityType === 'player') {
        const player = selectedEntity as Player;
        const seasonData = player.seasons.find(s => s.year === season);
        if (seasonData) {
          value = seasonData.stats[selectedStat as keyof PlayerStats];
        }
      } else {
        const team = selectedEntity as Team;
        const seasonData = team.seasons.find(s => s.year === season);
        if (seasonData) {
          value = seasonData.stats[selectedStat as keyof TeamStats];
        }
      }
    }
    
    return {
      season,
      value
    };
  }).filter(d => d.value !== null);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistical Trend Analysis</CardTitle>
        <CardDescription>
          View performance trends across multiple seasons
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="space-y-1">
            <Label>Entity Type</Label>
            <Select 
              value={entityType} 
              onValueChange={(value) => {
                setEntityType(value as 'player' | 'team');
                setSelectedStat(value === 'player' ? 'pointsPerGame' : 'pace');
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select entity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="player">Player</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {entityType === 'player' ? (
            <div className="space-y-1">
              <Label>Player</Label>
              <Select 
                value={selectedPlayerId} 
                onValueChange={setSelectedPlayerId}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {players.map((player) => (
                    <SelectItem key={player.id} value={player.id}>
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-1">
              <Label>Team</Label>
              <Select 
                value={selectedTeamId} 
                onValueChange={setSelectedTeamId}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-1">
            <Label>Statistic</Label>
            <Select 
              value={selectedStat} 
              onValueChange={setSelectedStat}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select statistic" />
              </SelectTrigger>
              <SelectContent>
                {availableStats.map((stat) => (
                  <SelectItem key={stat.key} value={stat.key}>
                    {stat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border p-4">
          <h3 className="mb-2 font-medium">
            {entityType === 'player' 
              ? (players.find(p => p.id === selectedPlayerId)?.name || 'Player') 
              : (teams.find(t => t.id === selectedTeamId)?.name || 'Team')
            } - {availableStats.find(s => s.key === selectedStat)?.label || 'Statistic'}
          </h3>
          
          <LineChart 
            data={chartData}
            xKey="season"
            yKey="value"
            height={300}
          />
          
          <div className="mt-2 text-xs text-muted-foreground">
            {chartData.length === 0 
              ? 'No data available for the selected criteria' 
              : `Showing data for ${chartData.length} seasons`
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
}