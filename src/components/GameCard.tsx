"use client";

import Image from "next/image";
import type { Game } from "@/data/games";
import { useA11yFlag } from "@/hooks/useA11yFlag";
import { useA11yVerbose } from "@/hooks/useA11yVerbose";

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  const verbose = useA11yVerbose();
  const keyboard = useA11yFlag("data-a11y-keyboard");
  const tagline = game.tagline.replace(/\.\s*$/, "");

  return (
    <a
      className="game-card"
      href={game.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        verbose
          ? `${game.name}. ${tagline}. ${game.thumbnailAlt}. Link opens ${game.href} in a new browser tab.`
          : `${game.name}: ${game.tagline} (opens in a new tab)`
      }
      onKeyDown={(e) => {
        if (!keyboard) return;
        if (e.key !== " " && e.key !== "Enter") return;
        if (e.key === " ") {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
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
        <h2 className="game-card__name" aria-hidden="true">
          {game.name}
        </h2>
        <p className="game-card__tagline" aria-hidden="true">
          {game.tagline}
        </p>
      </div>
    </a>
  );
}
