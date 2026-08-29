export const federation = {
  shortName: "BCC",
  name: "BCC Basketball Federation",
  tagline: "The governing body of the game",
};

export const competitions = [
  {
    slug: "premier-league",
    name: "Premier League",
    season: "2026",
    teams: 10,
    status: "Round 6",
    blurb: "The top flight. Home-and-away, winner takes the shield.",
  },
  {
    slug: "national-cup",
    name: "National Cup",
    season: "2026",
    teams: 24,
    status: "Round of 16",
    blurb: "Knockout basketball. One night, one result, no second chances.",
  },
  {
    slug: "youth-championship",
    name: "Youth Championship",
    season: "2026",
    teams: 16,
    status: "Group stage",
    blurb: "U18 clubs competing for the federation’s development title.",
  },
];

export const clubs = [
  { name: "Capital Kings", city: "Harbour City", division: "Premier", founded: 1998 },
  { name: "Ridge Ravens", city: "North Ridge", division: "Premier", founded: 2004 },
  { name: "Harbour Hawks", city: "East Pier", division: "Premier", founded: 1991 },
  { name: "Valley Vipers", city: "Green Valley", division: "Premier", founded: 2009 },
  { name: "Ironworks", city: "Milltown", division: "Championship", founded: 2012 },
  { name: "Coastal Storm", city: "Bayview", division: "Championship", founded: 2001 },
  { name: "Summit Stars", city: "Highgate", division: "Championship", founded: 2016 },
  { name: "River City", city: "Bend", division: "Championship", founded: 1995 },
];

export const fixtures = [
  {
    id: "pl-18",
    competition: "Premier League",
    round: "Round 6",
    home: "Capital Kings",
    away: "Ridge Ravens",
    venue: "Kings Arena",
    date: "Sat 30 Aug",
    time: "19:30",
    status: "Upcoming",
  },
  {
    id: "pl-19",
    competition: "Premier League",
    round: "Round 6",
    home: "Harbour Hawks",
    away: "Valley Vipers",
    venue: "Pier Court",
    date: "Sat 30 Aug",
    time: "18:00",
    status: "Upcoming",
  },
  {
    id: "cup-08",
    competition: "National Cup",
    round: "Round of 16",
    home: "Ironworks",
    away: "Coastal Storm",
    venue: "Milltown Hall",
    date: "Sun 31 Aug",
    time: "14:00",
    status: "Upcoming",
  },
  {
    id: "pl-15",
    competition: "Premier League",
    round: "Round 5",
    home: "Valley Vipers",
    away: "Capital Kings",
    venue: "Valley Dome",
    date: "Sat 23 Aug",
    time: "19:30",
    homeScore: 88,
    awayScore: 81,
    status: "Final",
  },
];

export const news = [
  {
    title: "Premier League round 6 tips off this weekend",
    date: "28 Aug 2026",
    excerpt: "Kings host Ravens in the headline fixture. Tip-off 19:30 at Kings Arena.",
  },
  {
    title: "National Cup draw: Round of 16",
    date: "25 Aug 2026",
    excerpt: "Championship sides join the last sixteen. Ironworks draw Coastal Storm at home.",
  },
  {
    title: "Licensing window closes 12 September",
    date: "20 Aug 2026",
    excerpt: "Clubs must complete player registrations and referee nominations before the deadline.",
  },
];

export const dashboardTasks = [
  { name: "Player licensing — Capital Kings", owner: "Registrations", status: "In review", due: "2 Sep" },
  { name: "Match report — Vipers vs Kings", owner: "Competitions", status: "Overdue", due: "24 Aug" },
  { name: "Club affiliation — Summit Stars", owner: "Clubs", status: "Queued", due: "5 Sep" },
  { name: "Referee roster — Cup R16", owner: "Officials", status: "In progress", due: "30 Aug" },
];
