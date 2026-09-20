"use client";

/* eslint-disable @next/next/no-img-element -- Local editorial assets are rendered by vinext. */
import Link from "@/app/components/native-link";
import { useState } from "react";
import { DisclosureCue } from "./disclosure-cue";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

export type SolutionScope = {
  label: string;
  title: string;
  description: string;
  bestWhen: string;
  includes?: string;
  links?: ReadonlyArray<{ label: string; href: string }>;
  change: string;
  outcome: string;
  href: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  tone: "clay" | "sage" | "ink";
};

export function SolutionScopeCards({ scopes }: { scopes: readonly SolutionScope[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const reduceMotion = useHydratedReducedMotion();

  return (
    <div className="home-solution-grid" data-reduced-motion={reduceMotion ? "true" : "false"}>
      {scopes.map((scope) => {
        const isExpanded = expanded === scope.label;
        const isRevealed = isExpanded || (!expanded && preview === scope.label);
        const panelId = `solution-change-${scope.label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
        return (
          <article
            className="home-solution-card"
            data-tone={scope.tone}
            data-revealed={isRevealed ? "true" : "false"}
            key={scope.label}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" && !expanded) setPreview(scope.label);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse" && !expanded) setPreview(null);
            }}
            onFocusCapture={() => {
              if (!expanded) setPreview(scope.label);
            }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null) && !expanded) setPreview(null);
            }}
            onKeyDownCapture={(event) => {
              if (event.key !== "Escape" || !isRevealed) return;
              event.preventDefault();
              setExpanded(null);
              setPreview(null);
            }}
          >
            <span className="home-solution-image">
              <img src={scope.image} alt={scope.imageAlt} width={scope.imageWidth} height={scope.imageHeight} loading="lazy" />
            </span>
            <div className="home-solution-copy">
              <h3>{scope.title}</h3>
              <p>{scope.description}</p>
              {scope.includes && <i>{scope.includes}</i>}
              <dl className="home-solution-fit">
                <dt>Best when</dt>
                <dd>{scope.bestWhen}</dd>
              </dl>
              <button
                className="home-solution-disclosure"
                type="button"
                aria-expanded={isRevealed}
                aria-controls={panelId}
                onClick={() => {
                  setExpanded((current) => current === scope.label ? null : scope.label);
                  setPreview(null);
                }}
              >
                See what changes <DisclosureCue expanded={isRevealed} activated={isExpanded} reduceMotion={reduceMotion} />
              </button>
              <div className="home-solution-change" id={panelId} aria-hidden={!isRevealed} data-revealed={isRevealed ? "true" : "false"}>
                <dl className="home-solution-change-list">
                  <div>
                    <dt>First shift</dt>
                    <dd>{scope.change}</dd>
                  </div>
                  <div>
                    <dt>Visible difference</dt>
                    <dd>{scope.outcome}</dd>
                  </div>
                </dl>
              </div>
              <div className="home-solution-links" aria-label={`Explore ${scope.title}`}>
                {(scope.links ?? [{ label: scope.title, href: scope.href }]).map((link) => (
                  <Link
                    className="home-solution-link"
                    href={link.href}
                    data-analytics-event="solution_card_selected"
                    data-analytics-section="how-we-help"
                    data-analytics-selection={link.label}
                    key={link.href}
                  >
                    Explore {link.label} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
