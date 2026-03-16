# Guide Sentinelle Pulse

---

## 1. Ajouter un nouvel article

### Méthode simple : Modifier le fichier data.ts

Le fichier des articles se trouve dans :
```
src/lib/data.ts
```

Pour ajouter un article, ajoute un nouvel objet dans le tableau `articles` :

```typescript
{
  id: "15",                    // Numéro unique (suivant le dernier)
  title: "Titre de l'article",
  excerpt: "Premier paragraphe ou résumé...",
  content: "Contenu complet de l'article...",
  category: "economie",        // ou: "defense", "geopolitique", "osint"
  author: "Nom de l'auteur",
  date: "2026-03-16",         // Format: AAAA-MM-JJ
  readTime: 5,                // Temps de lecture en minutes
  image: "URL de l'image",
  featured: false,            // true pour mettre en une (max 2)
  trending: false             // true pour mettre dans tendances
}
```

### Structure du contenu

Le contenu support les sauts de ligne :
```typescript
content: "Titre de section

Premier paragraphe ici.

Deuxième paragraphe ici.

## Sous-titre

Contenu du sous-titre..."
```

### Images

Utilisez des images de Unsplash (gratuit) :
1. Allez sur https://unsplash.com
2. Cherchez une image
3. Cliquez sur "Copy Link"
4. Utilisez l'URL qui finit par `?w=800&q=80`

---

## 2. Ajouter votre logo

### Option A : Logo LinkedIn
Le lien LinkedIn dans le footer pointe maintenant vers votre page :
https://www.linkedin.com/company/110721071

### Option B : Logo personnalisé
1. Placez votre fichier logo dans le dossier `public/` (ex: `public/logo.png`)
2. Modifiez `src/components/Header.tsx` pour remplacer le texte par une image :
```tsx
// Remplacez cette ligne :
<Link href="/" className={styles.logo}>SENTINELLE PULSE</Link>

// Par :
<Link href="/">
  <img src="/logo.png" alt="Sentinelle Pulse" style={{ height: '40px' }} />
</Link>
```

---

## 3. Commandes utiles

```bash
# Se placer dans le dossier du projet
cd /Users/axel/Desktop/intelligence-press

# Lancer le site en local
npm run dev

# Construire pour la production
npm run build

# Vérifier les erreurs
npm run lint
```

---

## 4. Structure des catégories

- **économie** - Articles sur l'économie, la finance, le commerce
- **défense** - Articles sur la défense, l'OTAN, la sécurité
- **géopolitique** - Articles sur les relations internationales
- **osint** - Articles sur le renseignement en sources ouvertes

---

## 5. Personnaliser les couleurs

Dans `src/app/globals.css` :

```css
:root {
  --accent-primary: #C41E3A;  /* Rouge - couleur principale */
  --accent-secondary: #1E3A5F; /* Bleu - couleur secondaire */
}
```

---

## 6. Déployer le site

### Option A : Vercel (Recommandé - Gratuit)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Installez Vercel CLI : `npm i -g vercel`
3. Dans le dossier du projet :
   ```bash
   vercel login
   vercel deploy
   ```
   
**Ou via GitHub :**
1. Poussez votre code sur GitHub
2. Allez sur vercel.com
3. Cliquez "New Project" → Import depuis GitHub
4. Déployé automatiquement !

### Option B : Netlify (Gratuit)

1. Créez un compte sur [netlify.com](https://netlify.com)
2. Glissez le dossier `build` ou connectez votre repo GitHub
3. Commande de build : `npm run build`
4. Dossier de sortie : `.next`

### Option C : Hébergement VPS

1. Construire : `npm run build`
2. Le dossier `.next` contient le site prêt
3. Déployez avec Node.js ou en statique

---

## 7. Configuration du domaine

Après déploiement sur Vercel :
1. Allez dans Settings → Domains
2. Ajoutez votre domaine
3. Suivez les instructions DNS

---

## 8. Maintenance

- **Images statiques** : Placez dans `public/`
- **Favicon** : Remplacez `public/favicon.ico`
- **SEO** : Modifiez `src/lib/seo.ts`
