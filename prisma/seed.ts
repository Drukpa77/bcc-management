import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { teams, warriorsSquad } from "../src/lib/tournament";

const prisma = new PrismaClient();

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
    update: {},
    create: {
      id: "national-championship",
      name: "National Championship",
      season: "2026",
      location: "Changlimithang, Thimphu",
      gender: "men",
      format: "pools",
      status: "live",
      teams: { create: menIds.map((teamId) => ({ teamId })) },
    },
  });

  await prisma.league.upsert({
    where: { id: "womens-championship" },
    update: {},
    create: {
      id: "womens-championship",
      name: "Women's Championship",
      season: "2026",
      location: "Changlimithang, Thimphu",
      gender: "women",
      format: "round-robin",
      status: "live",
      teams: { create: womenIds.map((teamId) => ({ teamId })) },
    },
  });

  await prisma.setting.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default", activeLeagueId: "national-championship" },
  });

  const warriorCount = await prisma.player.count({ where: { teamId: "thw" } });
  if (warriorCount === 0) {
    await prisma.player.createMany({
      data: warriorsSquad.map((player) => ({
        teamId: "thw",
        name: player.name,
        number: player.number,
        position: player.pos,
        captain: player.number === 7,
      })),
    });
  }
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
