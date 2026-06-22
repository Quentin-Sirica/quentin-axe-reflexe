// Données du test Tennis Mental Profile (basé sur l'Ennéagramme)
// Source : doc tennis_mental_profile_complet-1 (Quentin Sirica)

export type ProfileId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface ScreenQuestion {
  text: string;
  profile: ProfileId;
}

export interface Screen {
  id: number;
  questions: ScreenQuestion[];
}

export const CONSIGNE =
  "Coche uniquement ce qui te correspond totalement — tout le temps ou presque, dans quasiment tous les contextes de ta vie. Si c'est juste parfois, ne coche pas.";

export const SCREENS: Screen[] = [
  {
    id: 1,
    questions: [
      { text: "Je prends mes décisions sur le court vite et sans hésiter — l'indécision m'énerve.", profile: 8 },
      { text: "Je préfère gérer mon match seul — dépendre du coach ou des autres me met mal à l'aise.", profile: 5 },
      { text: "Je doute souvent de mes choix tactiques en match — même quand j'ai bien préparé.", profile: 6 },
      { text: "La routine d'entraînement répétitive me démotive profondément — j'ai besoin de nouveauté.", profile: 7 },
    ],
  },
  {
    id: 2,
    questions: [
      { text: "J'ai besoin de me sentir indispensable sur le court — que mon coach ou mon partenaire compte sur moi.", profile: 2 },
      { text: "Je respecte uniquement les adversaires qui se battent vraiment — ceux qui subissent me déçoivent.", profile: 8 },
      { text: "Face à un joueur imprévisible que je n'arrive pas à lire, je perds complètement mes repères.", profile: 5 },
      { text: "Avant un match, j'analyse l'adversaire en détail — agir sans comprendre me déstabilise.", profile: 5 },
    ],
  },
  {
    id: 3,
    questions: [
      { text: "J'ai besoin que mon coach me valorise pour être vraiment dans mon match.", profile: 2 },
      { text: "Je suis mon critique le plus sévère sur le court — personne ne me juge plus que moi.", profile: 1 },
      { text: "Je mesure ma valeur de joueur uniquement à mes résultats — pas à mon niveau de jeu.", profile: 3 },
      { text: "J'ai besoin que mon jeu soit une expression de qui je suis — sinon à quoi bon jouer.", profile: 4 },
    ],
  },
  {
    id: 4,
    questions: [
      { text: "Sur le court je veux toujours donner l'image de quelqu'un de fort et de compétent.", profile: 3 },
      { text: "Ce qui me motive sur un court c'est gagner — le beau jeu sans résultat ne m'intéresse pas.", profile: 3 },
      { text: "Je rejoue souvent les pires scénarios dans ma tête avant un match pour être prêt.", profile: 6 },
      { text: "J'évite naturellement les situations de jeu qui sont trop contraignantes ou trop sérieuses.", profile: 7 },
    ],
  },
  {
    id: 5,
    questions: [
      { text: "Je ne supporte pas de jouer comme tout le monde — j'ai besoin que mon jeu soit unique.", profile: 4 },
      { text: "Plus le match est difficile et intense, plus je me sens vivant et motivé.", profile: 8 },
      { text: "Une ambiance tendue ou agressive sur le court me perturbe profondément dans mon jeu.", profile: 9 },
      { text: "Je joue mieux quand je sens que les gens autour de moi m'apprécient et m'encouragent.", profile: 2 },
    ],
  },
  {
    id: 6,
    questions: [
      { text: "Un match sans intensité émotionnelle, je le perds avant même de vraiment le jouer.", profile: 4 },
      { text: "Les matchs longs et laborieux où il faut souffrir sans éclat me vident complètement.", profile: 7 },
      { text: "Sur le court j'impose mon jeu — subir le jeu de l'adversaire m'est insupportable.", profile: 8 },
      { text: "Sans un plan de jeu clair et solide, je me sens perdu et vulnérable sur le court.", profile: 6 },
    ],
  },
  {
    id: 7,
    questions: [
      { text: "Perdre devant des gens qui comptent pour moi me touche bien au-delà du simple score.", profile: 3 },
      { text: "Quand personne ne remarque mes efforts sur le court, je me vide complètement.", profile: 2 },
      { text: "Mon tennis doit me ressembler — jouer un tennis fonctionnel et sans âme me dégoûte.", profile: 4 },
      { text: "Si je ne prends plus de plaisir sur le court, mon cerveau décroche — peu importe l'enjeu.", profile: 7 },
    ],
  },
  {
    id: 8,
    questions: [
      { text: "Une faute que j'aurais pu éviter me ronge bien après la fin du match.", profile: 1 },
      { text: "Je rejoue mentalement mes erreurs après un match pour ne plus jamais les refaire.", profile: 1 },
      { text: "J'ai du mal à hausser le ton ou à imposer mon jeu — je préfère que ça reste fluide.", profile: 9 },
      { text: "J'ai du mal à faire confiance à mon instinct — j'ai besoin d'être sûr avant d'agir.", profile: 6 },
    ],
  },
  {
    id: 9,
    questions: [
      { text: "J'évite les confrontations sur le court — même quand il faudrait vraiment m'affirmer.", profile: 9 },
      { text: "Je n'aime pas être surpris sur le court — j'ai besoin d'avoir anticipé ce qui peut arriver.", profile: 5 },
      { text: "Si mon niveau n'est pas impeccable, j'ai du mal à accepter le résultat même si je gagne.", profile: 1 },
      { text: "Le conflit et la tension me coûtent tellement que j'évite parfois de me battre vraiment.", profile: 9 },
    ],
  },
];

