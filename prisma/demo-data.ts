export type DemoPlayer = {
  name: string;
  number: number;
  position: string;
  age?: number;
  height?: string;
  captain?: boolean;
};

export const MEN_POOL_A = ["thw", "pnb", "wde", "trt", "gls"] as const;
export const MEN_POOL_B = ["pdr", "hat", "bmf", "mgc", "sms"] as const;
export const WOMEN_TEAMS = ["tqn", "ppx", "ppl", "wvk", "hrv", "gcm"] as const;

export const TEAM_RANK: Record<string, number> = {
  thw: 1,
  pnb: 2,
  wde: 3,
  trt: 4,
  gls: 5,
  pdr: 1,
  hat: 2,
  bmf: 3,
  mgc: 4,
  sms: 5,
  tqn: 1,
  ppx: 2,
  ppl: 3,
  wvk: 4,
  hrv: 5,
  gcm: 6,
};

const PG = "Point Guard · PG";
const SG = "Shooting Guard · SG";
const SF = "Small Forward · SF";
const PF = "Power Forward · PF";
const C = "Center · C";

export const DEMO_SQUADS: Record<string, DemoPlayer[]> = {
  thw: [
    { number: 7, name: "Sonam Wangchuk", position: PG, age: 26, height: "178cm", captain: true },
    { number: 11, name: "Karma Tenzin", position: SG, age: 24, height: "188cm" },
    { number: 23, name: "Jigme Dorji", position: SF, age: 27, height: "193cm" },
    { number: 34, name: "Tashi Norbu", position: PF, age: 28, height: "198cm" },
    { number: 15, name: "Ugyen Dendup", position: C, age: 29, height: "204cm" },
    { number: 4, name: "Pema Gyeltshen", position: PG, age: 22, height: "176cm" },
    { number: 9, name: "Kinley Rabgay", position: SG, age: 23, height: "186cm" },
    { number: 21, name: "Namgay Tshering", position: SF, age: 25, height: "191cm" },
  ],
  pdr: [
    { number: 5, name: "Dorji Wangdi", position: PG, age: 27, height: "180cm", captain: true },
    { number: 8, name: "Thinley Jamtsho", position: SG, age: 25, height: "187cm" },
    { number: 14, name: "Chimi Rinzin", position: SF, age: 26, height: "194cm" },
    { number: 32, name: "Sangay Phuntsho", position: PF, age: 28, height: "199cm" },
    { number: 12, name: "Yeshey Lhendup", position: C, age: 30, height: "206cm" },
    { number: 3, name: "Nima Gyeltshen", position: PG, age: 21, height: "175cm" },
    { number: 22, name: "Kencho Wangmo", position: SG, age: 24, height: "184cm" },
    { number: 33, name: "Pema Dorji", position: PF, age: 27, height: "197cm" },
  ],
  pnb: [
    { number: 6, name: "Karma Phuntsho", position: PG, age: 25, height: "179cm", captain: true },
    { number: 10, name: "Tenzin Jamtsho", position: SG, age: 23, height: "185cm" },
    { number: 24, name: "Sonam Tobgay", position: SF, age: 26, height: "192cm" },
    { number: 35, name: "Ugyen Tshering", position: PF, age: 27, height: "196cm" },
    { number: 13, name: "Jigme Wangchuk", position: C, age: 29, height: "203cm" },
    { number: 2, name: "Dechen Gyeltshen", position: PG, age: 22, height: "174cm" },
    { number: 17, name: "Kinley Dorji", position: SF, age: 24, height: "190cm" },
    { number: 41, name: "Tashi Phuntsho", position: PF, age: 28, height: "198cm" },
  ],
  hat: [
    { number: 1, name: "Pema Lhendup", position: PG, age: 24, height: "177cm", captain: true },
    { number: 9, name: "Sangay Tenzin", position: SG, age: 26, height: "186cm" },
    { number: 19, name: "Karma Norbu", position: SF, age: 25, height: "191cm" },
    { number: 30, name: "Jigme Tshewang", position: PF, age: 27, height: "197cm" },
    { number: 16, name: "Sonam Choden", position: C, age: 28, height: "202cm" },
    { number: 7, name: "Thinley Dorji", position: SG, age: 22, height: "183cm" },
    { number: 25, name: "Ugyen Penjore", position: SF, age: 23, height: "189cm" },
    { number: 44, name: "Namgay Wangdi", position: PF, age: 29, height: "199cm" },
  ],
  wde: [
    { number: 8, name: "Tashi Gyeltshen", position: PG, age: 26, height: "181cm", captain: true },
    { number: 13, name: "Kinley Wangchuk", position: SG, age: 24, height: "187cm" },
    { number: 20, name: "Dorji Tshering", position: SF, age: 27, height: "193cm" },
    { number: 31, name: "Pema Tenzin", position: PF, age: 28, height: "198cm" },
    { number: 18, name: "Jigme Lhendup", position: C, age: 30, height: "205cm" },
    { number: 4, name: "Sonam Phuntsho", position: PG, age: 21, height: "176cm" },
    { number: 27, name: "Karma Dendup", position: SG, age: 25, height: "184cm" },
    { number: 36, name: "Yeshey Norbu", position: PF, age: 26, height: "196cm" },
  ],
  trt: [
    { number: 11, name: "Ugyen Wangdi", position: PG, age: 25, height: "178cm", captain: true },
    { number: 15, name: "Tenzin Dorji", position: SG, age: 23, height: "185cm" },
    { number: 22, name: "Sangay Gyeltshen", position: SF, age: 26, height: "192cm" },
    { number: 28, name: "Nima Tshewang", position: PF, age: 27, height: "197cm" },
    { number: 40, name: "Karma Lhendup", position: C, age: 29, height: "204cm" },
    { number: 5, name: "Pema Rabgay", position: PG, age: 22, height: "175cm" },
    { number: 26, name: "Jigme Phuntsho", position: SF, age: 24, height: "190cm" },
    { number: 38, name: "Thinley Norbu", position: PF, age: 28, height: "199cm" },
  ],
  gls: [
    { number: 3, name: "Kinley Tshering", position: PG, age: 24, height: "177cm", captain: true },
    { number: 12, name: "Sonam Jamtsho", position: SG, age: 25, height: "186cm" },
    { number: 21, name: "Tashi Wangchuk", position: SF, age: 26, height: "191cm" },
    { number: 29, name: "Dorji Lhendup", position: PF, age: 27, height: "196cm" },
    { number: 14, name: "Ugyen Tenzin", position: C, age: 28, height: "203cm" },
    { number: 6, name: "Pema Choden", position: SG, age: 22, height: "182cm" },
    { number: 33, name: "Karma Gyeltshen", position: SF, age: 23, height: "189cm" },
    { number: 42, name: "Jigme Norbu", position: PF, age: 29, height: "198cm" },
  ],
  bmf: [
    { number: 9, name: "Yeshey Wangdi", position: PG, age: 26, height: "179cm", captain: true },
    { number: 16, name: "Namgay Dorji", position: SG, age: 24, height: "184cm" },
    { number: 23, name: "Sonam Lhendup", position: SF, age: 27, height: "193cm" },
    { number: 34, name: "Tenzin Phuntsho", position: PF, age: 28, height: "198cm" },
    { number: 19, name: "Pema Wangchuk", position: C, age: 30, height: "205cm" },
    { number: 2, name: "Kinley Tshewang", position: PG, age: 21, height: "174cm" },
    { number: 28, name: "Karma Jamtsho", position: SG, age: 25, height: "187cm" },
    { number: 37, name: "Ugyen Gyeltshen", position: PF, age: 26, height: "197cm" },
  ],
  mgc: [
    { number: 4, name: "Jigme Tshering", position: PG, age: 25, height: "180cm", captain: true },
    { number: 10, name: "Tashi Dendup", position: SG, age: 23, height: "185cm" },
    { number: 18, name: "Dorji Phuntsho", position: SF, age: 26, height: "192cm" },
    { number: 31, name: "Sangay Norbu", position: PF, age: 27, height: "196cm" },
    { number: 17, name: "Sonam Wangdi", position: C, age: 29, height: "204cm" },
    { number: 8, name: "Pema Tshewang", position: SG, age: 22, height: "183cm" },
    { number: 25, name: "Kinley Lhendup", position: SF, age: 24, height: "190cm" },
    { number: 39, name: "Karma Tenzin", position: PF, age: 28, height: "199cm" },
  ],
  sms: [
    { number: 7, name: "Thinley Wangchuk", position: PG, age: 24, height: "178cm", captain: true },
    { number: 14, name: "Ugyen Jamtsho", position: SG, age: 26, height: "186cm" },
    { number: 20, name: "Tenzin Gyeltshen", position: SF, age: 25, height: "191cm" },
    { number: 32, name: "Jigme Lhendup", position: PF, age: 27, height: "197cm" },
    { number: 15, name: "Pema Norbu", position: C, age: 28, height: "202cm" },
    { number: 1, name: "Sonam Rabgay", position: PG, age: 21, height: "175cm" },
    { number: 26, name: "Karma Wangdi", position: SF, age: 23, height: "189cm" },
    { number: 43, name: "Dorji Tenzin", position: PF, age: 29, height: "198cm" },
  ],
  tqn: [
    { number: 4, name: "Dechen Wangmo", position: PG, age: 24, height: "168cm", captain: true },
    { number: 8, name: "Pema Choden", position: SG, age: 23, height: "174cm" },
    { number: 12, name: "Sonam Lhamo", position: SF, age: 25, height: "178cm" },
    { number: 21, name: "Tashi Dema", position: PF, age: 26, height: "182cm" },
    { number: 15, name: "Karma Yangzom", position: C, age: 27, height: "186cm" },
    { number: 6, name: "Kinley Choden", position: PG, age: 21, height: "166cm" },
    { number: 19, name: "Ugyen Lhamo", position: SG, age: 22, height: "172cm" },
    { number: 30, name: "Jigme Zangmo", position: PF, age: 28, height: "183cm" },
  ],
  ppx: [
    { number: 5, name: "Tshering Lhamo", position: PG, age: 25, height: "169cm", captain: true },
    { number: 9, name: "Dawa Choden", position: SG, age: 24, height: "173cm" },
    { number: 14, name: "Pema Yangzom", position: SF, age: 26, height: "179cm" },
    { number: 22, name: "Sonam Dema", position: PF, age: 27, height: "183cm" },
    { number: 11, name: "Karma Choden", position: C, age: 28, height: "187cm" },
    { number: 3, name: "Dechen Lhamo", position: SG, age: 22, height: "171cm" },
    { number: 17, name: "Tenzin Wangmo", position: SF, age: 23, height: "176cm" },
    { number: 28, name: "Namgay Dema", position: PF, age: 26, height: "181cm" },
  ],
  ppl: [
    { number: 7, name: "Kinley Wangmo", position: PG, age: 23, height: "167cm", captain: true },
    { number: 10, name: "Ugyen Choden", position: SG, age: 25, height: "174cm" },
    { number: 16, name: "Tashi Lhamo", position: SF, age: 24, height: "177cm" },
    { number: 24, name: "Pema Zangmo", position: PF, age: 26, height: "182cm" },
    { number: 13, name: "Sonam Yangzom", position: C, age: 27, height: "185cm" },
    { number: 2, name: "Karma Dema", position: PG, age: 21, height: "165cm" },
    { number: 18, name: "Jigme Choden", position: SF, age: 22, height: "175cm" },
    { number: 31, name: "Yeshey Wangmo", position: PF, age: 28, height: "180cm" },
  ],
  wvk: [
    { number: 6, name: "Pema Wangmo", position: PG, age: 26, height: "170cm", captain: true },
    { number: 11, name: "Dechen Choden", position: SG, age: 24, height: "173cm" },
    { number: 20, name: "Sonam Zangmo", position: SF, age: 25, height: "178cm" },
    { number: 27, name: "Tenzin Lhamo", position: PF, age: 27, height: "183cm" },
    { number: 14, name: "Karma Dema", position: C, age: 28, height: "186cm" },
    { number: 1, name: "Kinley Yangzom", position: SG, age: 22, height: "171cm" },
    { number: 23, name: "Ugyen Wangmo", position: SF, age: 23, height: "176cm" },
    { number: 35, name: "Tashi Choden", position: PF, age: 26, height: "181cm" },
  ],
  hrv: [
    { number: 8, name: "Namgay Lhamo", position: PG, age: 24, height: "168cm", captain: true },
    { number: 13, name: "Sonam Choden", position: SG, age: 23, height: "172cm" },
    { number: 19, name: "Pema Dema", position: SF, age: 25, height: "177cm" },
    { number: 26, name: "Jigme Yangzom", position: PF, age: 26, height: "181cm" },
    { number: 12, name: "Tashi Wangmo", position: C, age: 27, height: "184cm" },
    { number: 4, name: "Karma Lhamo", position: PG, age: 21, height: "166cm" },
    { number: 21, name: "Dechen Zangmo", position: SF, age: 22, height: "175cm" },
    { number: 29, name: "Ugyen Dema", position: PF, age: 28, height: "180cm" },
  ],
  gcm: [
    { number: 9, name: "Yeshey Choden", position: PG, age: 23, height: "167cm", captain: true },
    { number: 15, name: "Kinley Lhamo", position: SG, age: 24, height: "173cm" },
    { number: 18, name: "Sonam Wangmo", position: SF, age: 25, height: "176cm" },
    { number: 25, name: "Pema Yangzom", position: PF, age: 26, height: "182cm" },
    { number: 10, name: "Tenzin Choden", position: C, age: 27, height: "185cm" },
    { number: 3, name: "Dawa Dema", position: SG, age: 21, height: "170cm" },
    { number: 22, name: "Karma Zangmo", position: SF, age: 22, height: "174cm" },
    { number: 34, name: "Jigme Lhamo", position: PF, age: 28, height: "181cm" },
  ],
};

