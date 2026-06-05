## 1. Photos de Quentin (remplacent les images générées)

Upload des 3 photos via `lovable-assets` puis remplacement dans `src/routes/index.tsx` :

- `Quentin-regarde-ses-eleves.jpeg` → **Hero** (remplace `hero-athlete.jpg`). Suppression du faux overlay "Match Point · LIVE", remplacé par une légende cohérente ("Aubagne · Session terrain").
- `Quentin-portrait.jpeg` → **Portrait coach** (remplace `coach-portrait.jpg`), déplacé **avant** la grille des outils mentaux (cf. §4).
- `Quentin-coaching-visio.jpeg` → intégrée dans la `SolutionSection` à côté du bloc d'intro "questionnement chirurgical" (illustre le coaching à distance).

Suppression des 3 anciens .jpg générés dans `src/assets/` (hero-athlete, court-grid, coach-portrait).

## 2. Nuage des fausses excuses — version condensée

Remplacement de la grille 3 colonnes de bulles flottantes (~700 px de haut) par un **double ruban marquee** (2 lignes qui défilent en sens opposés) basé sur l'animation `ticker-track` déjà présente dans `styles.css`. Chaque excuse devient un chip compact `"… excuse …"` avec masque dégradé `marquee-mask`. Hauteur cible ≈ 180 px. Le composant `ExcuseCloud` est réécrit, les styles `.thought-bubble` deviennent inutiles (conservés pour compat).

## 3. AgitationSection — recentrage sur l'équation

Réorganisation du bloc :

```
[A/02 · Agitation]
H2 :  "Le mental tout seul ne sert à rien."
sous-titre court : Voici l'équation réelle de la performance.

→ Intro courte (encart) : ✗ "Le mental c'est 80% du travail." (FAUX)

→ Équation visuelle (Mental + Technique + Physique + Tactique = 100%)
  • Carte "Mental 25%" mise en avant (fond primary, ring, badge
    "← Ce que pilote Quentin")
  • 3 autres cartes en visuel secondaire

→ Punch line : "Un blocage mental n'est souvent que la conséquence
  d'une défaillance tactique."

→ Sous-bloc dédié (encart destructive existant) :
  ⚠ Anti-Bullshit · Phrases interdites
  Titre interne conservé : "Pourquoi les conseils classiques
  vous font perdre vos matchs."
  + chips "phrases poison" (déjà présents)
```

## 4. Portrait avant la grille outils

Le bloc portrait + citation (actuellement **après** la grille des outils, lignes 463–482) est déplacé **avant** la grille, comme transition entre les "3 étapes méthode" et les outils. Le portrait passe à `Quentin-portrait.jpeg`.

## 5. Renommage + flip cards (outils)

- Titre : **"Les outils que Quentin maîtrise."** Kicker : `// 17 ans à les pratiquer sur le terrain`. Sous-titre : "Pas de théorie : 4 disciplines complémentaires qu'il utilise au quotidien avec ses joueurs."
- Les 4 cartes deviennent des **flip-cards** (CSS 3D : `perspective`, `transform-style: preserve-3d`, `rotate-y-180` au `group-hover`) :
  - **Face avant** : numéro `o.n`, nom de l'outil, badge "Outil mental", indice "↻ survoler".
  - **Face arrière** : description `o.body` sur fond `primary/10`, accent clay.
- Ajout dans `src/styles.css` des utilities `@utility flip-card`, `flip-inner`, `flip-face`, `flip-back` (Tailwind v4).
- Mobile (pas de hover) : tap → toggle via `useState` local par carte.

## Technique

- Aucune logique métier touchée.
- Modifications : `src/routes/index.tsx` + `src/styles.css` + 3 `.asset.json` créés dans `src/assets/` + 3 anciens .jpg supprimés.
- Pas de nouveau composant routé, pas de migration DB, pas de package.

## Hors scope

- Pas de refonte des sections Offres / Test ennéagramme / Formulaire.
- Pas de retouche photo.
