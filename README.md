# Site Portfolio

Ce projet est un site portfolio développé avec [Next.js](https://nextjs.org/) et [React](https://react.dev/). Il présente mes réalisations, compétences et expériences professionnelles avec support multilingue.

## Fonctionnalités

- Page d'accueil avec présentation personnelle
- Section compétences techniques avec niveaux d'expertise
- Section éducation/formation
- Section expérience professionnelle et projets
- Navigation sticky avec scroll tracking
- Support multilingue avec next-intl
- Design responsive avec Tailwind CSS
- Effets visuels interactifs (cursor halo)
- Liens vers réseaux sociaux et CV

## Technologies utilisées

- **Framework**: Next.js 15.4.2 avec Turbopack
- **UI**: React 19.1.0, Tailwind CSS
- **Internationalisation**: next-intl
- **Icônes**: React Icons
- **TypeScript**: Support complet
- **Styling**: Tailwind CSS avec thème sombre

## Structure du projet

- `app/` : Application Next.js (App Router)
  - `ui/` : Composants UI
    - `components/` : Composants réutilisables
    - `homepage.tsx` : Page d'accueil principale
  - `page.tsx` : Point d'entrée de l'application
  - `layout.tsx` : Layout racine
  - `providers.tsx` : Providers (internationalisation)
  - `globals.css` : Styles globaux
- `i18n/` : Configuration et messages d'internationalisation
- `public/` : Fichiers statiques (images, CV, etc.)
- `package.json` : Dépendances et scripts

## Installation

```bash
git clone https://github.com/votre-utilisateur/site-portfolio.git
cd site-portfolio
pnpm install
```

## Démarrage en développement

```bash
pnpm dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## Build pour la production

```bash
pnpm build
pnpm start
```

## Scripts disponibles

- `pnpm dev` : Démarrage en mode développement avec Turbopack
- `pnpm build` : Build de production
- `pnpm start` : Démarrage du serveur de production
- `pnpm lint` : Vérification du code avec ESLint

## Fonctionnalités principales

### Navigation intelligente

- Navigation sticky qui suit automatiquement la section active
- Scroll tracking avec Intersection Observer

### Sections du portfolio

- **Technical Toolkit** : Compétences techniques avec niveaux
- **About** : Présentation personnelle détaillée
- **Education** : Parcours académique
- **Experience** : Expériences professionnelles et projets

### Internationalisation

- Support multilingue avec next-intl
- Messages organisés par locale dans `i18n/messages/`

## Personnalisation

1. Modifiez les données dans `app/ui/homepage.tsx` (compétences, expériences, formations)
2. Ajustez les traductions dans `i18n/messages/`
3. Personnalisez les styles dans `app/globals.css` et les composants
4. Remplacez les images dans `public/`

## Déploiement

Le projet est optimisé pour le déploiement sur Vercel, mais peut être déployé sur tout hébergeur supportant Next.js.
