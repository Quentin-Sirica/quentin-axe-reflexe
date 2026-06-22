## Plan : Mise à jour des phrases de profil du test Ennéagramme

### Contexte
Les phrases `tagline` associées à chaque profil du Tennis Mental Profile (dans `src/lib/enneagramme-data.ts`) doivent être ajustées pour coller à l'ADN de Quentin.

### Modifications demandées
1. **PROFIL 01 — Le Perfectionniste**  
   Remplacer `"Si c'est pas parfait, ça ne vaut rien"` par `"Si c'est pas parfait, ça ne me va pas"`.
2. **PROFIL 03 — Le Performeur**  
   Garder `"Perdre n'est pas une option"` (déjà à jour dans le code).
3. **PROFIL 09 — Le Médiateur**  
   Garder `"Que ça reste cool — pas de tension"` (déjà à jour dans le code).

### Fichier concerné
- `src/lib/enneagramme-data.ts` (ligne 119, champ `tagline` du profil `1`).

### Validation
Vérifier visuellement dans le test intégré que la phrase du Perfectionniste s'affiche correctement après la soumission du questionnaire.