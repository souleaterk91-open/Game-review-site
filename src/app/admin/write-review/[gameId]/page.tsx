"use client";

import { useTransition, useState, useEffect } from "react";
import { createPostReview } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { PrismaClient } from "@prisma/client";

// Note: In an ideal world we fetch the associated Game data serverside and pass it as a prop.
// For the sake of this component, we'll keep it focused on the form submission.

export default function WriteReviewPage({ params }: { params: { gameId: string } }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await createPostReview(params.gameId, formData);
            if (result.success) {
                router.push("/admin");
                router.refresh();
            } else {
                setError(result.error || "Failed to submit review");
            }
        });
    }

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ marginBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "16px" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Write Post-Game Review</h1>
                <p style={{ color: "rgba(255,255,255,0.6)" }}>Provide ratings and commentary for the 4 core pillars, plus an overall summary.</p>
            </div>

            {error && (
                <div style={{ padding: "16px", backgroundColor: "rgba(255,0,0,0.1)", color: "#ff6b6b", borderRadius: "8px", marginBottom: "24px", border: "1px solid rgba(255,0,0,0.2)" }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

                {/* Story Section */}
                <div className="glass-panel" style={{ padding: "24px", borderRadius: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--primary)" }}>Story & Narrative</h2>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <label style={{ fontWeight: "bold" }}>Score (1-5):</label>
                            <input name="storyScore" type="number" min="1" max="5" required className="input-field" style={{ width: "60px", padding: "8px", borderRadius: "4px", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.2)", color: "white", textAlign: "center" }} />
                        </div>
                    </div>
                    <textarea name="storyComment" required rows={3} className="input-field" placeholder="Thoughts on the plot, characters, and pacing..." style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white", resize: "vertical" }} />
                </div>

                {/* Graphics Section */}
                <div className="glass-panel" style={{ padding: "24px", borderRadius: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--primary)" }}>Graphics & Art Direction</h2>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <label style={{ fontWeight: "bold" }}>Score (1-5):</label>
                            <input name="graphicsScore" type="number" min="1" max="5" required className="input-field" style={{ width: "60px", padding: "8px", borderRadius: "4px", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.2)", color: "white", textAlign: "center" }} />
                        </div>
                    </div>
                    <textarea name="graphicsComment" required rows={3} className="input-field" placeholder="Thoughts on visual fidelity, art style, and environments..." style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white", resize: "vertical" }} />
                </div>

                {/* Gameplay Section */}
                <div className="glass-panel" style={{ padding: "24px", borderRadius: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--primary)" }}>Gameplay & Mechanics</h2>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <label style={{ fontWeight: "bold" }}>Score (1-5):</label>
                            <input name="gameplayScore" type="number" min="1" max="5" required className="input-field" style={{ width: "60px", padding: "8px", borderRadius: "4px", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.2)", color: "white", textAlign: "center" }} />
                        </div>
                    </div>
                    <textarea name="gameplayComment" required rows={3} className="input-field" placeholder="Thoughts on combat, loops, controls, and fun factor..." style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white", resize: "vertical" }} />
                </div>

                {/* Quality Section */}
                <div className="glass-panel" style={{ padding: "24px", borderRadius: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--primary)" }}>Quality & Polish</h2>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <label style={{ fontWeight: "bold" }}>Score (1-5):</label>
                            <input name="qualityScore" type="number" min="1" max="5" required className="input-field" style={{ width: "60px", padding: "8px", borderRadius: "4px", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.2)", color: "white", textAlign: "center" }} />
                        </div>
                    </div>
                    <textarea name="qualityComment" required rows={3} className="input-field" placeholder="Bugs, UI/UX, optimization, and overall finish..." style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white", resize: "vertical" }} />
                </div>

                {/* Overall Summary */}
                <div style={{ marginTop: "16px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "1.1rem" }}>Final Verdict (Overall Review) *</label>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: "12px" }}>This will be the main summary paragraph shown at the top of the review.</p>
                    <textarea name="overallReview" required rows={6} className="input-field" style={{ width: "100%", padding: "16px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white", resize: "vertical", fontSize: "1.05rem", lineHeight: "1.6" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }}>
                    <button type="submit" disabled={isPending} className="btn-primary" style={{ minWidth: "250px", padding: "16px", fontSize: "1.1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                        {isPending ? "Publishing Review..." : "Publish Post-Game Review"}
                    </button>
                </div>
            </form>
        </div>
    );
}
