import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Player, 
  Team, 
  PlayerStats, 
  TeamStats, 
  DataContextType,
  TimeSeriesDataPoint
} from '@/types';
import { mockPlayers } from '@/data/mockPlayers';
import { mockTeams } from '@/data/mockTeams';

// Create the context with a default value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading data from an API
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, these would be API calls
        // For now, we'll use mock data
        setPlayers(mockPlayers);
        setTeams(mockTeams);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setIsLoading(false);
      }
    };

    // Simulate network delay
    const timer = setTimeout(() => {
      loadData();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Helper functions
  const getPlayer = (id: string) => players.find(player => player.id === id);
  
  const getTeam = (id: string) => teams.find(team => team.id === id);
  
  const getPlayerSeasonStats = (playerId: string, season: string) => {
    const player = getPlayer(playerId);
    return player?.seasons.find(s => s.year === season)?.stats;
  };
  
  const getTeamSeasonStats = (teamId: string, season: string) => {
    const team = getTeam(teamId);
    return team?.seasons.find(s => s.year === season)?.stats;
  };
  
  const getAllSeasons = () => {
    const seasonsSet = new Set<string>();
    
    players.forEach(player => {
      player.seasons.forEach(season => {
        seasonsSet.add(season.year);
      });
    });
    
    return Array.from(seasonsSet).sort();
  };
  
  const getPlayerTimeSeriesData = (playerId: string, metric: keyof PlayerStats): TimeSeriesDataPoint[] => {
    const player = getPlayer(playerId);
    if (!player) return [];
    
    return player.seasons.map(season => ({
      year: season.year,
      [player.name]: season.stats[metric] as number,
    }));
  };
  
  const getTeamTimeSeriesData = (teamId: string, metric: keyof TeamStats): TimeSeriesDataPoint[] => {
    const team = getTeam(teamId);
    if (!team) return [];
    
    return team.seasons.map(season => ({
      year: season.year,
      [team.name]: season.stats[metric] as number,
    }));
  };
  
  const comparePlayersOverTime = (playerIds: string[], metric: keyof PlayerStats): TimeSeriesDataPoint[] => {
    // Get all seasons across all selected players
    const allSeasons = new Set<string>();
    playerIds.forEach(id => {
      const player = getPlayer(id);
      player?.seasons.forEach(season => allSeasons.add(season.year));
    });
    
    const sortedSeasons = Array.from(allSeasons).sort();
    
    return sortedSeasons.map(year => {
      const dataPoint: TimeSeriesDataPoint = { year };
      
      playerIds.forEach(id => {
        const player = getPlayer(id);
        if (!player) return;
        
        const seasonStats = player.seasons.find(s => s.year === year)?.stats;
        dataPoint[player.name] = seasonStats ? seasonStats[metric] as number : 0;
      });
      
      return dataPoint;
    });
  };
  
  const compareTeamsOverTime = (teamIds: string[], metric: keyof TeamStats): TimeSeriesDataPoint[] => {
    // Get all seasons across all selected teams
    const allSeasons = new Set<string>();
    teamIds.forEach(id => {
      const team = getTeam(id);
      team?.seasons.forEach(season => allSeasons.add(season.year));
    });
    
    const sortedSeasons = Array.from(allSeasons).sort();
    
    return sortedSeasons.map(year => {
      const dataPoint: TimeSeriesDataPoint = { year };
      
      teamIds.forEach(id => {
        const team = getTeam(id);
        if (!team) return;
        
        const seasonStats = team.seasons.find(s => s.year === year)?.stats;
        dataPoint[team.name] = seasonStats ? seasonStats[metric] as number : 0;
      });
      
      return dataPoint;
    });
  };

  const value = {
    players,
    teams,
    isLoading,
    error,
    getPlayer,
    getTeam,
    getPlayerSeasonStats,
    getTeamSeasonStats,
    getAllSeasons,
    getPlayerTimeSeriesData,
    getTeamTimeSeriesData,
    comparePlayersOverTime,
    compareTeamsOverTime,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};