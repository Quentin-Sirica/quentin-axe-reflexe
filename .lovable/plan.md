# Ajustements ciblés sur `src/routes/index.tsx`

## 1. Surlignage vert → jaune-vert du site
Le span "le problème vient de votre mental" passe de `text-success` (vert standard) à `text-primary` (le jaune-vert tennis ball déjà utilisé partout sur le site). Suppression du token `--accent-green` qui devient inutile.

## 2. Équation de la performance — revenir aux 25% + hover inspirant
- Réafficher les **25%** sous chaque pilier (Mental, Technique, Physique, Tactique), comme dans la première version.
- Sur les 3 blocs **Technique / Physique / Tactique**, au survol (`group-hover`), un overlay apparaît avec un court message qui montre la maîtrise de Quentin (au lieu d'un sous-label statique). Le bloc Mental garde son traitement spécial (ring + glow primary, pas de hover puisque c'est sa spécialité affichée d'office).

Propositions de phrases au survol (à valider — modifiables facilement) :
- **Technique** : "15 ans à analyser les gestes. Je sais lire un coup."
- **Physique** : "Préparation, récup, gestion d'effort — je connais le terrain."
- **Tactique** : "Lire l'adversaire, construire le point — mon ADN de coach."

Le gros encart "FAUX — Le mental c'est 60% du travail" (point 5 de l'itération précédente) reste en place au-dessus de l'équation.

## 3. Métaphore du pilote — nouvelles pistes
À la place de la voiture de course actuelle, voici 4 propositions qui collent mieux à l'univers de Quentin (sport individuel, pression, lucidité sous stress) :

- **A — L'iceberg** : "La technique, le physique, la tactique, c'est la partie visible — 10% au-dessus de l'eau. Le mental, c'est les 90% sous la surface. C'est ce qu'on ne voit pas qui fait couler le bateau."
- **B — Le système d'exploitation** : "Technique, physique, tactique : ce sont vos applications. Le mental, c'est l'OS qui les fait tourner. Si l'OS plante, peu importe la qualité des apps — rien ne fonctionne."
- **C — Le chef d'orchestre** : "Technique, physique, tactique : ce sont vos musiciens, chacun virtuose dans sa partie. Le mental, c'est le chef d'orchestre. Sans lui, vous avez 3 solos qui jouent en même temps — pas une symphonie."
- **D — Le pilote (variante affinée)** : "La technique, c'est l'avion. Le physique, c'est le carburant. La tactique, c'est le plan de vol. Le mental, c'est le pilote. Sous orage, ce n'est jamais la machine qui décroche en premier — c'est l'homme aux commandes."

Indiquez A, B, C ou D (ou un mix) — je n'en implémente qu'une.

## 4. Phrases poisons / antidote — refonte UX/UI
Refonte du `poisonsExpert` en s'appuyant sur la métaphore **poison ↔ antidote** (déjà visuelle, déjà parlante) :

```
┌──────────────────────────────────────────────────────────┐
│  ☠  POISON                                                │
│  « Reste concentré »                  (texte barré, gris) │
│  ─────────────────────────────────────────────────────── │
│  ⚗  ANTIDOTE — Quentin                                    │
│  Concentré sur quoi exactement ? La plupart du temps,    │
│  ce sont les parasites qui t'empêchent de te concentrer. │
│  Comment fais-tu pour les dégager ?                      │
└──────────────────────────────────────────────────────────┘
```

Détails visuels :
- Carte unique par poison (au lieu d'un grid 2 colonnes). Plus lisible mobile + force le pairing visuel.
- Header POISON : pictogramme tête de mort `☠` + label "POISON" en mono caps, phrase barrée en gris sombre.
- Séparateur fin (line).
- Header ANTIDOTE : pictogramme fiole `⚗` + label "ANTIDOTE" en mono caps, texte de Quentin en couleur primary (jaune-vert), légèrement plus gros.
- Hover : la carte se relève (translate-y + glow primary).
- Layout : grille 2 colonnes desktop, 1 colonne mobile, 4 cartes au total.

## Détails techniques
- Aucun changement de structure de données (le tableau `poisonsExpert: {phrase, answer}[]` reste tel quel).
- Suppression du token `--accent-green` dans `src/styles.css` (devenu inutile après point 1).
- L'overlay hover des piliers de l'équation utilise `group` + `group-hover:opacity-100` sur un absolute layer, pas de JS.
- Aucune modif backend, aucune nouvelle dépendance, aucun nouvel asset.
