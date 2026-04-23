import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../appStore";
import { artworks, stats, categories } from "../../data/artworks";
import ArtworkCanvas3D from "../../components/3d/ArtworkCanvas3D";

/* ─── Global styles ─────────────────────────────────────── */
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; font-family: 'Inter', system-ui, sans-serif; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0a0a0f; }
  ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 3px; }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.3); }
    50% { box-shadow: 0 0 50px rgba(124,58,237,0.7), 0 0 80px rgba(6,182,212,0.3); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .hero-title { animation: fadeInUp 0.8s ease 0.2s both; }
  .hero-sub { animation: fadeInUp 0.8s ease 0.4s both; }
  .hero-cta { animation: fadeInUp 0.8s ease 0.6s both; }
  .glow-btn {
    animation: pulse-glow 3s ease-in-out infinite;
    transition: transform 0.2s ease, filter 0.2s ease;
  }
  .glow-btn:hover { transform: scale(1.04); filter: brightness(1.15); }
  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 70px rgba(124,58,237,0.35);
    border-color: rgba(124,58,237,0.65) !important;
  }
`;

/* ─── Hero 3D Scene ─────────────────────────────────────── */
function FloatingShape({ position, geometry, color, speed }) {
  const ref = useRef();
  const baseY = position[1];
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    if (!ref.current) return;
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.y = t * 0.65;
    ref.current.position.y = baseY + Math.sin(t * 0.6) * 0.4;
  });

  const renderGeo = () => {
    switch (geometry) {
      case "torusKnot": return <torusKnotGeometry args={[0.5, 0.15, 128, 16]} />;
      case "icosahedron": return <icosahedronGeometry args={[0.75, 1]} />;
      case "octahedron": return <octahedronGeometry args={[0.75, 0]} />;
      case "torus": return <torusGeometry args={[0.52, 0.22, 16, 60]} />;
      case "dodecahedron": return <dodecahedronGeometry args={[0.65, 0]} />;
      default: return <icosahedronGeometry args={[0.75, 0]} />;
    }
  };

  return (
    <mesh ref={ref} position={position}>
      {renderGeo()}
      <meshStandardMaterial
        color={color} emissive={color} emissiveIntensity={0.3}
        metalness={0.9} roughness={0.1}
      />
    </mesh>
  );
}

function HeroScene() {
  const shapes = [
    { pos: [-4, 0.5, 0], geo: "torusKnot", color: "#7c3aed", spd: 0.9 },
    { pos: [4, -0.5, -1], geo: "icosahedron", color: "#06b6d4", spd: 1.1 },
    { pos: [0.5, 2, -2.5], geo: "octahedron", color: "#f59e0b", spd: 0.75 },
    { pos: [-2, -1.8, 0.5], geo: "torus", color: "#ec4899", spd: 1.25 },
    { pos: [2.5, 2.2, -0.5], geo: "dodecahedron", color: "#10b981", spd: 0.85 },
    { pos: [-3, 2.8, -1.5], geo: "icosahedron", color: "#f97316", spd: 1.0 },
    { pos: [1.2, -2.5, 0.8], geo: "torusKnot", color: "#8b5cf6", spd: 0.7 },
  ];
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 8, 4]} intensity={4} color="#7c3aed" />
      <pointLight position={[-10, -4, -4]} intensity={2.5} color="#06b6d4" />
      <pointLight position={[0, 0, 8]} intensity={1.5} color="#f59e0b" />
      {shapes.map((s, i) => (
        <FloatingShape key={i} position={s.pos} geometry={s.geo} color={s.color} speed={s.spd} />
      ))}
      <OrbitControls
        enableZoom={false} enablePan={false}
        autoRotate autoRotateSpeed={0.35}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.35}
      />
    </>
  );
}

/* ─── Artwork Card (for featured grid) ─────────────────── */
function ArtworkCard({ artwork, onClick }) {
  const [liked, setLiked] = useState(false);
  return (
    <div
      className="card-hover"
      onClick={() => onClick(artwork)}
      style={{
        background: "linear-gradient(145deg,#1a1a2e 0%,#13131f 100%)",
        borderRadius: 18, overflow: "hidden", cursor: "pointer",
        border: "1px solid rgba(124,58,237,0.2)", position: "relative",
      }}
    >
      {artwork.featured && (
        <div style={{
          position: "absolute", top: 12, left: 12, zIndex: 3,
          background: "linear-gradient(135deg,#f59e0b,#ef4444)",
          color: "#fff", fontSize: 9, fontWeight: 800,
          padding: "3px 10px", borderRadius: 20, letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>✦ Featured</div>
      )}
      <div style={{ background: "radial-gradient(ellipse at 50% 30%,#0f0f20,#060610)", height: 230 }}>
        <ArtworkCanvas3D
          geometry={artwork.geometry} color={artwork.color}
          emissive={artwork.emissive} metalness={artwork.metalness}
          roughness={artwork.roughness} height={230}
        />
      </div>
      <div style={{ padding: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15 }}>{artwork.title}</div>
            <div style={{ color: "#64748b", fontSize: 12, marginTop: 3 }}>by {artwork.artist}</div>
          </div>
          <div style={{
            background: artwork.forSale ? "linear-gradient(135deg,#7c3aed,#06b6d4)" : "rgba(16,185,129,0.2)",
            color: "#fff", fontWeight: 800, fontSize: 13,
            padding: "5px 13px", borderRadius: 24,
          }}>
            {artwork.forSale ? `$${artwork.price}` : "Free"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: liked ? "#ec4899" : "#475569", fontSize: 13,
              display: "flex", alignItems: "center", gap: 4, padding: 0,
            }}
          >
            {liked ? "♥" : "♡"} {artwork.likes + (liked ? 1 : 0)}
          </button>
          <span style={{ color: "#475569", fontSize: 13 }}>👁 {(artwork.views / 1000).toFixed(1)}k</span>
          <span style={{ color: "#475569", fontSize: 13 }}>⬇ {artwork.downloads}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Artwork Detail Modal ──────────────────────────────── */
function ArtworkModal({ artwork, onClose }) {
  const [liked, setLiked] = useState(false);
  const [purchased, setPurchased] = useState(false);
  if (!artwork) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "linear-gradient(145deg,#1a1a2e,#0d1025)",
        borderRadius: 24, border: "1px solid rgba(124,58,237,0.45)",
        maxWidth: 880, width: "100%", overflow: "hidden",
        display: "grid", gridTemplateColumns: "1fr 1fr", maxHeight: "90vh",
      }}>
        <div style={{ background: "#05050e", minHeight: 460, display: "flex", alignItems: "center" }}>
          <ArtworkCanvas3D
            geometry={artwork.geometry} color={artwork.color} emissive={artwork.emissive}
            metalness={artwork.metalness} roughness={artwork.roughness} height={460}
          />
        </div>
        <div style={{ padding: "36px", overflowY: "auto" }}>
          <button onClick={onClose} style={{ float: "right", background: "none", border: "none", color: "#475569", fontSize: 22, cursor: "pointer" }}>✕</button>
          <span style={{
            fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#7c3aed", background: "rgba(124,58,237,0.15)", padding: "4px 12px", borderRadius: 20,
          }}>{artwork.category}</span>
          <h2 style={{ color: "#f1f5f9", fontSize: 26, fontWeight: 900, margin: "14px 0 4px", lineHeight: 1.2 }}>{artwork.title}</h2>
          <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 20 }}>
            by <span style={{ color: "#a78bfa", fontWeight: 600 }}>{artwork.artist}</span>
          </p>
          <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>{artwork.description}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[
              ["Likes", artwork.likes.toLocaleString()],
              ["Views", artwork.views.toLocaleString()],
              ["Downloads", artwork.downloads.toLocaleString()],
              ["Format", "GLTF / FBX / OBJ"],
            ].map(([label, val]) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 16px" }}>
                <div style={{ color: "#475569", fontSize: 10, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                <div style={{ color: "#f1f5f9", fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {purchased ? (
              <div style={{
                flex: 1, padding: 14, borderRadius: 12, textAlign: "center",
                background: "rgba(16,185,129,0.15)", color: "#34d399", fontWeight: 700,
              }}>✓ {artwork.forSale ? "Purchased!" : "Downloaded!"}</div>
            ) : (
              <button onClick={() => setPurchased(true)} className="glow-btn" style={{
                flex: 1, padding: 14, borderRadius: 12, border: "none",
                background: artwork.forSale ? "linear-gradient(135deg,#7c3aed,#06b6d4)" : "linear-gradient(135deg,#10b981,#059669)",
                color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer",
              }}>
                {artwork.forSale ? `Buy Now — $${artwork.price}` : "Download Free"}
              </button>
            )}
            <button onClick={() => setLiked(!liked)} style={{
              padding: "14px 18px", borderRadius: 12,
              border: "1px solid rgba(124,58,237,0.3)",
              background: liked ? "rgba(236,72,153,0.15)" : "transparent",
              color: liked ? "#ec4899" : "#64748b", fontSize: 18, cursor: "pointer",
            }}>{liked ? "♥" : "♡"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Testimonial Card ──────────────────────────────────── */
function TestimonialCard({ quote, name, role, avatar }) {
  return (
    <div style={{
      background: "linear-gradient(145deg,#1a1a2e,#13131f)",
      border: "1px solid rgba(124,58,237,0.15)",
      borderRadius: 18, padding: "28px",
    }}>
      <div style={{ color: "#7c3aed", fontSize: 32, marginBottom: 14, lineHeight: 1 }}>"</div>
      <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>{quote}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 800, fontSize: 15,
        }}>{avatar}</div>
        <div>
          <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 14 }}>{name}</div>
          <div style={{ color: "#64748b", fontSize: 12 }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Landing Page ─────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const featured = artworks.filter((a) => a.featured);

  const testimonials = [
    {
      quote: "EVK3D completely changed how I sell my art. I uploaded my first model and had 50 downloads in 24 hours. The interactive 3D viewer blows every other platform out of the water.",
      name: "Alex Rivera", role: "3D Sculptor · 2,341 sales", avatar: "AR",
    },
    {
      quote: "As a game developer, finding quality 3D assets used to take hours. Now I just browse EVK3D, preview everything in real-time, and buy in seconds. It's a game changer.",
      name: "Priya Sharma", role: "Indie Game Developer", avatar: "PS",
    },
    {
      quote: "The quality of 3D art on this platform is unreal. I've found assets that would have taken me weeks to model myself. The community is incredibly talented.",
      name: "Lucas Park", role: "Motion Designer · Adobe", avatar: "LP",
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyle }} />

      {/* ══ NAVBAR ══════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(10,10,15,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(124,58,237,0.18)" : "none",
        transition: "all 0.35s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(20px, 5vw, 56px)", height: 72,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
            fontSize: 22, fontWeight: 900, cursor: "pointer", letterSpacing: "-0.04em",
            background: "linear-gradient(135deg,#7c3aed 30%,#06b6d4 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>EVK3D</span>
          <div style={{ display: "flex", gap: 24 }}>
            {[["Marketplace", "/marketplace"], ["3D Viewer", "/models"], ["Upload", "/asset"]].map(([l, h]) => (
              <span key={l} onClick={() => navigate(h)} style={{
                color: "#94a3b8", fontSize: 14, fontWeight: 500, cursor: "pointer",
                transition: "color 0.2s",
              }}
                onMouseEnter={(e) => e.target.style.color = "#f1f5f9"}
                onMouseLeave={(e) => e.target.style.color = "#94a3b8"}
              >{l}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {user ? (
            <>
              <span style={{ color: "#a78bfa", fontSize: 14, fontWeight: 600 }}>Hi, {user.name} 👋</span>
              <button onClick={() => navigate("/home")} className="glow-btn" style={{
                background: "linear-gradient(135deg,#7c3aed,#06b6d4)", color: "#fff",
                border: "none", borderRadius: 10, padding: "9px 22px",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}>Dashboard →</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} style={{
                background: "transparent", color: "#c4b5fd",
                border: "1px solid rgba(124,58,237,0.4)", borderRadius: 10,
                padding: "9px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer",
                transition: "background 0.2s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(124,58,237,0.12)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >Log In</button>
              <button onClick={() => navigate("/register")} className="glow-btn" style={{
                background: "linear-gradient(135deg,#7c3aed,#06b6d4)", color: "#fff",
                border: "none", borderRadius: 10, padding: "9px 22px",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}>Get Started Free</button>
            </>
          )}
        </div>
      </nav>

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden" }}>
        {/* R3F Background */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Canvas camera={{ position: [0, 0, 7.5], fov: 58 }} style={{ width: "100%", height: "100%" }}>
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Gradient overlay for readability */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(10,10,15,0.35) 0%, rgba(10,10,15,0.65) 100%)",
          pointerEvents: "none",
        }} />

        {/* Hero content */}
        <div style={{
          position: "relative", zIndex: 10, height: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 clamp(20px, 6vw, 80px)",
        }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28,
            background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.35)",
            borderRadius: 30, padding: "7px 18px",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7c3aed", display: "inline-block" }} />
            <span style={{ color: "#a78bfa", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              The Future of 3D Art Commerce
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-title" style={{
            fontSize: "clamp(44px,8vw,96px)", fontWeight: 900, lineHeight: 1.02,
            letterSpacing: "-0.04em", marginBottom: 26, maxWidth: 980,
            color: "#f8fafc",
          }}>
            Discover & Collect{" "}
            <span style={{
              background: "linear-gradient(135deg,#7c3aed 0%,#06b6d4 45%,#f59e0b 100%)",
              backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}>
              Extraordinary
            </span>
            <br />3D Artworks
          </h1>

          {/* Subheadline */}
          <p className="hero-sub" style={{
            color: "#94a3b8", fontSize: "clamp(16px,2.2vw,21px)",
            maxWidth: 620, lineHeight: 1.7, marginBottom: 44,
          }}>
            The world's most interactive 3D art marketplace.
            Every piece is a live, explorable 3D experience — not just an image.
            Buy, sell, and showcase your digital sculptures.
          </p>

          {/* CTA buttons */}
          <div className="hero-cta" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => navigate("/marketplace")} className="glow-btn" style={{
              padding: "17px 44px", fontSize: 16, fontWeight: 800,
              background: "linear-gradient(135deg,#7c3aed,#06b6d4)", color: "#fff",
              border: "none", borderRadius: 14, cursor: "pointer",
            }}>
              Explore Marketplace ✦
            </button>
            <button onClick={() => navigate("/register")} style={{
              padding: "17px 44px", fontSize: 16, fontWeight: 700,
              background: "rgba(255,255,255,0.06)", color: "#f1f5f9",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14,
              cursor: "pointer", backdropFilter: "blur(8px)",
              transition: "background 0.2s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.11)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
            >
              Start Selling Free →
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ marginTop: 52, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            {["No setup fee", "90% revenue share", "Real-time 3D previews", "Instant payouts"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: 13 }}>
                <span style={{ color: "#10b981", fontSize: 15 }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          animation: "float 2.5s ease-in-out infinite",
        }}>
          <span style={{ color: "#475569", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>scroll</span>
          <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
            <rect x="1" y="1" width="16" height="24" rx="8" stroke="#475569" strokeWidth="1.5" />
            <rect x="7.5" y="5" width="3" height="6" rx="1.5" fill="#7c3aed" />
          </svg>
        </div>
      </section>

      {/* ══ STATS BAR ═══════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(90deg,rgba(124,58,237,0.08),rgba(6,182,212,0.08))",
        borderTop: "1px solid rgba(124,58,237,0.18)",
        borderBottom: "1px solid rgba(124,58,237,0.18)",
        padding: "36px clamp(20px,5vw,56px)",
      }}>
        <div style={{
          maxWidth: 1140, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20,
        }}>
          {stats.map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "clamp(30px,4vw,46px)", fontWeight: 900, lineHeight: 1,
                background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{value}</div>
              <div style={{ color: "#64748b", fontSize: 13, marginTop: 6, letterSpacing: "0.04em" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURED ARTWORKS ═══════════════════════════════ */}
      <section style={{ padding: "88px clamp(20px,5vw,56px)", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{
            display: "inline-block", color: "#7c3aed", fontSize: 11, fontWeight: 800,
            letterSpacing: "0.15em", textTransform: "uppercase",
            background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)",
            padding: "5px 16px", borderRadius: 30, marginBottom: 16,
          }}>✦ Handpicked by Curators</div>
          <h2 style={{ color: "#f1f5f9", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15 }}>
            Featured Artworks
          </h2>
          <p style={{ color: "#64748b", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            Each piece is a living, breathing 3D artwork. Click any card to explore the full interactive viewer.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 24,
        }}>
          {featured.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} onClick={setSelectedArtwork} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 44 }}>
          <button onClick={() => navigate("/marketplace")} style={{
            background: "transparent", color: "#7c3aed",
            border: "1px solid rgba(124,58,237,0.4)", borderRadius: 12,
            padding: "13px 36px", fontWeight: 700, fontSize: 15,
            cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(124,58,237,0.12)";
              e.currentTarget.style.borderColor = "rgba(124,58,237,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
            }}
          >
            Browse All {artworks.length} Artworks →
          </button>
        </div>
      </section>

      {/* ══ WHY EVK3D ═══════════════════════════════════════ */}
      <section style={{
        padding: "80px clamp(20px,5vw,56px)",
        background: "linear-gradient(180deg,transparent,rgba(124,58,237,0.04),transparent)",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ color: "#f1f5f9", fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, margin: "0 0 14px" }}>
              Why artists choose EVK3D
            </h2>
            <p style={{ color: "#64748b", fontSize: 16, maxWidth: 460, margin: "0 auto" }}>
              Built specifically for 3D creators — not retrofitted from a 2D platform.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              {
                icon: "🔮", title: "Real-Time 3D Previews",
                desc: "Every artwork is interactive. Buyers orbit, zoom, and inspect your work from every angle before purchasing. No more static screenshots.",
                gradient: "#7c3aed",
              },
              {
                icon: "💰", title: "90% Revenue Share",
                desc: "Keep 90% of every sale. We only take 10% to keep the lights on. No hidden fees, no subscription required to sell.",
                gradient: "#f59e0b",
              },
              {
                icon: "⚡", title: "Instant Delivery",
                desc: "Buyers get instant digital downloads. Automatic format conversion to GLTF, OBJ, FBX, and STL so your work reaches more buyers.",
                gradient: "#06b6d4",
              },
              {
                icon: "🌍", title: "Global Reach",
                desc: "Your art is visible to 180+ countries. We handle payments in 40+ currencies, taxes, and compliance so you can focus on creating.",
                gradient: "#10b981",
              },
              {
                icon: "📊", title: "Creator Analytics",
                desc: "Track views, likes, downloads, and revenue in real-time. Know exactly which artworks resonate and when to drop new pieces.",
                gradient: "#ec4899",
              },
              {
                icon: "🛡️", title: "DRM Protection",
                desc: "Your work is watermarked and protected. Smart licensing means buyers get what they paid for, and you stay credited.",
                gradient: "#8b5cf6",
              },
            ].map(({ icon, title, desc, gradient }) => (
              <div key={title} className="card-hover" style={{
                background: "linear-gradient(145deg,#1a1a2e,#13131f)",
                border: "1px solid rgba(124,58,237,0.12)",
                borderRadius: 18, padding: "30px 26px",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, marginBottom: 18,
                  background: `${gradient}18`, border: `1px solid ${gradient}35`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24,
                }}>{icon}</div>
                <h3 style={{ color: "#f1f5f9", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CATEGORIES ══════════════════════════════════════ */}
      <section style={{ padding: "72px clamp(20px,5vw,56px)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
            <div>
              <h2 style={{ color: "#f1f5f9", fontSize: "clamp(24px,3vw,36px)", fontWeight: 900, margin: "0 0 8px" }}>
                Browse Categories
              </h2>
              <p style={{ color: "#64748b", fontSize: 14 }}>From abstract geometry to hyper-real environments</p>
            </div>
            <span onClick={() => navigate("/marketplace")} style={{
              color: "#7c3aed", fontSize: 14, fontWeight: 600, cursor: "pointer",
              borderBottom: "1px solid rgba(124,58,237,0.4)",
            }}>All categories →</span>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {categories.slice(1).map((cat) => (
              <button key={cat.name} onClick={() => navigate(`/marketplace?category=${cat.name}`)} style={{
                background: "rgba(124,58,237,0.06)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: 16, padding: "18px 28px", cursor: "pointer",
                minWidth: 140, textAlign: "center", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(124,58,237,0.18)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.55)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(124,58,237,0.06)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 34, marginBottom: 8 }}>{cat.icon}</div>
                <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14 }}>{cat.name}</div>
                <div style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>
                  {cat.count > 0 ? `${cat.count} models` : "Coming soon"}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════ */}
      <section style={{ padding: "80px clamp(20px,5vw,56px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ color: "#f1f5f9", fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, margin: "0 0 12px" }}>
              From Blender to Buyer in 3 Steps
            </h2>
            <p style={{ color: "#64748b", fontSize: 16, maxWidth: 440, margin: "0 auto" }}>
              The simplest path from 3D artist to paid creator.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            {/* Connecting line */}
            <div style={{
              position: "absolute", top: 52, left: "16.67%", right: "16.67%",
              height: 1, background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
              opacity: 0.3,
            }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
              {[
                {
                  step: "01", emoji: "🎨", title: "Create Your Art",
                  desc: "Design in Blender, Maya, ZBrush, Cinema 4D — any tool you love. Export as GLTF, OBJ, or FBX. We accept them all.",
                  color: "#7c3aed",
                },
                {
                  step: "02", emoji: "☁️", title: "Upload & List",
                  desc: "Upload your file. Our engine auto-generates an interactive 3D viewer. Set your price, write a description, publish.",
                  color: "#06b6d4",
                },
                {
                  step: "03", emoji: "💎", title: "Earn Globally",
                  desc: "Buyers from 180 countries discover your work. Sell licenses, offer free downloads, build a fanbase. Get paid instantly.",
                  color: "#f59e0b",
                },
              ].map(({ step, emoji, title, desc, color }) => (
                <div key={step} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 90, height: 90, borderRadius: "50%", margin: "0 auto 20px",
                    background: `radial-gradient(circle,${color}28,${color}08)`,
                    border: `2px solid ${color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 36, position: "relative",
                  }}>
                    {emoji}
                    <div style={{
                      position: "absolute", top: -8, right: -8,
                      width: 28, height: 28, borderRadius: "50%",
                      background: color, color: "#fff",
                      fontSize: 11, fontWeight: 900,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      letterSpacing: "-0.02em",
                    }}>{step}</div>
                  </div>
                  <h3 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{title}</h3>
                  <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button onClick={() => navigate("/register")} className="glow-btn" style={{
              padding: "15px 40px", fontSize: 15, fontWeight: 800,
              background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
              color: "#fff", border: "none", borderRadius: 12, cursor: "pointer",
            }}>
              Start for Free — No Credit Card
            </button>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════ */}
      <section style={{ padding: "72px clamp(20px,5vw,56px)", background: "rgba(124,58,237,0.03)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ color: "#f1f5f9", fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, margin: "0 0 10px" }}>
              Loved by creators worldwide
            </h2>
            <p style={{ color: "#64748b", fontSize: 15 }}>Don't take our word for it.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {testimonials.map((t) => <TestimonialCard key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══════════════════════════════════════ */}
      <section style={{ padding: "80px clamp(20px,5vw,56px)" }}>
        <div style={{
          maxWidth: 960, margin: "0 auto",
          background: "linear-gradient(135deg,rgba(124,58,237,0.18),rgba(6,182,212,0.18))",
          border: "1px solid rgba(124,58,237,0.28)",
          borderRadius: 26, padding: "68px 48px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          {/* Background blur circles */}
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 240, height: 240, borderRadius: "50%",
            background: "rgba(124,58,237,0.15)", filter: "blur(60px)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: -60, left: -60,
            width: 200, height: 200, borderRadius: "50%",
            background: "rgba(6,182,212,0.12)", filter: "blur(60px)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-block", marginBottom: 20,
              background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.35)",
              borderRadius: 30, padding: "5px 16px",
              color: "#f59e0b", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
            }}>🎉 LIMITED TIME · Free Pro for first 1,000 artists</div>

            <h2 style={{ color: "#f1f5f9", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15 }}>
              Ready to share your 3D art<br />with the world?
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 17, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
              Join 12,400+ artists already earning on EVK3D.
              Free to join · Keep 90% · Get paid instantly.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => navigate("/register")} className="glow-btn" style={{
                padding: "18px 52px", fontSize: 17, fontWeight: 800,
                background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                color: "#fff", border: "none", borderRadius: 14, cursor: "pointer",
              }}>
                Create Free Account ✦
              </button>
              <button onClick={() => navigate("/marketplace")} style={{
                padding: "18px 36px", fontSize: 15, fontWeight: 700,
                background: "rgba(255,255,255,0.07)", color: "#f1f5f9",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14,
                cursor: "pointer", backdropFilter: "blur(8px)",
              }}>
                Browse First →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer style={{
        borderTop: "1px solid rgba(124,58,237,0.12)",
        padding: "44px clamp(20px,5vw,56px)",
      }}>
        <div style={{
          maxWidth: 1140, margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", flexWrap: "wrap", gap: 32,
        }}>
          <div>
            <span style={{
              fontSize: 20, fontWeight: 900, letterSpacing: "-0.04em",
              background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>EVK3D</span>
            <p style={{ color: "#475569", fontSize: 13, marginTop: 8, maxWidth: 240, lineHeight: 1.7 }}>
              The world's most interactive marketplace for 3D art.
              Built with React Three Fiber.
            </p>
          </div>
          {[
            { title: "Platform", links: ["Marketplace", "Upload Art", "3D Viewer", "Pricing"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Support", links: ["Help Center", "API Docs", "Community", "Contact"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{ color: "#94a3b8", fontSize: 13, fontWeight: 700, marginBottom: 14, letterSpacing: "0.06em" }}>{title}</div>
              {links.map((l) => (
                <div key={l} style={{ color: "#475569", fontSize: 13, marginBottom: 8, cursor: "pointer" }}
                  onMouseEnter={(e) => e.target.style.color = "#94a3b8"}
                  onMouseLeave={(e) => e.target.style.color = "#475569"}
                >{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          maxWidth: 1140, margin: "32px auto 0",
          paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "space-between",
          color: "#334155", fontSize: 12, flexWrap: "wrap", gap: 8,
        }}>
          <span>© 2024 EVK3D. All rights reserved.</span>
          <span>Made with ♥ and React Three Fiber · Three.js · Material UI</span>
        </div>
      </footer>

      {/* ══ ARTWORK MODAL ══════════════════════════════════ */}
      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
    </>
  );
}
