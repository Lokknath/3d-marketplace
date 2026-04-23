import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { artworks, categories } from "../data/artworks";
import ArtworkCanvas3D from "../components/3d/ArtworkCanvas3D";
import { useAppStore } from "../appStore";

/* ─── Artwork Card ──────────────────────────────────────── */
function ArtworkCard({ artwork, onClick }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(artwork)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
        borderRadius: "16px", overflow: "hidden", cursor: "pointer",
        border: `1px solid ${hovered ? "rgba(124, 58, 237, 0.6)" : "rgba(124, 58, 237, 0.2)"}`,
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 16px 50px rgba(124,58,237,0.25)" : "none",
        transition: "all 0.25s ease",
        position: "relative",
      }}
    >
      {artwork.featured && (
        <div style={{
          position: "absolute", top: 10, left: 10, zIndex: 2,
          background: "linear-gradient(135deg, #f59e0b, #ef4444)",
          color: "#fff", fontSize: "9px", fontWeight: 700,
          padding: "3px 9px", borderRadius: "20px", letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
          Featured
        </div>
      )}
      {!artwork.forSale && (
        <div style={{
          position: "absolute", top: 10, right: 10, zIndex: 2,
          background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)",
          color: "#34d399", fontSize: "9px", fontWeight: 700,
          padding: "3px 9px", borderRadius: "20px", letterSpacing: "0.06em",
        }}>
          FREE
        </div>
      )}

      <div style={{
        background: "radial-gradient(ellipse at center, #0f0f1a 0%, #060610 100%)",
        height: 200,
      }}>
        <ArtworkCanvas3D
          geometry={artwork.geometry}
          color={artwork.color}
          emissive={artwork.emissive}
          metalness={artwork.metalness}
          roughness={artwork.roughness}
          height={200}
        />
      </div>

      <div style={{ padding: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "14px" }}>{artwork.title}</div>
            <div style={{ color: "#64748b", fontSize: "11px", marginTop: 2 }}>by {artwork.artist}</div>
          </div>
          <div style={{
            background: artwork.forSale ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(16,185,129,0.2)",
            color: "#fff", fontWeight: 700, fontSize: "13px",
            padding: "3px 10px", borderRadius: "20px",
          }}>
            {artwork.forSale ? `$${artwork.price}` : "Free"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: liked ? "#ec4899" : "#475569",
              fontSize: "12px", display: "flex", alignItems: "center",
              gap: 3, padding: 0, transition: "color 0.2s",
            }}
          >
            {liked ? "♥" : "♡"} {artwork.likes + (liked ? 1 : 0)}
          </button>
          <span style={{ color: "#475569", fontSize: "12px" }}>👁 {(artwork.views / 1000).toFixed(1)}k</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Detail Modal ──────────────────────────────────────── */
