import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
    const games = await prisma.game.findMany({
        orderBy: { releaseDate: "desc" },
        include: { postReview: true },
    });

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Dashboard Overview</h1>
                <Link href="/admin/add-game" className="btn-primary">
                    + Add New Game
                </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "24px" }}>
                {games.map((game) => (
                    <div key={game.id} className="glass-panel" style={{ padding: "16px", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "8px", overflow: "hidden" }}>
                            <Image
                                src={game.coverImage}
                                alt={game.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        <div>
                            <h3 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{game.title}</h3>
                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>{game.company}</p>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                                {game.postReview ? (
                                    <Link href={`/admin/edit-review/${game.id}`} style={{ color: "var(--primary)", fontSize: "0.85rem", textDecoration: "underline", fontWeight: "bold" }}>
                                        Edit Review
                                    </Link>
                                ) : (
                                    <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontStyle: "italic" }}>
                                        Pre-Game Only
                                    </span>
                                )}

                                <Link href={`/admin/edit-game/${game.id}`} style={{ color: "var(--text-muted)", fontSize: "0.85rem", textDecoration: "underline" }}>
                                    Edit Info
                                </Link>

                                <form action={async () => {
                                    "use server";
                                    const { deleteGame } = await import("@/lib/actions");
                                    await deleteGame(game.id);
                                }}>
                                    <button type="submit" style={{ background: "transparent", border: "none", color: "#ff6b6b", cursor: "pointer", fontSize: "0.85rem", textDecoration: "underline", padding: 0 }}>
                                        Delete
                                    </button>
                                </form>
                            </div>

                            {!game.postReview && (
                                <Link href={`/admin/write-review/${game.id}`} className="text-gradient" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                                    Write Review &rarr;
                                </Link>
                            )}
                        </div>
                    </div>
                ))}

                {games.length === 0 && (
                    <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "48px", color: "rgba(255,255,255,0.5)" }}>
                        <p>No games found in the database.</p>
                        <Link href="/admin/add-game" style={{ color: "var(--primary)", textDecoration: "underline", marginTop: "8px", display: "inline-block" }}>
                            Add your first game
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
