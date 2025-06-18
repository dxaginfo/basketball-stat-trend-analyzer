// Player types
export interface Player {
  id: string;
  name: string;
  jerseyNumber: string;
  position: string;
  team: Team;
  height: string;
  weight: number;
  age: number;
  seasons: Season[];
  careerStats: PlayerStats;
  imageSrc?: string;
}

export interface Season {
  year: string;
  team: Team;
  stats: PlayerStats;
}

export interface PlayerStats {
  gamesPlayed: number;
  gamesStarted: number;
  minutesPerGame: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  pointsPerGame: number;
  plusMinus: number;
  efficiency: number;
  trueShootingPercentage: number;
  usageRate: number;
  winShares: number;
  boxPlusMinus: number;
}

// Team types
export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  conference: 'East' | 'West';
  division: string;
  location: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  seasons: TeamSeason[];
}

export interface TeamSeason {
  year: string;
  wins: number;
  losses: number;
  standing: number;
  stats: TeamStats;
  players: string[]; // Player IDs
}

export interface TeamStats {
  pointsPerGame: number;
  pointsAllowedPerGame: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  turnoversPerGame: number;
  foulsPerGame: number;
  pace: number;
  offensiveRating: number;
  defensiveRating: number;
  netRating: number;
}

// Chart and visualization types
export interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesDataPoint {
  year: string;
  [key: string]: string | number;
}

export interface ChartConfig {
  id: string;
  title: string;
  type: 'bar' | 'line' | 'area' | 'pie' | 'radar';
  dataKey: keyof PlayerStats | keyof TeamStats;
  displayName: string;
  color?: string;
  category?: string;
}

export interface ComparisonConfig {
  id: string;
  title: string;
  metrics: (keyof PlayerStats | keyof TeamStats)[];
  entities: string[]; // Player or Team IDs
  type: 'player' | 'team';
  timeRange: [string, string]; // [startYear, endYear]
}

// Context types
export interface DataContextType {
  players: Player[];
  teams: Team[];
  isLoading: boolean;
  error: string | null;
  getPlayer: (id: string) => Player | undefined;
  getTeam: (id: string) => Team | undefined;
  getPlayerSeasonStats: (playerId: string, season: string) => PlayerStats | undefined;
  getTeamSeasonStats: (teamId: string, season: string) => TeamStats | undefined;
  getAllSeasons: () => string[];
  getPlayerTimeSeriesData: (playerId: string, metric: keyof PlayerStats) => TimeSeriesDataPoint[];
  getTeamTimeSeriesData: (teamId: string, metric: keyof TeamStats) => TimeSeriesDataPoint[];
  comparePlayersOverTime: (playerIds: string[], metric: keyof PlayerStats) => TimeSeriesDataPoint[];
  compareTeamsOverTime: (teamIds: string[], metric: keyof TeamStats) => TimeSeriesDataPoint[];
}