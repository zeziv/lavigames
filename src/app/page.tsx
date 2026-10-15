import GameCard from "@/components/GameCard";
import { company } from "@/data/company";
import { games } from "@/data/games";

export default function HomePage() {
  return (
    <main id="main-content" className="hub">
      <header className="hub__header">
        <h1 className="wordmark">{company.brand}</h1>
        <p className="hub__tagline">Games for people who like to compete.</p>
      </header>

      <section className="hub__games" aria-label="Our games">
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
