"use client";

import { useState } from "react";

type Theme = "quantum" | "ethereal" | "dynamic" | "slate" | "forest" | "crimson" | "clean" | "sand" | "pearl";

export default function ThemePreview() {
    const [theme, setTheme] = useState<Theme>("quantum");

    const themes: Record<Theme, { name: string; bg: string; text: string; primary: string; secondary: string; card: string; border: string; glow: string; font: string }> = {
        // Dark Themes
        quantum: {
            name: "Quantum Noir", bg: "#05020a", text: "#ffffff", primary: "#00f2ff", secondary: "#0066ff",
            card: "rgba(10, 5, 25, 0.8)", border: "rgba(0, 242, 255, 0.2)", glow: "rgba(0, 242, 255, 0.15)", font: "'Orbitron', sans-serif"
        },
        ethereal: {
            name: "Ethereal Glass", bg: "#0f051a", text: "#ffffff", primary: "#9d4edd", secondary: "#ff006e",
            card: "rgba(255, 255, 255, 0.03)", border: "rgba(255, 255, 255, 0.1)", glow: "rgba(157, 78, 221, 0.1)", font: "'Outfit', sans-serif"
        },
        dynamic: {
            name: "Dynamic Immersion", bg: "#0a0a00", text: "#ffffff", primary: "#fcee0a", secondary: "#ff003c",
            card: "rgba(20, 20, 0, 0.9)", border: "rgba(252, 238, 10, 0.3)", glow: "rgba(252, 238, 10, 0.1)", font: "'Inter', sans-serif"
        },
        slate: {
            name: "Nordic Slate", bg: "#0f172a", text: "#ffffff", primary: "#38bdf8", secondary: "#c084fc",
            card: "rgba(30, 41, 59, 0.7)", border: "rgba(56, 189, 248, 0.2)", glow: "rgba(56, 189, 248, 0.1)", font: "'Inter', sans-serif"
        },
        forest: {
            name: "Deep Forest", bg: "#022c22", text: "#ffffff", primary: "#34d399", secondary: "#fbbf24",
            card: "rgba(6, 78, 59, 0.6)", border: "rgba(52, 211, 153, 0.2)", glow: "rgba(52, 211, 153, 0.1)", font: "'Outfit', sans-serif"
        },
        crimson: {
            name: "Crimson Velvet", bg: "#2a0a18", text: "#ffffff", primary: "#fb7185", secondary: "#fda4af",
            card: "rgba(76, 5, 25, 0.4)", border: "rgba(251, 113, 133, 0.2)", glow: "rgba(251, 113, 133, 0.1)", font: "'Outfit', sans-serif"
        },
        // Light Themes
        clean: {
            name: "Clean Minimal (White)", bg: "#ffffff", text: "#0f172a", primary: "#6366f1", secondary: "#ec4899",
            card: "rgba(248, 250, 252, 0.8)", border: "rgba(99, 102, 241, 0.2)", glow: "rgba(99, 102, 241, 0.1)", font: "'Inter', sans-serif"
        },
        sand: {
            name: "Soft Sand (Warm Light)", bg: "#fafaf9", text: "#292524", primary: "#d97706", secondary: "#ea580c",
            card: "rgba(255, 255, 255, 0.9)", border: "rgba(217, 119, 6, 0.2)", glow: "rgba(217, 119, 6, 0.1)", font: "'Outfit', sans-serif"
        },
        pearl: {
            name: "Pearl Blue (Cool Light)", bg: "#f0fdfa", text: "#115e59", primary: "#0d9488", secondary: "#2dd4bf",
            card: "rgba(255, 255, 255, 0.7)", border: "rgba(13, 148, 136, 0.2)", glow: "rgba(13, 148, 136, 0.1)", font: "'Inter', sans-serif"
        }
    };

    const current = themes[theme];

    return (
        <div style={{
            backgroundColor: current.bg,
            color: current.text,
            minHeight: "100vh",
            padding: "40px",
            fontFamily: current.font,
            transition: "all 0.5s ease"
        }}>
            {/* Theme Switcher Header */}
            <div className="glass-panel" style={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "15px",
                marginBottom: "60px",
                borderColor: current.border,
                backgroundColor: current.card
            }}>
                {(Object.keys(themes) as Theme[]).map((tKey) => (
                    <button key={tKey} onClick={() => setTheme(tKey)} style={{
                        padding: "10px 20px",
                        borderRadius: "30px",
                        border: theme === tKey ? `2px solid ${themes[tKey].primary}` : `1px solid ${current.border}`,
                        backgroundColor: theme === tKey ? themes[tKey].glow : "transparent",
                        color: current.text,
                        cursor: "pointer",
                        transition: "all 0.2s"
                    }}>{themes[tKey].name}</button>
                ))}
            </div>

            <div className="container" style={{ maxWidth: "1000px" }}>
                <h1 style={{ fontSize: "3.5rem", marginBottom: "20px", color: current.primary, transition: "color 0.5s" }}>
                    {current.name} <span style={{ opacity: 0.5 }}>Concept</span>
                </h1>
                <p style={{ fontSize: "1.2rem", color: current.text, opacity: 0.8, marginBottom: "40px" }}>
                    This is a live preview of the UI components under the {current.name} theme.
                    Observe the glassmorphism, border glows, and typography changes.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
                    {/* Card Example */}
                    <div className="glass-panel" style={{
                        padding: "30px",
                        backgroundColor: current.card,
                        borderColor: current.border,
                        boxShadow: `0 8px 32px ${current.glow}`
                    }}>
                        <h3 style={{ color: current.primary, transition: "color 0.5s" }}>Premium Component</h3>
                        <p style={{ opacity: 0.8 }}>This panel demonstrates the translucency and shadow glow effects.</p>
                        <button style={{
                            marginTop: "20px",
                            padding: "12px 24px",
                            background: `linear-gradient(135deg, ${current.primary}, ${current.secondary})`,
                            border: "none",
                            borderRadius: "8px",
                            color: "#fff",
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "background 0.5s"
                        }}>Action Button</button>
                    </div>

                    {/* List Example */}
                    <div className="glass-panel" style={{
                        padding: "30px",
                        backgroundColor: current.card,
                        borderColor: current.border
                    }}>
                        <h3 style={{ color: current.secondary, transition: "color 0.5s" }}>Evaluation</h3>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: current.primary, transition: "color 0.5s" }}>★</span> Visual Fidelity: High
                            </li>
                            <li style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: current.primary, transition: "color 0.5s" }}>★</span> Narrative Depth: Deep
                            </li>
                            <li style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: current.primary, transition: "color 0.5s" }}>★</span> Technical Polish: Ultra
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Hero Banner Example */}
                <div style={{
                    marginTop: "60px",
                    height: "300px",
                    borderRadius: "20px",
                    overflow: "hidden",
                    position: "relative",
                    border: `1px solid ${current.border}`
                }}>
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(to top, ${current.bg}, transparent)`,
                        zIndex: 1
                    }} />
                    <img
                        src={`https://placehold.co/1200x600/${current.bg.replace('#', '')}/${current.primary.replace('#', '')}/?text=Cinematic+Hero+Preview`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", bottom: "30px", left: "30px", zIndex: 2 }}>
                        <h2 style={{ fontSize: "2.5rem", margin: 0 }}>The Future of <span style={{ color: current.primary, transition: "color 0.5s" }}>Gaming</span></h2>
                    </div>
                </div>
            </div>

            {/* Styles for the interactive preview */}
            <style jsx>{`
        .glass-panel {
          border-radius: 20px;
          border-width: 1px;
          border-style: solid;
          backdrop-filter: blur(20px);
          transition: all 0.5s ease;
        }
        button:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
      `}</style>
        </div>
    );
}
