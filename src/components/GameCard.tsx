"use client";

import Image from "next/image";
import type { Game } from "@/data/games";
import { useA11yFlag } from "@/hooks/useA11yFlag";

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  const screenReader = useA11yFlag("data-a11y-sr");

  return (
    <a
      className="game-card"
      href={game.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        screenReader
          ? `${game.name}: ${game.tagline.replace(/\.\s*$/, "")}. Opens ${game.href} in a new browser tab.`
          : `${game.name}: ${game.tagline} (opens in a new tab)`
      }
    >
      <div className="game-card__media">
        <Image
          src={game.thumbnail}
          alt=""
          width={640}
          height={360}
          className="game-card__image"
          sizes="(max-width: 720px) 100vw, 420px"
        />
      </div>
      <div className="game-card__body">
        <h2 className="game-card__name">{game.name}</h2>
        <p className="game-card__tagline">{game.tagline}</p>
      </div>
    </a>
  );
}
