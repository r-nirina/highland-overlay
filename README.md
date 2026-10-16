# Highland Overlay

Encore un autre skin ACT ! 🌈

Overlay [OverlayPlugin](https://github.com/OverlayPlugin/OverlayPlugin) pour Advanced Combat Tracker et FFXIV : chronomètre du combat et classement DPS du groupe.

## Utilisation

Dans ACT, onglet **Plugins > OverlayPlugin.dll**, crée un overlay de type **MiniParse** avec l'une de ces URL :

| Vue | URL |
|---|---|
| Chronomètre et DPS | https://r-nirina.github.io/highland-overlay/ |
| DPS seul | https://r-nirina.github.io/highland-overlay/dpsChart.html |
| Chronomètre seul | https://r-nirina.github.io/highland-overlay/timer.html |

## Développement

Prérequis : Node.js 24 (voir `.nvmrc`).

```sh
npm ci
npm run dev
```

Ouvre ensuite une des pages avec `?mock` pour rejouer en boucle des données de combat enregistrées, sans ACT :
http://localhost:5173/?mock, http://localhost:5173/dpsChart.html?mock ou http://localhost:5173/timer.html?mock.

Pour tester avec ACT dans un navigateur classique, active le serveur WebSocket d'OverlayPlugin (onglet **WSServer**) et ajoute son adresse à l'URL :
http://localhost:5173/?OVERLAY_WS=ws://127.0.0.1:10501/ws.

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement avec rechargement à chaud |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Sert `dist/` en local |
| `npm run lint` / `npm run lint:fix` | ESLint (et correction automatique) |
| `npm test` / `npm run test:watch` | Tests Vitest |

## Déploiement

Chaque push sur `develop` lance la CI (lint, tests, build), puis publie `dist/` sur GitHub Pages. Seul prérequis : **Settings > Pages > Source : GitHub Actions** dans le dépôt GitHub.

## Structure

```text
index.html, dpsChart.html, timer.html   Une page par vue
src/
  index.js, dpsChart.js, timer.js       Points d'entrée des pages
  mount-overlay.js                      Création de l'app : Vue, Pinia, styles, connexion à OverlayPlugin
  components/                           Composants Vue
  stores/                               Stores Pinia : act (état d'ACT), data (données de combat)
  services/overlay-plugin.js            API OverlayPlugin (portage ES de son common.js)
  utils/transforms.js                   Transformation des données envoyées par ACT
  const/jobs.js                         Jobs et rôles
  mocks/                                Données de combat enregistrées (?mock)
  assets/images/jobs/                   Une icône par code de job (drk.png pour DRK…)
```

Pour ajouter un job : place son icône dans `src/assets/images/jobs/<code>.png`, puis déclare-le avec son rôle dans `src/const/jobs.js`.

## Navigateur cible

OverlayPlugin affiche les overlays avec CEF 95, soit **Chromium 95**. Le build cible donc `chrome95` (`vite.config.js`) et `eslint-plugin-compat` signale les API web que cette version ne connaît pas (`.browserslistrc`). Ces deux réglages doivent rester alignés.
