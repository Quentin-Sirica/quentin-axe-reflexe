import { useState, useMemo } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  SCREENS,
  CONSIGNE,
  PROFILES,
  computeScores,
  computeDominant,
  type AnswersMap,
  type ProfileId,
} from "@/lib/enneagramme-data";
import { submitEnneagrammeLead } from "@/lib/enneagramme.functions";

type Step = "intro" | "questions" | "capture" | "result";

export function EnneagrammeTest() {
  const [step, setStep] = useState<Step>("intro");
  const [screenIdx, setScreenIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [lead, setLead] = useState({ first_name: "", email: "", sport: "Tennis" as "Tennis" | "Padel" | "Badminton", ranking: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitFn = useServerFn(submitEnneagrammeLead);

  const scores = useMemo(() => computeScores(answers), [answers]);
  const dominant = useMemo<ProfileId>(() => computeDominant(scores), [scores]);
  const profile = PROFILES[dominant];

  const screen = SCREENS[screenIdx];
  const selected = answers[screen.id] ?? [];
  const progress = ((screenIdx + 1) / SCREENS.length) * 100;

  const toggle = (i: number) => {
    const cur = answers[screen.id] ?? [];
    const none = i === -1;
    if (none) {
      setAnswers({ ...answers, [screen.id]: [] });
    } else {
      const next = cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i];
      setAnswers({ ...answers, [screen.id]: next });
    }
  };

  const next = () => {
    if (screenIdx < SCREENS.length - 1) setScreenIdx(screenIdx + 1);
    else setStep("capture");
  };
  const prev = () => {
    if (screenIdx > 0) setScreenIdx(screenIdx - 1);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const profile_scores = Object.fromEntries(
        Object.entries(scores).map(([k, v]) => [k, v]),
      );
      const answersOut = Object.fromEntries(
        Object.entries(answers).map(([k, v]) => [k, v]),
      );
      await submitFn({
        data: {
          first_name: lead.first_name.trim(),
          email: lead.email.trim(),
          sport: lead.sport,
          ranking: lead.ranking.trim() || null,
          dominant_profile: dominant,
          profile_scores,
          answers: answersOut,
        },
      });
      setStep("result");
    } catch (err) {
      console.error(err);
      setSubmitError(
        err instanceof Error ? err.message : "Une erreur est survenue. Réessayez.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- RENDER ----------
  return (
    <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-xl">
      <div className="absolute inset-0 court-grid opacity-30 pointer-events-none" />
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--primary)" }}
      />
      <div className="relative p-8 sm:p-12">
        {step === "intro" && <Intro onStart={() => setStep("questions")} />}
        {step === "questions" && (
          <Questions
            screenIdx={screenIdx}
            screen={screen}
            selected={selected}
            progress={progress}
            onToggle={toggle}
            onNext={next}
            onPrev={prev}
          />
        )}
        {step === "capture" && (
          <Capture
            lead={lead}
            setLead={setLead}
            onSubmit={submit}
            submitting={submitting}
            error={submitError}
            onBack={() => setStep("questions")}
          />
        )}
        {step === "result" && <Result profile={profile} scores={scores} firstName={lead.first_name} />}
      </div>
    </div>
  );
}

// ---------- INTRO ----------
function Intro({ onStart }: { onStart: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-primary rounded-full" /> Tennis Mental Profile · 9 profils
        </span>
        <span>~5 min</span>
      </div>
      <h2 className="font-display font-bold text-3xl sm:text-5xl text-balance leading-tight">
        Quel <span className="text-primary">profil de joueur</span> êtes-vous vraiment ?
      </h2>
      <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
        Êtes-vous le <strong className="text-foreground">Perfectionniste</strong> qui s'autodétruit à la moindre faute ?
        Le <strong className="text-foreground">Performeur</strong> qui joue le score plus que le jeu ?
        Le <strong className="text-foreground">Vigilant</strong> qui doute avant même le premier service ?
      </p>
      <div className="mt-10 grid sm:grid-cols-3 gap-3">
        {[
          { k: "36", v: "affirmations" },
          { k: "9", v: "profils de joueur" },
          { k: "5min", v: "pour vous révéler" },
        ].map((s) => (
          <div key={s.v} className="border border-border bg-background/60 p-4 rounded-md">
            <div className="font-display text-2xl text-primary">{s.k}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.v}</div>
          </div>
        ))}
      </div>
      <button
        onClick={onStart}
        className="mt-10 bg-primary text-primary-foreground px-8 py-4 font-semibold rounded-md hover:bg-primary/90 transition-all glow-primary"
      >
        Démarrer le test →
      </button>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Test élaboré par Quentin Sirica · basé sur l'Ennéagramme
      </p>
    </>
  );
}

// ---------- QUESTIONS ----------
function Questions({
  screenIdx,
  screen,
  selected,
  progress,
  onToggle,
  onNext,
  onPrev,
}: {
  screenIdx: number;
  screen: (typeof SCREENS)[number];
  selected: number[];
  progress: number;
  onToggle: (i: number) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const none = selected.length === 0;
  return (
    <>
      <div className="flex items-center justify-between mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>Écran {screenIdx + 1} / {SCREENS.length}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1 bg-secondary rounded-full overflow-hidden mb-8">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-sm sm:text-base text-foreground/80 italic mb-8 border-l-2 border-clay pl-4">
        {CONSIGNE}
      </p>
      <div className="space-y-3">
        {screen.questions.map((q, i) => {
          const active = selected.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onToggle(i)}
              className={`w-full text-left flex items-start gap-4 p-4 sm:p-5 rounded-md border transition-all ${
                active
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background/40 hover:border-foreground/30 text-foreground/85"
              }`}
            >
              <span
                className={`mt-0.5 h-5 w-5 rounded border flex-shrink-0 flex items-center justify-center font-mono text-xs ${
                  active ? "bg-primary border-primary text-primary-foreground" : "border-border"
                }`}
              >
                {active ? "✓" : ""}
              </span>
              <span className="text-sm sm:text-base leading-snug">{q.text}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onToggle(-1)}
          className={`w-full text-left flex items-start gap-4 p-4 rounded-md border transition-all ${
            none ? "border-clay bg-clay/10 text-foreground" : "border-dashed border-border hover:border-clay/50 text-muted-foreground"
          }`}
        >
          <span className="mt-0.5 h-5 w-5 rounded-full border flex-shrink-0 flex items-center justify-center font-mono text-xs">
            {none ? "●" : ""}
          </span>
          <span className="text-sm">Aucune de ces propositions ne me correspond totalement.</span>
        </button>
      </div>
      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={screenIdx === 0}
          className="text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Précédent
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-primary text-primary-foreground px-8 py-4 font-semibold rounded-md hover:bg-primary/90 transition-all glow-primary"
        >
          {screenIdx === SCREENS.length - 1 ? "Révéler mon profil →" : "Suivant →"}
        </button>
      </div>
    </>
  );
}

// ---------- CAPTURE ----------
function Capture({
  lead,
  setLead,
  onSubmit,
  submitting,
  error,
  onBack,
}: {
  lead: { first_name: string; email: string; sport: "Tennis" | "Padel" | "Badminton"; ranking: string };
  setLead: (l: typeof lead) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  error: string | null;
  onBack: () => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-clay mb-4">
        Dernière étape · 100%
      </div>
      <h3 className="font-display font-bold text-3xl sm:text-4xl text-balance">
        Vos réponses sont prêtes.
        <br />
        <span className="text-primary">À qui dois-je envoyer votre profil ?</span>
      </h3>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Renseignez vos infos pour découvrir votre profil dominant et recevoir le récap détaillé sur votre email.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 gap-5">
        <label className="block sm:col-span-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground block mb-2">
            Prénom <span className="text-clay">*</span>
          </span>
          <input
            required
            maxLength={80}
            value={lead.first_name}
            onChange={(e) => setLead({ ...lead, first_name: e.target.value })}
            className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground block mb-2">
            Email <span className="text-clay">*</span>
          </span>
          <input
            required
            type="email"
            maxLength={255}
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
            className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary"
          />
        </label>
        <div className="sm:col-span-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground block mb-2">
            Sport <span className="text-clay">*</span>
          </span>
          <div className="grid grid-cols-3 gap-2">
            {(["Tennis", "Padel", "Badminton"] as const).map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setLead({ ...lead, sport: s })}
                className={`py-3 text-sm rounded-md border transition-colors ${
                  lead.sport === s
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <label className="block sm:col-span-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground block mb-2">
            Classement (optionnel)
          </span>
          <input
            placeholder="ex: 30/1, P250, …"
            maxLength={80}
            value={lead.ranking}
            onChange={(e) => setLead({ ...lead, ranking: e.target.value })}
            className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary"
          />
        </label>
      </div>
      {error && (
        <div className="mt-6 border border-destructive/40 bg-destructive/10 text-destructive rounded-md p-4 text-sm">
          {error}
        </div>
      )}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          ← Revoir mes réponses
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-primary-foreground px-8 py-4 font-semibold rounded-md hover:bg-primary/90 transition-all glow-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Analyse en cours…" : "Révéler mon profil →"}
        </button>
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center sm:text-left">
        Vos données restent confidentielles · Pas de spam
      </p>
    </form>
  );
}

// ---------- RESULT ----------
function Result({
  profile,
  scores,
  firstName,
}: {
  profile: (typeof PROFILES)[ProfileId];
  scores: Record<ProfileId, number>;
  firstName: string;
}) {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-clay mb-4">
        Profil révélé · Tennis Mental Profile
      </div>
      <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground/80">
        {firstName ? `${firstName}, votre profil dominant est…` : "Votre profil dominant est…"}
      </h3>

      <div className="mt-8 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4">
          <ProfileBadge profile={profile} />
        </div>
        <div className="lg:col-span-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Profil {String(profile.id).padStart(2, "0")} / 09
          </div>
          <h4 className="mt-2 font-display font-bold text-4xl sm:text-5xl text-balance">
            {profile.name}
          </h4>
          <p className="mt-3 font-display text-xl text-primary italic">"{profile.tagline}"</p>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-px bg-border border border-border rounded-md overflow-hidden">
        {[
          { tag: "Tes forces sur le court", body: profile.forces, accent: "primary" },
          { tag: "Ton piège", body: profile.piege, accent: "clay" },
          { tag: "Ce qui te coûte des points", body: profile.cout, accent: "clay" },
          { tag: "Ce qui te libère", body: profile.liberation, accent: "primary" },
        ].map((b) => (
          <div key={b.tag} className="bg-card p-6 sm:p-8">
            <div
              className="font-mono text-[10px] uppercase tracking-[0.25em] mb-3"
              style={{ color: b.accent === "clay" ? "var(--clay)" : "var(--primary)" }}
            >
              {b.tag}
            </div>
            <p className="text-foreground/90 leading-relaxed text-[15px]">{b.body}</p>
          </div>
        ))}
      </div>

      {/* Mini barres des scores */}
      <div className="mt-10 border border-border rounded-md p-6 bg-background/40">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
          // Répartition de vos réponses
        </div>
        <div className="space-y-2">
          {(Object.keys(PROFILES) as unknown as string[]).map((k) => {
            const id = Number(k) as ProfileId;
            const p = PROFILES[id];
            const total = Math.max(...Object.values(scores), 1);
            const pct = (scores[id] / total) * 100;
            const isDom = id === profile.id;
            return (
              <div key={k} className="flex items-center gap-3 text-xs">
                <span className={`font-mono w-6 ${isDom ? "text-primary" : "text-muted-foreground"}`}>
                  0{id}
                </span>
                <span className={`w-32 sm:w-40 truncate ${isDom ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                  {p.name}
                </span>
                <div className="flex-1 h-2 bg-secondary rounded overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: isDom ? "var(--primary)" : "var(--muted-foreground)" }}
                  />
                </div>
                <span className="font-mono w-6 text-right text-muted-foreground">{scores[id]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Bridge vers Bilan */}
      <div className="mt-12 relative overflow-hidden rounded-xl border border-clay/40 bg-gradient-to-br from-clay/10 to-primary/5 p-8 sm:p-10">
        <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full opacity-30 blur-3xl" style={{ background: "var(--clay)" }} />
        <div className="relative">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-clay mb-3">
            Et maintenant ?
          </div>
          <h4 className="font-display font-bold text-2xl sm:text-3xl text-balance max-w-2xl">
            Votre profil est un <span className="text-primary">point de départ</span>.
            Le Bilan de Lucidité, c'est là qu'on passe à l'action.
          </h4>
          <p className="mt-4 text-foreground/80 max-w-2xl leading-relaxed">
            En 15 minutes en visio avec Quentin, on affine votre profil, on identifie votre vrai blocage en match
            et on définit votre premier levier concret. Sans filtre. Offert.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <a
              href="#contact"
              className="bg-primary text-primary-foreground px-6 py-4 font-semibold rounded-md hover:bg-primary/90 transition-all glow-primary"
            >
              Demander mon Bilan de Lucidité →
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              15 min · Offert · Réponse 48h
            </span>
          </div>
        </div>
      </div>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center">
        Récap envoyé sur votre email · Test élaboré par Quentin Sirica
      </p>
    </div>
  );
}

// ---------- ILLUSTRATION ----------
function ProfileBadge({ profile }: { profile: (typeof PROFILES)[ProfileId] }) {
  const accent = profile.accent === "clay" ? "var(--clay)" : "var(--primary)";
  return (
    <div className="relative aspect-square rounded-xl border border-border bg-background/60 overflow-hidden">
      <div className="absolute inset-0 court-grid opacity-40" />
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-50"
        style={{ background: accent }}
      />
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id={`grad-${profile.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Polygone à 9 côtés (ennéagramme) */}
        <g transform="translate(100,100)">
          {Array.from({ length: 9 }).map((_, i) => {
            const angle = (i / 9) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * 70;
            const y = Math.sin(angle) * 70;
            const isActive = i + 1 === profile.id;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={isActive ? 8 : 3}
                fill={isActive ? accent : "currentColor"}
                opacity={isActive ? 1 : 0.3}
              />
            );
          })}
          {/* Lignes du polygone */}
          <polygon
            points={Array.from({ length: 9 })
              .map((_, i) => {
                const angle = (i / 9) * Math.PI * 2 - Math.PI / 2;
                return `${Math.cos(angle) * 70},${Math.sin(angle) * 70}`;
              })
              .join(" ")}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="font-display font-bold text-[140px] leading-none"
          style={{ color: accent, textShadow: `0 4px 30px ${accent}` }}
        >
          {profile.id}
        </div>
      </div>
      <div className="absolute bottom-3 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Profil {String(profile.id).padStart(2, "0")} / 09
      </div>
    </div>
  );
}
