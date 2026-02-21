"use client";

import { useTransition, useState } from "react";
import { updatePostReview } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { PostReview } from "@prisma/client";

export default function EditReviewForm({ review }: { review: PostReview }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await updatePostReview(review.id, formData);
            if (result.success) {
                // Go back to the admin dashboard
                router.push("/admin");
                router.refresh(); // Refresh the data
            } else {
                setError(result.error || "Failed to edit review");
            }
        });
    }

    // Helper component to render each section consistently
    const renderCategory = (
        label: string,
        scoreField: string,
        commentField: string,
        defaultScore: number,
        defaultComment: string
    ) => (
        <div className="glass-panel" style={{ padding: "24px", borderRadius: "12px", marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--primary)" }}>{label}</h2>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <label style={{ fontWeight: "bold" }}>Score (1-5):</label>
                    <input
                        name={scoreField}
                        defaultValue={defaultScore}
                        type="number"
                        min="1"
                        max="5"
                        required
                        className="input-field"
                        style={{ width: "60px", padding: "8px", borderRadius: "4px", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.2)", color: "white", textAlign: "center" }}
                    />
                </div>
            </div>
            <textarea
                name={commentField}
                defaultValue={defaultComment}
                required
                rows={3}
                className="input-field"
                style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white", resize: "vertical" }}
            />
        </div>
    );

    return (
        <>
            {error && (
                <div style={{ padding: "16px", backgroundColor: "rgba(255,0,0,0.1)", color: "#ff6b6b", borderRadius: "8px", marginBottom: "24px", border: "1px solid rgba(255,0,0,0.2)" }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>

                {renderCategory("Story & Narrative", "storyScore", "storyComment", review.storyScore, review.storyComment)}
                {renderCategory("Graphics & Art Direction", "graphicsScore", "graphicsComment", review.graphicsScore, review.graphicsComment)}
                {renderCategory("Gameplay & Mechanics", "gameplayScore", "gameplayComment", review.gameplayScore, review.gameplayComment)}
                {renderCategory("Quality & Polish", "qualityScore", "qualityComment", review.qualityScore, review.qualityComment)}

                <div style={{ marginTop: "16px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "1.1rem" }}>Final Verdict (Overall Review) *</label>
                    <textarea
                        name="overallReview"
                        defaultValue={review.overallReview}
                        required
                        rows={6}
                        className="input-field"
                        style={{ width: "100%", padding: "16px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "white", resize: "vertical", fontSize: "1.05rem", lineHeight: "1.6" }}
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }}>
                    <button type="submit" disabled={isPending} className="btn-primary" style={{ minWidth: "250px", padding: "16px", fontSize: "1.1rem" }}>
                        {isPending ? "Saving Changes..." : "Save Edits"}
                    </button>
                </div>
            </form>
        </>
    );
}
