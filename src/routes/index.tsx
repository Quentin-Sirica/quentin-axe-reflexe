import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-athlete.jpg";
import courtImg from "@/assets/court-grid.jpg";
import coachImg from "@/assets/coach-portrait.jpg";

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
];

const poisons = ["Calme-toi", "Respire", "Mets la balle dans le court", "Gagne le point !"];

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
    price: "Sur devis",
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
    desc: "Suivi Élite. Tarifs dégressifs (65€ la séance au lieu de 80€), accès au Drive 'Vestiaire Virtuel' (ressources / vidéos) et suivi WhatsApp exclusif pour les débriefs à chaud.",
    cta: "Rejoindre le staff",
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
      <TestWidget />
      <OffersSection />
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
            Gagnez enfin les matchs que votre <span className="text-primary">niveau technique</span> mérite.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            17 ans de terrain m'ont appris une chose : le mental n'est pas une excuse magique,
            c'est un muscle qui se pilote. Arrêtez de subir vos matchs. Reprenez les commandes de votre jeu.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-4 font-semibold rounded-md hover:bg-primary/90 transition-all glow-primary"
            >
              Postuler pour un Bilan de Performance
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
            <img src={heroImg} alt="Joueur en tension avant le service" width={1600} height={1200} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70">
              <span>Match Point · 6-5 · 30/40</span>
              <span className="text-primary">● LIVE</span>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 [grid-auto-flow:dense]">
            {fakeExcuses.map((q, i) => (
              <div
                key={i}
                className={`group relative bg-card border border-border rounded-md p-5 hover:border-primary/40 transition-colors ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 ? "lg:col-span-2" : ""
                }`}
                style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
              >
                <span className="absolute top-2 right-3 font-mono text-[10px] text-muted-foreground/40">
                  #{(i + 1).toString().padStart(2, "0")}
                </span>
                <p className={`font-display ${i === 0 ? "text-2xl" : "text-base"} text-foreground/90 leading-snug`}>
                  "{q}"
                </p>
              </div>
            ))}
          </div>
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
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionLabel n="A/02" tag="Agitation" />
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-balance">
            Pourquoi les conseils <span className="text-stroke">classiques</span> vous font perdre vos matchs.
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            On vous rabâche partout que <em className="text-foreground not-italic font-semibold">"le mental c'est 80 % du travail"</em>.
            C'est faux. Le mental tout seul ne sert à rien. Si vous n'avez pas de plan tactique ou que vous êtes
            à bout physiquement au 3ème set, votre mental va exploser. Tout est lié :
            <span className="text-foreground"> Mental, Technique, Physique, Tactique.</span>
            Un blocage mental n'est parfois que la conséquence d'une défaillance tactique.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Mental", "Technique", "Physique", "Tactique"].map((p) => (
              <div key={p} className="border border-border bg-card p-4 text-center">
                <div className="font-display font-semibold">{p}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">25%</div>
              </div>
            ))}
          </div>

          <div className="relative bg-destructive/5 border border-destructive/30 rounded-md p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-destructive mb-4">
              ⚠ Anti-Bullshit · Phrases interdites
            </div>
            <p className="text-foreground/90 leading-relaxed mb-6">
              Sur le court, les phrases toutes faites sont des poisons. Entendre…
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {poisons.map((p) => (
                <span key={p} className="font-mono text-sm border border-destructive/40 px-3 py-1.5 line-through text-foreground/60">
                  "{p}"
                </span>
              ))}
            </div>
            <p className="text-foreground/90 leading-relaxed">
              …vous énerve au plus haut point, et c'est normal.
              <span className="text-destructive font-semibold"> Ça manque de précision. Ça ne résout rien.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section id="methode" className="relative py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
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

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-border border border-border rounded-md overflow-hidden">
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

        <div className="mt-16 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative aspect-square overflow-hidden rounded-md border border-border">
            <img src={coachImg} alt="Quentin Sirica" width={1200} height={1500} loading="lazy" className="w-full h-full object-cover grayscale" />
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
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function TestWidget() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="test" className="relative py-28 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative bg-card border border-border rounded-xl overflow-hidden">
          <div className="absolute inset-0 court-grid opacity-50 pointer-events-none" />
          <div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--primary)" }}
          />
          <div className="relative p-8 sm:p-12">
            <div className="flex items-center justify-between mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-primary rounded-full" /> Test Ennéagramme · Lead Magnet</span>
              <span>~5 min</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-balance leading-tight">
              Quel profil de joueur de tennis/padel <span className="text-primary">êtes-vous vraiment</span> ?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              Êtes-vous le <strong className="text-foreground">Perfectionniste</strong> qui s'autodétruit à la moindre faute ?
              Le <strong className="text-foreground">Challenger</strong> qui s'épuise à vouloir dicter chaque échange ?
              L'<strong className="text-foreground">Anxieux</strong> qui anticipe la défaite avant le premier service ?
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-3">
              {["Perfectionniste", "Challenger", "Anxieux", "Loyal", "Épicurien", "Médiateur"].slice(0, 3).map((p, i) => (
                <div key={p} className="border border-border bg-background/40 p-4 rounded-md">
                  <div className="font-mono text-[10px] text-primary">TYPE 0{i + 1}</div>
                  <div className="font-display font-semibold mt-1">{p}</div>
                </div>
              ))}
            </div>

            <p className="mt-10 text-foreground/90">
              5 minutes pour passer mon test basé sur l'Ennéagramme, conscienciser vos vrais blocages
              et recevoir votre premier <span className="text-primary">levier d'action personnalisé</span>.
            </p>

            {submitted ? (
              <div className="mt-6 p-6 border border-primary/40 rounded-md bg-primary/5">
                <div className="font-display text-xl">Reçu. Vérifiez votre boîte mail dans 2 min.</div>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                className="mt-6 flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="flex-1 bg-background border border-border rounded-md px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-8 py-4 font-semibold rounded-md hover:bg-primary/90 transition-all glow-primary whitespace-nowrap"
                >
                  Démarrer le test →
                </button>
              </form>
            )}
          </div>
        </div>
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
  const [form, setForm] = useState({ name: "", email: "", sport: "Tennis", ranking: "" });
  const [sent, setSent] = useState(false);
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
          <div className="mt-10 hidden lg:block aspect-[16/9] overflow-hidden rounded-md border border-border">
            <img src={courtImg} alt="Court vue aérienne" width={1600} height={900} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div className="border border-primary/40 bg-primary/5 rounded-md p-10 text-center">
              <div className="font-display text-3xl mb-3">Candidature reçue.</div>
              <p className="text-muted-foreground">Réponse personnelle sous 48h.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
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
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 font-semibold rounded-md hover:bg-primary/90 transition-all glow-primary text-lg"
              >
                Postuler pour intégrer le programme →
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