export function demoScore(homeId: string, awayId: string) {
  const homeRank = TEAM_RANK[homeId] ?? 9;
  const awayRank = TEAM_RANK[awayId] ?? 9;
  const homeWins = homeRank < awayRank || (homeRank === awayRank && homeId < awayId);
  const spread = Math.max(4, Math.abs(homeRank - awayRank) * 5 + 6);
  const seed = (homeId + awayId).split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const base = 64 + (seed % 10);
  const winner = base + spread;
  const loser = base + (seed % 5);
  const quarters = splitQuarters(winner, loser, seed);
  if (homeWins) {
    return { home: winner, away: loser, winnerId: homeId, ...quarters };
  }
  return {
    home: loser,
    away: winner,
    winnerId: awayId,
    homeQ1: quarters.awayQ1,
    homeQ2: quarters.awayQ2,
    homeQ3: quarters.awayQ3,
    homeQ4: quarters.awayQ4,
    awayQ1: quarters.homeQ1,
    awayQ2: quarters.homeQ2,
    awayQ3: quarters.homeQ3,
    awayQ4: quarters.homeQ4,
  };
}

function splitQuarters(winner: number, loser: number, seed: number) {
  const w = [
    Math.floor(winner * 0.24) + (seed % 3),
    Math.floor(winner * 0.26),
    Math.floor(winner * 0.25),
  ];
  const l = [
    Math.floor(loser * 0.23) + (seed % 2),
    Math.floor(loser * 0.27),
    Math.floor(loser * 0.24),
  ];
  return {
    homeQ1: w[0],
    homeQ2: w[1],
    homeQ3: w[2],
    homeQ4: winner - w[0] - w[1] - w[2],
    awayQ1: l[0],
    awayQ2: l[1],
    awayQ3: l[2],
    awayQ4: loser - l[0] - l[1] - l[2],
  };
}

export function formatDay(date: Date) {
  return date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

export function roundRobin(teamIds: string[]) {
  const teams = [...teamIds];
  if (teams.length < 2) {
    return [];
  }
  if (teams.length % 2 === 1) {
    teams.push("BYE");
  }

  const n = teams.length;
  const rounds = n - 1;
  const half = n / 2;
  const arr = [...teams];
  const games: { home: string; away: string; round: number }[] = [];

  for (let round = 0; round < rounds; round += 1) {
    for (let i = 0; i < half; i += 1) {
      const home = arr[i];
      const away = arr[n - 1 - i];
      if (home !== "BYE" && away !== "BYE") {
        games.push({ home, away, round: round + 1 });
      }
    }
    const last = arr.pop();
    if (last) {
      arr.splice(1, 0, last);
    }
  }

  return games;
}
