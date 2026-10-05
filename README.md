# 120VC Execution Leadership Website

The buyer-first 120VC website for enterprise leaders closing the Strategy Execution Gap.

## What is included

- A conversion-focused homepage
- Problem, solution, role, evidence, company, FAQ, and consultation routes
- Responsive navigation and layouts
- Purposeful scroll reveals, headline emphasis, image entrances, spotlight cards, and interaction feedback
- Accessible focus states, semantic structure, and reduced-motion behavior
- Route-specific search and social metadata
- Sitemap and robots routes
- Nine connected framework tools at `/resources/tools`, plus the Buyer Decision Brief
- The existing ChatGPT Sites deployment configuration

## Local commands

```bash
npm ci
npm run dev
npm test
npm run lint
npx tsc --noEmit
npm run build
npm start
```

The development server uses port 3000. The production build targets Cloudflare Workers through vinext and the Sites Vite plugin; it is not a static HTML export. `.openai/hosting.json` identifies the existing Site. Never commit credentials or `.env` files.

## Site structure

- `app/site-data.ts` and `app/data/`: centralized page, navigation, resource, proof, and toolkit content.
- `app/components/`: shared website components, motion, navigation, and tool views.
- `public/`: all locally served imagery, logos, fonts, icons, and other media.
- `worker/`, `vite.config.ts`, and `.openai/hosting.json`: the deployment runtime and configuration.
- `tests/`: route, navigation, content, proof, interaction-contract, and toolkit checks.
- `docs/execution-toolkit-v1.md`: toolkit behavior and verification boundaries.

## Working boundaries

The toolkit stores records on the current browser and origin. It has no accounts, cross-device sync, live collaboration, connected calendar, automatic email, or CRM submission. Reports and workspace backups are explicitly user-controlled; private daily reflections are excluded from Eyes Up reports but included in full backups. Records do not automatically transfer between localhost and the published Site.

The consultation interface prepares a direct email to `info@120vc.com`; opening that handoff is not confirmation of receipt. Connect the approved CRM or form endpoint before claiming submitted requests are received.

Unsubstantiated company figures and illustrative case evidence remain local review material and are excluded from production. The complete route inventory remains reachable, including honest availability notices for unfinished assessments and legal policy copy.

Generated output, dependencies, secrets, local editor settings, and duplicate review archives are excluded from source control. All website pages, runtime components, motion, and public assets are included.
