# SPEC.md - Site de Presse

## 1. Project Overview

**Project Name:** Sentinelle Pulse
**Type:** Site d'actualités professionnel
**Core Functionality:** Site de presse spécialisé en actualité économique, géopolitique, défense et OSINT
**Target Users:** Professionnels, analysts, journalistes, chercheurs et passionnés d'actualité internationale

---

## 2. UI/UX Specification

### Layout Structure

**Header**
- Logo (texte stylisé "SENTINELLE PULSE")
- Navigation principale: Économie | Géopolitique | Défense | OSINT | À propos
- Barre de recherche
- Toggle mode sombre

**Hero Section**
- Featured article en grand format (image + titre + extrait)
- Sous-titre de la une

**Content Grid**
- Grille 3 colonnes sur desktop
- 2 colonnes sur tablette
- 1 colonne sur mobile
- Articles avec: image, catégorie, titre, date, extrait

**Sidebar (desktop only)**
- Articles tendances
- Newsletter signup
- Tags populaires

**Footer**
- Navigation secondaire
- Réseaux sociaux
- Mentions légales
- Copyright

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette (Light Mode)**
- Background: `#F8F9FA`
- Surface: `#FFFFFF`
- Text Primary: `#1A1A2E`
- Text Secondary: `#6B7280`
- Accent Primary: `#C41E3A` (RougeCardinal)
- Accent Secondary: `#1E3A5F` (BleuMarine)
- Border: `#E5E7EB`

**Color Palette (Dark Mode)**
- Background: `#0F0F1A`
- Surface: `#1A1A2E`
- Text Primary: `#F3F4F6`
- Text Secondary: `#9CA3AF`
- Accent Primary: `#EF4444`
- Accent Secondary: `#3B82F6`
- Border: `#374151`

**Typography**
- Headings: "Playfair Display", serif (titres élégants, presse traditionnelle)
- Body: "Source Sans 3", sans-serif (lisibilité)
- Monospace (pour OSINT): "JetBrains Mono"

**Font Sizes**
- H1: 48px / 3rem
- H2: 32px / 2rem
- H3: 24px / 1.5rem
- Body: 16px / 1rem
- Small: 14px / 0.875rem

**Spacing System**
- Base unit: 4px
- Spacings: 4, 8, 12, 16, 24, 32, 48, 64, 96px

**Visual Effects**
- Cards: `box-shadow: 0 1px 3px rgba(0,0,0,0.1)`
- Hover cards: `box-shadow: 0 4px 12px rgba(0,0,0,0.15)`, `transform: translateY(-2px)`
- Transitions: 200ms ease-in-out
- Images: aspect-ratio 16/9, object-fit cover

### Components

**ArticleCard**
- Image (16:9)
- Category badge (colorée selon catégorie)
- Title (H3)
- Excerpt (2 lignes max)
- Date + Temps de lecture
- Hover: elevation + scale

**CategoryBadge**
- Économie: `#059669` (emerald)
- Géopolitique: `#7C3AED` (violet)
- Défense: `#DC2626` (rouge)
- OSINT: `#0891B2` (cyan)

**NewsletterForm**
- Input email
- Bouton "S'abonner"
- Validation inline

**SearchBar**
- Input avec icône
- Dropdown résultats

---

## 3. Functionality Specification

### Core Features

1. **Page d'accueil**
   - Hero avec article à la une
   - Filtres par catégorie
   - Liste des derniers articles
   - Section "Tendances"

2. **Pages catégories**
   - `/economie` - Filtre économique
   - `/geopolitique` - Filtre géopolitique
   - `/defense` - Filtre défense
   - `/osint` - Filtre OSINT

3. **Page article**
   - Titre, auteur, date
   - Contenu structuré
   - Related articles
   - Partage social

4. **Recherche**
   - Recherche par titre/contenu
   - Filtres par catégorie

5. **Newsletter**
   - Formulaire d'inscription
   - Message de confirmation

6. **Thème**
   - Dark/Light mode toggle
   - Persistance localStorage

### Data
- Articles mockés en JSON
- Catégories: economie, geopolitique, defense, osint

---

## 4. Acceptance Criteria

- [ ] Le site charge sans erreur
- [ ] Navigation fonctionnelle entre pages
- [ ] Dark/Light mode fonctionne et persiste
- [ ] Articles affichés avec images, titres, catégories
- [ ] Filtres par catégorie fonctionnent
- [ ] Recherche retourne des résultats
- [ ] Responsive sur mobile/tablet/desktop
- [ ] Animations fluides au hover
- [ ] Newsletter form accepte un email

---

## 5. Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** CSS Modules + CSS Variables
- **Fonts:** Google Fonts (Playfair Display, Source Sans 3, JetBrains Mono)
- **Icons:** Lucide React
