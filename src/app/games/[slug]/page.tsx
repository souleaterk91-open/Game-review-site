import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import "@/styles/components.css";

const prisma = new PrismaClient();

export default async function GameHubPage(props: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const slug = params.slug;
    const modeParam = searchParams.mode;
    const segment = modeParam === "post" ? "post" : "pre";

    // Fetch the game and its review from PostgreSQL
    const game = await prisma.game.findUnique({
        where: { slug },
        include: { postReview: true },
    });

    if (!game) {
        notFound();
    }

    return (
        <div className={`game-hub-page theme-default`}>
            {/* Hero Header */}
            <header className="game-hero">
                <div className="game-hero-img-container" style={{ position: 'absolute', inset: 0 }}>
                    <Image
                        src={game.coverImage}
                        alt={game.title}
                        fill
                        priority
                        unoptimized
                        style={{ objectFit: 'cover' }}
                        className="game-hero-img"
                    />
                </div>

                <div className="container game-hero-content">
                    <div className="game-meta-badges">
                        <span className="badge">{game.genre}</span>
                        <span className="badge">{game.company}</span>
                    </div>
                    <h1 className="game-title">{game.title}</h1>
                    <p className="game-release-date">Released: {new Date(game.releaseDate).toLocaleDateString()}</p>

                    {/* Main Toggle (Server-side links) */}
                    <div className="hub-toggle-wrapper">
                        <div className={`hub-toggle-container mode-${segment}`}>
                            <div className="hub-toggle-slider" />
                            <Link href={`?mode=pre`} scroll={false} style={{ zIndex: 2, flex: 1, textDecoration: 'none' }}>
                                <button className={`hub-toggle-btn ${segment === "pre" ? "active" : ""}`} style={{ width: '100%' }}>
                                    Pre-Game (Spoiler-Free)
                                </button>
                            </Link>
                            <Link href={`?mode=post`} scroll={false} style={{ zIndex: 2, flex: 1, textDecoration: 'none' }}>
                                <button className={`hub-toggle-btn ${segment === "post" ? "active" : ""}`} style={{ width: '100%' }}>
                                    Post-Game (Deep Dive)
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container game-content-main">
                {segment === "pre" ? (
                    <div className="fade-in">
                        <section className="glass-panel info-card">
                            <h2>General Storyline</h2>
                            <p>{game.storyline}</p>
                        </section>

                        <div className="recommendation-grid">
                            <section className="glass-panel rec-card pos">
                                <h3>Recommended For</h3>
                                <ul>
                                    {game.recommendedFor.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </section>
                            <section className="glass-panel rec-card neg">
                                <h3>Not Recommended For</h3>
                                <ul>
                                    {game.notRecommendedFor.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </section>
                        </div>
                    </div>
                ) : (
                    <div className="fade-in">
                        {game.postReview ? (
                            <>
                                <h2>Detailed Evaluation</h2>
                                <section className="rating-detailed-list">
                                    {[
                                        { label: "Story", score: game.postReview.storyScore, comment: game.postReview.storyComment },
                                        { label: "Graphics", score: game.postReview.graphicsScore, comment: game.postReview.graphicsComment },
                                        { label: "Gameplay", score: game.postReview.gameplayScore, comment: game.postReview.gameplayComment },
                                        { label: "Quality", score: game.postReview.qualityScore, comment: game.postReview.qualityComment }
                                    ].map((category, idx) => (
                                        <div key={idx} className="glass-panel rating-detailed-card">
                                            <div className="rating-card-header">
                                                <h3 className="rating-label">{category.label}</h3>
                                                <div className="rating-stars">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <span key={star} style={{ color: star <= category.score ? 'var(--primary)' : 'var(--bg-surface-elevated)' }}>★</span>
                                                    ))}
                                                    <span className="rating-value-small"> {category.score}/5</span>
                                                </div>
                                            </div>
                                            <p className="rating-comment">{category.comment}</p>
                                        </div>
                                    ))}
                                </section>

                                <section className="glass-panel verdict-box">
                                    <h2>Overall Verdict: <span className="text-gradient">{game.postReview.totalScore}/5</span></h2>
                                    <p className="overall-review">{game.postReview.overallReview}</p>
                                </section>
                            </>
                        ) : (
                            <section className="glass-panel info-card" style={{ textAlign: "center", padding: "48px" }}>
                                <h2>No Review Yet</h2>
                                <p style={{ color: "var(--text-muted)" }}>This game is currently in the Pre-Game phase. A full review covers story, graphics, and gameplay once evaluated.</p>
                            </section>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
