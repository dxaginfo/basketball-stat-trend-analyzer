import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format numbers with commas
export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value)
}

// Format percentages 
export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

// Determine if a value is trending up, down, or neutral compared to a previous value
export function getTrendDirection(current: number, previous: number): 'up' | 'down' | 'neutral' {
  const diff = current - previous
  const threshold = 0.01 // 1% threshold for "neutral"
  
  if (Math.abs(diff) < threshold) {
    return 'neutral'
  }
  
  return diff > 0 ? 'up' : 'down'
}

// Get CSS class based on trend direction
export function getTrendClass(direction: 'up' | 'down' | 'neutral'): string {
  switch (direction) {
    case 'up':
      return 'trend-up'
    case 'down': 
      return 'trend-down'
    default:
      return 'trend-neutral'
  }
}

// Calculate moving average for smoothing data
export function calculateMovingAverage(data: number[], window: number = 3): number[] {
  if (window <= 1 || data.length < window) {
    return data
  }
  
  const result: number[] = []
  
  for (let i = 0; i < data.length; i++) {
    if (i < window - 1) {
      result.push(data[i])
      continue
    }
    
    let sum = 0
    for (let j = 0; j < window; j++) {
      sum += data[i - j]
    }
    
    result.push(sum / window)
  }
  
  return result
}

// Function to generate unique IDs
export function generateId(): string {
  return Math.random().toString(36).substring(2, 10)
}