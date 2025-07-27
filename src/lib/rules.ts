import { Rule } from "./types";

// Check if we're in testing mode (when .env.local exists)
const isTestingMode = Boolean(process.env.NEXT_PUBLIC_TESTING_MODE);

const testingRules: Rule[] = [
  {
    id: 1,
    hint: "Must contain the word 'base'",
    validate: (input: string) => input.toLowerCase().includes("base"),
  },
  {
    id: 2,
    hint: "Must include the city where the Base Fellowship is happening (e.g., 'goa')",
    validate: (input: string) => input.toLowerCase().includes("goa"),
  },
  {
    id: 3,
    hint: "Must include at least one number",
    validate: (input: string) => /\d/.test(input),
  },
];

// All available production rules (28 total)
const allProductionRules: Rule[] = [
  {
    id: 1,
    hint: "Must contain the word 'base'",
    validate: (input: string) => input.toLowerCase().includes("base"),
  },
  {
    id: 2,
    hint: "Must include the city where the Base Fellowship is happening (e.g., 'goa')",
    validate: (input: string) => input.toLowerCase().includes("goa"),
  },
  {
    id: 3,
    hint: "Must include at least one number",
    validate: (input: string) => /\d/.test(input),
  },
  {
    id: 4,
    hint: "Must include the Base CEO's first name",
    validate: (input: string) => input.toLowerCase().includes("jesse"),
  },
  {
    id: 5,
    hint: "Must include the word 'fellowship'",
    validate: (input: string) => input.toLowerCase().includes("fellowship"),
  },
  {
    id: 6,
    hint: "Must include at least one uppercase letter",
    validate: (input: string) => /[A-Z]/.test(input),
  },
  {
    id: 7,
    hint: "Must include a special character",
    validate: (input: string) => /[!@#$%^&*(),.?":{}|<>]/.test(input),
  },
  {
    id: 8,
    hint: "Must include the first name of one of the fellows from Fellowship 2.0",
    validate: (input: string) => {
      const fellowship2Names = [
        "alice",
        "bob",
        "charlie",
        "diana",
        "emma",
        "frank",
        "grace",
        "henry",
      ];
      return fellowship2Names.some((name) =>
        input.toLowerCase().includes(name)
      );
    },
  },
  {
    id: 9,
    hint: "Must include the name of one of the sponsors of Fellowship 3.0 (check the logo below)",
    validate: (input: string) => {
      const sponsorNames = [
        "coinbase",
        "polygon",
        "optimism",
        "arbitrum",
        "ethereum",
        "consensys",
      ];
      return sponsorNames.some((name) => input.toLowerCase().includes(name));
    },
    // This will be used to show sponsor logos when rule fails
    metadata: {
      sponsorLogos: [
        { name: "coinbase", logo: "/logos/coinbase.png" },
        { name: "polygon", logo: "/logos/polygon.png" },
        { name: "optimism", logo: "/logos/optimism.png" },
        { name: "arbitrum", logo: "/logos/arbitrum.png" },
        { name: "ethereum", logo: "/logos/ethereum.png" },
        { name: "consensys", logo: "/logos/consensys.png" },
      ],
    },
  },
  {
    id: 10,
    hint: "Must include the word 'onchain'",
    validate: (input) => input.toLowerCase().includes("onchain"),
  },
  {
    id: 11,
    hint: "Must include the word 'builder'",
    validate: (input) => input.toLowerCase().includes("builder"),
  },
  {
    id: 12,
    hint: "Must include the name of a Base ecosystem protocol (e.g., friend.tech)",
    validate: (input) => {
      const protocols = ["friend", "blackbird", "warpcast", "showtime", "zora"];
      return protocols.some((p) => input.toLowerCase().includes(p));
    },
  },
  {
    id: 13,
    hint: "Must include the word 'gm' or 'wagmi'",
    validate: (input) =>
      input.toLowerCase().includes("gm") ||
      input.toLowerCase().includes("wagmi"),
  },
  {
    id: 14,
    hint: "Must include a Farcaster-related word like 'cast', 'frame', or 'farcaster'",
    validate: (input) => {
      const words = ["cast", "frame", "farcaster"];
      return words.some((word) => input.toLowerCase().includes(word));
    },
  },
  {
    id: 15,
    hint: "Must include a meme phrase like 'blue' or 'onchain summer'",
    validate: (input) => {
      const memes = ["blue", "onchain summer"];
      return memes.some((m) => input.toLowerCase().includes(m));
    },
  },
  {
    id: 16,
    hint: "Must include Saumya's twitter username",
    validate: (input) => input.toLowerCase().includes("saxenasaheb"),
  },
  {
    id: 17,
    hint: "Must be a palindrome (same forwards and backwards)",
    validate: (input) => {
      const str = input.toLowerCase().replace(/[^a-z0-9]/g, "");
      return str === str.split("").reverse().join("");
    },
  },
  {
    id: 18,
    hint: "Must be at least 20 characters long",
    validate: (input) => input.length >= 20,
  },
  {
    id: 19,
    hint: "Must include the current Base block number (check explorer)",
    validate: (input) => /\b22\d{6}\b/.test(input), // Matches block-like numbers
  },
  {
    id: 20,
    hint: "Must include the Base chain ID (8453)",
    validate: (input) => input.includes("8453"),
  },
  {
    id: 21,
    hint: "Must include part of Base's signature blue color code (like '0052' or '52ff')",
    validate: (input) => /(0052|52ff)/i.test(input),
  },
  {
    id: 22,
    hint: "Must include a 'gm' greeting (like 'gm', 'gmgm', or 'gmgn')",
    validate: (input) => /(gmgn|gmgm|gm)/i.test(input),
  },
  {
    id: 23,
    hint: "Must include something that looks like a wallet (e.g., '0xabc123')",
    validate: (input) => /0x[a-fA-F0-9]{4,}/.test(input),
  },
  {
    id: 24,
    hint: "Must start with the letter 'b'",
    validate: (input) => input.trim().toLowerCase().startsWith("b"),
  },
  {
    id: 25,
    hint: "Must include the word 'coinbase'",
    validate: (input) => input.toLowerCase().includes("coinbase"),
  },
  {
    id: 26,
    hint: "Must include the phrase 'for everyone'",
    validate: (input) => input.toLowerCase().includes("for everyone"),
  },
  {
    id: 27,
    hint: "Must include the phrase 'L2' somewhere",
    validate: (input) => input.toLowerCase().includes("l2"),
  },
  {
    id: 28,
    hint: "Must include the games creator's twitter username (founder_sahab)",
    validate: (input) => input.toLowerCase().includes("founder_sahab"),
  },
];

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to get random production rules
function getRandomProductionRules(): Rule[] {
  const shuffled = shuffleArray(allProductionRules);
  const selectedRules = shuffled.slice(0, 12);
  
  // Reassign IDs to be sequential (1-12)
  return selectedRules.map((rule, index) => ({
    ...rule,
    id: index + 1,
  }));
}

// Get rules based on environment
let productionRules: Rule[] = [];

// Initialize production rules with random selection
if (!isTestingMode) {
  productionRules = getRandomProductionRules();
}

// Export rules based on environment
export const rules: Rule[] = isTestingMode ? testingRules : productionRules;

export const getCurrentRule = (index: number): Rule | null => {
  return index < rules.length ? rules[index] : null;
};

export const validatePassword = (
  password: string,
  ruleIndex: number
): boolean => {
  const rule = getCurrentRule(ruleIndex);
  return rule ? rule.validate(password) : false;
};

export const getTotalRules = (): number => {
  return rules.length;
};

// Helper function to check current mode
export const getCurrentMode = (): string => {
  return isTestingMode ? "testing" : "production";
};

// Function to regenerate random rules (useful for testing or reset)
export const regenerateRules = (): void => {
  if (!isTestingMode) {
    productionRules = getRandomProductionRules();
  }
};
