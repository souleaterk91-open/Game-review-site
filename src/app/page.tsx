export default function Home() {
  return (
    <>
      <section id="hero" className="container hero" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero-title">
          Welcome to the <br />
          <span className="text-gradient">Ultimate Gaming Hub</span>
        </h1>
        <p className="hero-subtitle">
          Whether you&apos;re deciding what to play next, or diving deep into
          the lore of the game you just finished, we have exactly what you need.
        </p>
        <div className="hero-actions">
          <button id="btn-browse-pre-game" className="btn-primary btn-lg">
            Browse Pre-Game Reviews
          </button>
          <button id="btn-explore-post-game" className="btn-outline btn-lg">
            Explore Post-Game Analysis
          </button>
        </div>
      </section>

      <section id="featured-games" className="container game-grid" aria-label="Featured Games">
        <article className="glass-panel game-card-placeholder">
          <h3>Featured Game</h3>
          <p>GameCard component will go here.</p>
        </article>
        <article className="glass-panel game-card-placeholder">
          <h3>Trending Review</h3>
          <p>GameCard component will go here.</p>
        </article>
        <article className="glass-panel game-card-placeholder">
          <h3>Deep Dive Analysis</h3>
          <p>GameCard component will go here.</p>
        </article>
      </section>
    </>
  );
}
