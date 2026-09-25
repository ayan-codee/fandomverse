import {
  ArrowLeft, ArrowUpRight, Calendar, Clapperboard, Gamepad2, Heart,
  Music2, Play, Sparkles, Tv, Users,
} from 'lucide-react';

const CATEGORY_PAGES = {
  anime: {
    name: 'Anime',
    tagline: 'Stories beyond the screen',
    image: '/images/categories/animecard.png',
    from: 'from-red-600',
    to: 'to-rose-950',
    icon: Sparkles,
    description: 'Enter worlds where every battle, friendship and quiet moment carries a little more meaning.',
    highlights: ['Original heroes', 'Seasonal watchlists', 'Behind-the-scenes lore'],
  },
  gaming: {
    name: 'Gaming',
    tagline: 'Press start on discovery',
    image: '/images/categories/gaming.png',
    from: 'from-blue-600',
    to: 'to-slate-950',
    icon: Gamepad2,
    description: 'Find the games, characters and unforgettable moments that keep your controller close.',
    highlights: ['New releases', 'Legendary quests', 'Player-made worlds'],
  },
  movies: {
    name: 'Movies',
    tagline: 'Every frame has a story',
    image: '/images/categories/movies.png',
    from: 'from-amber-600',
    to: 'to-slate-950',
    icon: Clapperboard,
    description: 'Settle in for striking performances, big ideas and the scenes everyone keeps talking about.',
    highlights: ['Coming soon', 'Fan favorites', 'Director spotlights'],
  },
  'tv-shows': {
    name: 'TV Shows',
    tagline: 'Your next obsession',
    image: '/images/categories/tvshows.png',
    from: 'from-emerald-600',
    to: 'to-slate-950',
    icon: Tv,
    description: 'Keep up with the series, characters and cliffhangers that turn one episode into a whole weekend.',
    highlights: ['Binge guides', 'Episode drops', 'Cast stories'],
  },
  'k-pop': {
    name: 'K-Pop',
    tagline: 'Rhythm, visuals, fandom',
    image: '/images/categories/kpop.png',
    from: 'from-pink-600',
    to: 'to-slate-950',
    icon: Music2,
    description: 'Follow the sound, style and electric energy behind the artists shaping the next wave.',
    highlights: ['New releases', 'Artist spotlights', 'Performance picks'],
  },
  comics: {
    name: 'Comics',
    tagline: 'Panels packed with power',
    image: '/images/categories/comics.png',
    from: 'from-orange-600',
    to: 'to-slate-950',
    icon: Sparkles,
    description: 'Turn the page on bold heroes, strange worlds and stories built one frame at a time.',
    highlights: ['New issues', 'Hero archives', 'Creator picks'],
  },
  manga: {
    name: 'Manga',
    tagline: 'Turn the next page',
    image: '/images/categories/manga.png',
    from: 'from-slate-600',
    to: 'to-slate-950',
    icon: Sparkles,
    description: 'Discover beautifully drawn stories, unforgettable rivals and the next series worth reading.',
    highlights: ['Reading lists', 'New chapters', 'Classic arcs'],
  },
};

export default function CategoryPage({ slug }) {
  const category = CATEGORY_PAGES[slug];

  if (!category) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-red-500">404 / Lost universe</p>
        <h1 className="mt-4 text-4xl font-black uppercase">This world is still loading.</h1>
        <a href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950">
          <ArrowLeft className="h-4 w-4" /> Back to FandomVerse
        </a>
      </main>
    );
  }

  const Icon = category.icon;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative isolate min-h-[72vh] overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/75 to-black/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/25 to-transparent" />

        <div className="mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-between px-5 py-6 sm:px-8 sm:py-8">
          <a href="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            FandomVerse
          </a>

          <div className="max-w-2xl pb-4 sm:pb-10">
            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${category.from} ${category.to} shadow-2xl`}>
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-400">Explore the universe</p>
            <h1 className="mt-3 text-6xl font-black uppercase leading-[0.88] tracking-tight sm:text-8xl">{category.name}</h1>
            <p className="mt-5 text-lg text-white/75 sm:text-xl">{category.tagline}. {category.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#discover" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:scale-105 hover:bg-red-500 hover:text-white">
                Start exploring <ArrowUpRight className="h-4 w-4" />
              </a>
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-5 py-3 text-sm text-white backdrop-blur transition hover:border-white/50">
                <Heart className="h-4 w-4" /> Save universe
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="discover" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-500">Inside {category.name}</p>
            <h2 className="mt-3 max-w-xl text-3xl font-black uppercase leading-tight sm:text-5xl">Find your next favorite obsession.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/50">A hand-picked starting point for the stories, people and moments waiting inside this universe.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {category.highlights.map((highlight, index) => (
            <article key={highlight} className="group relative min-h-48 overflow-hidden rounded-3xl border border-white/10 bg-white/[.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[.07]">
              <span className="text-5xl font-black text-white/10">0{index + 1}</span>
              <h3 className="mt-10 text-xl font-bold text-white">{highlight}</h3>
              <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-white/30 transition group-hover:text-red-400" />
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6">
            <Users className="h-5 w-5 text-red-500" />
            <p className="mt-8 text-3xl font-black">35+</p>
            <p className="mt-1 text-sm text-white/45">Characters to meet</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6">
            <Calendar className="h-5 w-5 text-blue-400" />
            <p className="mt-8 text-3xl font-black">12</p>
            <p className="mt-1 text-sm text-white/45">Upcoming moments</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6">
            <Play className="h-5 w-5 text-amber-400" />
            <p className="mt-8 text-3xl font-black">24/7</p>
            <p className="mt-1 text-sm text-white/45">Fandom energy</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="text-sm text-white/45">There is more beyond this page.</p>
            <h2 className="mt-2 text-2xl font-black uppercase">Explore another universe.</h2>
          </div>
          <a href="/" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition hover:border-red-500 hover:text-red-400">
            <ArrowLeft className="h-4 w-4" /> View all categories
          </a>
        </div>
      </section>
    </main>
  );
}
