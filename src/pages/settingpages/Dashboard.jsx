import { useState } from "react";

import { Box } from "@mui/material";

import SideNav from "../../components/ui/SideNav";
import NavBar from "../../components/ui/NavBar";
import { useAppStore } from "../../appStore";
import { artworks } from "../../data/artworks";
import ArtworkCanvas3D from "../../components/3d/ArtworkCanvas3D";

function SalesRow({ title, amount, change, positive }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      <span style={{ color: "#94a3b8", fontSize: 14 }}>{title}</span>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <span style={{ color: "#f1f5f9", fontWeight: 700 }}>{amount}</span>
        <span style={{ color: positive ? "#34d399" : "#f87171", fontSize: 12 }}>
          {positive ? "↑" : "↓"} {change}
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const user = useAppStore((s) => s.user);
  const [period, setPeriod] = useState("week");

  const topArtworks = [...artworks].sort((a, b) => b.views - a.views).slice(0, 3);

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box
          component="main"
          sx={{
            flexGrow: 1, p: "28px 32px",
            background: "#0a0a0f", minHeight: "calc(100vh - 110px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div>
              <h1 style={{ color: "#f1f5f9", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>
                Analytics Dashboard
              </h1>
              <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
                Your performance at a glance
              </p>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["week", "month", "year"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  style={{
                    padding: "7px 16px", borderRadius: 8, border: "1px solid rgba(124,58,237,0.3)",
                    background: period === p ? "rgba(124,58,237,0.2)" : "transparent",
                    color: period === p ? "#a78bfa" : "#64748b",
                    fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* KPI cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
            {[
              { label: "Revenue", val: period === "year" ? "$24,820" : period === "month" ? "$4,820" : "$1,240", icon: "💰", delta: "+12%", pos: true },
              { label: "Sales", val: period === "year" ? "1,284" : period === "month" ? "214" : "38", icon: "🛒", delta: "+8%", pos: true },
              { label: "Profile Views", val: period === "year" ? "284K" : period === "month" ? "21.4K" : "4.2K", icon: "👁", delta: "+22%", pos: true },
              { label: "Downloads", val: period === "year" ? "8,420" : period === "month" ? "920" : "164", icon: "⬇", delta: "-3%", pos: false },
            ].map(({ label, val, icon, delta, pos }) => (
              <div key={label} style={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(124,58,237,0.15)",
                borderRadius: 14, padding: "20px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                    background: pos ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
                    color: pos ? "#34d399" : "#f87171",
                  }}>
                    {delta}
                  </span>
                </div>
                <div style={{ color: "#f1f5f9", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{val}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Sales breakdown */}
            <div style={{
              background: "linear-gradient(145deg, #1a1a2e, #16213e)",
              border: "1px solid rgba(124,58,237,0.15)",
              borderRadius: 14, padding: "24px",
            }}>
              <h3 style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>
                Sales Breakdown
              </h3>
              <SalesRow title="Quantum Torus" amount="$1,470" change="15%" positive />
              <SalesRow title="Golden Diamond" amount="$890" change="8%" positive />
              <SalesRow title="Cosmos Knot" amount="$650" change="3%" positive />
              <SalesRow title="Neon Ring" amount="$280" change="12%" positive />
              <SalesRow title="Void Crystal" amount="$0" change="100%" positive={false} />
            </div>

            {/* Top artworks */}
            <div style={{
              background: "linear-gradient(145deg, #1a1a2e, #16213e)",
              border: "1px solid rgba(124,58,237,0.15)",
              borderRadius: 14, padding: "24px",
            }}>
              <h3 style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>
                Top Artworks
              </h3>
              {topArtworks.map((art) => (
                <div key={art.id} style={{
                  display: "flex", gap: 12, alignItems: "center",
                  padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                  <div style={{ width: 56, height: 56, borderRadius: 10, background: "#06060f", flexShrink: 0 }}>
                    <ArtworkCanvas3D
                      geometry={art.geometry}
                      color={art.color}
                      emissive={art.emissive}
                      metalness={art.metalness}
                      roughness={art.roughness}
                      height={56}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{art.title}</div>
                    <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>
                      👁 {(art.views / 1000).toFixed(1)}k  ·  ♥ {art.likes}
                    </div>
                  </div>
                  <div style={{
                    color: art.forSale ? "#a78bfa" : "#34d399",
                    fontWeight: 700, fontSize: 13,
                  }}>
                    {art.forSale ? `$${art.price}` : "Free"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
