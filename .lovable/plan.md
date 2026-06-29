# Extraction de l'identité de marque Quentin → `quentin-extracted-data.md`

## Objectif
Générer un fichier markdown master (`/mnt/documents/quentin-extracted-data.md`, téléchargeable) qui consolide tout le copywriting, positionnement et vocabulaire déjà présents dans le projet, pour servir de base à la création de posts LinkedIn.

## Méthode
1. Scanner les sources de vérité du contenu :
   - `src/routes/index.tsx` (landing : hero, PAS, équation de la performance, métaphore du pilote, méthode, offres, poisons/antidotes, FAQ, CTA "Bilan de Lucidité")
   - `src/routes/__root.tsx` (meta/SEO, tagline)
   - `src/lib/enneagramme-data.ts` (9 profils, taglines, forces, pièges, libération — vocabulaire mental tennis)
   - `src/components/EnneagrammeTest.tsx` (consigne, ton)
   - Nuage d'excuses (array dans `index.tsx`)
   - `.lovable/plan.md` si pertinent

2. Extraire et structurer en sections (cf. plan du fichier ci-dessous).

## Plan du fichier `quentin-extracted-data.md`

1. **Identité & positionnement** — nom, baseline, ville (Marseille), méthode Axe-Réflexe, proposition de valeur courte.
2. **Les 4 piliers + métaphore du pilote** — Technique (l'avion), Physique (le carburant), Tactique (le plan de vol), Mental (le pilote) + expertise de Quentin sur chacun, le "60% FAUX".
3. **ICP & points de blocage** — joueurs classés bloqués (15/4 → 30/1), syndrome du score qui se tend, déni, excuses, le "tu joues mieux que ton classement".
4. **Vocabulaire** — autorisé (jargon tennis réaliste : court, bâches, break, classement, vestiaire, cordage, plan de jeu, lucidité, pilote, mental-muscle…) vs interdit (bien-être, méditation guidée, zen, baguette magique, énergies…).
5. **Punchlines & titres** — hero H1, sous-titres de sections (LA RÉALITÉ DU JOUEUR / CE QUI BLOQUE VRAIMENT / LA MÉTHODE), phrases mises en surbrillance, citations clés.
6. **Offres & CTA** — Service-Volée (240€/mois), Grand Chelem (3 mois 585€ / 6 mois 999€), Bilan de Lucidité 15 min, features de chaque pack.
7. **Méthode en 3 étapes** — Identité / Déblocage / Réflexe (contenu actuel des cartes).
8. **Poisons & antidotes** — tableau des conseils-poisons vs réponse de Quentin.
9. **Profils Ennéagramme tennis** — 9 profils avec tagline + une ligne d'angle LinkedIn par profil.
10. **Nuage d'excuses (15)** — liste verbatim utilisée dans l'animation.
11. **Témoignages publics** — note : gérés dynamiquement en base, exemples démo si présents dans le code.
12. **Bio & crédibilité** — diplômes/formations (DEJEPS, Sophrologie, Visualisation Aymeric Guillot, etc.) et expériences.
13. **Angles LinkedIn prêts à l'emploi** — 8-10 angles dérivés du contenu (un par pilier/poison/profil) pour amorcer les posts.

## Livrable
Fichier unique `/mnt/documents/quentin-extracted-data.md` + balise `<presentation-artifact>` pour téléchargement direct. Aucun changement de code applicatif.
