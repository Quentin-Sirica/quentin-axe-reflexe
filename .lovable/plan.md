Tous les changements ci-dessous se font dans `src/routes/index.tsx` (sauf mention).

## 1. Suppression de "Badminton"
- Hero : badge "Tennis · Padel · Badminton" → "Tennis · Padel".
- Footer : même chose.
- Formulaire (FinalCTA) : retirer le bouton Badminton (passage de `grid-cols-3` à `grid-cols-2` sur le sélecteur).
- Je laisse le type `"Tennis" | "Padel" | "Badminton"` côté serveur intact (rétro-compat, aucun impact UI).

## 2. Nouveau nuage des fausses excuses
Remplacement intégral du tableau `fakeExcuses` par les 15 nouvelles excuses fournies (mêmes 2 lignes de ticker en sens opposés, aucune modif de composant).

## 3. Surlignage jaune-vert
Dans le H2 du bloc Problème : `jouer mieux que votre classement` enveloppé dans `<span className="text-primary">` (jaune-vert du thème).

## 4. Surlignage vert
Dans la phrase d'accroche du bas du bloc Problème : isoler `le problème vient de votre mental` dans un `<span>` avec une couleur verte (utilisation d'un vert dédié — voir section technique).

## 5. Équation de performance — plus d'impact + nouveaux labels
- Mettre l'idée reçue "Le mental c'est 60% du travail" beaucoup plus visible : la déplacer juste sous le titre H2, dans un encart dédié (gros texte barré rouge + tampon "FAUX" surdimensionné), au lieu d'être planquée dans la barre du haut.
- Reformuler les 4 blocs (suppression du "25%" rigide, ajout d'un sous-label qui montre la maîtrise) :
  - Mental — *ma spécialité*
  - Technique — *expert*
  - Physique — *je connais bien*
  - Tactique — *expert*
- Le bloc Mental garde l'accent visuel (ring + glow), mais le message global devient "je maîtrise les 4, j'opère sur le mental".

## 6. Métaphore du pilote — 3 pistes à choisir
Le bloc devient une vraie métaphore incarnée. Suppression de la phrase finale "Le mental n'est peut-être pas la cause… c'est la conséquence…".

3 propositions (je n'en garde qu'une à votre signal) :
- **A — Voiture de course** : "La technique, c'est la carrosserie. Le physique, c'est le moteur. La tactique, c'est le GPS. Le mental, c'est le pilote. Vous pouvez avoir la meilleure machine du paddock — sans pilote lucide, vous finissez dans le mur au premier virage serré."
- **B — Avion de chasse** : "Technique : la cellule. Physique : les réacteurs. Tactique : le radar. Mental : le pilote dans le cockpit. À Mach 2 sous pression, ce n'est pas l'appareil qui décroche en premier, c'est l'homme aux commandes."
- **C — Équipage F1** : "La technique, c'est la monoplace. Le physique, c'est le moteur. La tactique, c'est la stratégie du muret. Le mental, c'est vous dans le baquet — celui qui décide à 300 km/h si vous freinez tard ou si vous lâchez."

Indiquez A, B ou C (ou un mix) à l'implémentation.

## 7. Phrases poisons + contre-argumentaire d'expert
Restructuration du bloc "Anti-Bullshit". Passage d'une simple liste barrée à un format **poison → réponse de Quentin** :

```
"Reste concentré"     → Concentré sur quoi exactement ? Et la plupart du
                        temps, ce sont les parasites qui t'empêchent
                        de te concentrer. Comment fais-tu pour les dégager ?
"Lâche-toi"           → Le genre de phrase qui ne veut strictement rien
                        dire sous pression. Ce n'est pas en deux mots
                        qu'on change tout.
"Fais-toi confiance"  → Ok, mais sur quoi, et comment tu fais ça
                        concrètement ?
"Sois positif"        → L'intention est bonne. Mais comment, quand tu es
                        dans un état émotionnel qui ne le permet pas ?
```

Visuellement : chaque ligne = phrase barrée à gauche, réponse à droite, séparateur, montre l'expertise.

## 8-10. Réécriture des 3 étapes de la méthode
Mise à jour de l'objet `steps` :
- **01 Identité** : "On part de votre identité profonde. On définit votre profil parmi les neuf types de personnalité pour comprendre votre fonctionnement face à la pression en compétition. C'est notre socle."
- **02 Déblocage** : "Une fois qu'on sait qui vous êtes, on travaille sur ce qui bloque concrètement. On utilise la PNL et la sophrologie pour identifier et enlever les freins et les peurs qui vous empêchent de performer quand ça compte vraiment."
- **03 Réflexe** (renommer le tag → "Le Réflexe — Visualisation & Sophrologie") : "L'outil ultime du terrain. On ancre des ressources solides et une stabilité émotionnelle pour savoir quoi faire dans chaque moment clé du match."

## 11. Offres
- **Pack Service-Volée** : ajout d'une 4e feature `"Suivi WhatsApp entre les séances"`.
- **Pack Grand Chelem** : ajout d'un **toggle 3 mois / 6 mois** sur la carte uniquement.
  - 3 mois → `585€` (badge "9 séances · 65€/séance")
  - 6 mois → `999€` (badge "18 séances · 55,50€/séance · -15%")
  - Le toggle est local à la carte (petit `useState`), met à jour `price`, `duration`, et la liste de features dynamiquement.
  - La feature "Tarif dégressif (9 ou 18 séances)" devient redondante → remplacée par "Vestiaire Virtuel (Drive)" + "WhatsApp debrief post-match" déjà présents + "Bilan trimestriel" pour rester à 3 items.

## Détails techniques
- Le vert du point 4 : on étend `src/styles.css` avec un token `--accent-green` (HSL ~ `142 71% 45%`) et une classe utilitaire `.text-accent-green` plutôt que d'écrire `text-[#...]` en dur (respect du design system).
- Le toggle Grand Chelem nécessite de refactoriser la carte en sous-composant `OfferCard` qui sait gérer une variante "à plans" — les deux autres cartes restent identiques.
- Le poisons block : remplacer le tableau `poisons` (4 strings) par `poisonsExpert` (4 objets `{ phrase, answer }`).
- Le step 02 et 03 changent : leur `tag` reflète aussi les outils (PNL + Sophrologie sur l'étape 2, Visualisation + Sophrologie sur l'étape 3).
- Aucune modif backend, aucune nouvelle dépendance.

## Hors-scope confirmé
- Pas de retrait de "Badminton" dans le type serveur ni dans la BDD.
- Pas de nouveaux assets / images.