function DetailModal({ artwork, onClose }) {
  const [liked, setLiked] = useState(false);
  const [bought, setBought] = useState(false);
  if (!artwork) return null;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "linear-gradient(145deg, #1a1a2e, #0f172a)",
        borderRadius: "24px", border: "1px solid rgba(124,58,237,0.4)",
        maxWidth: 850, width: "100%", overflow: "hidden",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        maxHeight: "90vh",
      }}>
        <div style={{
          background: "#06060f",
          minHeight: 420, display: "flex", alignItems: "center",
        }}>
          <ArtworkCanvas3D
            geometry={artwork.geometry}
            color={artwork.color}
            emissive={artwork.emissive}
            metalness={artwork.metalness}
            roughness={artwork.roughness}
            height={420}
          />
        </div>

        <div style={{ padding: "32px", overflowY: "auto" }}>
          <button onClick={onClose} style={{
            float: "right", background: "none", border: "none",
            color: "#64748b", fontSize: "22px", cursor: "pointer",
          }}>✕</button>

          <span style={{
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#7c3aed",
            background: "rgba(124,58,237,0.15)", padding: "3px 10px", borderRadius: "20px",
          }}>
            {artwork.category}
          </span>

          <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: 800, margin: "12px 0 4px" }}>
            {artwork.title}
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: 16 }}>
            by <span style={{ color: "#a78bfa" }}>{artwork.artist}</span>
          </p>
          <p style={{ color: "#cbd5e1", fontSize: "13px", lineHeight: 1.7, marginBottom: 20 }}>
            {artwork.description}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { label: "Likes", val: (artwork.likes + (liked ? 1 : 0)).toLocaleString() },
              { label: "Views", val: artwork.views.toLocaleString() },
              { label: "Downloads", val: artwork.downloads.toLocaleString() },
              { label: "Format", val: "GLTF / FBX" },
            ].map(({ label, val }) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px",
              }}>
                <div style={{ color: "#64748b", fontSize: "10px", marginBottom: 2 }}>{label}</div>
                <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "13px" }}>{val}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {artwork.tags.map((tag) => (
              <span key={tag} style={{
                background: "rgba(124,58,237,0.1)", color: "#a78bfa",
                fontSize: "11px", padding: "3px 10px", borderRadius: "20px",
                border: "1px solid rgba(124,58,237,0.2)",
              }}>
                #{tag}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {bought ? (
              <div style={{
                flex: 1, padding: "13px", borderRadius: "12px", textAlign: "center",
                background: "rgba(16,185,129,0.2)", color: "#34d399",
                fontWeight: 700, fontSize: "14px",
              }}>
                ✓ {artwork.forSale ? "Purchased!" : "Downloaded!"}
              </div>
            ) : (
              <button onClick={() => setBought(true)} style={{
                flex: 1, padding: "13px", borderRadius: "12px", border: "none",
                background: artwork.forSale
                  ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
                  : "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff", fontWeight: 700, fontSize: "14px", cursor: "pointer",
              }}>
                {artwork.forSale ? `Buy — $${artwork.price}` : "Download Free"}
              </button>
            )}
            <button onClick={() => setLiked(!liked)} style={{
              padding: "13px 18px", borderRadius: "12px",
              border: "1px solid rgba(124,58,237,0.3)",
              background: liked ? "rgba(236,72,153,0.15)" : "transparent",
              color: liked ? "#ec4899" : "#94a3b8",
              fontWeight: 600, fontSize: "16px", cursor: "pointer",
              transition: "all 0.2s",
            }}>
              {liked ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Marketplace ──────────────────────────────────── */
export default function Marketplace() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useAppStore((s) => s.user);

  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const filtered = useMemo(() => {
    let list = [...artworks];

    if (activeCategory !== "All") {
      list = list.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.artist.toLowerCase().includes(q) ||
          a.tags.some((t) => t.includes(q))
      );
    }
    if (priceFilter === "free") list = list.filter((a) => !a.forSale);
    if (priceFilter === "paid") list = list.filter((a) => a.forSale);
    if (priceFilter === "under50") list = list.filter((a) => a.price < 50);

    switch (sortBy) {
      case "featured": list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
      case "popular": list.sort((a, b) => b.likes - a.likes); break;
      case "views": list.sort((a, b) => b.views - a.views); break;
      case "priceLow": list.sort((a, b) => a.price - b.price); break;
      case "priceHigh": list.sort((a, b) => b.price - a.price); break;
      default: break;
    }
    return list;
  }, [activeCategory, sortBy, searchQuery, priceFilter]);

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>

      {/* ── Top Bar ── */}
      <div style={{
        background: "rgba(10,10,15,0.95)", borderBottom: "1px solid rgba(124,58,237,0.2)",
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", gap: 20,
        padding: "0 32px", height: 64,
      }}>
        <span
          onClick={() => navigate("/")}
          style={{
            fontSize: "20px", fontWeight: 900, cursor: "pointer",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em", flexShrink: 0,
          }}
        >
          EVK3D
        </span>

        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search artworks, artists, tags..."
          style={{
            flex: 1, maxWidth: 440, height: 38, borderRadius: "10px",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#f1f5f9", padding: "0 14px", fontSize: "13px",
            outline: "none",
          }}
        />

        <div style={{ display: "flex", gap: 10, marginLeft: "auto", alignItems: "center" }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#94a3b8", padding: "7px 12px", borderRadius: "10px",
              fontSize: "13px", cursor: "pointer", outline: "none",
            }}
          >
            <option value="featured">Featured First</option>
            <option value="popular">Most Liked</option>
            <option value="views">Most Viewed</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
          </select>

          {user ? (
            <button
              onClick={() => navigate("/home")}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                color: "#fff", border: "none", borderRadius: "10px",
                padding: "8px 18px", fontWeight: 600, fontSize: "13px", cursor: "pointer",
              }}
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                color: "#fff", border: "none", borderRadius: "10px",
                padding: "8px 18px", fontWeight: 600, fontSize: "13px", cursor: "pointer",
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>

        {/* ── Sidebar Filters ── */}
        <aside style={{
          width: 220, flexShrink: 0, padding: "28px 20px",
          borderRight: "1px solid rgba(124,58,237,0.15)",
          position: "sticky", top: 64, height: "calc(100vh - 64px)", overflowY: "auto",
        }}>
          <div style={{ color: "#64748b", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            Categories
          </div>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "9px 12px", borderRadius: "10px",
                background: activeCategory === cat.name ? "rgba(124,58,237,0.2)" : "transparent",
                border: activeCategory === cat.name ? "1px solid rgba(124,58,237,0.4)" : "1px solid transparent",
                color: activeCategory === cat.name ? "#a78bfa" : "#64748b",
                cursor: "pointer", fontSize: "13px", fontWeight: activeCategory === cat.name ? 600 : 400,
                marginBottom: 4, transition: "all 0.15s", textAlign: "left",
              }}
            >
              <span>{cat.icon} {cat.name}</span>
              <span style={{ fontSize: "11px", opacity: 0.7 }}>{cat.count}</span>
            </button>
          ))}

          <div style={{
            color: "#64748b", fontSize: "10px", letterSpacing: "0.12em",
            textTransform: "uppercase", marginBottom: 12, marginTop: 24,
          }}>
            Price
          </div>
          {[
            { val: "all", label: "All" },
            { val: "free", label: "Free" },
            { val: "paid", label: "Paid" },
            { val: "under50", label: "Under $50" },
          ].map(({ val, label }) => (
            <button
              key={val}
              onClick={() => setPriceFilter(val)}
              style={{
                display: "block", width: "100%", padding: "8px 12px", borderRadius: "10px",
                background: priceFilter === val ? "rgba(124,58,237,0.2)" : "transparent",
                border: priceFilter === val ? "1px solid rgba(124,58,237,0.4)" : "1px solid transparent",
                color: priceFilter === val ? "#a78bfa" : "#64748b",
                cursor: "pointer", fontSize: "13px", marginBottom: 4,
                fontWeight: priceFilter === val ? 600 : 400, textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </aside>

        {/* ── Main Grid ── */}
        <main style={{ flex: 1, padding: "28px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h1 style={{ color: "#f1f5f9", fontSize: "22px", fontWeight: 700, margin: 0 }}>
              {activeCategory === "All" ? "All Artworks" : activeCategory}{" "}
              <span style={{ color: "#475569", fontSize: "15px", fontWeight: 400 }}>
                ({filtered.length} results)
              </span>
            </h1>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#475569" }}>
              <div style={{ fontSize: "48px", marginBottom: 16 }}>🔮</div>
              <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: 8, color: "#64748b" }}>No artworks found</div>
              <div style={{ fontSize: "14px" }}>Try adjusting your filters or search</div>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 20,
            }}>
              {filtered.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} onClick={setSelectedArtwork} />
              ))}
            </div>
          )}
        </main>
      </div>

      <DetailModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
    </div>
  );
}
