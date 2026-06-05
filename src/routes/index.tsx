import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Compass, Brain, Wind, Eye } from "lucide-react";
import { submitProgramApplication } from "@/lib/program.functions";
import quentinCourt from "@/assets/quentin-court.jpg.asset.json";
import quentinPortrait from "@/assets/quentin-portrait.jpg.asset.json";
import quentinVisio from "@/assets/quentin-visio.jpg.asset.json";
import { EnneagrammeTest } from "@/components/EnneagrammeTest";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const navLinks = [
  { href: "#methode", label: "La Méthode" },
  { href: "#offre", label: "L'Offre" },
  { href: "#test", label: "Le Test" },
];

const fakeExcuses = [
  "Je suis classé 30/1 mais je vaux 15/4.",
  "C'est à cause du vent, des balles, du soleil…",
  "Il a eu une chance de cocu sur les let et les lignes.",
  "Le mec en face a un jeu pourri, il fait que des ronds, c'est pas du tennis.",
  "Si j'arrivais à jouer en match comme à l'entraînement, je prendrais 3 classements.",
  "Je gagne jamais un super tie-break, c'est ma malédiction.",
  "J'ai pas confiance en mes coups aujourd'hui.",
  "Je pourrai être mieux classé mais c'est parce que je fais pas beaucoup de tournois.",
  "J'aurais dû re-corder avant le tournoi, mon cordage est rincé.",
  "Le gars s'est auto-arbitré tout le match, il m'a volé au moins 4 points qui étaient sur la ligne.",
  "Le match était programmé à 9h du matin, j'étais pas réveillé.",
  "Les balles de ce tournoi, c'est des vrais cailloux, aucun contrôle.",
];

const poisons = ["Calme-toi", "Respire", "Mets la balle dans le court", "Gagne le point !"];

const objectives = [
  { n: "01", title: "Monter de classement", body: "Franchir le palier qui résiste depuis deux saisons. Concrètement." },
  { n: "02", title: "Viser le haut niveau", body: "Structurer un mental de compétiteur pour les tableaux régionaux et nationaux." },
  { n: "03", title: "Devenir DE", body: "Préparer le passage en Diplôme d'État avec une exigence mentale alignée." },
  { n: "04", title: "Casser un blocage", body: "Sortir de 3, 5, 10 ans de stagnation. Comprendre enfin ce qui coince." },
];

// témoignages réels — à compléter / remplacer par les vrais retours clients
const testimonials = [
  {
    quote: "J'ai gagné mes deux premiers matchs de poule en championnat alors que je les perdais systématiquement depuis 3 ans. Rien n'avait changé techniquement.",
    name: "Marc L.",
    progress: "30/1 → 15/5",
    sport: "Tennis",
  },
  {
    quote: "Avant, je m'effondrais au 3ème set. Aujourd'hui c'est devenu mon set préféré. La méthode change la façon dont tu lis tes propres réactions.",
    name: "Camille R.",
    progress: "15/4 → 15/2",
    sport: "Tennis",
  },
  {
    quote: "On a pu jouer les phases finales en binôme sans s'engueuler une seule fois. Le mental collectif, ça se travaille.",
    name: "Julien & Théo",
    progress: "P500 → P250",
    sport: "Padel",
  },
];

const otherAudiences = [
  { title: "Équipes de Padel", body: "Préparation collective avant compétition." },
  { title: "Binômes Padel", body: "Synchroniser deux mentaux sur le court." },
  { title: "Parent + Enfant", body: "Accompagner le jeune joueur et sa famille." },
];

const steps = [
  {
    n: "01",
    tag: "L'Axe — Ennéagramme",
    title: "L'Identité",
    body: "On part de votre identité profonde. On définit votre profil parmi les 150 types de personnalité pour comprendre votre propre 'paire de lunettes' face à la compétition. C'est notre socle.",
  },
  {
    n: "02",
    tag: "Le Déblocage — PNL & Sophrologie",
    title: "Le Déblocage",
    body: "Une fois qu'on sait qui vous êtes, on utilise la PNL pour faire sauter vos croyances limitantes et on va chercher le meilleur des autres profils pour enrichir votre jeu.",
  },
  {
    n: "03",
    tag: "Le Réflexe — Visualisation",
    title: "Le Réflexe",
    body: "L'outil ultime du terrain. On ancre des ressources solides et une stabilité émotionnelle pour savoir quoi faire dans le contexte précis du match, entre deux points.",
  },
];

