## 1. Nuage des fausses excuses — repensé "pensée"

Dans `ProblemSection` (src/routes/index.tsx) :
- Ajouter les 5 nouvelles excuses à la liste `fakeexcuses` (en plus des 7 actuelles → 12 total).
- Abandonner la grille rectangulaire en cartes. Remplacer par une composition type **"bulles de pensée"** plus organique :
  - Conteneur `relative` avec hauteur minimum (ex. `min-h-[600px]`), excuses positionnées en absolu avec rotations légères et tailles variables.
  - Chaque excuse devient une **bulle de pensée** : fond `bg-card`, bordure pointillée `border-dashed border-foreground/15`, coins très arrondis (`rounded-[28px]`), petite "queue" de bulle de BD (pseudo-élément `::after` triangulaire) pointant en bas.
  - Tailles variables (`text-sm` / `text-base` / `text-xl`) selon importance, opacités variables (0.6 → 1) pour effet de profondeur.
  - Animation subtile au scroll (float doux via CSS keyframes ou stagger en `animate-pulse` léger).
  - Layout fluide CSS Grid `masonry`-like sur desktop + stack vertical sur mobile.
  - Petits "..." en typo display autour pour évoquer le flux mental.

## 2. Jaune adouci

Dans `src/styles.css` :
- `--primary` actuel `oklch(0.90 0.22 122)` → trop fluo, agressif sur fond clair.
- Nouveau : `oklch(0.86 0.17 118)` (moins lumineux, moins saturé, légèrement plus vert/citron).
- Ajuster `--accent` à l'identique.
- Vérifier `glow-primary` reste cohérent (pas de modif nécessaire, color-mix s'adapte).
- Le radial gradient du body (18% primary) reste valide.

## 3. Bloc "le mental c'est 80%" — épuré

Dans `AgitationSection`, remplacer le paragraphe dense par une mise en page UX/UI claire :
- Citation barrée mise en avant : `"Le mental c'est 80% du travail." → FAUX` (gros, display, jaune barré).
- Une ligne punchline : *"Le mental seul ne sert à rien."*
- Mini-équation visuelle horizontale en 4 piliers égaux : **Mental + Technique + Physique + Tactique** (les 4 cards existantes — on les fusionne ici, plus de duplication avec le paragraphe).
- Une seule phrase de conclusion détachée en bas : *"Un blocage mental n'est souvent que la conséquence d'une défaillance tactique."*
- Espacement aéré, hiérarchie typo claire (display 4xl → body lg → mono caption).

## 4. Nouvelle section "Résultats & témoignages"

Insérer une nouvelle section `ResultsSection` entre `SolutionSection` et `TestWidget` (ou en bas de SolutionSection sous le bloc "Outils mentaux") :
- Label section `R/03b · Résultats concrets`.
- Titre : **"Les résultats que vous pouvez viser."**
- Copywriting d'intro : *"Pas de promesses magiques. Des trajectoires réelles : casser un palier, viser un classement, accéder au haut niveau, devenir DE — ou simplement arrêter de stagner après 5 ans."*
- Grille 4 colonnes (objectifs identifiables) : **Monter de classement** · **Aller vers le haut niveau** · **Devenir DE** · **Casser un blocage qui dure**.
  - Chaque carte : icône/numéro, titre, 1 ligne descriptive.
- Sous-grille **3 témoignages** (placeholder) en format carte :
  - Citation (italique), nom + classement initial → classement final, sport.
  - Note : les 3 témoignages seront en données placeholder réalistes (Quentin pourra fournir les vrais). On ajoute une note "// témoignages réels — à compléter" en commentaire.
- CTA discret en bas : *"Votre histoire peut être la prochaine."* → lien vers `#contact`.

## 5. Encart "Autres cibles"

Ajouter sous `OffersSection` (avant `FinalCTA`) un encart **discret** (pas une section pleine, juste une bande) :
- Conteneur centré, fond `bg-card`, bordure fine, padding modéré.
- Label mono : `// Aussi disponible`.
- Texte court : *"Quentin accompagne également :"*
- Liste horizontale (3 items avec petite icône / puce orange clay) :
  - **Équipes de Padel** — préparation collective avant compétition
  - **Binômes Padel** — synchroniser deux mentaux sur le court
  - **Parent + Enfant** — accompagner le jeune joueur et sa famille
- Petit CTA texte : *"Demander un format sur mesure →"* (lien `#contact`).
- Volontairement plus sobre que les offres principales (pas de prix, pas de glow).

## Fichiers touchés

- `src/routes/index.tsx` — modifications sections + nouvelle section + encart
- `src/styles.css` — ajustement `--primary` et `--accent`
- Aucune nouvelle dépendance, aucune migration DB.

## Hors scope

- Pas de témoignages réels (placeholders à valider avec Quentin).
- Pas de modif du test ennéagramme, du Hero, du formulaire, ni des offres elles-mêmes.
