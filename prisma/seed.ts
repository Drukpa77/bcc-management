import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { teams } from "../src/lib/tournament";
import {
  DEMO_SQUADS,
  MEN_POOL_A,
  MEN_POOL_B,
  WOMEN_TEAMS,
  demoScore,
  formatDay,
  roundRobin,
} from "./demo-data";

const prisma = new PrismaClient();
const VENUE = "Changlimithang Court, Thimphu";
const SLOTS = ["10:00", "12:30", "15:00"] as const;

function schedule(index: number, start: Date) {
  const day = Math.floor(index / SLOTS.length);
  const date = new Date(start);
  date.setDate(start.getDate() + day);
  return { time: SLOTS[index % SLOTS.length], dateLabel: formatDay(date) };
}

async function main() {
  const password = process.env.AUTH_ADMIN_PASSWORD ?? "password";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email: "admin@bhutanbasketball.bt" },
    update: { passwordHash, name: "Tournament Director", role: "admin" },
    create: {
      email: "admin@bhutanbasketball.bt",
      passwordHash,
      name: "Tournament Director",
      role: "admin",
    },
  });

  for (const team of teams) {
    await prisma.team.upsert({
      where: { id: team.id },
      update: {
        code: team.code,
        name: team.name,
        shortName: team.shortName,
        color: team.color,
        city: team.city,
        gender: team.gender,
      },
      create: {
        id: team.id,
        code: team.code,
        name: team.name,
        shortName: team.shortName,
        color: team.color,
        city: team.city,
        gender: team.gender,
      },
    });
  }

  const menIds = teams.filter((team) => team.gender === "men").map((team) => team.id);
  const womenIds = teams.filter((team) => team.gender === "women").map((team) => team.id);

  await prisma.league.upsert({
    where: { id: "national-championship" },
    update: {
      name: "National Championship",
      season: "2026",
      location: VENUE,
      gender: "men",
      format: "pools",
      status: "live",
    },
    create: {
      id: "national-championship",
      name: "National Championship",
      season: "2026",
      location: VENUE,
      gender: "men",
      format: "pools",
      status: "live",
    },
  });

  await prisma.league.upsert({
    where: { id: "womens-championship" },
    update: {
      name: "Women's Championship",
      season: "2026",
      location: VENUE,
      gender: "women",
      format: "round-robin",
      status: "live",
    },
    create: {
      id: "womens-championship",
      name: "Women's Championship",
      season: "2026",
      location: VENUE,
      gender: "women",
      format: "round-robin",
      status: "live",
    },
  });

  await prisma.league.upsert({
    where: { id: "youth-u18" },
    update: {
      name: "Youth Tournament U-18",
      season: "2026",
      location: VENUE,
      gender: "mixed",
      format: "knockout",
      status: "registration",
    },
    create: {
      id: "youth-u18",
      name: "Youth Tournament U-18",
      season: "2026",
      location: VENUE,
      gender: "mixed",
      format: "knockout",
      status: "registration",
    },
  });

  await prisma.league.upsert({
    where: { id: "interstate" },
    update: {
      name: "Interstate Championship",
      season: "2026",
      location: VENUE,
      gender: "men",
      format: "pools",
      status: "upcoming",
    },
    create: {
      id: "interstate",
      name: "Interstate Championship",
      season: "2026",
      location: VENUE,
      gender: "men",
      format: "pools",
      status: "upcoming",
    },
  });

  await prisma.leagueTeam.deleteMany({
    where: { leagueId: { in: ["national-championship", "womens-championship"] } },
  });
  await prisma.leagueTeam.createMany({
    data: [
      ...menIds.map((teamId) => ({ leagueId: "national-championship", teamId })),
      ...womenIds.map((teamId) => ({ leagueId: "womens-championship", teamId })),
    ],
  });

  await prisma.setting.upsert({
    where: { id: "default" },
    update: { activeLeagueId: "national-championship" },
    create: { id: "default", activeLeagueId: "national-championship" },
  });

  await prisma.player.deleteMany();
  await prisma.player.createMany({
    data: Object.entries(DEMO_SQUADS).flatMap(([teamId, squad]) =>
      squad.map((player) => ({
        teamId,
        name: player.name,
        number: player.number,
        position: player.position,
        age: player.age,
        height: player.height,
        captain: Boolean(player.captain),
      })),
    ),
  });

  await prisma.fixture.deleteMany({
    where: { leagueId: { in: ["national-championship", "womens-championship"] } },
  });
  await prisma.draw.deleteMany({
    where: { leagueId: { in: ["national-championship", "womens-championship"] } },
  });

  const menDraw = await prisma.draw.create({
    data: {
      leagueId: "national-championship",
      status: "confirmed",
      confirmedAt: new Date("2026-09-01T09:00:00.000Z"),
      fixturesGeneratedAt: new Date("2026-09-01T09:30:00.000Z"),
    },
  });

  await prisma.drawAssignment.createMany({
    data: [
      ...MEN_POOL_A.map((teamId, index) => ({
        drawId: menDraw.id,
        teamId,
        pool: "A",
        spin: index + 1,
      })),
      ...MEN_POOL_B.map((teamId, index) => ({
        drawId: menDraw.id,
        teamId,
        pool: "B",
        spin: MEN_POOL_A.length + index + 1,
      })),
    ],
  });

  const menStart = new Date(2026, 8, 10);
  const menPoolGames = [
    ...roundRobin([...MEN_POOL_A]).map((game) => ({ ...game, pool: "A" as const, group: `Pool A · R${game.round}` })),
    ...roundRobin([...MEN_POOL_B]).map((game) => ({ ...game, pool: "B" as const, group: `Pool B · R${game.round}` })),
  ].sort((a, b) => a.round - b.round || a.group.localeCompare(b.group));

  const menPoolFixtures = menPoolGames.map((game, index) => {
    const when = schedule(index, menStart);
    const score = demoScore(game.home, game.away);
    const captain = DEMO_SQUADS[score.winnerId]?.find((player) => player.captain)?.name;
    return {
      id: `national-championship-${game.home}-${game.away}-r${game.round}`,
      leagueId: "national-championship",
      homeId: game.home,
      awayId: game.away,
      time: when.time,
      dateLabel: when.dateLabel,
      venue: VENUE,
      groupName: game.group,
      status: "final",
      homeScore: score.home,
      awayScore: score.away,
      stage: "POOL",
      pool: game.pool,
      round: game.round,
      published: true,
      publishedAt: new Date("2026-09-18T12:00:00.000Z"),
      winnerId: score.winnerId,
      mvp: captain,
      homeQ1: score.homeQ1,
      homeQ2: score.homeQ2,
      homeQ3: score.homeQ3,
      homeQ4: score.homeQ4,
      awayQ1: score.awayQ1,
      awayQ2: score.awayQ2,
      awayQ3: score.awayQ3,
      awayQ4: score.awayQ4,
    };
  });

  const qf1 = demoScore("pnb", "bmf");
  const qf2 = demoScore("hat", "wde");

  const menKnockout = [
    {
      id: "national-championship-qf1",
      leagueId: "national-championship",
      homeId: "pnb",
      awayId: "bmf",
      time: "10:00",
      dateLabel: "Sat 20 Sep",
      venue: VENUE,
      groupName: "Quarter Final 1 · A2 v B3",
      status: "final",
      homeScore: qf1.home,
      awayScore: qf1.away,
      stage: "QUARTER_FINAL",
      published: true,
      publishedAt: new Date("2026-09-20T12:00:00.000Z"),
      winnerId: qf1.winnerId,
      homePlaceholder: "A2",
      awayPlaceholder: "B3",
      homeQ1: qf1.homeQ1,
      homeQ2: qf1.homeQ2,
      homeQ3: qf1.homeQ3,
      homeQ4: qf1.homeQ4,
      awayQ1: qf1.awayQ1,
      awayQ2: qf1.awayQ2,
      awayQ3: qf1.awayQ3,
      awayQ4: qf1.awayQ4,
    },
    {
      id: "national-championship-qf2",
      leagueId: "national-championship",
      homeId: "hat",
      awayId: "wde",
      time: "13:00",
      dateLabel: "Sat 20 Sep",
      venue: VENUE,
      groupName: "Quarter Final 2 · B2 v A3",
      status: "final",
      homeScore: qf2.home,
      awayScore: qf2.away,
      stage: "QUARTER_FINAL",
      published: true,
      publishedAt: new Date("2026-09-20T15:00:00.000Z"),
      winnerId: qf2.winnerId,
      homePlaceholder: "B2",
      awayPlaceholder: "A3",
      homeQ1: qf2.homeQ1,
      homeQ2: qf2.homeQ2,
      homeQ3: qf2.homeQ3,
      homeQ4: qf2.homeQ4,
      awayQ1: qf2.awayQ1,
      awayQ2: qf2.awayQ2,
      awayQ3: qf2.awayQ3,
      awayQ4: qf2.awayQ4,
    },
    {
      id: "national-championship-sf1",
      leagueId: "national-championship",
      homeId: "thw",
      awayId: qf2.winnerId,
      time: "17:00",
      dateLabel: "Tue 23 Sep",
      venue: VENUE,
      groupName: "Semi Final 1 · A1 v Winner QF2",
      status: "upcoming",
      stage: "SEMI_FINAL",
      published: false,
      homePlaceholder: "Pool A Winner",
      awayPlaceholder: "Winner QF2",
    },
    {
      id: "national-championship-sf2",
      leagueId: "national-championship",
      homeId: "pdr",
      awayId: qf1.winnerId,
      time: "19:30",
      dateLabel: "Tue 23 Sep",
      venue: VENUE,
      groupName: "Semi Final 2 · B1 v Winner QF1",
      status: "upcoming",
      stage: "SEMI_FINAL",
      published: false,
      homePlaceholder: "Pool B Winner",
      awayPlaceholder: "Winner QF1",
    },
    {
      id: "national-championship-final",
      leagueId: "national-championship",
      homeId: "",
      awayId: "",
      time: "18:00",
      dateLabel: "Fri 26 Sep",
      venue: VENUE,
      groupName: "Championship Final",
      status: "upcoming",
      stage: "FINAL",
      published: false,
      homePlaceholder: "Winner SF1",
      awayPlaceholder: "Winner SF2",
    },
  ];

  await prisma.fixture.createMany({ data: [...menPoolFixtures, ...menKnockout] });

  const womenStart = new Date(2026, 8, 10);
  const womenGames = roundRobin([...WOMEN_TEAMS]);
  const womenFixtures = womenGames.map((game, index) => {
    const when = schedule(index, womenStart);
    const lastTwo = index >= womenGames.length - 2;
    const score = demoScore(game.home, game.away);
    return {
      id: `womens-championship-${game.home}-${game.away}-r${game.round}`,
      leagueId: "womens-championship",
      homeId: game.home,
      awayId: game.away,
      time: when.time,
      dateLabel: when.dateLabel,
      venue: VENUE,
      groupName: `Round ${game.round}`,
      status: lastTwo ? "upcoming" : "final",
      homeScore: lastTwo ? null : score.home,
      awayScore: lastTwo ? null : score.away,
      stage: "POOL",
      round: game.round,
      published: !lastTwo,
      publishedAt: lastTwo ? null : new Date("2026-09-16T12:00:00.000Z"),
      winnerId: lastTwo ? null : score.winnerId,
      homeQ1: lastTwo ? null : score.homeQ1,
      homeQ2: lastTwo ? null : score.homeQ2,
      homeQ3: lastTwo ? null : score.homeQ3,
      homeQ4: lastTwo ? null : score.homeQ4,
      awayQ1: lastTwo ? null : score.awayQ1,
      awayQ2: lastTwo ? null : score.awayQ2,
      awayQ3: lastTwo ? null : score.awayQ3,
      awayQ4: lastTwo ? null : score.awayQ4,
    };
  });

  await prisma.fixture.createMany({
    data: [
      ...womenFixtures,
      {
        id: "womens-championship-final",
        leagueId: "womens-championship",
        homeId: "tqn",
        awayId: "ppx",
        time: "16:00",
        dateLabel: "Fri 26 Sep",
        venue: VENUE,
        groupName: "Championship Final",
        status: "upcoming",
        stage: "FINAL",
        published: false,
        homePlaceholder: "Table 1st",
        awayPlaceholder: "Table 2nd",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
