export type Game = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  href: string;
  thumbnail: string;
  thumbnailAlt: string;
};

export const games: Game[] = [
  {
    id: "pw",
    name: "Poll Warrior",
    slug: "poll-warrior",
    tagline: "Vote, buy votes, and fight for your team in live polls.",
    href: "https://pw.lavigames.com",
    thumbnail: "/images/games/poll-warrior.webp",
    thumbnailAlt: "Poll Warrior — competitive live poll arena",
  },
  {
    id: "tc",
    name: "Territory Conquest",
    slug: "territory-conquest",
    tagline: "Conquer the grid. Buy tokens. Climb the leaderboard.",
    href: "https://tc.lavigames.com",
    thumbnail: "/images/games/territory-conquest.webp",
    thumbnailAlt: "Territory Conquest — grid conquest strategy game",
  },
];
