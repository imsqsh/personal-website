export type SportsMoment = {
  rank: number;
  title: string;
  context: string;
  /** Personal note on why this moment makes the list. */
  description: string;
  /** Path under /public/videos/sports/. */
  video: string;
};

// actually made the list — title/context are drawn from the clips
// themselves and are already real.
export const sportsMoments: SportsMoment[] = [
  {
    rank: 1,
    title: "Larry Fitzgerald Overtime Winner",
    context: "NFL Divisional Playoffs — Cardinals vs. Packers (16 January 2016)",
    description: "This is by far the single greatest moment I have ever seen and I can't even imagine where to begin with this. The Cardinals have never been a good franchise, let alone a mediocre one. They've always been at the bottom of the barrel in the league so being able to see a relevant season is an incredibly rare occasion. To even get to overtime, Aaron Rodgers had to make 2 ridiculous Hail Marys to Jeff Janis, a name that still strikes fear into my heart. For 11 year old me, this was too much to bear and I was in utter disbelief.\nYet the GOAT of Arizona sports, Larry Fitzgerald himself, decides to put the team on his back and take us to the promised land. Carson Palmer spins out of a sack, runs into his own offensive lineman, and somehow finds the best player between both teams completely unguarded. Fitzgerald gets into open space, turns on the jets, stiff arms, and gets twisted down at the 4 yard line. The entire state erupts. I go crazy, my dad goes wild, and the entire neighborhood starts screaming at 10pm.",
    video: "/videos/sports/fitzgerald-cardinals-nfc-championship.mp4",
  },
  {
    rank: 2,
    title: "Arizona State Controls Their Destiny",
    context: "College Football — Arizona State vs. BYU (23 November 2024)",
    description: "The only one of these 5 that I had the opportunity to attend in person (thanks to the free student tickets) and it was legendary. For my freshman and sophomore years, ASU football was horrific, going 3-9 in both seasons. Yet when everyone counted them out, picking them to finish last in the Big 12, they showed up. Led by the human wrecking ball Cam Skattebo, they went 8-2 in their first 10 games and had a ranked matchup waiting for them at home against BYU.\nThe atmosphere was electric, the first time that the stadium had been fully packed in who knows how long and the students were standing the entire time, making their presence felt known as ASU stormed out to an early lead. BYU mounted a fervent comeback and their faithful that occupied close to 40% of the stadium thanks to the large presence in The Valley cranked up the volume.\nLate in the 4th quarter, BYU has a shot for the go-ahead touchdown but Jake Retzlaff overthrows his reciever and the stadium gasps in shock. The very next play, Javan Robinson picks off Retzlaff and the stadium explodes. Thanks to a false field rush and a second being added back to the clock, this is the craziest game I have ever been to.",
    video: "/videos/sports/asu-byu-4th-quarter-stop.mp4",
  },
  {
    rank: 3,
    title: "Mbappé Magic",
    context: "FIFA World Cup Final — France vs. Argentina (18 December 2022)",
    description: "Out of the list, this is the only losing performance from a player and yet Mbappé captured the heart of billions across the world and stabbed the hearts of more. Somehow, someway, after falling 2-0 against Argentina in the World Cup final, Mbappé sinks the penalty before scoring again within 90 seconds, reigniting an entire nation.\nOften times it's not the losses that people remember, it's just your performance. If all you can control is yourself, then put in 1000% every time.",
    video: "/videos/sports/mbappe-world-cup-final.mp4",
  },
  {
    rank: 4,
    title: "The Block",
    context: "2016 NBA Finals, Game 7 — Cavaliers vs. Warriors (19 June 2016)",
    description: "Possibly the most famous comeback of all time, architected by King James, the Akron Hammer, LeGOAT, the Chosen One, Bron-Bron. Down 3-1 against the greatest regular season team of all time, LeBron puts up 3 masterclasses in a row to bring the Cavaliers thier first championship ever. The Warriors hadn't lost back-to-back in the regular season and hadn't lost to the same opponent more than once but greatness doesn't care.\nIt's inevitable.\nWith the score tied at 89 each, the Cavs find themselves in an impossible situation. Iguodala goes for the uncontested layup to put the Warriors up. LeGOAT takes matters into is own hands, coming in like a heat-seeking missle and taking care of business, blocking Iguodala and saving the season. CLEVELAND! THIS IS FOR YOU!",
    video: "/videos/sports/lebron-the-block.mp4",
  },
  {
    rank: 5,
    title: "2001 World Series Walk-Off",
    context: "2001 World Series, Game 7 — Diamondbacks vs. Yankees (4 November 2001)",
    description: "This is the only moment here that I was not alive for but given that it's Arizona's only championship of the 4 major American sports, it would be a disservice if I excluded it. Only a few years after their founding, the Diamondbacks find themselves in the World Series against the most storied franchise in baseball history. Led by their all-time great duo of pitchers Randy Johnson and Curt Schilling, the D-Backs dominate the Yankeese, but thanks to a couple of blown saves, they find themselves in a Game 7.\nRandy Johnson, after throwing over a 100 pitches the game before, manages to get Arizona through the top of the 9th. The bases get loadded and Luis Gonzalez floats one into center field to give Arizona it's first championship ever.",
    video: "/videos/sports/gonzalez-2001-world-series-walkoff.mp4",
  },
];
