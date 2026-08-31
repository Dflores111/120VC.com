"use client";

import Link from "next/link";
import { useState } from "react";
import type { PageLink, PageSection } from "../site-data";

function ChoiceLink({ link }: { link: PageLink }) {
  const content = (
    <>
      {link.label && <span className="card-label">{link.label}</span>}
      <h3>{link.title}</h3>
      <p>{link.description}</p>
      <span className="card-arrow">Explore <i aria-hidden="true">{link.href.startsWith("/") ? "→" : "↗"}</i></span>
    </>
  );

  return link.href.startsWith("/")
    ? <Link className="content-card-link" data-choice-action href={link.href}>{content}</Link>
    : <a className="content-card-link" data-choice-action href={link.href}>{content}</a>;
}

export function ProgressiveDisclosure({ sections, faqMode = false }: { sections: PageSection[]; faqMode?: boolean }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  function toggle(index: number) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="progressive-detail-list">
      {sections.map((section, index) => {
        const expanded = open.has(index);
        const panelId = `supporting-detail-${index}`;
        const triggerId = `supporting-detail-trigger-${index}`;
        return (
          <div className="progressive-detail" key={`${section.title}-${index}`}>
            <button
              aria-controls={panelId}
              aria-expanded={expanded}
              className="progressive-detail-trigger"
              id={triggerId}
              onClick={() => toggle(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  if (event.repeat) return;
                  event.preventDefault();
                  toggle(index);
                }
              }}
              type="button"
            >
              <span>{section.eyebrow || (faqMode ? `Question ${String(index + 1).padStart(2, "0")}` : "Supporting detail")}</span>
              <strong>{section.title}</strong>
              <i aria-hidden="true">+</i>
            </button>
            <div className="progressive-detail-body" id={panelId} aria-labelledby={triggerId} hidden={!expanded}>
              {section.paragraphs?.map((paragraph) => <p className="content-paragraph" key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul className="content-list">
                  {section.bullets.map((bullet) => <li key={bullet}><span aria-hidden="true" />{bullet}</li>)}
                </ul>
              )}
              {section.statement && <blockquote>{section.statement}</blockquote>}
              {section.cards && (
                <div className="content-card-grid" aria-label="Choose a path">
                  {section.cards.map((card) => <ChoiceLink link={card} key={`${card.href}-${card.title}`} />)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
