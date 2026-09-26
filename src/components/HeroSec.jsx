import { useState } from 'react';
import {
  Sparkles, Search, Heart, ShoppingBag, Menu, X, Compass, Users, Film,
  Calendar, Store, Gamepad2, Clapperboard, Tv, Music2, BookOpen, BookMarked,
  ArrowUpRight, Play, MapPin, ChevronDown, Star, Users2, Boxes, Radio, Mail,
  MessageCircle, Send, Bot,
} from 'lucide-react';

/* ---------------------------------------------------------
   Static demo content — swap these arrays for your real data
   whenever you have it. Everything else stays the same.
--------------------------------------------------------- */
const CATEGORIES = [
  { name: 'Anime', tagline: 'Stories beyond the screen', icon: Sparkles, from: 'from-red-600', to: 'to-rose-900' ,image: '/images/categories/animecard.png'},
  { name: 'Gaming', tagline: 'Press start on discovery', icon: Gamepad2, from: 'from-blue-600', to: 'to-slate-900' ,image: '/images/categories/gaming.png'},
  { name: 'Movies', tagline: 'Every frame has a story', icon: Clapperboard, from: 'from-amber-600', to: 'to-slate-900' ,image: '/images/categories/movies.png'},
  { name: 'TV Shows', tagline: 'Your next obsession', icon: Tv, from: 'from-emerald-600', to: 'to-slate-900' ,image: '/images/categories/tvshows.png'},
  { name: 'K-Pop', tagline: 'Rhythm, visuals, fandom', icon: Music2, from: 'from-pink-600', to: 'to-slate-900' ,image: '/images/categories/kpop.png'},
  { name: 'Comics', tagline: 'Panels packed with power', icon: BookOpen, from: 'from-orange-600', to: 'to-slate-900' ,image: '/images/categories/comics.png'},
  { name: 'Manga', tagline: 'Turn the next page', icon: BookMarked, from: 'from-slate-600', to: 'to-slate-900' ,image: '/images/categories/manga.png'},
];

const categorySlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

const CHARACTERS = [
  { name: 'Kaia Ren', series: 'Kaia Chronicles', tag: 'Anime', initials: 'KR', image: '/images/characters/kaia.png' },
  { name: 'Nova Byte', series: 'Nova Chronicles', tag: 'Gaming', initials: 'NB', image: '/images/characters/nova.png' },
  { name: 'Avery Cole', series: 'Avery Chronicles', tag: 'Movies', initials: 'AC', image: '/images/characters/avery.png' },
  { name: 'Maya Quinn', series: 'Maya Chronicles', tag: 'TV Shows', initials: 'MQ', image: '/images/characters/maya.png' },
  { name: 'Hana Moon', series: 'Hana Chronicles', tag: 'K-Pop', initials: 'HM', image: '/images/characters/hana.png' },
  { name: 'Vega Knight', series: 'Vega Chronicles', tag: 'Comics', initials: 'VK', image: '/images/characters/vega.png' },
];

const TRAILERS = [
  { title: 'Kaia Chronicles — First Look', status: 'upcoming', embed: 'https://www.youtube.com/embed/aqz-KE-bpKQ' },
  { title: 'Nova Chronicles — Recently Released', status: 'recently released', embed: 'https://www.youtube.com/embed/aqz-KE-bpKQ' },
  { title: 'Avery Chronicles — Teaser', status: 'upcoming', embed: 'https://www.youtube.com/embed/aqz-KE-bpKQ' },
];

const EVENTS = [
  { date: '2026-10-10', title: 'Fandom Night', location: 'Neo City Hall', desc: 'Panels, showcases and fan activities across every hub.' },
  { date: '2026-10-24', title: 'Spotlight Showcase', location: 'Harbor Arts Center', desc: 'A curated look at the newest character and story drops.' },
  { date: '2026-11-17', title: 'Creator Meetup', location: 'Pixel Park', desc: 'Meet the people behind the galleries, trailers and lore.' },
];

