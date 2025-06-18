import { Team } from '@/types';

// Mock team data for development purposes
export const mockTeams: Team[] = [
  {
    id: 't1',
    name: 'Los Angeles Lakers',
    abbreviation: 'LAL',
    conference: 'West',
    division: 'Pacific',
    location: 'Los Angeles, CA',
    primaryColor: '#552583',
    secondaryColor: '#FDB927',
    seasons: [
      {
        year: '2020-21',
        wins: 42,
        losses: 30,
        standing: 7,
        stats: {
          pointsPerGame: 109.5,
          pointsAllowedPerGame: 106.8,
          fieldGoalPercentage: 0.467,
          threePointPercentage: 0.349,
          freeThrowPercentage: 0.734,
          reboundsPerGame: 45.4,
          assistsPerGame: 24.7,
          stealsPerGame: 8.8,
          blocksPerGame: 5.4,
          turnoversPerGame: 15.2,
          foulsPerGame: 18.9,
          pace: 98.0,
          offensiveRating: 109.8,
          defensiveRating: 106.8,
          netRating: 3.0
        },
        players: ['p1']
      },
      {
        year: '2021-22',
        wins: 33,
        losses: 49,
        standing: 11,
        stats: {
          pointsPerGame: 112.1,
          pointsAllowedPerGame: 115.1,
          fieldGoalPercentage: 0.468,
          threePointPercentage: 0.347,
          freeThrowPercentage: 0.730,
          reboundsPerGame: 44.4,
          assistsPerGame: 24.0,
          stealsPerGame: 7.8,
          blocksPerGame: 5.5,
          turnoversPerGame: 14.5,
          foulsPerGame: 19.2,
          pace: 100.5,
          offensiveRating: 110.3,
          defensiveRating: 113.3,
          netRating: -3.0
        },
        players: ['p1']
      },
      {
        year: '2022-23',
        wins: 43,
        losses: 39,
        standing: 7,
        stats: {
          pointsPerGame: 117.2,
          pointsAllowedPerGame: 116.6,
          fieldGoalPercentage: 0.482,
          threePointPercentage: 0.347,
          freeThrowPercentage: 0.779,
          reboundsPerGame: 46.2,
          assistsPerGame: 25.3,
          stealsPerGame: 6.4,
          blocksPerGame: 4.6,
          turnoversPerGame: 13.5,
          foulsPerGame: 19.5,
          pace: 101.2,
          offensiveRating: 114.0,
          defensiveRating: 113.2,
          netRating: 0.8
        },
        players: ['p1']
      }
    ]
  },
  {
    id: 't2',
    name: 'Golden State Warriors',
    abbreviation: 'GSW',
    conference: 'West',
    division: 'Pacific',
    location: 'San Francisco, CA',
    primaryColor: '#1D428A',
    secondaryColor: '#FFC72C',
    seasons: [
      {
        year: '2020-21',
        wins: 39,
        losses: 33,
        standing: 9,
        stats: {
          pointsPerGame: 113.7,
          pointsAllowedPerGame: 112.7,
          fieldGoalPercentage: 0.466,
          threePointPercentage: 0.371,
          freeThrowPercentage: 0.789,
          reboundsPerGame: 43.0,
          assistsPerGame: 27.7,
          stealsPerGame: 8.2,
          blocksPerGame: 4.8,
          turnoversPerGame: 15.2,
          foulsPerGame: 20.6,
          pace: 100.3,
          offensiveRating: 110.7,
          defensiveRating: 110.1,
          netRating: 0.6
        },
        players: ['p2']
      },
      {
        year: '2021-22',
        wins: 53,
        losses: 29,
        standing: 3,
        stats: {
          pointsPerGame: 111.0,
          pointsAllowedPerGame: 105.5,
          fieldGoalPercentage: 0.468,
          threePointPercentage: 0.364,
          freeThrowPercentage: 0.765,
          reboundsPerGame: 45.5,
          assistsPerGame: 27.1,
          stealsPerGame: 9.1,
          blocksPerGame: 4.5,
          turnoversPerGame: 14.9,
          foulsPerGame: 20.3,
          pace: 98.4,
          offensiveRating: 112.1,
          defensiveRating: 106.6,
          netRating: 5.5
        },
        players: ['p2']
      },
      {
        year: '2022-23',
        wins: 44,
        losses: 38,
        standing: 6,
        stats: {
          pointsPerGame: 118.9,
          pointsAllowedPerGame: 117.1,
          fieldGoalPercentage: 0.481,
          threePointPercentage: 0.386,
          freeThrowPercentage: 0.769,
          reboundsPerGame: 44.6,
          assistsPerGame: 29.8,
          stealsPerGame: 7.2,
          blocksPerGame: 3.9,
          turnoversPerGame: 16.3,
          foulsPerGame: 20.6,
          pace: 102.3,
          offensiveRating: 116.1,
          defensiveRating: 114.4,
          netRating: 1.7
        },
        players: ['p2']
      }
    ]
  },
  {
    id: 't3',
    name: 'Milwaukee Bucks',
    abbreviation: 'MIL',
    conference: 'East',
    division: 'Central',
    location: 'Milwaukee, WI',
    primaryColor: '#00471B',
    secondaryColor: '#EEE1C6',
    seasons: [
      {
        year: '2020-21',
        wins: 46,
        losses: 26,
        standing: 3,
        stats: {
          pointsPerGame: 120.1,
          pointsAllowedPerGame: 114.2,
          fieldGoalPercentage: 0.484,
          threePointPercentage: 0.389,
          freeThrowPercentage: 0.764,
          reboundsPerGame: 48.1,
          assistsPerGame: 25.5,
          stealsPerGame: 8.1,
          blocksPerGame: 4.6,
          turnoversPerGame: 13.8,
          foulsPerGame: 18.1,
          pace: 102.8,
          offensiveRating: 116.5,
          defensiveRating: 110.7,
          netRating: 5.8
        },
        players: ['p3']
      },
      {
        year: '2021-22',
        wins: 51,
        losses: 31,
        standing: 3,
        stats: {
          pointsPerGame: 115.5,
          pointsAllowedPerGame: 112.1,
          fieldGoalPercentage: 0.466,
          threePointPercentage: 0.366,
          freeThrowPercentage: 0.774,
          reboundsPerGame: 46.7,
          assistsPerGame: 23.6,
          stealsPerGame: 7.6,
          blocksPerGame: 4.0,
          turnoversPerGame: 13.4,
          foulsPerGame: 18.2,
          pace: 99.9,
          offensiveRating: 114.3,
          defensiveRating: 111.1,
          netRating: 3.2
        },
        players: ['p3']
      },
      {
        year: '2022-23',
        wins: 58,
        losses: 24,
        standing: 1,
        stats: {
          pointsPerGame: 116.9,
          pointsAllowedPerGame: 113.3,
          fieldGoalPercentage: 0.471,
          threePointPercentage: 0.367,
          freeThrowPercentage: 0.783,
          reboundsPerGame: 48.6,
          assistsPerGame: 23.9,
          stealsPerGame: 6.4,
          blocksPerGame: 4.9,
          turnoversPerGame: 13.9,
          foulsPerGame: 18.4,
          pace: 100.8,
          offensiveRating: 114.8,
          defensiveRating: 111.5,
          netRating: 3.3
        },
        players: ['p3']
      }
    ]
  }
];