const outils = [
  {
    n: "01",
    name: "L'Ennéagramme",
    icon: Compass,
    teaser: "Connaître ton fonctionnement profond.",
    body: "Un outil pour comprendre comment tu fonctionnes. Il y a 9 profils, chacun avec ses motivations profondes, ses peurs et sa façon d'aborder les choses. Deux joueurs perdent le même point — l'un doute, l'autre s'énerve, un troisième se juge. Quand tu te connais vraiment, tout devient plus simple sur un court.",
  },
  {
    n: "02",
    name: "La PNL (Programmation Neurolinguistique)",
    icon: Brain,
    teaser: "Reprogrammer les automatismes qui te coûtent des matchs.",
    body: "Prendre du recul sur une situation que tu veux régler. Tu rates un coup facile, tu t'effondres, le match bascule. La PNL t'aide à comprendre ce qui s'est passé en toi à ce moment-là, et ce dont tu aurais eu besoin. La prochaine fois, tu seras capable de changer tes automatismes — parce que tu les auras identifiés.",
  },
  {
    n: "03",
    name: "La Sophrologie",
    icon: Wind,
    teaser: "Respirer, relâcher, recharger entre deux points.",
    body: "Des outils simples et doux. Par la respiration et la connexion à tes cinq sens, elle te permet de ressentir ce qui se passe à l'intérieur de toi. Elle t'apprend à te détendre, relâcher les tensions, te booster et trouver les ressources dont tu auras besoin sur le court.",
  },
  {
    n: "04",
    name: "L'Imagerie Mentale",
    icon: Eye,
    teaser: "Pré-vivre le match avant de le jouer.",
    body: "Une compétence que tu travailles de n'importe où — même depuis ton canapé. Te voir faire, te sentir faire, t'entendre faire, exactement comme tu devrais le faire. Tu conditionnes ton cerveau et ton corps avant même d'être sur le terrain. Sur le court, tu l'utilises entre chaque point pour rester dans le positif.",
  },
];

