import GameCard from "@/components/GameCard";
import HubBrand from "@/components/HubBrand";
import { games } from "@/data/games";

export default function HomePage() {
  return (
    <main id="main-content" className="hub" tabIndex={-1}>
      <header className="hub__header">
        <HubBrand />
        <p className="hub__tagline">Lions Lead. Not Follow.</p>
      </header>

      <section className="hub__games" aria-labelledby="games-heading">
        <h2 id="games-heading" className="sr-only">
          Our games
        </h2>
        <ul className="game-grid">
          {games.map((game) => (
            <li key={game.id}>
              <GameCard game={game} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
