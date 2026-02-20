"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { MOCK_GAMEDATA } from "@/lib/mock-data";
import "@/styles/components.css"; // We will rebuild this stylesheet

export default function GameHubPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const slug = params.slug as string;
    const modeParam = searchParams.get('mode');

    const game = MOCK_GAMEDATA[slug];

    const segment = modeParam === "post" ? "post" : "pre";

    const setSegment = (newSegment: "pre" | "post") => {
        router.push(`/games/${slug}?mode=${newSegment}`, { scroll: false });
    };

    if (!game) {
        return (
            <div className="container" style={{ padding: "100px", textAlign: "center" }}>
                <h1>Game Not Found</h1>
                <p>Sorry, the game you are looking for doesn&apos;t exist in our hub yet.</p>
            </div>
        );
    }

    return (
        <div className={`game-hub-page ${game.themeClass}`}>
            {/* Hero Header */}
            <header className="game-hero">
                <div className="game-hero-img-container" style={{ position: 'absolute', inset: 0 }}>
                    <Image
                        src={game.coverImage}
                        alt={game.name}
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
                    <h1 className="game-title">{game.name}</h1>
                    <p className="game-release-date">Released: {game.releaseDate}</p>

                    {/* Main Toggle */}
                    <div className="hub-toggle-wrapper">
                        <div className={`hub-toggle-container mode-${segment}`}>
                            <div className="hub-toggle-slider" />
                            <button
                                className={`hub-toggle-btn ${segment === "pre" ? "active" : ""}`}
                                onClick={() => setSegment("pre")}
                            >
                                Pre-Game (Spoiler-Free)
                            </button>
                            <button
                                className={`hub-toggle-btn ${segment === "post" ? "active" : ""}`}
                                onClick={() => setSegment("post")}
                            >
                                Post-Game (Deep Dive)
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container game-content-main">
                {segment === "pre" ? (
                    <div className="fade-in">
                        {/* Admin Controls Placeholder */}
                        <div className="admin-controls-bar glass-panel" style={{ marginBottom: '24px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid var(--secondary)' }}>
                            <div>
                                <strong style={{ color: 'var(--secondary)' }}>Admin View</strong>
                                <span style={{ marginLeft: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>You have permissions to edit this review.</span>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Edit Pre-Game Content</button>
                                <button className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem', color: '#ff3366', borderColor: '#ff3366' }}>Delete Game</button>
                            </div>
                        </div>

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
                        {/* Admin Controls Placeholder */}
                        <div className="admin-controls-bar glass-panel" style={{ marginBottom: '24px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid var(--secondary)' }}>
                            <div>
                                <strong style={{ color: 'var(--secondary)' }}>Admin View</strong>
                                <span style={{ marginLeft: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>You have permissions to edit this review.</span>
                            </div>
                            <button className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Edit Post-Game Review</button>
                        </div>

                        <h2>Detailed Evaluation</h2>
                        <section className="rating-detailed-list">
                            {[
                                { label: "Story", key: "story" },
                                { label: "Graphics", key: "graphics" },
                                { label: "Gameplay", key: "gameplay" },
                                { label: "Quality", key: "quality" }
                            ].map((category) => {
                                const ratingData = game.ratings[category.key as keyof typeof game.ratings];
                                // TypeScript narrowing for our RatingCategory vs total
                                if (typeof ratingData === 'number') return null;

                                return (
                                    <div key={category.key} className="glass-panel rating-detailed-card">
                                        <div className="rating-card-header">
                                            <h3 className="rating-label">{category.label}</h3>
                                            <div className="rating-stars">
                                                {/* Simple Star visualizer */}
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <span key={star} style={{ color: star <= ratingData.score ? 'var(--primary)' : 'var(--bg-surface-elevated)' }}>★</span>
                                                ))}
                                                <span className="rating-value-small"> {ratingData.score}/5</span>
                                            </div>
                                        </div>
                                        <p className="rating-comment">{ratingData.comment}</p>
                                    </div>
                                );
                            })}
                        </section>

                        <section className="glass-panel verdict-box">
                            <h2>Overall Verdict: <span className="text-gradient">{game.ratings.total}/5</span></h2>
                            <p className="overall-review">{game.overallReview}</p>
                        </section>

                        <section className="analysis-feed">
                            <h3>Endings & Lore Analysis</h3>
                            <div className="article-list">
                                {game.analysisArticles.map(article => (
                                    <div key={article.id} className="glass-panel article-item">
                                        <h4>{article.title}</h4>
                                        <p>{article.excerpt}</p>
                                        <button className="btn-outline">Read Analysis</button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
}
