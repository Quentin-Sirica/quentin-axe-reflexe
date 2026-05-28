## Objectif

1. Ajouter un champ contexte obligatoire au formulaire « Postuler au programme » et persister chaque candidature en base.
2. Créer un espace admin protégé qui liste les leads, avec deux onglets :
   - **Programme** (candidatures formulaire)
   - **Profil Mental** (résultats test Ennéagramme — table déjà existante)

## Plan détaillé

### 1. Base de données (migration)
- Nouvelle table `program_applications` : `first_name`, `email`, `sport`, `ranking`, `context` (texte long, obligatoire).
- Enum `app_role` + table `user_roles` + fonction `has_role()` (pattern sécurisé, pas de rôle stocké sur le profil).
- RLS :
  - `program_applications` : INSERT public (anon + authenticated), SELECT réservé aux admins.
  - `enneagramme_leads` : ajouter une policy SELECT admin (l'insertion existante reste via service role).
  - `user_roles` : SELECT pour l'utilisateur connecté sur ses propres lignes.
- GRANTs explicites pour `anon`, `authenticated`, `service_role` selon les policies.

### 2. Formulaire programme (`src/routes/index.tsx`)
- Ajouter un champ `<textarea>` **Contexte / objectif** obligatoire (ex : « Projet de monter classement, viser DE, casser un plateau… »).
- Soumission via un nouveau server function `submitProgramApplication` (insert via `supabaseAdmin`, validation Zod côté serveur).
- Conserver l'écran de confirmation existant.

### 3. Auth
- Activer email/mot de passe (pas d'auto-confirm, pas de Google).
- Nouvelle route publique `/login` : connexion email + mot de passe (pas d'inscription publique — le compte admin sera créé manuellement par Quentin via la page Utilisateurs de Lovable Cloud, puis on lui attribuera le rôle `admin` via une insertion en base que je préparerai).
- Listener `onAuthStateChange` ajouté à `__root.tsx` pour invalider le cache.
- Wiring `attachSupabaseAuth` dans `src/start.ts` si pas déjà présent.

### 4. Admin
- Layout protégé `src/routes/_authenticated.tsx` (gate sur `context.auth.isAuthenticated`).
- Route `src/routes/_authenticated/admin.tsx` :
  - `beforeLoad` re-vérifie le rôle admin via un server fn `requireAdmin` (utilise `requireSupabaseAuth` + `has_role`). Redirection sinon.
  - UI : header sobre cohérent avec le design (typo display, tokens existants), 2 onglets via `Tabs` shadcn.
  - **Onglet Programme** : tableau (date, nom, email, sport, classement, contexte développable) + recherche basique.
  - **Onglet Profil Mental** : tableau (date, prénom, email, sport, classement, profil dominant + scores).
  - Bouton « Exporter CSV » par onglet (côté client).
  - Bouton « Déconnexion ».
- Server functions admin (`src/lib/admin.functions.ts`) :
  - `listProgramApplications`, `listEnneagrammeLeads`, `getCurrentRole` — toutes gated par `requireSupabaseAuth` + check `has_role(admin)` côté handler.

### 5. Router context
- Étendre le context auth (`isAuthenticated`, `user`) alimenté depuis le browser client Supabase + `onAuthStateChange`.

## Technique

- Stack : TanStack Start, server functions (`createServerFn`) + `supabaseAdmin` pour les lectures admin, `requireSupabaseAuth` pour vérifier l'identité.
- Pas d'Edge Function.
- Le compte admin de Quentin sera créé après la migration : je vous donnerai la marche à suivre (créer le user dans l'onglet Utilisateurs de Lovable Cloud, puis je lance une insertion `user_roles` avec son UUID).
- Pas de Google sign-in (vous avez choisi email/mot de passe uniquement).

## Hors scope

- Pas d'envoi d'email automatique aux candidats (peut être ajouté plus tard).
- Pas de pagination serveur (volumes faibles à court terme — tri/recherche côté client).
