"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MOCK_GAMEDATA, GameHubData } from "@/lib/mock-data";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [dailyPick, setDailyPick] = useState<GameHubData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  const allGames = useMemo(() => Object.values(MOCK_GAMEDATA), []);

  // Daily Pick & Countdown Logic
  useEffect(() => {
    if (allGames.length === 0) return;

    const calculateDailyPick = () => {
      const now = new Date();
      // Use the date string as a stable seed for the day
      const dateString = now.toDateString();

      // Simple string hash function
      let hash = 0;
      for (let i = 0; i < dateString.length; i++) {
        hash = (hash << 5) - hash + dateString.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      const index = Math.abs(hash) % allGames.length;
      setDailyPick(allGames[index]);

      // Calculate time remaining until midnight
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

  // Handle Search Input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };



  // Filter Games by Title
  const filteredGames = searchQuery
    ? allGames.filter((game) => game.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Sort logic for feeds
  const latestGames = [...allGames].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  const topViewedGames = [...allGames].sort((a, b) => b.views - a.views);

  // When a user clicks a game card
  const handleGameSelect = (slug: string) => {
    setSelectedGame(slug);
  };

  // Final Navigation after Selection Modal
  const navigateToReview = (segment: "pre" | "post") => {
    if (selectedGame) {
      router.push(`/games/${selectedGame}?mode=${segment}`);
    }
  };

  // Reusable card component render function
  const renderGameCard = (game: typeof allGames[0], showViews: boolean = false) => (
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
          alt={game.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
          <span className="badge" style={{ background: 'rgba(0,0,0,0.8)', border: 'none' }}>
            ★ {game.ratings.total}
          </span>
        </div>
      </div>
      <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>{game.name}</h3>
        <p style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {game.genre}
        </p>
        <div style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            {showViews ? `${game.views.toLocaleString()} views` : new Date(game.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px', minHeight: '80vh' }}>
      {/* 1. Search Bar Section */}
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

      {/* Dynamic Content Area */}
      {searchQuery ? (
        <section className="search-results fade-in">
          <h2 style={{ marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>Search Results</h2>
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

          {/* Today's Pick Section */}
          {dailyPick && (
            <section className="fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
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
                    alt={dailyPick.name}
                    fill
                    priority
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
                      <h3 style={{ fontSize: '1.8rem', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{dailyPick.name}</h3>
                    </div>
                    <div className="badge" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: '#fff', border: 'none', fontSize: '1.1rem', padding: '6px 14px' }}>
                      ★ {dailyPick.ratings.total}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '90%' }}>
                    {dailyPick.storyline}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 2. Latest Updated Reviews */}
          <section>
            <h2 style={{ marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--primary)' }}>•</span> Latest Updated Reviews
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {latestGames.map(game => renderGameCard(game, false))}
            </div>
          </section>

          {/* 3. Top Viewed Reviews */}
          <section>
            <h2 style={{ marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--secondary)' }}>★</span> Top Viewed Reviews
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {topViewedGames.map(game => renderGameCard(game, true))}
            </div>
          </section>
        </div>
      )}

      {/* Selection Modal (Pre vs Post) */}
      {selectedGame && (
        <div className="modal-overlay fade-in" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(10, 5, 20, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel modal-content" style={{ padding: '40px', maxWidth: '500px', width: '90%', textAlign: 'center', position: 'relative', border: '1px solid var(--primary)' }}>
            <button
              onClick={() => setSelectedGame(null)}
              style={{ position: 'absolute', top: '16px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '2rem', cursor: 'pointer' }}
            >
              &times;
            </button>
            <h2 style={{ marginBottom: '10px' }}>Choose Your Path</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>What kind of experience are you looking for?</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button className="btn-primary" onClick={() => navigateToReview("pre")} style={{ padding: '20px', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span>Pre-Game Review</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 'normal', opacity: 0.8 }}>(Spoiler-Free Impressions)</span>
              </button>
              <button className="btn-outline" onClick={() => navigateToReview("post")} style={{ padding: '20px', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', borderColor: 'var(--secondary)' }}>
                <span style={{ color: 'var(--secondary)' }}>Post-Game Analysis</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 'normal', opacity: 0.8, color: 'var(--text-muted)' }}>(Deep Dive & Total Ratings)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
