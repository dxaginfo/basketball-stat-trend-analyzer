import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockPlayers } from '@/data/mockPlayers';
import { mockTeams } from '@/data/mockTeams';
import { Player, Team, Season, PlayerStats } from '@/types';

interface DataContextProps {
  players: Player[];
  teams: Team[];
  loading: boolean;
  error: Error | null;
  getPlayerSeasonStats: (playerId: string, season: string) => PlayerStats | null;
  getPlayerById: (playerId: string) => Player | null;
  getTeamById: (teamId: string) => Team | null;
  getAllSeasons: () => string[];
  getPlayersByTeam: (teamId: string) => Player[];
  comparePlayersOverTime: (playerIds: string[], metric: keyof PlayerStats) => any[];
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call with mock data
    const loadData = async () => {
      try {
        // In a real app, you would fetch data from an API
        setPlayers(mockPlayers);
        setTeams(mockTeams);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getPlayerSeasonStats = (playerId: string, season: string): PlayerStats | null => {
    const player = players.find(p => p.id === playerId);
    if (!player) return null;

    const seasonData = player.seasons.find(s => s.year === season);
    return seasonData ? seasonData.stats : null;
  };

  const getPlayerById = (playerId: string): Player | null => {
    return players.find(p => p.id === playerId) || null;
  };

  const getTeamById = (teamId: string): Team | null => {
    return teams.find(t => t.id === teamId) || null;
  };

  const getAllSeasons = (): string[] => {
    // Extract unique seasons from all player data
    const seasonsSet = new Set<string>();
    
    players.forEach(player => {
      player.seasons.forEach(season => {
        seasonsSet.add(season.year);
      });
    });
    
    return Array.from(seasonsSet).sort();
  };

  const getPlayersByTeam = (teamId: string): Player[] => {
    return players.filter(player => player.team.id === teamId);
  };

  const comparePlayersOverTime = (playerIds: string[], metric: keyof PlayerStats): any[] => {
    // For each selected player, get their performance over time for the selected metric
    const allSeasons = getAllSeasons();
    
    return allSeasons.map(season => {
      const dataPoint: any = { season };
      
      playerIds.forEach(playerId => {
        const player = getPlayerById(playerId);
        if (!player) return;
        
        const seasonStats = getPlayerSeasonStats(playerId, season);
        if (seasonStats) {
          dataPoint[player.name] = seasonStats[metric];
        }
      });
      
      return dataPoint;
    });
  };

  return (
    <DataContext.Provider
      value={{
        players,
        teams,
        loading,
        error,
        getPlayerSeasonStats,
        getPlayerById,
        getTeamById,
        getAllSeasons,
        getPlayersByTeam,
        comparePlayersOverTime,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextProps => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};