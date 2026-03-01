export default async function handler(req, res) {
  const { playerId, season } = req.query;

  const response = await fetch(
    `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=${season}`
  );

  const data = await response.json();
  const stats = data.stats?.[0]?.splits?.[0]?.stat;

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.status(200).json(stats);
}