export interface ProfileResult {
  id: ProfileId;
  name: string;
  tagline: string;
  forces: string;
  piege: string;
  cout: string;
  liberation: string;
  /** Couleur d'accent SVG : "primary" (jaune) ou "clay" (orange terre battue) */
  accent: "primary" | "clay";
}

export const PROFILES: Record<ProfileId, ProfileResult> = {
  1: {
    id: 1,
    name: "Le Perfectionniste",
    tagline: "Si c'est pas parfait, ça ne me va pas",
    forces:
      "Tu ne laisses rien au hasard. Tu prépares, tu structures, tu t'entraînes avec rigueur. Quand les autres improvisent, toi tu as déjà un plan. Ta discipline est une arme que peu de joueurs ont vraiment.",
    piege:
      "Une faute et tu te juges. Pas juste la faute — toi. Tu peux passer plus de temps à te détruire mentalement qu'à jouer le point suivant. Sur le court, ton pire adversaire c'est toi-même.",
    cout:
      "L'erreur évitable. L'arbitrage approximatif. Le partenaire qui s'en fout. Tout ce qui n'est pas à la hauteur de tes standards te sort du jeu — même inconsciemment.",
    liberation:
      "Un match imparfait peut quand même se gagner. La régularité bat la perfection. Le jour où tu acceptes ça vraiment — pas juste dans ta tête, dans ton corps — ton tennis change de niveau.",
    accent: "clay",
  },
  2: {
    id: 2,
    name: "L'Altruiste",
    tagline: "J'ai besoin de me sentir utile — et que ça se voie",
    forces:
      "Tu sais ce dont les autres ont besoin avant même qu'ils le demandent. En double, en équipe, tu es le ciment du groupe. Ta générosité et ton attention aux autres créent une ambiance que peu de joueurs savent installer.",
    piege:
      "Tu joues pour plaire. Au coach, au public, à ton partenaire. Quand on te le rend bien, tu es au top. Mais quand personne ne remarque, tu te vides — et tu peux perdre un match juste parce que tu ne t'es pas senti aimé sur le court.",
    cout:
      "Te donner à fond sans retour. Ne pas te sentir apprécié, encouragé, indispensable. L'ingratitude te coupe les jambes plus sûrement qu'un mauvais adversaire.",
    liberation:
      "Le jour où tu joues pour toi — pas pour être aimé, pas pour être indispensable — tu découvres un tennis que tu ne te connaissais pas encore.",
    accent: "primary",
  },
  3: {
    id: 3,
    name: "Le Performeur",
    tagline: "Perdre n'est pas une option",
    forces:
      "Tu es fait pour la compétition. Les grands matchs, les moments décisifs, la pression — c'est ton terrain naturel. Tu t'adaptes à tout pour gagner, tu trouves toujours un moyen. Quand l'enjeu monte, tu es là.",
    piege:
      "Tu joues le score, pas le jeu. Et quand ton image est menacée — devant quelqu'un qui compte, dans un match que tu devais gagner — tu peux te gripper. Tu n'as pas peur de perdre un match. Tu as peur que les autres te voient perdre.",
    cout:
      "Paraître moins que ce que tu prétends être. Un adversaire que tu ne devais pas perdre. Ces matchs-là te touchent dans quelque chose de bien plus profond que le simple résultat.",
    liberation:
      "Un match perdu ne dit rien sur ta valeur. Le résultat n'est pas ton identité. Le jour où tu joues pour le jeu — pas pour l'image — tu libères un potentiel que même toi tu ne soupçonnes pas encore.",
    accent: "clay",
  },
  4: {
    id: 4,
    name: "L'Authentique",
    tagline: "Mon tennis doit avoir de l'âme — sinon à quoi bon",
    forces:
      "Tu as un tennis que personne d'autre n'a. Créatif, imprévisible, capable de coups que les autres n'osent même pas tenter. Dans les moments d'intensité, tu sors des trucs incroyables. Ton tennis, c'est une expression de qui tu es — et ça se voit.",
    piege:
      "Tu es trop lié à ton humeur. Quand le beau jeu vient, tu es inarrêtable. Quand il ne vient pas, tu te perds dans ta tête. Tu peux saboter un match qui te semble trop ordinaire — sans même t'en rendre compte.",
    cout:
      "Jouer un match sans émotion, sans esthétique, sans sens. Un tennis de survie qui ne te ressemble pas. Ces matchs-là, tu les perds avant même d'avoir commencé à les jouer vraiment.",
    liberation:
      "Gagner un match moche, c'est aussi une forme de caractère. Le jour où tu acceptes que ton tennis peut être utilitaire sans trahir qui tu es — tu deviens un joueur que personne ne sait plus comment battre.",
    accent: "primary",
  },
  5: {
    id: 5,
    name: "L'Analyste",
    tagline: "Je dois comprendre avant d'agir",
    forces:
      "Tu analyses, tu anticipes, tu gères seul — et tu le fais bien. Tu arrives sur le court préparé, avec un plan clair. Cette autonomie fait de toi un joueur difficile à surprendre.",
    piege:
      "Ce que tu ne comprends pas te déstabilise. Face à un adversaire imprévisible que tu n'arrives pas à décoder, tu te vides. Tu passes plus de temps à chercher sa logique qu'à jouer ton tennis.",
    cout:
      "Les adversaires irrationnels, les conditions changeantes, l'imprévu. Tout ce que tu ne peux pas modéliser t'épuise mentalement — et fait dérailler ton jeu.",
    liberation:
      "T'appuyer sur ton coach, sur ton partenaire. Tu n'as pas besoin de tout gérer seul. S'ouvrir aux autres, c'est le chemin qui te fait passer au niveau supérieur.",
    accent: "clay",
  },
  6: {
    id: 6,
    name: "Le Vigilant",
    tagline: "Je doute — mais j'y vais quand même",
    forces:
      "Tu ne lâches jamais. Même quand ça va mal, même quand tu prends un set, même quand tout semble perdu — tu es encore là. Ta combativité et ta fidélité à ton plan de jeu font de toi un adversaire que personne n'a envie d'affronter sur la durée.",
    piege:
      "Tu as besoin de contrôler — et au tennis, tu ne peux pas tout contrôler. Le rebond, l'arbitrage, l'adversaire — rien n'est jamais garanti. Et quand quelque chose t'échappe, le doute s'installe.",
    cout:
      "L'imprévu, l'incertitude, le moment où ton plan ne marche plus. Plus tu doutes, plus tu joues petit — et plus tu joues petit, plus tu donnes raison à ton doute.",
    liberation:
      "Ta vraie sécurité, elle est dans ton travail. Tu t'es préparé, tu t'es entraîné — et ça, personne ne peut te l'enlever. Fais confiance à ce que tu as construit.",
    accent: "primary",
  },
  7: {
    id: 7,
    name: "L'Enthousiaste",
    tagline: "Si c'est pas fun, mon cerveau est ailleurs",
    forces:
      "Tu es spontané, offensif, imprévisible. Quand tu es dans ton élan, tu es inarrêtable. Tu trouves des solutions là où les autres voient des murs. Ton énergie est contagieuse — sur le court, tu vis le jeu.",
    piege:
      "Quand le match devient lourd, sérieux, laborieux — ton cerveau décroche. Ce n'est pas un manque de courage. C'est juste que la douleur et l'ennui ne sont pas ton carburant. Sans plaisir, tu n'es plus vraiment là.",
    cout:
      "Les matchs serrés qui durent, où il faut souffrir balle après balle sans jamais voir le bout. Ces moments sans éclat, sans plaisir — où le tennis devient un effort pur.",
    liberation:
      "Apprendre à trouver du plaisir même dans la bataille. Pas le plaisir du beau jeu — le plaisir du combat. Le jour où tu touches ça, plus personne ne peut te sortir d'un match difficile.",
    accent: "primary",
  },
  8: {
    id: 8,
    name: "Le Leader",
    tagline: "Je suis là pour diriger — point.",
    forces:
      "Tu es dans l'action, tu décides vite, tu n'hésites pas. Quand ça devient difficile, tu te bats encore plus fort. Cette énergie et cette détermination font de toi un joueur que personne n'a envie d'affronter.",
    piege:
      "Tu détestes perdre le contrôle. Quand le match t'échappe, tu pousses encore plus fort — et parfois trop fort. Tu peux passer à côté d'un simple ajustement qui aurait tout changé.",
    cout:
      "Un adversaire qui joue lentement, qui subit sans jamais vraiment se battre. Ce style de jeu t'énerve — et cet énervement te fait perdre ton tennis.",
    liberation:
      "Ton énergie est ta plus grande force. Apprendre à la doser, c'est ce qui fait la différence entre un joueur fort et un joueur qui gagne vraiment.",
    accent: "clay",
  },
  9: {
    id: 9,
    name: "Le Médiateur",
    tagline: "Que ça reste cool — pas de tension",
    forces:
      "Tu t'adaptes à tout et à tout le monde. Tu es régulier, jamais perturbé, toujours là. Ton calme est une vraie force — dans les moments de tension, tu es celui qui garde la tête froide.",
    piege:
      "Tu ressens l'ambiance et les émotions autour de toi — et ça t'influence. Face à un adversaire agressif ou tendu, tu peux rentrer dans son jeu sans t'en rendre compte. Tu veux que ça reste fluide — et parfois tu évites le combat pour préserver cette harmonie.",
    cout:
      "Les moments où il faut t'affirmer, imposer, gagner un point de façon directe. Tout ce qui ressemble à une confrontation te freine — même quand c'est nécessaire.",
    liberation:
      "S'affirmer sur un court ce n'est pas créer un conflit — c'est juste jouer. Le jour où tu fais la différence entre les deux, tu découvres un joueur en toi que tu ne connaissais pas encore.",
    accent: "primary",
  },
};

export type AnswersMap = Record<number, number[]>; // screenId -> question indices selected

export function computeScores(answers: AnswersMap): Record<ProfileId, number> {
  const scores: Record<ProfileId, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  for (const screen of SCREENS) {
    const selected = answers[screen.id] ?? [];
    for (const idx of selected) {
      const q = screen.questions[idx];
      if (q) scores[q.profile] += 1;
    }
  }
  return scores;
}

export function computeDominant(scores: Record<ProfileId, number>): ProfileId {
  let best: ProfileId = 9;
  let bestScore = -1;
  // Iter par numéro croissant pour tie-break déterministe
  for (let i = 1 as ProfileId; i <= 9; i = ((i as number) + 1) as ProfileId) {
    if (scores[i] > bestScore) {
      bestScore = scores[i];
      best = i;
    }
  }
  return best;
}
