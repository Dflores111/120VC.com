"use client";

/* eslint-disable @next/next/no-img-element -- Local editorial assets are rendered by vinext. */
import Link from "next/link";
import { useState } from "react";

export type SolutionScope = {
  label: string;
  title: string;
  description: string;
  bestWhen: string;
  includes?: string;
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

  return (
    <div className="home-solution-grid">
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
          >
            <span className="home-solution-image">
              <img src={scope.image} alt={scope.imageAlt} width={scope.imageWidth} height={scope.imageHeight} loading="lazy" />
            </span>
            <div className="home-solution-copy">
              <h3>{scope.title}</h3>
              <p>{scope.description}</p>
              {scope.includes && <i>{scope.includes}</i>}
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
                Is this the right fit? <span aria-hidden="true">{isRevealed ? "−" : "+"}</span>
              </button>
              <div className="home-solution-change" id={panelId} aria-hidden={!isRevealed} data-revealed={isRevealed ? "true" : "false"}>
                <dl className="home-solution-change-list">
                  <div>
                    <dt>Best when</dt>
                    <dd>{scope.bestWhen}</dd>
                  </div>
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
              <Link
                className="home-solution-link"
                href={scope.href}
                data-analytics-event="solution_card_selected"
                data-analytics-section="how-we-help"
                data-analytics-selection={scope.label}
              >
                Explore {scope.title} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