const MERCH = [
  { name: 'Fandom Core Tee', price: '$18–$28', image: '/images/merch/fandomtee.png', from: 'from-red-600', to: 'to-slate-900' },
  { name: 'Nebula Hoodie', price: '$42–$58', image: '/images/merch/nebulahoodie.png', from: 'from-blue-600', to: 'to-slate-900' },
  { name: 'Pixel Badge Set', price: '$9–$14', image: '/images/merch/pixel.png', from: 'from-amber-600', to: 'to-slate-900' },
  { name: 'Collector Art Card', price: '$6–$10', image: '/images/merch/collector.png', from: 'from-emerald-600', to: 'to-slate-900' },
];

const FAQ = [
  { q: 'What is FandomVerse?', a: 'A single portal that brings anime, gaming, movies, TV, K-Pop, comics and manga into one place.' },
  { q: 'Can I buy merchandise here?', a: 'You can add demo items to a temporary cart — checkout is intentionally not included yet.' },
  { q: 'How do I find something fast?', a: 'Use the search icon in the header, or jump straight to a category from the grid below.' },
];

/* ---------------------------------------------------------
   Small shared bits
--------------------------------------------------------- */
function SectionIntro({ eyebrow, title, description, action }) {
  return (
    <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="mb-2 text-xs    uppercase tracking-[0.3em] text-red-500">{eyebrow}</p>
        <h2 className="text-3xl   uppercase leading-tight text-white sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-sm leading-6 text-white/50">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/* =========================================================
   ONE self-contained component: header, hero, every section.
========================================================= */
export default function FandomVerseLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState(TRAILERS[0]);
  const [openFaq, setOpenFaq] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Hey! I can help you find categories, characters, events, trailers, or merch. What are you looking for?' },
  ]);

  const sendChatMessage = (message = chatInput) => {
    const question = message.trim();
    if (!question) return;

    const query = question.toLowerCase();
    let reply = 'I can help with categories, characters, events, trailers, and merch. Try asking about one of those.';

    if (/merch|shirt|tee|hoodie|price|buy|shop/.test(query)) {
      reply = 'The Collector Corner has the Fandom Core Tee ($18–$28), Nebula Hoodie ($42–$58), Pixel Badge Set ($9–$14), and Collector Art Card ($6–$10).';
    } else if (/event|calendar|when|date/.test(query)) {
      reply = 'Upcoming events: Fandom Night on October 10, Spotlight Showcase on October 24, and Creator Meetup on November 17, 2026. See the Events section for details.';
    } else if (/trailer|video|watch/.test(query)) {
      reply = 'Head to the Trailers section to watch the Kaia Chronicles first look, Nova Chronicles release, and Avery Cole teaser.';
    } else if (/character|kaia|nova|avery|maya|hana|vega/.test(query)) {
      reply = 'Meet Kaia Ren (Anime), Nova Byte (Gaming), Avery Cole (Movies), Maya Quinn (TV Shows), Hana Moon (K-Pop), and Vega Knight (Comics) in the Characters section.';
    } else if (/category|categories|anime|gaming|movie|tv|k-pop|comic|manga|explore/.test(query)) {
      reply = 'Explore seven hubs: Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga. Choose a category card in the Explore section to open its page.';
    }

    setChatMessages((messages) => [
      ...messages,
      { from: 'user', text: question },
      { from: 'bot', text: reply },
    ]);
    setChatInput('');
  };

  const navLinks = [
    { name: 'Explore', href: '#explore', icon: Compass },
    { name: 'Characters', href: '#characters', icon: Users },
    { name: 'Trailers', href: '#trailers', icon: Film },
    { name: 'Events', href: '#events', icon: Calendar },
    { name: 'Merch Store', href: '#merch', icon: Store },
  ];

  return (
    <div className="min-h-screen   w-full bg-slate-950 text-white">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-lg sm:px-7">
          <a href="#" className="flex shrink-0 items-center gap-2.5 text-xl font-black tracking-tight text-white">
            <div className="rounded-xl bg-red-600 p-1.5 shadow-md shadow-red-500/20">
              <Sparkles className="h-5 w-5 fill-white" />
            </div>
            <span>Fandom<span className="text-red-600">Verse</span></span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-100 xl:flex">
            {navLinks.map((l) => (
              <a key={l.name} href={l.href} className="transition hover:text-red-500">{l.name}</a>
            ))}
          </nav>

          <div className="hidden items-center gap-1.5 sm:flex">
            <button aria-label="Search" className="rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Favorites" className="rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white">
              <Heart className="h-5 w-5" />
            </button>
            <button aria-label="Cart" className="rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white">
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full p-2 text-white sm:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="mt-3 space-y-1 rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-lg sm:hidden">
            {navLinks.map((l) => (
              <a key={l.name} href={l.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10">
                <l.icon className="h-4 w-4 text-red-500" /> {l.name}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="relative mx-auto flex min-h-[85vh] flex-col items-center justify-center px-4 pb-10 pt-6 text-center sm:px-8">
              <img src="images/blur.png" className='absolute -top-150 rotate-180' alt="" />

        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,.25),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(37,99,235,.2),transparent_45%)]" />

        <h1 className="select-none f1 text-5xl   mt-9 uppercase leading-[0.9] tracking-tight sm:text-7xl md:text-[10vw]">
          <span className="bg-gradient-to-b from-red-500 to-black bg-clip-text text-transparent">One Universe</span>
          <span className="mt-1 block bg-gradient-to-b from-blue-600 via-blue-700 to-black bg-clip-text text-transparent">
            Infinite Fandoms.
          </span>
        </h1>
<div className="relative w-[60vw] -mt-30">
  <img
    src="images/anime.png"
    className="w-full"
    alt=""
  />

  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
</div>
       <p className="mt-6 max-w-xl  lg:text-[28px] leading-[1.1] text-white/90  sm:text-base">
 Discover iconic characters, epic stories, unforgettable moments, and everything your favorite worlds have to offer.
</p>

<div className="mt-8 flex flex-wrap items-center justify-center gap-3">

  {/* Explore Button */}
  <a
    href="#explore"
    className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm    text-slate-950 transition-all duration-300 hover:scale-105 hover:bg-red-500 hover:text-white"
  >
    Explore categories
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </a>

  {/* Trailer Button */}
  <a
    href="#trailers"
    className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm  text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:bg-red-500/10"
  >
    <Play
      size={15}
      className="transition-transform duration-300 group-hover:scale-125"
    />

    Watch trailers

    <span className="text-white/50 transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </a>

</div>
      </section>

      {/* ================= TICKER ================= */}
     <div className="relative overflow-hidden border-y border-white/10 bg-white/[.02] py-4">

  <style>{`
    @keyframes fv-marquee {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
  `}</style>

  {/* Left Fade */}
  <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#050505] to-transparent" />

  {/* Right Fade */}
  <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#050505] to-transparent" />

  <div
    className="flex w-max gap-4 whitespace-nowrap"
    style={{
      animation: 'fv-marquee 25s linear infinite',
    }}
  >

    {[...CATEGORIES, ...CATEGORIES].map((c, i) => {

      const Icon = c.icon;

      return (
        <a
          key={`${c.name}-${i}`}
          href={`/category/${categorySlug(c.name)}`}
          aria-label={`Explore ${c.name}`}
          className="group relative flex w-[290px] items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4 backdrop-blur-md transition-all duration-300 hover:z-10 hover:scale-[1.02] hover:border-white/20 hover:bg-white/[.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >

          {/* Glow */}
          <div
            className={`absolute -left-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${c.from} ${c.to} opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-50`}
          />

          {/* Icon */}
          <div
            className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.from} ${c.to} shadow-lg`}
          >
            <Icon
              size={21}
              strokeWidth={1.8}
              className="text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
          </div>

          {/* Text */}
          <div className="relative min-w-0">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              {c.name}
            </h3>

            <p className="mt-1 text-[10px] tracking-wide text-white/40">
              {c.tagline}
            </p>
          </div>

          {/* Small Arrow */}
          <span className="absolute right-3 top-3 text-xs text-white/20 transition-all duration-300 group-hover:right-2 group-hover:text-white/70">
            ↗
          </span>

        </a>
      );
    })}

  </div>
</div>

      {/* ================= UNIVERSES ================= */}
      <section id="explore" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <SectionIntro
          eyebrow="Seven worlds, one portal"
          title="Pick your universe."
          description="Every hub ships with its own stories, characters, events and merch."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <a href={`/category/${categorySlug(CATEGORIES[0].name)}`} style={{backgroundImage: `url(${CATEGORIES[0].image})`}} className={`group relative min-h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-cover bg-center bg-no-repeat bg-gradient-to-br ${CATEGORIES[0].from} ${CATEGORIES[0].to} p-6 transition duration-500 ease-out hover:z-10 hover:scale-[1.02] sm:min-h-[520px]`}>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-2/3 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-3xl   uppercase tracking-tight text-white sm:text-4xl">{CATEGORIES[0].name}</h3>
                <p className="mt-1 max-w-xs text-sm text-white/70">{CATEGORIES[0].tagline}</p>
              </div>
            </div>
            <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-white/50 opacity-0 transition group-hover:opacity-100" />
          </a>

          <div className="grid grid-cols-2 gap-4 sm:col-span-2 sm:grid-rows-3">
            {CATEGORIES.slice(1).map((c) => (
              <a key={c.name} href={`/category/${categorySlug(c.name)}`} style={{backgroundImage: `url(${c.image})`}} className={`group relative min-h-[160px] overflow-hidden rounded-3xl border border-white/10 bg-cover bg-center bg-no-repeat bg-gradient-to-br ${c.from} ${c.to} p-5 transition duration-500 ease-out hover:z-10 hover:scale-[1.02]`}>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-2/3 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                    <c.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3  className="text-lg   uppercase tracking-tight text-white">{c.name}</h3>
                    <p className="mt-1 text-xs text-white/70">{c.tagline}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CHARACTERS ================= */}
      <section id="characters" className="border-t border-white/5 bg-slate-900/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionIntro eyebrow="Faces of the multiverse" title="Characters fans are already talking about." />
        </div>
        <div className="no-scrollbar flex gap-5 overflow-x-auto px-4 pb-4 sm:px-8">
          {CHARACTERS.map((c, i) => (
            <div key={c.name} className={`group relative flex w-[190px] shrink-0 flex-col justify-end overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-800 to-slate-950 p-5 sm:w-[220px] sm:aspect-[3/4] ${i % 2 === 1 ? 'sm:mt-8' : ''}`}>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-xl font-black">{c.initials}</div>
              <p className="text-[10px]    uppercase tracking-widest text-red-500">{c.tag}</p>
              <h4 className="mt-1 text-lg font-black text-white">{c.name}</h4>
              <p className="truncate text-xs text-white/45">{c.series}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TRAILERS ================= */}
      <section id="trailers" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <SectionIntro eyebrow="Now screening" title="Trailers worth clearing your evening for." />
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
            <div className="aspect-video">
              <iframe
                key={activeTrailer.title}
                className="h-full w-full border-0"
                src={activeTrailer.embed}
                title={activeTrailer.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex items-center justify-between p-5">
              <h3 className="text-xl font-black text-white">{activeTrailer.title}</h3>
              <span className={`shrink-0 rounded-full px-3 py-1 text-[10px]    uppercase tracking-wider ${activeTrailer.status === 'upcoming' ? 'bg-blue-600/20 text-blue-300' : 'bg-red-600/20 text-red-300'}`}>
                {activeTrailer.status}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {TRAILERS.filter((t) => t.title !== activeTrailer.title).map((t) => (
              <button key={t.title} onClick={() => setActiveTrailer(t)} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.03] p-3 text-left transition hover:border-white/25 hover:bg-white/[.06]">
                <div className="relative flex h-16 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900">
                  <Play className="h-5 w-5 text-white/80" fill="currentColor" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm    text-white">{t.title}</p>
                  <p className="text-xs capitalize text-white/40">{t.status}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EVENTS ================= */}
      <section id="events" className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <SectionIntro eyebrow="Mark the date" title="What's next on the calendar." />
          <div className="relative ml-3 border-l border-white/10 pl-8">
            {EVENTS.map((ev, i) => (
              <div key={ev.title} className="relative pb-10 last:pb-0">
                <span className={`absolute -left-[41px] top-1 h-3 w-3 rounded-full ring-4 ring-slate-950 ${i % 2 === 0 ? 'bg-red-600' : 'bg-blue-600'}`} />
                <p className="text-xs    uppercase tracking-widest text-white/40">
                  {new Date(ev.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">{ev.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-white/45"><MapPin size={14} /> {ev.location}</p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="border-y border-white/5 bg-white/[.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-8 md:grid-cols-4">
          {[
            { icon: Boxes, value: '7', label: 'Fandom hubs' },
            { icon: Users2, value: '35+', label: 'Original characters' },
            { icon: Radio, value: 'Live', label: 'Event calendar' },
            { icon: Star, value: '1,248+', label: 'Simulated visitors' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <s.icon className="h-5 w-5 shrink-0 text-red-500" />
              <div>
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MERCH ================= */}
      <section id="merch" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <SectionIntro eyebrow="Collector corner" title="Take the universe home with you." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MERCH.map((item, i) => (
            <div key={item.name} className={`overflow-hidden rounded-3xl border border-white/10 bg-white/[.03] ${i === 0 ? 'sm:col-span-2 sm:row-span-2 sm:flex sm:h-full sm:flex-col' : ''}`}>
              <div className={`group/image relative overflow-hidden bg-gradient-to-br ${item.from} ${item.to} ${i === 0 ? 'aspect-[4/3] sm:aspect-auto sm:min-h-0 sm:flex-1' : 'aspect-square'}`}>
                <img
                  src={item.image}
                  alt={`${item.name} artwork`}
                  className={`h-full w-full transition-transform duration-500 group-hover/image:scale-105 ${item.image === '/images/guy.png' ? 'object-contain' : 'object-cover'}`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              </div>
              <div className="flex items-center justify-between p-4">
                <p className="   text-white">{item.name}</p>
                <span className="shrink-0 rounded-full bg-red-600/15 px-3 py-1 text-xs    text-red-400">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-8">
        <SectionIntro eyebrow="Before you dive in" title="Questions people actually ask." />
        <div className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[.02]">
          {FAQ.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                <span className="   text-white">{f.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-white/40 transition ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && <p className="px-5 pb-5 text-sm leading-6 text-white/50">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-red-600/20 via-slate-950 to-blue-700/20 p-8 sm:p-14">
          <p className="text-xs    uppercase tracking-[0.3em] text-white/50">Join the multiverse</p>
          <h2 className="mt-4 max-w-2xl text-3xl   uppercase leading-tight text-white sm:text-5xl">
            Your next fandom is one click away.
          </h2>
          <form className="mt-7 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <label className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input type="email" required placeholder="you@fandomverse.demo" className="w-full rounded-full border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-red-500/50" />
            </label>
            <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm    text-slate-950 transition hover:bg-red-100">
              Notify me
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
     <footer className="relative overflow-hidden border-t border-white/10 bg-black pt-16">

  {/* Background Glow */}
  <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px]" />

  <div className="relative mx-auto max-w-7xl px-5 pb-10 sm:px-8">

    {/* Main Footer */}
    <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">

      {/* Brand */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-600/20">
            <Sparkles className="h-5 w-5 fill-white text-white" />
          </div>

          <div>
            <h2 className="text-xl font-black tracking-tight text-white">
              Fandom<span className="text-red-600">Verse</span>
            </h2>

            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              Your fandom universe
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-sm text-sm leading-7 text-white/40">
          Discover characters, stories, trailers, events and everything
          you love across the worlds of fandom.
        </p>

        {/* Social / Status */}
        <div className="mt-6 flex items-center gap-3">

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs text-white/50">
              Fandom is alive
            </span>
          </div>

        </div>
      </div>


      {/* Discover */}
      <div>
        <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
          Discover
        </h3>

        <div className="space-y-3">

          <a
            href="/"
            className="group flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <span>Home</span>
            <span className="translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          </a>

          <a
            href="/explore"
            className="group flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <span>Explore</span>
            <span className="translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          </a>

          <a
            href="/trailers"
            className="group flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <span>Trailers</span>
            <span className="translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          </a>

          <a
            href="/merchandise"
            className="group flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <span>Merch Store</span>
            <span className="translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          </a>

        </div>
      </div>


      {/* Fandom */}
      <div>
        <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
          Fandom
        </h3>

        <div className="space-y-3">

          <a
            href="/#characters"
            className="group flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <span>Characters</span>
            <span className="translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          </a>

          <a
            href="/#events"
            className="group flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <span>Events</span>
            <span className="translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          </a>

          <a
            href="/bookmarks"
            className="group flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <span>Bookmarks</span>
            <span className="translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          </a>

          <a
            href="/category/anime"
            className="group flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <span>Categories</span>
            <span className="translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          </a>

        </div>
      </div>


      {/* Categories */}
      <div>
        <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
          Categories
        </h3>

        <div className="grid grid-cols-2 gap-y-3">

          <a
            href="/category/anime"
            className="text-sm text-white/40 transition hover:text-red-500"
          >
            Anime
          </a>

          <a
            href="/category/gaming"
            className="text-sm text-white/40 transition hover:text-blue-500"
          >
            Gaming
          </a>

          <a
            href="/category/movies"
            className="text-sm text-white/40 transition hover:text-amber-500"
          >
            Movies
          </a>

          <a
            href="/category/tv-shows"
            className="text-sm text-white/40 transition hover:text-emerald-500"
          >
            TV Shows
          </a>

          <a
            href="/category/k-pop"
            className="text-sm text-white/40 transition hover:text-pink-500"
          >
            K-Pop
          </a>

          <a
            href="/category/comics"
            className="text-sm text-white/40 transition hover:text-orange-500"
          >
            Comics
          </a>

          <a
            href="/category/manga"
            className="text-sm text-white/40 transition hover:text-slate-300"
          >
            Manga
          </a>

        </div>
      </div>

    </div>


    {/* Bottom Line */}
    <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

      <p className="text-xs text-white/25">
        © {new Date().getFullYear()} FandomVerse. All rights reserved.
      </p>

      <div className="flex flex-wrap gap-5 text-xs text-white/25">
        <a href="/about" className="transition hover:text-white">
          About Us
        </a>

        <a href="/contact" className="transition hover:text-white">
          Contact Us
        </a>

        <a href="/privacy" className="transition hover:text-white">
          Privacy
        </a>

        <span className="text-white/10">•</span>

        <span>
          Built with React & Tailwind
        </span>
      </div>

    </div>

  </div>
</footer>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <section
            aria-label="FandomVerse chat assistant"
            className="flex max-h-[min(32rem,calc(100dvh-7rem))] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-2xl shadow-black/50"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[.04] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white">
                  <Bot className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-white">FandomVerse Guide</h2>
                  <p className="text-xs text-emerald-400">Ready to help</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-4">
              {chatMessages.map((message, index) => (
                <div
                  key={`${message.from}-${index}`}
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-5 ${message.from === 'user' ? 'ml-auto bg-red-600 text-white' : 'bg-white/[.08] text-white/80'}`}
                >
                  {message.text}
                </div>
              ))}
              {chatMessages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Show categories', 'Upcoming events', 'Merch prices'].map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendChatMessage(prompt)}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition hover:border-red-500/60 hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              className="flex items-center gap-2 border-t border-white/10 p-3"
              onSubmit={(event) => {
                event.preventDefault();
                sendChatMessage();
              }}
            >
              <label className="sr-only" htmlFor="fandom-chat-input">Message the FandomVerse Guide</label>
              <input
                id="fandom-chat-input"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask me something..."
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-red-500/60"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!chatInput.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </section>
        )}

        <button
          type="button"
          onClick={() => setChatOpen((open) => !open)}
          aria-label={chatOpen ? 'Close chat assistant' : 'Open chat assistant'}
          aria-expanded={chatOpen}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-950/50 transition hover:scale-105 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {chatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>

    </div>
  );
}