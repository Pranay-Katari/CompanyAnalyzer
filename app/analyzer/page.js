"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
} from "recharts";

const SP500 = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Information Technology" },
  { symbol: "MSFT", name: "Microsoft Corporation", sector: "Information Technology" },
  { symbol: "AMZN", name: "Amazon.com, Inc.", sector: "Consumer Discretionary" },
  { symbol: "NVDA", name: "NVIDIA Corporation", sector: "Information Technology" },
  { symbol: "GOOGL", name: "Alphabet Inc. (Class A)", sector: "Communication Services" },
  { symbol: "GOOG", name: "Alphabet Inc. (Class C)", sector: "Communication Services" },
  { symbol: "META", name: "Meta Platforms, Inc.", sector: "Communication Services" },
  { symbol: "TSLA", name: "Tesla, Inc.", sector: "Consumer Discretionary" },
  { symbol: "ADBE", name: "Adobe Inc.", sector: "Information Technology" },
  { symbol: "CRM", name: "Salesforce, Inc.", sector: "Information Technology" },
  { symbol: "ORCL", name: "Oracle Corporation", sector: "Information Technology" },
  { symbol: "INTC", name: "Intel Corporation", sector: "Information Technology" },
  { symbol: "AMD", name: "Advanced Micro Devices, Inc.", sector: "Information Technology" },
  { symbol: "IBM", name: "IBM", sector: "Information Technology" },
  { symbol: "CSCO", name: "Cisco Systems, Inc.", sector: "Information Technology" },
  { symbol: "AVGO", name: "Broadcom Inc.", sector: "Information Technology" },
  { symbol: "QCOM", name: "Qualcomm Incorporated", sector: "Information Technology" },
  { symbol: "SHOP", name: "Shopify Inc.", sector: "Information Technology" },
  { symbol: "NOW", name: "ServiceNow, Inc.", sector: "Information Technology" },
  { symbol: "SNOW", name: "Snowflake Inc.", sector: "Information Technology" },

  { symbol: "JPM", name: "JPMorgan Chase & Co.", sector: "Financials" },
  { symbol: "BAC", name: "Bank of America Corporation", sector: "Financials" },
  { symbol: "C", name: "Citigroup Inc.", sector: "Financials" },
  { symbol: "WFC", name: "Wells Fargo & Company", sector: "Financials" },
  { symbol: "GS", name: "Goldman Sachs Group, Inc.", sector: "Financials" },
  { symbol: "MS", name: "Morgan Stanley", sector: "Financials" },
  { symbol: "SCHW", name: "Charles Schwab Corporation", sector: "Financials" },
  { symbol: "AXP", name: "American Express Company", sector: "Financials" },
  { symbol: "BLK", name: "BlackRock, Inc.", sector: "Financials" },
  { symbol: "V", name: "Visa Inc.", sector: "Information Technology" },
  { symbol: "MA", name: "Mastercard Incorporated", sector: "Information Technology" },
  { symbol: "PYPL", name: "PayPal Holdings, Inc.", sector: "Information Technology" },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Health Care" },
  { symbol: "PFE", name: "Pfizer Inc.", sector: "Health Care" },
  { symbol: "MRK", name: "Merck & Co., Inc.", sector: "Health Care" },
  { symbol: "ABBV", name: "AbbVie Inc.", sector: "Health Care" },
  { symbol: "LLY", name: "Eli Lilly and Company", sector: "Health Care" },
  { symbol: "AMGN", name: "Amgen Inc.", sector: "Health Care" },
  { symbol: "GILD", name: "Gilead Sciences, Inc.", sector: "Health Care" },
  { symbol: "MRNA", name: "Moderna, Inc.", sector: "Health Care" },
  { symbol: "BMY", name: "Bristol Myers Squibb", sector: "Health Care" },
  { symbol: "UNH", name: "UnitedHealth Group Incorporated", sector: "Health Care" },
  { symbol: "CVS", name: "CVS Health Corporation", sector: "Health Care" },
  { symbol: "WMT", name: "Walmart Inc.", sector: "Consumer Staples" },
  { symbol: "COST", name: "Costco Wholesale Corporation", sector: "Consumer Staples" },
  { symbol: "HD", name: "The Home Depot, Inc.", sector: "Consumer Discretionary" },
  { symbol: "TGT", name: "Target Corporation", sector: "Consumer Discretionary" },
  { symbol: "SBUX", name: "Starbucks Corporation", sector: "Consumer Discretionary" },
  { symbol: "MCD", name: "McDonald's Corporation", sector: "Consumer Discretionary" },
  { symbol: "KO", name: "The Coca-Cola Company", sector: "Consumer Staples" },
  { symbol: "PEP", name: "PepsiCo, Inc.", sector: "Consumer Staples" },
  { symbol: "PG", name: "Procter & Gamble Company", sector: "Consumer Staples" },
  { symbol: "CL", name: "Colgate-Palmolive Company", sector: "Consumer Staples" },
  { symbol: "BA", name: "The Boeing Company", sector: "Industrials" },
  { symbol: "CAT", name: "Caterpillar Inc.", sector: "Industrials" },
  { symbol: "GE", name: "General Electric Company", sector: "Industrials" },
  { symbol: "MMM", name: "3M Company", sector: "Industrials" },
  { symbol: "LMT", name: "Lockheed Martin Corporation", sector: "Industrials" },
  { symbol: "NOC", name: "Northrop Grumman Corporation", sector: "Industrials" },
  { symbol: "HON", name: "Honeywell International Inc.", sector: "Industrials" },
  { symbol: "RTX", name: "Raytheon Technologies Corporation", sector: "Industrials" },
  { symbol: "DE", name: "Deere & Company", sector: "Industrials" },
  { symbol: "UPS", name: "United Parcel Service, Inc.", sector: "Industrials" },
  { symbol: "FDX", name: "FedEx Corporation", sector: "Industrials" },
  { symbol: "XOM", name: "Exxon Mobil Corporation", sector: "Energy" },
  { symbol: "CVX", name: "Chevron Corporation", sector: "Energy" },
  { symbol: "COP", name: "ConocoPhillips", sector: "Energy" },
  { symbol: "SLB", name: "Schlumberger Limited", sector: "Energy" },
  { symbol: "HAL", name: "Halliburton Company", sector: "Energy" },
  { symbol: "BKR", name: "Baker Hughes Company", sector: "Energy" },
  { symbol: "PSX", name: "Phillips 66", sector: "Energy" },
  { symbol: "VLO", name: "Valero Energy Corporation", sector: "Energy" },
  { symbol: "NEE", name: "NextEra Energy, Inc.", sector: "Utilities" },
  { symbol: "DUK", name: "Duke Energy Corporation", sector: "Utilities" },
  { symbol: "D", name: "Dominion Energy, Inc.", sector: "Utilities" },
  { symbol: "SO", name: "Southern Company", sector: "Utilities" },
  { symbol: "EXC", name: "Exelon Corporation", sector: "Utilities" },
  { symbol: "AEP", name: "American Electric Power Company, Inc.", sector: "Utilities" },
  { symbol: "VZ", name: "Verizon Communications Inc.", sector: "Communication Services" },
  { symbol: "T", name: "AT&T Inc.", sector: "Communication Services" },
  { symbol: "TMUS", name: "T-Mobile US, Inc.", sector: "Communication Services" },
  { symbol: "CMCSA", name: "Comcast Corporation", sector: "Communication Services" },
  { symbol: "CHTR", name: "Charter Communications, Inc.", sector: "Communication Services" },
  { symbol: "ABNB", name: "Airbnb, Inc.", sector: "Consumer Discretionary" },
  { symbol: "UBER", name: "Uber Technologies, Inc.", sector: "Technology" },
  { symbol: "LYFT", name: "Lyft, Inc.", sector: "Technology" },
  { symbol: "DAL", name: "Delta Air Lines, Inc.", sector: "Industrials" },
  { symbol: "AAL", name: "American Airlines Group Inc.", sector: "Industrials" },
  { symbol: "UAL", name: "United Airlines Holdings, Inc.", sector: "Industrials" },
  { symbol: "MAR", name: "Marriott International, Inc.", sector: "Consumer Discretionary" },
  { symbol: "HLT", name: "Hilton Worldwide Holdings Inc.", sector: "Consumer Discretionary" },
];