const offers = [
  {
    badge: "Offert",
    name: "Bilan de Lucidité",
    duration: "15 minutes",
    price: "0€",
    desc: "Étape obligatoire. On analyse votre besoin. Si vous n'êtes pas prêt à vous impliquer, je vous le dis cash. L'investissement est bilatéral.",
    cta: "Demander mon bilan",
    features: ["Diagnostic mental", "Définition d'objectif", "Réponse sans filtre"],
  },
  {
    badge: "Le déclic",
    name: "Pack Service-Volée",
    duration: "1 mois",
    price: "80€ /séance",
    desc: "L'impulsion pour débloquer un palier. Définition de votre profil Ennéagramme + 3 séances d'1h30 + outils.",
    cta: "Postuler au pack",
    features: ["Profil Ennéagramme complet", "3 séances de 1h30", "Outils PNL & visualisation"],
    featured: true,
  },
  {
    badge: "Suivi Élite",
    name: "Abonnement Grand Chelem",
    duration: "3 ou 6 mois",
    price: "65€ /séance",
    desc: "Tarifs dégressifs (65€ la séance au lieu de 80€), accès au Drive 'Vestiaire Virtuel' (ressources / vidéos) et suivi WhatsApp exclusif pour les débriefs à chaud.",
    cta: "Postuler au pack",
    features: ["Tarif dégressif", "Vestiaire Virtuel (Drive)", "WhatsApp exclusif post-match"],
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <ProblemSection />
      <AgitationSection />
      <SolutionSection />
      <ResultsSection />
      <TestWidget />
      <OffersSection />
      <OtherAudiences />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="h-2 w-2 bg-primary rounded-full shadow-[0_0_12px_var(--primary)]" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Méthode Axe-Réflexe
          </span>
          <span className="hidden sm:block font-display font-semibold text-sm text-foreground/90">
            // Quentin Sirica
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold rounded-md hover:bg-primary/90 transition-all hover:scale-[1.02]"
        >
          Bilan de Lucidité <span className="opacity-70">(15 min)</span>
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Menu">
          <div className="space-y-1.5">
            <span className="block h-px w-6 bg-foreground" />
            <span className="block h-px w-6 bg-foreground" />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 space-y-4">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="block bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold rounded-md text-center">
            Bilan de Lucidité (15 min)
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 court-grid opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10 items-center relative">
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-3 border border-border px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse" />
            Tennis · Padel · Badminton
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-balance">
            Il est temps <span className="text-primary">d'aligner votre tête</span> avec la réalité du terrain
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            17 ans de terrain m'ont appris une chose :{" "}
            <mark className="bg-primary/25 text-foreground font-semibold px-1 rounded-sm box-decoration-clone">
              le mental n'est pas une excuse magique, c'est un muscle qui se pilote
            </mark>
            . Arrêtez de subir vos matchs. Reprenez les commandes de votre jeu.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-4 font-semibold rounded-md hover:bg-primary/90 transition-all glow-primary"
            >
              Demandez votre Bilan de Lucidité
              <span className="font-mono text-xs bg-primary-foreground/10 px-2 py-1 rounded">15 min offertes</span>
            </a>
            <a href="#methode" className="text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              ↓ La méthode
            </a>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border max-w-md">
            {[
              { k: "17", v: "ans de terrain" },
              { k: "150", v: "joueurs/joueuses accompagnés" },
              { k: "5/5", v: "avis positifs" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl text-primary">{s.k}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border">
            <img src={quentinCourt.url} alt="Quentin sur le court, observant ses joueurs en session" width={1456} height={1092} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 lg:hidden flex justify-between items-end font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70">
              <span>Aubagne · Session terrain</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden lg:block bg-card border border-border rounded-md p-4 max-w-[220px] shadow-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-2">Méthode</div>
            <div className="text-sm font-display">Axe → Déblocage → Réflexe</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ tag, n }: { tag: string; n: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-mono text-[11px] tracking-[0.3em] text-primary">{n}</span>
      <span className="h-px flex-1 max-w-[60px] bg-border" />
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{tag}</span>
    </div>
  );
}

function ProblemSection() {
  return (
    <section className="relative py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel n="P/01" tag="Le Problème" />
        <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl max-w-4xl text-balance">
          Vous valez 15/4, mais vous êtes bloqué à <span className="text-primary">30/1</span>.
          <br /> Pourquoi ?
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
          À l'entraînement, vous êtes injouable. En match, dès que le score se tend, vous perdez vos moyens.
          Le réflexe classique ? Se voiler la face et chercher des coupables à l'extérieur.
        </p>

        <div className="mt-16 relative">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
            // Le nuage des fausses excuses
          </div>
          <ExcuseCloud />
        </div>

        <div className="mt-14 border-l-2 border-primary pl-6 max-w-3xl">
          <p className="font-display text-2xl sm:text-3xl leading-tight text-balance">
            Arrêtez de vous mentir. Votre raquette n'a pas de problème. Votre cordage non plus.
            <span className="text-primary"> Le problème, c'est votre déni de réalité.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function AgitationSection() {
  return (
    <section className="relative py-28 border-t border-border bg-graphite-deep">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <SectionLabel n="A/02" tag="Agitation" />
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-balance">
            Le mental <span className="text-primary">tout seul</span> ne sert à rien.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            Voici l'équation réelle de la performance — et la part exacte sur laquelle Quentin intervient.
          </p>
        </div>

        <div className="mt-10 group/eq bg-card border border-border rounded-md p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.45)] hover:bg-card/95">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-dashed border-border">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              L'équation réelle de la performance
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="text-muted-foreground">// L'idée reçue :</span>
              <span className="line-through decoration-destructive decoration-2 text-foreground/55 normal-case tracking-normal text-xs">
                "Le mental c'est 80% du travail."
              </span>
              <span className="bg-destructive text-destructive-foreground px-2 py-0.5 rounded">FAUX</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-stretch sm:justify-between gap-4 sm:gap-3">
            {[
              { p: 'Mental', featured: true },
              { p: 'Technique' },
              { p: 'Physique' },
              { p: 'Tactique' },
            ].map((item, i) => (
              <div key={item.p} className="flex items-center gap-3 sm:gap-3 flex-1 min-w-0">
                <div
                  className={`flex-1 relative p-5 sm:p-6 text-center rounded-md border transition-all duration-300 group-hover/eq:-translate-y-0.5 ${
                    item.featured
                      ? 'bg-primary/15 border-primary ring-1 ring-primary/40 glow-primary group-hover/eq:ring-primary/70'
                      : 'bg-background border-border group-hover/eq:border-primary/40 group-hover/eq:bg-background/60'
                  }`}
                >
                  <div className={`font-display font-bold text-lg sm:text-xl ${item.featured ? 'text-foreground' : 'text-foreground/85'}`}>
                    {item.p}
                  </div>
                  <div className={`font-mono text-sm tracking-wider mt-2 ${item.featured ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                    25%
                  </div>
                  {item.featured && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] bg-primary text-primary-foreground px-2 py-1 rounded">
                      ← piloté par Quentin
                    </div>
                  )}
                </div>
                {i < 3 && (
                  <span className="font-display text-2xl text-primary shrink-0 hidden sm:inline transition-transform duration-300 group-hover/eq:scale-125">+</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm sm:text-base text-foreground/85 leading-relaxed max-w-2xl mx-auto">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-2">
              = Vision holistique
            </span>
            J'agis sur le mental, mais les 4 piliers sont liés.
            <span className="text-foreground"> Je m'appuie sur la technique, le physique et la tactique</span> pour faire levier — jamais à côté.
          </p>
        </div>

        <figure className="mt-14 max-w-4xl mx-auto relative">
          <div className="absolute -top-3 left-6 sm:left-10 z-10 flex items-center gap-3 bg-background border border-border rounded-full pl-1 pr-4 py-1">
            <img src={quentinPortrait.url} alt="Quentin Sirica" width={64} height={64} loading="lazy" className="h-8 w-8 rounded-full object-cover border border-primary/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/80">
              Quentin <span className="text-muted-foreground">· la métaphore du pilote</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          </div>
          <div className="relative bg-card border border-border rounded-lg p-7 sm:p-10 pt-10 sm:pt-12 overflow-hidden">
            <span aria-hidden className="absolute -top-2 right-6 font-display text-[120px] leading-none text-primary/10 select-none">“</span>
            <div className="absolute left-0 top-10 bottom-10 w-[3px] bg-gradient-to-b from-transparent via-primary to-transparent" />
            <blockquote className="relative space-y-5">
              <p className="font-display text-xl sm:text-2xl leading-snug text-balance">
                Vous pouvez posséder toutes les armes du joueur parfait — un
                <span className="text-primary"> physique</span> de feu, une
                <span className="text-primary"> technique</span> chirurgicale, une
                <span className="text-primary"> tactique</span> implacable.
              </p>
              <p className="font-display text-xl sm:text-2xl leading-snug text-balance">
                Sans le pilote — <mark className="bg-primary/20 text-foreground px-1.5 rounded-sm box-decoration-clone">le Mental</mark> — le système se déconnecte au premier point important.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed border-t border-dashed border-border pt-4">
                Vous finissez le match dans les bâches.
                <span className="text-foreground/80"> Votre potentiel reste au vestiaire.</span>
              </p>
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-px w-8 bg-primary" />
              Quentin Sirica · 17 ans de terrain
            </figcaption>
          </div>
        </figure>

      </div>
    </section>
  );
}

function SolutionSection() {
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <section id="methode" className="relative py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <SectionLabel n="S/03" tag="Solution & Méthode" />
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-balance">
              Pas de recettes toutes faites. Des questions, de la
              <span className="text-primary"> lucidité</span>, de l'action.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Je n'arrive pas avec un manuel de leçons prémâchées. Je fonctionne par un questionnement
              chirurgical pour vous faire prendre conscience de votre fonctionnement sous pression.
            </p>
          </div>
          <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden rounded-md border border-border">
            <img src={quentinVisio.url} alt="Quentin en séance de coaching en visio" width={1500} height={1000} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80">
              <span>SÉANCE · 1H30 · À DISTANCE</span>
              <span className="text-primary">● VISIO</span>
            </div>
          </div>
        </div>

        <aside className="mt-12 relative border-l-2 border-destructive/50 bg-destructive/[0.03] rounded-r-md pl-5 pr-6 py-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-destructive">
              ⚠ Anti-Bullshit · Phrases interdites
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              // ce que la méthode bannit du vestiaire
            </span>
          </div>
          <p className="text-sm sm:text-base text-foreground/85 leading-relaxed mb-3">
            Sur le court, les phrases toutes faites sont des poisons.
            <span className="text-foreground"> Ça manque de précision. Ça ne résout rien.</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {poisons.map((p) => (
              <span
                key={p}
                className="font-mono text-xs border border-destructive/30 px-2 py-1 line-through text-foreground/55"
              >
                "{p}"
              </span>
            ))}
          </div>
        </aside>

        <div className="mt-12 grid md:grid-cols-3 gap-px bg-border border border-border rounded-md overflow-hidden">
          {steps.map((s) => (
            <div key={s.n} className="bg-card p-8 hover:bg-secondary/50 transition-colors group">
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-display font-bold text-6xl text-primary/90 group-hover:text-primary transition-colors">{s.n}</span>
                <span className="h-px w-12 bg-primary" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">{s.tag}</div>
              <h3 className="font-display font-bold text-2xl mb-4">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative aspect-square overflow-hidden rounded-md border border-border">
            <img src={quentinPortrait.url} alt="Quentin Sirica · portrait" width={1200} height={1500} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent" />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Quentin Sirica · Préparateur mental
            </div>
          </div>
          <blockquote className="lg:col-span-7 relative">
            <span className="absolute -top-8 -left-2 font-display text-[120px] leading-none text-primary/20">"</span>
            <p className="font-display text-2xl sm:text-3xl leading-tight text-balance relative">
              Le socle de la méthode : avant de parler de technique, on répond ensemble à la seule question
              qui compte dans les moments durs —
              <span className="text-primary"> "Pourquoi tu es sur ce court aujourd'hui plutôt que de faire autre chose ?"</span>
            </p>
            <footer className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              — Quentin Sirica
            </footer>

            <div className="mt-10 border-t border-dashed border-border pt-8 grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="sm:col-span-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
                  // Le parcours
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  17 ans prof de tennis, devenu sophrologue et Maître Praticien PNL, formé à l'ennéagramme et à l'imagerie mentale.
                  <span className="text-foreground"> Tout ce que je transmets, je l'ai d'abord expérimenté sur moi</span> — la compétition, le travail sur soi, les outils. Rien de théorique pour le plaisir.
                </p>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Diplômes
                </div>
                <ul className="space-y-1.5 text-sm">
                  <li className="flex gap-2"><span className="text-primary">›</span> Institut de Formation à la Sophrologie</li>
                  <li className="flex gap-2"><span className="text-primary">›</span> EIPNL — Maître Praticien PNL</li>
                  <li className="flex gap-2"><span className="text-primary">›</span> DEJEPS Perfectionnement Sportif</li>
                </ul>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Expériences
                </div>
                <ul className="space-y-1.5 text-sm">
                  <li className="flex gap-2"><span className="text-primary">›</span> Responsable Préparateur Mental des Compétiteurs</li>
                  <li className="flex gap-2"><span className="text-primary">›</span> Coach en sophrologie & PNL en individuel</li>
                  <li className="flex gap-2"><span className="text-primary">›</span> Formateur en Préparation Mentale</li>
                </ul>
              </div>
            </div>
          </blockquote>
        </div>

        <div className="mt-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                // 17 ans à les pratiquer sur le terrain
              </div>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-balance">
                Les outils que <span className="text-primary">Quentin maîtrise</span>.
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Pas de théorie : 4 disciplines complémentaires qu'il utilise au quotidien avec ses joueurs.
              <span className="block mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">↻ Survolez ou tapez pour révéler</span>
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {outils.map((o, idx) => (
              <button
                type="button"
                key={o.n}
                onClick={() => setFlipped(flipped === idx ? null : idx)}
                aria-label={`Révéler ${o.name}`}
                className={`flip-card text-left h-64 w-full ${flipped === idx ? 'is-flipped' : ''}`}
              >
                <div className="flip-inner">
                  <article className="flip-face bg-card border border-border p-6 justify-between">
                    <div className="flex items-start justify-between">
                      <div className="h-14 w-14 rounded-md bg-primary/15 border border-primary/40 flex items-center justify-center text-primary">
                        <o.icon size={28} strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-clay bg-clay/10 px-2 py-1 rounded">
                          Outil mental
                        </span>
                        <span className="font-display font-bold text-2xl text-primary/80">{o.n}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xl leading-tight">
                        {o.name}
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground leading-snug">{o.teaser}</p>
                    </div>
                    <div className="pt-4 border-t border-dashed border-border flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        Comment Quentin l'utilise
                      </span>
                      <span className="font-mono text-xs text-primary">↻</span>
                    </div>
                  </article>
                  <article className="flip-face flip-back bg-primary/5 border border-primary/40 p-6 overflow-y-auto">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 text-primary">
                        <o.icon size={18} strokeWidth={2} />
                        <span className="font-display font-bold text-2xl">{o.n}</span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-clay">↻ retour</span>
                    </div>
                    <h4 className="font-display font-bold text-base mb-2 text-primary">{o.name}</h4>
                    <p className="text-sm text-foreground/90 leading-relaxed">{o.body}</p>
                  </article>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestWidget() {
  return (
    <section id="test" className="relative py-28 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <EnneagrammeTest />
      </div>
    </section>
  );
}

function OffersSection() {
  return (
    <section id="offre" className="relative py-28 border-t border-border bg-graphite-deep">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <SectionLabel n="O/04" tag="Rejoindre le Staff" />
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-balance">
            Je ne cherche pas à empiler les clients.
            <span className="text-muted-foreground"> Je cherche des joueurs alignés.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Des joueuses et des joueurs motivés, investis, qui ressentent une vraie douleur à l'idée de stagner.
            Si vous cherchez une baguette magique, passez votre chemin. Si vous voulez créer une alliance
            inébranlable pour aller chercher des résultats, on est alignés.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {offers.map((o) => (
            <div
              key={o.name}
              className={`relative border rounded-lg p-8 flex flex-col ${
                o.featured
                  ? "border-primary bg-card glow-primary"
                  : "border-border bg-card hover:border-primary/40 transition-colors"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className={`font-mono text-[10px] uppercase tracking-[0.25em] px-2 py-1 rounded ${o.featured ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {o.badge}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{o.duration}</span>
              </div>
              <h3 className="font-display font-bold text-2xl">{o.name}</h3>
              <div className="mt-4 font-display text-4xl text-primary">{o.price}</div>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{o.desc}</p>
              <ul className="mt-6 space-y-2 flex-1">
                {o.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-1">→</span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 text-center py-3 rounded-md font-semibold text-sm transition-all ${
                  o.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border hover:border-primary text-foreground"
                }`}
              >
                {o.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [form, setForm] = useState({ name: "", email: "", sport: "Tennis", ranking: "", context: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = useServerFn(submitProgramApplication);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      await submit({
        data: {
          first_name: form.name,
          email: form.email,
          sport: form.sport as "Tennis" | "Padel" | "Badminton",
          ranking: form.ranking,
          context: form.context,
        },
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section id="contact" className="relative py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionLabel n="X/05" tag="Postuler" />
          <blockquote className="border-l-2 border-primary pl-6 mb-10">
            <p className="font-display text-xl sm:text-2xl leading-snug text-balance">
              "Je n'ai jamais été calme ou serein en match, j'ai juste appris à ne pas le montrer à mon adversaire."
            </p>
            <footer className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">— Rafael Nadal</footer>
          </blockquote>
          <p className="text-foreground/90 leading-relaxed">
            Apprenez à faire de même. Remplissez ce formulaire — je reviens vers vous sous 48h
            pour caler votre <span className="text-primary">Bilan de Lucidité</span>.
          </p>
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div className="border border-primary/40 bg-primary/5 rounded-md p-10 text-center">
              <div className="font-display text-3xl mb-3">Candidature reçue.</div>
              <p className="text-muted-foreground">Réponse personnelle sous 48h.</p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="bg-card border border-border rounded-lg p-8 sm:p-10 space-y-6"
            >
              <Field label="Nom complet" required>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary"
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary"
                />
              </Field>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Sport" required>
                  <div className="grid grid-cols-3 gap-2">
                    {["Tennis", "Padel", "Badminton"].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setForm({ ...form, sport: s })}
                        className={`py-3 text-sm rounded-md border transition-colors ${
                          form.sport === s
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-foreground/40"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Classement actuel" required>
                  <input
                    required
                    placeholder="ex: 30/1, P250, …"
                    value={form.ranking}
                    onChange={(e) => setForm({ ...form, ranking: e.target.value })}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary"
                  />
                </Field>
              </div>
              <Field label="Votre objectif / contexte" required>
                <textarea
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                  placeholder="Ex : Je suis 15/4 depuis 4 ans, je veux casser ce plateau cette saison. Je perds systématiquement les matchs serrés au 3e set…"
                  value={form.context}
                  onChange={(e) => setForm({ ...form, context: e.target.value })}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary resize-y"
                />
                <span className="block mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Objectif visé, blocage actuel, contexte de jeu — soyez précis.
                </span>
              </Field>
              {error && (
                <div className="text-sm text-destructive border border-destructive/40 bg-destructive/10 rounded-md px-4 py-3">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-4 font-semibold rounded-md hover:bg-primary/90 transition-all glow-primary text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Envoi…" : "Postuler pour intégrer le programme →"}
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center">
                Réponse personnelle sous 48h · Pas de spam · Pas de blabla
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground block mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <div className="font-display font-semibold">Méthode Axe-Réflexe</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
            Quentin Sirica · Préparateur mental haute performance
          </div>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          © {new Date().getFullYear()} · Tennis · Padel · Badminton
        </div>
      </div>
    </footer>
  );
}

function ExcuseCloud() {
  // Split in 2 rows that scroll in opposite directions
  const half = Math.ceil(fakeExcuses.length / 2);
  const row1 = fakeExcuses.slice(0, half);
  const row2 = fakeExcuses.slice(half);

  const Quote = ({ q, i }: { q: string; i: number }) => (
    <figure className="shrink-0 w-[300px] sm:w-[340px] mr-4 bg-card/80 border border-border rounded-md px-4 py-3 hover:border-destructive/50 transition-colors group">
      <div className="flex items-start gap-2">
        <span className="font-display text-3xl leading-none text-primary/50 -mt-1 select-none">“</span>
        <blockquote className="font-display italic text-[15px] leading-snug text-foreground/85 group-hover:line-through group-hover:text-foreground/50 transition-all">
          {q}
        </blockquote>
      </div>
    </figure>
  );

  return (
    <div className="relative space-y-4 overflow-hidden marquee-mask">
      <div className="flex w-max ticker-track">
        {[...row1, ...row1].map((q, i) => <Quote key={'a' + i} q={q} i={i % row1.length} />)}
      </div>
      <div className="flex w-max ticker-track-reverse">
        {[...row2, ...row2].map((q, i) => <Quote key={'b' + i} q={q} i={(i % row2.length) + row1.length} />)}
      </div>
    </div>
  );
}

function ResultsSection() {
  return (
    <section className="relative py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <SectionLabel n="R/03b" tag="Résultats concrets" />
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-balance">
            Les résultats que vous pouvez
            <span className="text-primary"> viser</span>.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Pas de promesses magiques. Des trajectoires réelles : casser un palier, viser un classement,
            accéder au haut niveau, devenir DE — ou simplement arrêter de stagner après 5 ans.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {objectives.map((o) => (
            <div key={o.n} className="bg-card border border-border rounded-md p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-display font-bold text-3xl text-primary">{o.n}</span>
                <span className="h-px w-8 bg-clay" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{o.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{o.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                // Preuves terrain
              </div>
              <h3 className="font-display font-bold text-3xl text-balance">
                Ce qu'en disent les joueurs accompagnés.
              </h3>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <figure key={i} className="relative bg-card border border-border rounded-md p-6 flex flex-col">
                <span className="absolute -top-4 left-5 font-display text-5xl text-primary/30 leading-none select-none">"</span>
                <blockquote className="text-foreground/90 leading-relaxed italic flex-1">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-border">
                  <div className="font-display font-semibold">{t.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay mt-1">
                    {t.progress} · {t.sport}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-display text-lg text-foreground hover:text-primary transition-colors"
          >
            Votre histoire peut être la prochaine.
            <span className="text-primary">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function OtherAudiences() {
  return (
    <section className="relative pt-4 pb-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="sm:w-1/3">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-clay mb-2">
                // Aussi disponible
              </div>
              <h3 className="font-display font-bold text-xl leading-snug">
                Quentin accompagne également :
              </h3>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 mt-3 text-sm font-mono text-foreground/70 hover:text-primary transition-colors"
              >
                Demander un format sur mesure →
              </a>
            </div>
            <ul className="sm:w-2/3 grid sm:grid-cols-3 gap-4">
              {otherAudiences.map((a) => (
                <li key={a.title} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                    <span className="font-display font-semibold text-sm">{a.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed pl-3.5">
                    {a.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
