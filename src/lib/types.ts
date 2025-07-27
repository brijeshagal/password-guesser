export interface Rule {
  id: number;
  hint: string;
  validate: (input: string) => boolean;
  description?: string;
  metadata?: {
    sponsorLogos?: Array<{
      name: string;
      logo: string;
    }>;
    [key: string]: any;
  };
}

export interface GameState {
  currentRuleIndex: number;
  attempts: number;
  isCompleted: boolean;
  startTime: number;
}

export interface ClueData {
  id: number;
  title: string;
  content: string;
  type: 'text' | 'map' | 'tweet';
  metadata?: {
    location?: string;
    coordinates?: [number, number];
    tweetId?: string;
  };
} 