async function getCompanyData(companyName) {
  const res = await fetch("https://analyzerapi-2.onrender.com/company-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ company_name: companyName })
  });

  if (!res.ok) {
    throw new Error(`Error fetching company data: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

const BRAND = {
  AAPL: ["#000000", "#A2AAAD"],
  MSFT: ["#00A4EF", "#7FBA00"],
  AMZN: ["#111111", "#FF9900"],
  NVDA: ["#000000", "#76B900"],
  GOOGL: ["#4285F4", "#34A853"],
  GOOG: ["#4285F4", "#34A853"],
  META: ["#0866FF", "#00C6FF"],
  TSLA: ["#171A20", "#CC0000"],
  ADBE: ["#FF0000", "#FF9A00"],
  CRM: ["#00A1E0", "#1E8CBE"],
  ORCL: ["#FF0000", "#660000"],
  INTC: ["#0071C5", "#004A86"],
  AMD: ["#000000", "#ED1C24"],
  IBM: ["#054ADA", "#000000"],
  CSCO: ["#1BA0D7", "#007CAD"],
  AVGO: ["#CC092F", "#660000"],
  QCOM: ["#3253DC", "#1E2B6F"],
  SHOP: ["#96BF48", "#212121"],
  NOW: ["#00A862", "#004C3F"],
  SNOW: ["#29B5E8", "#005F73"],
  JPM: ["#5A5A5A", "#A0A0A0"],
  BAC: ["#0066CC", "#B0C4DE"],
  C: ["#003B70", "#E41E26"],
  WFC: ["#B31B1B", "#FFD700"],
  GS: ["#AFB6BB", "#E8EDEE"],
  MS: ["#0072C6", "#A0A0A0"],
  SCHW: ["#007DBA", "#004B6B"],
  AXP: ["#2E77BC", "#006FCF"],
  BLK: ["#000000", "#444444"],
  V: ["#1A1F71", "#F7B600"],
  MA: ["#EB001B", "#F79E1B"],
  PYPL: ["#003087", "#009CDE"],
  JNJ: ["#D50000", "#FF6F6F"],
  PFE: ["#0071CE", "#70CAD1"],
  MRK: ["#009639", "#006747"],
  ABBV: ["#1A1A1A", "#8C1515"],
  LLY: ["#E41E26", "#991E1E"],
  AMGN: ["#0076A8", "#005B8C"],
  GILD: ["#D00000", "#666666"],
  MRNA: ["#E2231A", "#A51E36"],
  BMY: ["#6A1B9A", "#AB47BC"],
  UNH: ["#0056A4", "#89CFF0"],
  CVS: ["#CC0000", "#333333"],
  WMT: ["#0071CE", "#FFC220"],
  COST: ["#E31837", "#00297A"],
  HD: ["#F96302", "#FFB380"],
  TGT: ["#CC0000", "#E60023"],
  SBUX: ["#00704A", "#1E3932"],
  MCD: ["#FFC72C", "#DA291C"],
  KO: ["#F40009", "#000000"],
  PEP: ["#005CB9", "#E03A3E"],
  PG: ["#003DA5", "#00A3E0"],
  CL: ["#0055A2", "#FFD700"],
  BA: ["#0039A6", "#999999"],
  CAT: ["#FFCD00", "#000000"],
  GE: ["#0870D8", "#AAAAAA"],
  MMM: ["#FF0000", "#CC0000"],
  LMT: ["#003366", "#006699"],
  NOC: ["#003057", "#005BAC"],
  HON: ["#F58025", "#333333"],
  RTX: ["#DA291C", "#333333"],
  DE: ["#367C2B", "#000000"],
  UPS: ["#351C15", "#FFB500"],
  FDX: ["#660099", "#FF6600"],
  XOM: ["#FF1F00", "#0051A2"],
  CVX: ["#1F6FB2", "#E6193C"],
  COP: ["#E31837", "#000000"],
  SLB: ["#0033A1", "#000000"],
  HAL: ["#E32636", "#000000"],
  BKR: ["#00843D", "#00A9E0"],
  PSX: ["#E31837", "#333333"],
  VLO: ["#003DA5", "#FFB81C"],
  NEE: ["#6BC200", "#00AEEF"],
  DUK: ["#0066CC", "#003366"],
  D: ["#0076A8", "#00263A"],
  SO: ["#000000", "#666666"],
  EXC: ["#0066A1", "#002244"],
  AEP: ["#E41C38", "#333333"],
  VZ: ["#CD040B", "#000000"],
  T: ["#00A8E0", "#000000"],
  TMUS: ["#E20074", "#333333"],
  CMCSA: ["#009ADE", "#333333"],
  CHTR: ["#003057", "#009ADE"],
  ABNB: ["#FF5A5F", "#FF385C"],
  UBER: ["#000000", "#276EF1"],
  LYFT: ["#FF00BF", "#333333"],
  DAL: ["#C8102E", "#003DA5"],
  AAL: ["#0078D2", "#AA1C2E"],
  UAL: ["#002244", "#005BAC"],
  MAR: ["#A51C30", "#333333"],
  HLT: ["#002F6C", "#00AEEF"],
};


const fallbackColors = (seed = "SPY") => {
  const s = (seed || "SPY").toUpperCase();
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  const h1 = h % 360;
  const h2 = (h1 + 40) % 360;
  return [`hsl(${h1} 70% 55%)`, `hsl(${h2} 70% 45%)`];
};

const colorsFor = (company) =>
  (company && (BRAND[company.symbol] || BRAND[company.symbol?.toUpperCase?.()])) ||
  fallbackColors(company?.symbol || company?.name);

const pageGradientFrom = (colors) => {
  const [c1, c2] = colors;
  return {
    backgroundImage: `
      radial-gradient(1200px circle at 50% 20%, ${c1}22 0%, transparent 60%),
      linear-gradient(135deg, ${c1}, ${c2})
    `
  };
};

const sentimentLabel = (score) => {
  if (typeof score !== "number" || Number.isNaN(score)) return "—";
  if (score > 0.18) return "Positive";
  if (score >= -0.05 && score <= 0.18) return "Neutral";
  return "Negative";
};

const sentimentClass = (score) => {
  if (typeof score !== "number" || Number.isNaN(score)) {
    return "bg-gray-200 text-gray-800"; 
  }
  if (score > 0.18) {
    return "bg-green-100 text-green-800"; 
  }
  if (score >= -0.05 && score <= 0.18) {
    return "bg-yellow-100 text-yellow-800"; 
  }
  return "bg-red-100 text-red-800"; 
};

const fmtDate = (d) => {
  if (!d) return "Unknown date";
  const t = new Date(d);
  return Number.isNaN(t.getTime()) ? String(d) : t.toLocaleDateString();
};

const host = (u = "") => {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

function fmtPct(value) {
  if (value === null || value === undefined) return "—";
  return (value < 1 ? (value * 100) : value).toFixed(2) + "%";
}

const fmtNum = (v, digits = 2) =>
  typeof v === "number" ? v.toLocaleString(undefined, { maximumFractionDigits: digits }) : (v ?? "—");

const fmtInt = (v) =>
  typeof v === "number" ? Math.round(v).toLocaleString(undefined) : (v ?? "—");

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border bg-black p-3">
      <div className="text-xs uppercase tracking-wide text-neutral-400">{label}</div>
      <div className="mt-1 text-base font-semibold text-white">{value ?? "—"}</div>
    </div>
  );
}

export default function CompanyPage() {
  const [symbol, setSymbol] = useState("");
  const selected = useMemo(
    () => SP500.find((c) => c.symbol === symbol) || null,
    [symbol]
  );

  const bgStyle = useMemo(() => pageGradientFrom(colorsFor(selected)), [selected]);

  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!selected) {
        setData(null);
        return;
      }
      setLoading(true);
      setErr("");
      setData(null);
      try {
        const res = await getCompanyData(selected.name);
        if (!ignore) setData(res.data);
      } catch (e) {
        if (!ignore) setErr(e.message || "Failed to fetch company data.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [selected]);

  const items = useMemo(() => {
    if (!data) return [];
    const links = Array.isArray(data.links) ? data.links : [];
    const titles = Array.isArray(data.titles) ? data.titles : [];
    const dates = Array.isArray(data.dates) ? data.dates : [];
    const sentiments = Array.isArray(data.sentiments) ? data.sentiments : null;
    const n = Math.min(links.length, titles.length, dates.length);
    return Array.from({ length: n }, (_, i) => ({
      title: titles[i],
      link: links[i],
      date: dates[i],
      sentiment: sentiments?.[i] ?? data.overall_sentiment
    }));
  }, [data]);

  
  const chartData = useMemo(() => {
    if (!data) return [];
  
    const points = [];
  
    if (Array.isArray(data.past_dates) && Array.isArray(data.past_closings)) {
      data.past_dates.forEach((d, i) => {
        const t = new Date(d).getTime();
        const close = data.past_closings[i];
        if (!Number.isNaN(t) && Number.isFinite(close)) {
          points.push({ x: t, historyClose: close, forecastClose: null });
        }
      });
    }
  
    if (Array.isArray(data.closing_timestamps) && Array.isArray(data.future_closings)) {
      data.closing_timestamps.forEach((d, i) => {
        const t = new Date(d).getTime();
        const close = data.future_closings[i];
        if (!Number.isNaN(t) && Number.isFinite(close)) {
          points.push({ x: t, historyClose: null, forecastClose: close });
        }
      });
    }
  
    return points.sort((a, b) => a.x - b.x);
  }, [data]);
  

  const yDomain = useMemo(() => {
    if (!chartData.length) return [0, "auto"];
    const vals = chartData.flatMap((d) => [d.historyClose, d.forecastClose]).filter(v => v != null);
    const lo = Math.min(...vals);
    const hi = Math.max(...vals);
    const pad = Math.max((hi - lo) * 0.08, 1);
    return [lo - pad, hi + pad];
  }, [chartData]);
 
  const lastForecast = chartData.filter(d => d.forecastClose != null).at(-1)?.forecastClose ?? null;


  const tooltipFmt = (value) =>
    typeof value === "number" ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : value;

  return (
    <main
      className="relative min-h-screen p-6 transition-colors duration-300"
      style={bgStyle}
    >
          <h1 className="absolute top-4 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-bold text-white drop-shadow">
        S&amp;P 500 — Company Analysis
      </h1>
      <Link href="/" className="inline-block px-10 py-4 text-lg font-semibold rounded-2xl shadow-md bg-gray-800 text-white hover:bg-gray-900 transition">Home</Link>


      <div className="pt-20" />

      <div className="mx-auto max-w grid grid-cols-1 md:grid-cols-12 gap-3">
        <aside className="md:col-span-4">
          <div className="rounded-2xl bg-black/90 p-5 border">
            <div className="flex flex-col items-center text-white text-center">
              <label htmlFor="sp500" className="sr-only">
                Select company
              </label>
              <select
                id="sp500"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="mb-3 w-full rounded-xl border border-gray-300 bg-black px-4 py-3 shadow-sm focus:ring-2 focus:ring-black/10"
              >
                <option value="">Select an S&amp;P 500 Company</option>
                {SP500.map((c) => {
                  const [a, b] = colorsFor(c);
                  return (
                    <option
                      key={c.symbol}
                      value={c.symbol}
                      style={{ background: `linear-gradient(135deg, ${a}, ${b})`, color: "#fff" }}
                    >
                      {c.name} ({c.symbol})
                    </option>
                  );
                })}
              </select>

              <div className="text-sm text-white text-neutral-600">
                {selected ? (
                  <>
                    <div className="font-medium text-neutral-900">{selected.name}</div>
                    <div>{selected.symbol}{selected.sector ? ` • ${selected.sector}` : ""}</div>
                  </>
                ) : (
                  <div>Select a company to load analytics</div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-black/90 p-5 shadow border">
            <h2 className="text-lg font-semibold mb-3">News Analytics</h2>

            {loading && <p className="text-white text-neutral-700">Loading…</p>}
            {err && (
              <p className="rounded-md bg-red-100 px-3 py-2 text-sm text-red-800">{err}</p>
            )}

            {data && (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">Overall Sentiment</span>
                  <span className={`rounded-full px-2 py-1 text-sm ${sentimentClass(data.overall_sentiment)}`}>
                    {sentimentLabel(data.overall_sentiment)}
                  </span>
                </div>
              </>
            )}

            {!loading && !err && !data && (
              <p className="text-sm text-neutral-600">Pick a company to view analytics.</p>
            )}
          </div>
          <div className="rounded-2xl bg-black/90 p-5 shadow border">
            <h2 className="text-lg font-semibold mb-3">Articles</h2>

            {selected && !loading && !err && items.length === 0 && (
              <div className="rounded-xl bg-white p-6 text-center text-neutral-700 border">
                No articles returned for “{data?.company_name || selected.name}”.
              </div>
            )}

            {loading && <p className="text-neutral-700">Loading…</p>}
            {err && (
              <p className="rounded-md bg-red-100 px-3 py-2 text-sm text-red-800">{err}</p>
            )}

            <div className="grid grid-cols-1 gap-4">
              {items.map((it, i) => (
                <a
                  key={i}
                  href={it.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl bg-black p-4 shadow hover:shadow-md transition border"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold leading-snug">{it.title || "Untitled"}</h3>
                      <p className="mt-1 text-sm text-neutral-600">
                        {fmtDate(it.date)}
                        {host(it.link) && ` • ${host(it.link)}`}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 break-all text-xs text-white text-neutral-500">{it.link}</p>
                </a>
              ))}
            </div>
          </div>
        </aside>

        <section className="md:col-span-8">
          <div className="rounded-2xl bg-black/90 p-5 shadow border">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Forecasted Closing Prices (GradientBoostingRegressor)</h2>
              <div className="text-sm text-neutral-400">
                {selected ? `${selected.name} (${selected.symbol})` : ""}
                {lastForecast != null && (
                  <span className="ml-2 rounded-md bg-white/5 px-2 py-1">
                    Latest Predicted Close: {lastForecast.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                )}
              </div>
            </div>

            {!data && <p className="text-sm text-neutral-600">Pick a company to view the chart.</p>}
            {data && chartData.length === 0 && (
              <p className="text-sm text-red-300">No closing data returned.</p>
            )}

            {chartData.length > 0 && (
              <div className="h-[560px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />

                    <XAxis
                      dataKey="x"
                      type="number"
                      domain={["dataMin", "dataMax"]}
                      tick={{ fill: "#d1d5db", fontSize: 12 }}
                      tickFormatter={(ts) =>
                        new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" })
                      }
                    />

                    <YAxis
                      domain={["auto", "auto"]}
                      tick={{ fill: "#d1d5db", fontSize: 12 }}
                      tickFormatter={(v) =>
                        typeof v === "number"
                          ? v.toLocaleString(undefined, { maximumFractionDigits: 2 })
                          : v
                      }
                    />

                    <Tooltip
                      contentStyle={{ background: "#0b0b0b", border: "1px solid #33f163" }}
                      labelFormatter={(ts) =>
                        new Date(ts).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      }
                      formatter={(value, name) => [
                        value?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                        name === "historyClose" ? "History" : "Forecast",
                      ]}
                    />

                    <Line
                      type="monotone"
                      dataKey="historyClose"
                      name="History"
                      stroke="#00ffff"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="forecastClose"
                      name="Forecast"
                      stroke="#ff00ff"
                      strokeWidth={2}
                      dot={false}
                    />

                    <Brush
                      dataKey="x"
                      height={24}
                      travellerWidth={10}
                      tickFormatter={(ts) =>
                        new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" })
                      }
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {data?.closing_timestamps?.length > 0 && (
              <p className="mt-3 text-xs text-neutral-500">
                {new Date(data.closing_timestamps[0]).toLocaleDateString()} →{" "}
                {new Date(data.closing_timestamps.at(-1)).toLocaleDateString()}
              </p>
            )}

            {data?.fundamentals && (
              <div className="mt-4 rounded-2xl bg-black/90 p-5 shadow border">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Company Fundamentals</h3>
                  <span className="text-sm text-neutral-400">
                    {data.fundamentals.Resolved_Symbol || selected?.symbol || data.company_name || ""}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Stat label="Open" value={fmtNum(data.fundamentals?.Today_Open)} />
                  <Stat label="High" value={fmtNum(data.fundamentals?.Today_High)} />
                  <Stat label="Low" value={fmtNum(data.fundamentals?.Today_Low)} />
                  <Stat label="Avg Vol (20d)" value={fmtInt(data.fundamentals?.Average_Volume_20d)} />
                  <Stat label="Last Dividend" value={fmtNum(data.fundamentals?.["Last Dividend"])} />
                  <Stat label="Last Split" value={fmtNum(data.fundamentals?.["Last Split"])} />
                  <Stat label="Forward P/E" value={fmtNum(data.fundamentals?.["Forward P/E"])} />
                  <Stat label="Trailing EPS" value={fmtNum(data.fundamentals?.["Trailing EPS"])} />
                  <Stat label="PEG Ratio" value={fmtNum(data.fundamentals?.peg_ratio)} />
                  <Stat label="Price / Book" value={fmtNum(data.fundamentals?.price_to_book)} />
                  <Stat label="Market Cap" value={fmtInt(data.fundamentals?.market_cap)} />
                  <Stat label="Beta" value={fmtNum(data.fundamentals?.beta)} />
                  <Stat label="Volatility (6m)" value={fmtNum(data.fundamentals?.volatility_6m)} />
                  <Stat label="Revenue Growth" value={fmtPct(data.fundamentals?.revenue_growth)} />
                  <Stat label="EPS Growth (Q)" value={fmtPct(data.fundamentals?.eps_growth_q)} />
                  <Stat label="Dividend Yield" value={fmtPct(data.fundamentals?.dividend_yield)} />
                  <Stat label="Payout Ratio" value={fmtPct(data.fundamentals?.payout_ratio)} />
                  <Stat label="50d MA" value={fmtNum(data.fundamentals?.ma_50)} />
                  <Stat label="200d MA" value={fmtNum(data.fundamentals?.ma_200)} />
                  <Stat label="Valuation" value={data.fundamentals?.valuation_label} />
                </div>
              </div>
            )}

          </div>
        </section>
      </div>
    </main>
  );
}
