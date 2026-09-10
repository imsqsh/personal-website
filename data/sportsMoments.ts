export type SportsMoment = {
  rank: number;
  title: string;
  context: string;
  /** Personal note on why this moment makes the list. */
  description: string;
  /** Path under /public/videos/sports/. */
  video: string;
};

// TODO: replace each `description` placeholder with why this moment
// actually made the list — title/context are drawn from the clips
// themselves and are already real.
export const sportsMoments: SportsMoment[] = [
  {
    rank: 1,
    title: "Larry Fitzgerald sends the Cardinals to the NFC Championship",
    context: "NFL Divisional Playoffs — Cardinals vs. Packers",
    description: "TODO: why this moment makes the list",
    video: "/videos/sports/fitzgerald-cardinals-nfc-championship.mp4",
  },
  {
    rank: 2,
    title: "Arizona State halts BYU's 4th-quarter drive",
    context: "College Football — Arizona State vs. BYU",
    description: "TODO: why this moment makes the list",
    video: "/videos/sports/asu-byu-4th-quarter-stop.mp4",
  },
  {
    rank: 3,
    title: "Mbappé's two goals in 95 seconds",
    context: "FIFA World Cup Final — France vs. Argentina",
    description: "TODO: why this moment makes the list",
    video: "/videos/sports/mbappe-world-cup-final.mp4",
  },
  {
    rank: 4,
    title: "Luis Gonzalez's 2001 World Series walk-off",
    context: "2001 World Series, Game 7 — Diamondbacks vs. Yankees",
    description: "TODO: why this moment makes the list",
    video: "/videos/sports/gonzalez-2001-world-series-walkoff.mp4",
  },
  {
    rank: 5,
    title: "The Minneapolis Miracle",
    context: "NFL Divisional Playoffs — Vikings vs. Saints",
    description: "TODO: why this moment makes the list",
    video: "/videos/sports/minneapolis-miracle.mp4",
  },
];
