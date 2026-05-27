## 1. Refonte design — Light mode "court & terre battue"

Refonte des tokens dans `src/styles.css` :
- `--background` : blanc cassé (oklch ~0.985 0.005 90)
- `--foreground` : graphite très foncé pour contraste fort
- `--primary` : jaune fluo tennis conservé (oklch 0.92 0.22 122)
- `--clay` : orange terre battue mis en avant comme accent secondaire
- `--card` : blanc pur avec bordure graphite fine
- `--muted-foreground`, `--border` recalibrés pour fond clair
- Suppression du gradient sombre dans `body`, remplacé par un fond blanc cassé avec une légère texture "ligne de court" graphite (très subtile)
- `.court-grid` repassée en lignes graphite à faible opacité
- `.glow-primary` : halo jaune plus discret adapté au fond clair
- `.text-stroke` : stroke graphite

Aucune classe couleur en dur ne sera ajoutée : tout passera par les tokens, donc les composants existants suivent automatiquement. Quelques ajustements ciblés sur les sections qui utilisaient `bg-graphite-deep` (Agitation, Offres) → passage à un gris très clair (`bg-secondary` ou `bg-clay/5`) pour rythmer la page.

## 2. Encarts "Outils mentaux" dans Solution & Méthode

Ajout sous le bloc "Axe → Déblocage → Réflexe" d'un sous-bloc **"Le vocabulaire de la méthode"** : 4 cartes explicatives reprenant mot pour mot les définitions de Quentin (PDF outils_mentaux_tennis_v2) :

1. **L'Ennéagramme** — comprendre comment tu fonctionnes (9 profils, motivations, peurs, automatismes).
2. **La PNL** — prendre du recul sur une situation à régler, identifier les automatismes pour les changer.
3. **La Sophrologie** — respiration + 5 sens, relâcher, se booster, trouver ses ressources.
4. **L'Imagerie mentale** — se voir/sentir/entendre faire, conditionner cerveau et corps entre les points.

Chaque carte : numéro 01/04, titre, courte définition (texte du PDF condensé/fidèle), micro-tag "Outil mental". Style cohérent avec les cards existantes, accent jaune sur le numéro.

## 3. Simulateur Ennéagramme (lead magnet)

Remplacement complet du composant `TestWidget` par un vrai test interactif basé sur le doc `tennis_mental_profile_complet-1`.

### Flow utilisateur
1. **Écran d'intro** — pitch + bouton "Démarrer le test (5 min)"
2. **9 écrans de questions** — chacun avec 4 affirmations + "Aucune ne me correspond totalement". Consigne affichée en haut. Barre de progression 1/9 → 9/9. Multi-sélection (0–4).
3. **Écran de capture lead** (après écran 9, avant révélation) — formulaire obligatoire :
   - Prénom
   - Email *(obligatoire)*
   - Sport (Tennis / Padel / Badminton)
   - Niveau / classement (optionnel)
   - CTA "Révéler mon profil"
4. **Écran résultat** — affichage du profil dominant :
   - Numéro + nom + tagline (ex: "PROFIL 03 — Le Performeur · Perdre n'est pas une option")
   - Illustration / pictogramme du profil (badge graphique généré, voir ci-dessous)
   - 4 blocs : Forces / Piège / Ce qui coûte des points / Ce qui libère (textes fidèles au doc)
   - CTA bridge fort : **"Aller plus loin avec un Bilan de Lucidité offert"** → scroll vers `#contact` (form déjà existant) avec message "Votre profil est un point de départ. Le Bilan de Lucidité permet d'affiner et de définir votre plan d'action personnalisé."
   - Mention "Un récap détaillé vient d'être envoyé sur votre email."

### Logique de scoring
Chaque affirmation est mappée à un profil (1 à 9) selon le doc. Score = nb d'affirmations cochées par profil. Profil dominant = max. Égalité → ordre de priorité par fréquence des cochages globaux puis numéro de profil ascendant.

### Données stockées (Lovable Cloud)
Table `enneagramme_leads` :
- id (uuid), created_at
- first_name, email, sport, ranking
- dominant_profile (int 1–9), profile_scores (jsonb), answers (jsonb)
- RLS : INSERT public anon autorisé (lead magnet), SELECT réservé service_role
- GRANT INSERT anon + service_role ALL

Server function `submitEnneagrammeLead` (`src/lib/enneagramme.functions.ts`) :
- inputValidator Zod (email valide, sport in enum, max lengths)
- Insert via `supabaseAdmin` dans `enneagramme_leads`
- Retourne `{ ok: true }`

Côté UI : le calcul du profil dominant est fait côté client à partir des réponses (pas besoin d'attendre la DB pour afficher le résultat). Le storage se fait en parallèle, non bloquant.

### Illustration des profils
9 badges visuels minimalistes générés (SVG inline) — pas d'image lourde : grand chiffre du profil + motif géométrique distinctif + accent jaune ou orange terre battue selon le centre (mental/cœur/instinct). Légère animation d'apparition (Framer/CSS).

## 4. Fichiers touchés

- `src/styles.css` — refonte tokens light mode
- `src/routes/index.tsx` — `SolutionSection` (ajout encarts outils), `TestWidget` réécrit, mini-ajustements de classes là où `bg-graphite-deep` est utilisé
- `src/lib/enneagramme.functions.ts` *(nouveau)* — server fn d'insert
- `src/lib/enneagramme-data.ts` *(nouveau)* — affirmations × profil, contenus de résultats, mapping écrans, profils metadata
- `src/components/EnneagrammeTest.tsx` *(nouveau)* — composant client multi-étapes (sortie de `routes/index.tsx` pour la lisibilité)
- Migration Supabase — table `enneagramme_leads` + RLS + grants
- Activation de Lovable Cloud (prérequis)

## 5. Hors scope

- Pas d'envoi d'email auto (mentionné dans l'UI mais pas implémenté ce tour — peut être ajouté ensuite via Resend)
- Pas de dashboard admin pour visualiser les leads (visibles directement dans Cloud)
- Pas de retest / sauvegarde session (test refait à 0 si refresh)
