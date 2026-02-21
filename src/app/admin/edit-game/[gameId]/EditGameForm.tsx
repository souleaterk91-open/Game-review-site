"use client";

import { useState, useTransition } from "react";
import { updateGame } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Game } from "@prisma/client";

export default function EditGameForm({ game }: { game: Game }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await updateGame(game.id, formData);

            if (result.success) {
                router.push("/admin");
                router.refresh();
            } else {
                setError(result.error || "Something went wrong.");
            }
        });
    }

    // Safely format the date to YYYY-MM-DD for the HTML date input
    const formattedDate = new Date(game.releaseDate).toISOString().split('T')[0];

    // Join arrays back to comma-separated strings
    const recommendedForStr = game.recommendedFor.join(", ");
    const notRecommendedForStr = game.notRecommendedFor.join(", ");

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {error && (
                <div style={{ padding: "16px", backgroundColor: "rgba(255,0,0,0.1)", color: "#ff6b6b", borderRadius: "8px", border: "1px solid rgba(255,0,0,0.2)" }}>
                    {error}
                </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Game Title *</label>
                    <input name="title" defaultValue={game.title} required type="text" className="input-field" placeholder="e.g. Elden Ring" style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Developer / Company *</label>
                    <input name="company" defaultValue={game.company} required type="text" className="input-field" placeholder="e.g. FromSoftware" style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Genre *</label>
                    <input name="genre" defaultValue={game.genre} required type="text" className="input-field" placeholder="e.g. Action RPG" style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Release Date *</label>
                    <input name="releaseDate" defaultValue={formattedDate} required type="date" className="input-field" style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                </div>
            </div>

            <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Cover Image URL *</label>
                <input name="coverImage" defaultValue={game.coverImage} required type="url" className="input-field" placeholder="https://..." style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>Provide an exact link to the image file.</p>
            </div>

            <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Storyline (Pre-Game) *</label>
                <textarea name="storyline" defaultValue={game.storyline} required rows={6} className="input-field" placeholder="Brief premise of the game..." style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white", resize: "vertical" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Recommended For (Comma separated)</label>
                    <input name="recommendedFor" defaultValue={recommendedForStr} type="text" className="input-field" placeholder="Fans of Dark Souls, Explorers..." style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Not Recommended For (Comma separated)</label>
                    <input name="notRecommendedFor" defaultValue={notRecommendedForStr} type="text" className="input-field" placeholder="Easily frustrated, Casual players..." style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }}>
                <button type="submit" disabled={isPending} className="btn-primary" style={{ minWidth: "200px", padding: "16px", fontSize: "1.1rem" }}>
                    {isPending ? "Saving Edits..." : "Save Game Info"}
                </button>
            </div>
        </form>
    );
}
