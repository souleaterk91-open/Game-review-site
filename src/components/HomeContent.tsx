"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Defining the shape of the data received from Prisma
type GameData = {
    id: string;
    slug: string;
    title: string;
    releaseDate: Date;
    company: string;
    genre: string;
    coverImage: string;
    storyline: string;
    postReview: { totalScore: number } | null;
};

export default function HomeContent({ initialGames }: { initialGames: GameData[] }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [dailyPick, setDailyPick] = useState<GameData | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<string>("");
    const [isMounted, setIsMounted] = useState(false);

    const allGames = useMemo(() => initialGames, [initialGames]);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 0);
        return () => clearTimeout(timeout);
    }, []);

    // Daily Pick & Countdown Logic
    useEffect(() => {
        if (allGames.length === 0) return;

        const calculateDailyPick = () => {
            const now = new Date();
            const dateString = now.toDateString();

            let hash = 0;
            for (let i = 0; i < dateString.length; i++) {
                hash = (hash << 5) - hash + dateString.charCodeAt(i);
                hash |= 0;
            }

            const index = Math.abs(hash) % allGames.length;
            setDailyPick(allGames[index]);

            const tomorrow = new Date(now);
            tomorrow.setHours(24, 0, 0, 0);
            const diff = tomorrow.getTime() - now.getTime();

            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeRemaining(
                `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
            );
        };

        calculateDailyPick();
        const interval = setInterval(calculateDailyPick, 1000);

        return () => clearInterval(interval);
    }, [allGames]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredGames = searchQuery
        ? allGames.filter((game) => game.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    // For real database we'll just sort by releaseDate or if we had an updatedAt field.
    // Prisma games use releaseDate for sorting for now since views are gone.
    const latestGames = [...allGames].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    const topViewedGames = [...allGames]; // In a real app, sort by actual views

    const handleGameSelect = (slug: string) => {
        setSelectedGame(slug);
    };

    const navigateToReview = (segment: "pre" | "post") => {
        if (selectedGame) {
            router.push(`/games/${selectedGame}?mode=${segment}`);
        }
    };

    const renderGameCard = (game: GameData, showViews: boolean = false) => (
        <div
            key={game.id}
            className="glass-panel game-card"
            onClick={() => handleGameSelect(game.slug)}
            style={{ cursor: 'pointer', padding: '0', overflow: 'hidden', transition: 'transform 0.3s, box-shadow 0.3s', display: 'flex', flexDirection: 'column' }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(157, 78, 221, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3)';
            }}
        >
            <div style={{ position: 'relative', height: '180px' }}>
                <Image
                    src={game.coverImage}
                    alt={game.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
                    <span className="badge" style={{ background: 'rgba(0,0,0,0.8)', border: 'none' }}>
                        ★ {game.postReview?.totalScore || 'N/A'}
                    </span>
                </div>
            </div>
            <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>{game.title}</h3>
                <p style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {game.genre}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        {showViews ? "Popular" : new Date(game.releaseDate).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px', minHeight: '80vh' }}>
            <section className="search-section" style={{ maxWidth: '700px', margin: '0 auto 60px auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Search the Vault, <span className="text-gradient">Find Your Game</span></h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Unlock spoiler-free impressions or deep-dive into the vault&apos;s analysis.</p>
                <input
                    type="text"
                    className="glass-panel"
                    placeholder="Search for a game... (e.g., Elden Ring)"
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ width: '100%', padding: '18px 24px', fontSize: '1.2rem', color: '#fff', border: '1px solid var(--primary)', outline: 'none', borderRadius: '50px', background: 'var(--bg-surface-elevated)' }}
                />
            </section>

            {searchQuery ? (
                <section className="search-results fade-in">
                    <h2 style={{ marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>Search Results</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                        {filteredGames.length > 0 ? (
                            filteredGames.map(game => renderGameCard(game))
                        ) : (
                            <p style={{ color: 'var(--text-muted)' }}>No games found matching &quot;{searchQuery}&quot;.</p>
                        )}
                    </div>
                </section>
            ) : (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                    {isMounted && dailyPick && (
                        <section className="fade-in">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
                                <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                                    <span style={{ color: 'var(--primary)', textShadow: '0 0 10px var(--primary-glow)' }}>✦</span> Today&apos;s Vault Pick
                                </h2>
                                <span className="badge" style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                    New pick in {timeRemaining}
                                </span>
                            </div>

                            <div
                                className="glass-panel vault-card"
                                onClick={() => handleGameSelect(dailyPick.slug)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '0',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
                                    border: '1px solid rgba(56, 189, 248, 0.4)',
                                    boxShadow: '0 0 30px rgba(56, 189, 248, 0.15), inset 0 0 20px rgba(0,0,0,0.5)',
                                    minHeight: '200px'
                                }}
                            >
                                <div style={{ width: '35%', height: '100%', minHeight: '200px', position: 'relative' }}>
                                    <Image
                                        src={dailyPick.coverImage}
                                        alt={dailyPick.title}
                                        fill
                                        priority
                                        unoptimized
                                        sizes="35vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, rgba(15, 23, 42, 0.95))' }} />
                                </div>

                                <div style={{ padding: '30px', flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                        <div>
                                            <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                                                {dailyPick.genre}
                                            </span>
                                            <h3 style={{ fontSize: '1.8rem', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{dailyPick.title}</h3>
                                        </div>
                                        <div className="badge" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: '#fff', border: 'none', fontSize: '1.1rem', padding: '6px 14px' }}>
                                            ★ {dailyPick.postReview?.totalScore || 'N/A'}
                                        </div>
                                    </div>
                                    <p className="review-description" style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '90%' }}>
                                        {dailyPick.storyline}
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    <section>
                        <h2 style={{ marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: 'var(--primary)' }}>•</span> Latest Updated Reviews
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                            {latestGames.map(game => renderGameCard(game, false))}
                        </div>
                    </section>

                    <section>
                        <h2 style={{ marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: 'var(--secondary)' }}>★</span> Top Rated Reviews
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                            {topViewedGames.map(game => renderGameCard(game, true))}
                        </div>
                    </section>
                </div>
            )}

            {selectedGame && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(10, 5, 20, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="glass-panel modal-content vault-modal fade-in" style={{ padding: '40px', maxWidth: '500px', width: '90%', textAlign: 'center', position: 'relative' }}>
                        <div className="scan-line" />
                        <button
                            onClick={() => setSelectedGame(null)}
                            style={{ position: 'absolute', top: '16px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '2rem', cursor: 'pointer', zIndex: 10 }}
                        >
                            &times;
                        </button>
                        <h2 style={{ marginBottom: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>Access the Vault</h2>
                        <p style={{ color: 'var(--primary)', marginBottom: '30px', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Select your clearance level to proceed.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 5 }}>
                            <button className="btn-primary" onClick={() => navigateToReview("pre")} style={{ padding: '20px', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontWeight: 800 }}>[ PRE-GAME REVIEW ]</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.8 }}>SPOILER-FREE IMPRESSIONS</span>
                            </button>
                            <button className="btn-outline" onClick={() => navigateToReview("post")} style={{ padding: '20px', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', borderColor: 'var(--secondary)' }}>
                                <span style={{ color: 'var(--secondary)', fontWeight: 800 }}>[ POST-GAME ANALYSIS ]</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.8, color: 'var(--text-muted)' }}>DEEP DIVE & TOTAL RATINGS</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
