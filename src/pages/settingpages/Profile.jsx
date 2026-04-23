import { useState } from "react";

import { Box } from "@mui/material";

import SideNav from "../../components/ui/SideNav";
import NavBar from "../../components/ui/NavBar";
import { useAppStore } from "../../appStore";
import { artworks } from "../../data/artworks";
import ArtworkCanvas3D from "../../components/3d/ArtworkCanvas3D";
import lok from "../../assets/lok.jpg";

const myArtworks = artworks.slice(0, 4);

export default function Profile() {
  const user = useAppStore((s) => s.user);
  const [activeTab, setActiveTab] = useState("artworks");

  const tabs = ["artworks", "collections", "activity"];

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box
          component="main"
          sx={{
            flexGrow: 1, background: "#0a0a0f",
            minHeight: "calc(100vh - 110px)",
          }}
        >
          {/* Cover + avatar */}
          <div style={{
            height: 200,
            background: "linear-gradient(135deg, #1a0533 0%, #0c1a3a 50%, #0a2a1a 100%)",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", bottom: -40, left: 40,
              width: 80, height: 80, borderRadius: "50%",
              border: "3px solid #7c3aed",
              overflow: "hidden",
            }}>
              <img src={lok} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          {/* Profile info */}
          <div style={{ padding: "60px 40px 0 40px" }}>
            <h2 style={{ color: "#f1f5f9", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>
              {user?.name ?? "Artist"}
            </h2>
            <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 8px" }}>
              3D Artist · {user?.role ?? "Member"}
            </p>
            <p style={{ color: "#94a3b8", fontSize: 14, maxWidth: 460, lineHeight: 1.6, margin: "0 0 24px" }}>
              Passionate about creating immersive 3D experiences. Specializing in abstract geometric art and sci-fi environments.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
              {[
                { label: "Artworks", val: myArtworks.length },
                { label: "Followers", val: "1,240" },
                { label: "Following", val: "380" },
                { label: "Total Sales", val: "$4,820" },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 20 }}>{val}</div>
                  <div style={{ color: "#64748b", fontSize: 12 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, borderBottom: "1px solid rgba(124,58,237,0.15)", marginBottom: 28 }}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "10px 20px", fontSize: 14, fontWeight: 600,
                    textTransform: "capitalize",
                    color: activeTab === tab ? "#7c3aed" : "#64748b",
                    borderBottom: activeTab === tab ? "2px solid #7c3aed" : "2px solid transparent",
                    transition: "all 0.2s",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "artworks" && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 16, paddingBottom: 40,
              }}>
                {myArtworks.map((art) => (
                  <div key={art.id} style={{
                    background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                    borderRadius: 14, overflow: "hidden",
                    border: "1px solid rgba(124,58,237,0.15)",
                  }}>
                    <div style={{ background: "#06060f", height: 180 }}>
                      <ArtworkCanvas3D
                        geometry={art.geometry}
                        color={art.color}
                        emissive={art.emissive}
                        metalness={art.metalness}
                        roughness={art.roughness}
                        height={180}
                      />
                    </div>
                    <div style={{ padding: "12px" }}>
                      <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>{art.title}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                        <span style={{ color: "#7c3aed", fontSize: 11 }}>♥ {art.likes}</span>
                        <span style={{ color: art.forSale ? "#a78bfa" : "#34d399", fontSize: 11, fontWeight: 700 }}>
                          {art.forSale ? `$${art.price}` : "Free"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "collections" && (
              <div style={{ color: "#64748b", textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📁</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#94a3b8" }}>No collections yet</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>Collections you create will appear here.</div>
              </div>
            )}

            {activeTab === "activity" && (
              <div style={{ paddingBottom: 40 }}>
                {[
                  { action: "Uploaded", item: "Quantum Torus", time: "2 hours ago", icon: "☁️" },
                  { action: "Sold", item: "Golden Diamond", time: "1 day ago", icon: "💰" },
                  { action: "Liked", item: "Cosmos Knot", time: "3 days ago", icon: "♥" },
                  { action: "Uploaded", item: "Neon Ring", time: "5 days ago", icon: "☁️" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <div>
                      <span style={{ color: "#94a3b8", fontSize: 14 }}>
                        {item.action}{" "}
                        <strong style={{ color: "#f1f5f9" }}>{item.item}</strong>
                      </span>
                      <div style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
}
