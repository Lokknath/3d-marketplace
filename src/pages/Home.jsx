import { useState } from "react";
import { Box } from "@mui/material";

import { useNavigate } from "react-router-dom";
import SideNav from "../components/ui/SideNav";
import NavBar from "../components/ui/NavBar";

import { useAppStore } from "../appStore";
import { artworks, stats } from "../data/artworks";
import ArtworkCanvas3D from "../components/3d/ArtworkCanvas3D";

function StatCard({ label, value, icon, color }) {
  return (
    <div style={{
      background: "linear-gradient(145deg, #1a1a2e, #16213e)",
      borderRadius: 16, padding: "24px",
      border: `1px solid ${color}30`,
      flex: 1, minWidth: 140,
    }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
      <div style={{
        fontSize: 28, fontWeight: 800, color,
        background: `linear-gradient(135deg, ${color}, #06b6d4)`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        {value}
      </div>
      <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function MiniArtworkCard({ artwork, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(artwork)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(145deg, #1a1a2e, #16213e)",
        borderRadius: 14, overflow: "hidden", cursor: "pointer",
        border: `1px solid ${hovered ? "rgba(124,58,237,0.5)" : "rgba(124,58,237,0.15)"}`,
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ background: "#06060f", height: 170 }}>
        <ArtworkCanvas3D
          geometry={artwork.geometry}
          color={artwork.color}
          emissive={artwork.emissive}
          metalness={artwork.metalness}
          roughness={artwork.roughness}
          height={170}
        />
      </div>
      <div style={{ padding: "12px" }}>
        <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>{artwork.title}</div>
        <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>by {artwork.artist}</div>
        <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#a78bfa", fontSize: 12 }}>{artwork.category}</span>
          <span style={{
            background: artwork.forSale ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(16,185,129,0.2)",
            color: "#fff", fontSize: 11, fontWeight: 700,
            padding: "2px 8px", borderRadius: 12,
          }}>
            {artwork.forSale ? `$${artwork.price}` : "Free"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const trending = [...artworks].sort((a, b) => b.likes - a.likes).slice(0, 6);
  const recent = artworks.slice(-4);

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
          {/* Welcome header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{
              color: "#f1f5f9", fontSize: 28, fontWeight: 800, margin: "0 0 6px",
            }}>
              Welcome back,{" "}
              <span style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {user?.name ?? "Artist"}
              </span>{" "}
              👋
            </h1>
            <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
              Here's what's happening on EVK3D today.
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 40 }}>
            {[
              { label: "Total Artists", value: "12,400+", icon: "🎨", color: "#7c3aed" },
              { label: "3D Models", value: "58,000+", icon: "🔮", color: "#06b6d4" },
              { label: "Downloads", value: "2.4M+", icon: "⬇", color: "#f59e0b" },
              { label: "Countries", value: "180+", icon: "🌍", color: "#10b981" },
            ].map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Trending artworks */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 700, margin: 0 }}>
                🔥 Trending Now
              </h2>
              <button
                onClick={() => navigate("/marketplace")}
                style={{
                  background: "transparent", color: "#7c3aed",
                  border: "1px solid rgba(124,58,237,0.35)", borderRadius: 8,
                  padding: "7px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer",
                }}
              >
                View All →
              </button>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
            }}>
              {trending.map((art) => (
                <MiniArtworkCard key={art.id} artwork={art} onClick={setSelectedArtwork} />
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 700, margin: "0 0 16px" }}>
              Quick Actions
            </h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { label: "Upload New Artwork", icon: "☁️", path: "/asset", color: "#7c3aed" },
                { label: "View 3D Models", icon: "🚗", path: "/models", color: "#06b6d4" },
                { label: "Manage Users", icon: "👥", path: "/userdata", color: "#f59e0b" },
                { label: "Manage Roles", icon: "🔑", path: "/roledata", color: "#10b981" },
                { label: "Marketplace", icon: "🛒", path: "/marketplace", color: "#ec4899" },
              ].map(({ label, icon, path, color }) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}35`,
                    borderRadius: 12, padding: "14px 20px",
                    color: "#e2e8f0", fontSize: 13, fontWeight: 600,
                    cursor: "pointer", display: "flex", alignItems: "center",
                    gap: 8, transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${color}25`;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${color}15`;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Recently added */}
          <div>
            <h2 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 700, margin: "0 0 16px" }}>
              Recently Added
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
            }}>
              {recent.map((art) => (
                <MiniArtworkCard key={art.id} artwork={art} onClick={setSelectedArtwork} />
              ))}
            </div>
          </div>
        </Box>
      </Box>

      {/* Inline artwork modal */}
      {selectedArtwork && (
        <div
          onClick={() => setSelectedArtwork(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#1a1a2e", borderRadius: 20,
              border: "1px solid rgba(124,58,237,0.4)",
              maxWidth: 700, width: "100%", overflow: "hidden",
              display: "grid", gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div style={{ background: "#06060f" }}>
              <ArtworkCanvas3D
                geometry={selectedArtwork.geometry}
                color={selectedArtwork.color}
                emissive={selectedArtwork.emissive}
                metalness={selectedArtwork.metalness}
                roughness={selectedArtwork.roughness}
                height={380}
              />
            </div>
            <div style={{ padding: "28px" }}>
              <button
                onClick={() => setSelectedArtwork(null)}
                style={{ float: "right", background: "none", border: "none", color: "#64748b", fontSize: 20, cursor: "pointer" }}
              >✕</button>
              <h3 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>
                {selectedArtwork.title}
              </h3>
              <p style={{ color: "#7c3aed", fontSize: 12, margin: "0 0 16px" }}>by {selectedArtwork.artist}</p>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
                {selectedArtwork.description}
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => { setSelectedArtwork(null); navigate("/marketplace"); }}
                  style={{
                    flex: 1, padding: "12px", borderRadius: 10, border: "none",
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
                  }}
                >
                  View in Marketplace
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
