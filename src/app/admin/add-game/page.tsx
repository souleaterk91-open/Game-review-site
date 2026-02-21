"use client";

import { useState } from "react";
import { createGame } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function AddGamePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await createGame(formData);

        if (result.success) {
            router.push("/admin");
            router.refresh();
        } else {
            setError(result.error || "Something went wrong.");
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "16px" }}>
                Add New Game
            </h1>

            {error && (
                <div style={{ padding: "16px", backgroundColor: "rgba(255,0,0,0.1)", color: "#ff6b6b", borderRadius: "8px", marginBottom: "24px", border: "1px solid rgba(255,0,0,0.2)" }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Game Title *</label>
                        <input name="title" required type="text" className="input-field" placeholder="e.g. Elden Ring" style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Developer / Company *</label>
                        <input name="company" required type="text" className="input-field" placeholder="e.g. FromSoftware" style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Genre *</label>
                        <input name="genre" required type="text" className="input-field" placeholder="e.g. Action RPG" style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Release Date *</label>
                        <input name="releaseDate" required type="date" className="input-field" style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                    </div>
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Cover Image URL *</label>
                    <input name="coverImage" required type="url" className="input-field" placeholder="https://..." style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                    <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>Provide an exact link to the image file (e.g. via IGDB or Supabase Storage).</p>
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Storyline (Pre-Game) *</label>
                    <textarea name="storyline" required rows={6} className="input-field" placeholder="Brief premise of the game..." style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white", resize: "vertical" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Recommended For (Comma separated)</label>
                        <input name="recommendedFor" type="text" className="input-field" placeholder="Fans of Dark Souls, Explorers..." style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Not Recommended For (Comma separated)</label>
                        <input name="notRecommendedFor" type="text" className="input-field" placeholder="Easily frustrated, Casual players..." style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "32px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }}>
                    <button type="submit" disabled={loading} className="btn-primary" style={{ minWidth: "200px", padding: "16px", fontSize: "1.1rem" }}>
                        {loading ? "Adding Game..." : "Save New Game"}
                    </button>
                </div>
            </form>
        </div>
    );
}
