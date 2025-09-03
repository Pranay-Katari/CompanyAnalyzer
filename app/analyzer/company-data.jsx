import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);
export default async function handler(req, res) {
  const { companyName } = req.body;
  const cached = await redis.get(companyName);
  if (cached) {
    return res.status(200).json({ data: JSON.parse(cached), source: "redis" });
  }
  const flaskRes = await fetch("https://analyzerapi-2.onrender.com/company-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ company_name: companyName }),
  });

  if (!flaskRes.ok) {
    return res.status(flaskRes.status).json({ error: "Failed to fetch from backend" });
  }

  const data = await flaskRes.json();
  await redis.setex(companyName, 60, JSON.stringify(data));

  return res.status(200).json({ data, source: "api" });
}
