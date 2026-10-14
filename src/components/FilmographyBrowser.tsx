'use client';

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, Film, Play, Search, Star, Trophy } from 'lucide-react';
import { FILMOGRAPHY, FilmographyEntry, UPCOMING } from '../data/filmography';
import { useApp } from '../context/AppContext';

type Kind = 'all' | 'film' | 'series' | 'documentary';
type Sort = 'newest' | 'oldest' | 'rating';

const KIND_LABEL: Record<FilmographyEntry['kind'], string> = {
  film: 'Film',
  series: 'TV series',
  documentary: 'Documentary',
};

const Poster: React.FC<{ entry: FilmographyEntry; className?: string }> = ({ entry, className = '' }) => {
  const [failed, setFailed] = useState(!entry.poster);
  return failed ? (
    <div
      className={`flex flex-col items-center justify-center text-center p-3 ${className}`}
      style={{ background: 'linear-gradient(160deg, #111622 0%, #1a2233 45%, #4a210d 100%)' }}
    >
      <Film className="w-5 h-5 text-[#F28C28] mb-2" />
      <span className="cinema-title text-white text-sm font-black leading-tight">{entry.title}</span>
    </div>
  ) : (
    <img
      src={entry.poster ?? ''}
      alt={`${entry.title} poster`}
      loading="lazy"
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
};

const Score: React.FC<{ value: number | null; className?: string }> = ({ value, className = '' }) =>
  value ? (
    <span className={`inline-flex items-center gap-1 text-xs font-mono font-bold ${className}`}>
      <Star className="w-3 h-3 fill-current" />
      {value.toFixed(1)}
    </span>
  ) : null;

/** Fan-favourite ranking: feature films only, ordered by audience score. */
export const TOP_TEN: FilmographyEntry[] = FILMOGRAPHY.filter((f) => f.kind === 'film' && f.score)
  .sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || b.year - a.year)
  .slice(0, 10);

export const FilmographyBrowser: React.FC = () => {
  const { playTrailerById } = useApp();
  const [kind, setKind] = useState<Kind>('all');
  const [sort, setSort] = useState<Sort>('newest');
  const [selectedDecade, setSelectedDecade] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [query, setQuery] = useState('');

  const allGenres = useMemo(() => {
    const set = new Set<string>();
    FILMOGRAPHY.forEach((f) => {
      f.genres?.forEach((g) => set.add(g));
    });
    return Array.from(set).sort();
  }, []);

  const trailer = (e: FilmographyEntry) => playTrailerById(e.id, e.title, `Directed by ${e.director}`);

  const list = useMemo(() => {
    let l = FILMOGRAPHY.filter((f) => (kind === 'all' ? true : f.kind === kind));

    // Year / Decade filter
    if (selectedDecade !== 'all') {
      const startYear = parseInt(selectedDecade.replace('s', ''), 10);
      l = l.filter((f) => f.year >= startYear && f.year < startYear + 10);
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      l = l.filter((f) => f.genres && f.genres.includes(selectedGenre));
    }

    // Role filter
    if (selectedRole === 'narrator') {
      l = l.filter(
        (f) =>
          f.role.toLowerCase().includes('narrator') ||
          f.role.toLowerCase().includes('host') ||
          f.kind === 'documentary'
      );
    } else if (selectedRole === 'lead') {
      l = l.filter(
        (f) =>
          !f.role.toLowerCase().includes('supporting') &&
          !f.role.toLowerCase().includes('narrator') &&
          f.id !== 'whats-eating-gilbert-grape' &&
          f.id !== 'django-unchained' &&
          f.id !== 'celebrity' &&
          f.id !== 'poison-ivy' &&
          f.id !== 'critters-3'
      );
    } else if (selectedRole === 'support') {
      l = l.filter(
        (f) =>
          f.role.toLowerCase().includes('supporting') ||
          f.id === 'whats-eating-gilbert-grape' ||
          f.id === 'django-unchained' ||
          f.id === 'celebrity' ||
          f.id === 'poison-ivy' ||
          f.id === 'critters-3'
      );
    }

    const q = query.trim().toLowerCase();
    if (q) {
      l = l.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.director.toLowerCase().includes(q) ||
          f.role.toLowerCase().includes(q)
      );
    }

    l = [...l].sort((a, b) =>
      sort === 'newest'
        ? b.year - a.year
        : sort === 'oldest'
        ? a.year - b.year
        : (b.score ?? 0) - (a.score ?? 0)
    );
    return l;
  }, [kind, sort, query, selectedDecade, selectedGenre, selectedRole]);

  const counts = {
    film: FILMOGRAPHY.filter((f) => f.kind === 'film').length,
    series: FILMOGRAPHY.filter((f) => f.kind === 'series').length,
    documentary: FILMOGRAPHY.filter((f) => f.kind === 'documentary').length,
  };

  const [first, ...rest] = TOP_TEN;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Top 10 */}
      <section className="pt-12 sm:pt-16">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-[#F28C28] mb-3 border border-[#F28C28]/30">
            <Trophy className="w-3.5 h-3.5" />
            <span>FAN FAVOURITES</span>
          </div>
          <h2 className="cinema-title text-3xl sm:text-5xl font-black text-[#141414] dark:text-white tracking-tight">
            Top 10 <span className="gold-text-gradient">Masterpieces</span>
          </h2>
          <p className="mt-4 text-base text-[var(--text-muted)] leading-relaxed">
            His ten best-loved films, ranked by audience scores on The Movie Database. Tap a film to see everything about it,
            or press play to watch the trailer.
          </p>
        </div>

        {first && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            <div className="lg:col-span-5 relative">
              <Link to={`/film/${first.id}`} className="group block relative aspect-[2/3] max-w-sm mx-auto lg:max-w-none rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl">
                <Poster entry={first} className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 w-14 h-14 rounded-2xl bg-[#F28C28] text-white flex items-center justify-center text-3xl font-black shadow-lg" style={{ color: '#FFFFFF' }}>
                  1
                </div>
              </Link>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#F28C28]">The fan favourite</div>
              <h3 className="cinema-title text-3xl sm:text-5xl font-black text-[#141414] dark:text-white mt-2 leading-tight">{first.title}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--text-muted)]">
                <span>{first.year}</span>
                <span>Directed by <strong className="text-[#141414] dark:text-white">{first.director}</strong></span>
                <Score value={first.score} className="text-[#F28C28]" />
              </div>
              <p className="mt-4 text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">{first.synopsis}</p>
              <div className="mt-3 text-sm text-[#F28C28]">Leonardo as {first.role}</div>
              <div className="mt-6 flex flex-wrap gap-3">
                {first.trailer && (
                  <button
                    onClick={() => trailer(first)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-orange-500/30 hover:scale-105 transition-all cursor-pointer"
                    style={{ color: '#FFFFFF' }}
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch trailer</span>
                  </button>
                )}
                <Link to={`/film/${first.id}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] hover:border-[#F28C28] font-semibold text-sm text-[#141414] dark:text-white transition-all">
                  <span>See more about the film</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {rest.map((f, i) => (
            <div key={f.id} className="group flex flex-col">
              <Link to={`/film/${f.id}`} className="relative block aspect-[2/3] rounded-2xl overflow-hidden border border-[var(--border)] shadow-md group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:border-[#F28C28]/60 transition-all duration-300">
                <Poster entry={f} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2.5 left-2.5 w-9 h-9 rounded-xl bg-[#F28C28] text-white flex items-center justify-center text-lg font-black shadow-md" style={{ color: '#FFFFFF' }}>
                  {i + 2}
                </div>
                {f.trailer && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      trailer(f);
                    }}
                    className="absolute bottom-2.5 right-2.5 w-10 h-10 rounded-full bg-[#F28C28] text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all cursor-pointer"
                    aria-label={`Watch trailer for ${f.title}`}
                  >
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </button>
                )}
              </Link>
              <div className="pt-3 px-0.5">
                <div className="text-sm font-bold text-[#141414] dark:text-white leading-snug line-clamp-2">
                  <Link to={`/film/${f.id}`} className="hover:text-[#F28C28] transition-colors">{f.title}</Link>
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5 flex items-center gap-2">
                  <span>{f.year}</span>
                  <Score value={f.score} className="text-[#F28C28]" />
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5 line-clamp-1">Dir. {f.director}</div>
                <div className="mt-2 flex items-center gap-3 text-xs font-bold">
                  {f.trailer && (
                    <button onClick={() => trailer(f)} className="text-[#F28C28] hover:underline inline-flex items-center gap-1 cursor-pointer">
                      <Play className="w-3 h-3 fill-current" /> Trailer
                    </button>
                  )}
                  <Link to={`/film/${f.id}`} className="text-[var(--text-muted)] hover:text-[#F28C28]">More →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Coming soon */}
      <section className="pt-16 sm:pt-20">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-emerald-500 mb-3 border border-emerald-500/30">
            <CalendarClock className="w-3.5 h-3.5" />
            <span>COMING SOON</span>
          </div>
          <h2 className="cinema-title text-3xl sm:text-5xl font-black text-[#141414] dark:text-white tracking-tight">
            Upcoming <span className="gold-text-gradient">projects</span>
          </h2>
          <p className="mt-4 text-base text-[var(--text-muted)] leading-relaxed">
            What Leonardo has in the pipeline, as reported by public sources. Release dates and plans can change.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {UPCOMING.map((u) => (
            <div key={u.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden flex flex-col">
              <div
                className="relative px-6 py-10 text-center"
                style={{ background: 'linear-gradient(160deg, #111622 0%, #1a2233 45%, #4a210d 100%)' }}
              >
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/90" style={{ color: '#FFFFFF' }}>
                  {u.status}
                </span>
                <div className="cinema-title text-2xl font-black leading-tight" style={{ color: '#FFFFFF' }}>{u.title}</div>
                <div className="mt-2 text-xs font-mono" style={{ color: '#F5B66B' }}>{u.expected}</div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs text-[var(--text-muted)]">
                  Directed by <span className="font-semibold text-[#141414] dark:text-white">{u.director}</span>
                </div>
                <div className="text-xs text-[#F28C28] mt-0.5">Leonardo as {u.role}</div>
                <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">{u.summary}</p>
                <div className="mt-3 text-[11px] text-[var(--text-muted)] leading-snug">
                  <span className="font-semibold text-[#141414] dark:text-white">Cast: </span>
                  {u.cast.join(', ')}
                </div>
                <div className="mt-auto pt-4 text-[11px] font-mono text-[var(--text-muted)]">
                  Source:{' '}
                  {u.sources.map((src) => (
                    <a key={src.url} href={src.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#F28C28]">
                      {src.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complete filmography */}
      <section className="pt-20">
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#F28C28] mb-3">Everything he has acted in</div>
          <h2 className="cinema-title text-3xl sm:text-5xl font-black text-[#141414] dark:text-white tracking-tight">
            The complete <span className="gold-text-gradient">filmography</span>
          </h2>
          <p className="mt-4 text-base text-[var(--text-muted)] leading-relaxed">
            {counts.film} films, {counts.series} early TV series and {counts.documentary} documentaries, from his first television
            roles to his latest work. Tap any title for the full story.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {([
              ['all', `All (${FILMOGRAPHY.length})`],
              ['film', `Films (${counts.film})`],
              ['series', `TV series (${counts.series})`],
              ['documentary', `Documentaries (${counts.documentary})`],
            ] as [Kind, string][]).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setKind(k)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  kind === k
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                    : 'bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                }`}
                style={kind === k ? { color: '#FFFFFF' } : undefined}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, director or role"
                className="w-full sm:w-64 pl-9 pr-3 py-2 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[#F28C28]"
              />
            </label>
            {/* Year / Decade Filter */}
            <select
              value={selectedDecade}
              onChange={(e) => setSelectedDecade(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none cursor-pointer"
              aria-label="Filter by Decade"
            >
              <option value="all">All Decades</option>
              <option value="2020s">2020s</option>
              <option value="2010s">2010s</option>
              <option value="2000s">2000s</option>
              <option value="1990s">1990s</option>
              <option value="1980s">1980s</option>
            </select>

            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none cursor-pointer"
              aria-label="Filter by Genre"
            >
              <option value="all">All Genres</option>
              {allGenres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none cursor-pointer"
              aria-label="Filter by Role"
            >
              <option value="all">All Roles</option>
              <option value="lead">Leading Actor</option>
              <option value="support">Supporting Actor</option>
              <option value="narrator">Narrator / Host</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="px-3 py-2 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none cursor-pointer"
              aria-label="Sort"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="rating">Highest rated</option>
            </select>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="py-16 text-center text-[var(--text-muted)]">No titles match your search.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5">
            {list.map((f) => (
              <div key={f.id} className="group flex flex-col">
                <Link to={`/film/${f.id}`} className="relative block aspect-[2/3] rounded-2xl overflow-hidden border border-[var(--border)] shadow-md group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:border-[#F28C28]/60 transition-all duration-300">
                  <Poster entry={f} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md" style={{ color: '#FFFFFF' }}>
                    {KIND_LABEL[f.kind]}
                  </span>
                  {f.trailer && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        trailer(f);
                      }}
                      className="absolute bottom-2.5 right-2.5 w-10 h-10 rounded-full bg-[#F28C28] text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all cursor-pointer"
                      aria-label={`Watch trailer for ${f.title}`}
                    >
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </button>
                  )}
                </Link>
                <div className="pt-3 px-0.5 flex flex-col flex-grow">
                  <div className="text-sm font-bold text-[#141414] dark:text-white leading-snug line-clamp-2">
                    <Link to={`/film/${f.id}`} className="hover:text-[#F28C28] transition-colors">{f.title}</Link>
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5 flex items-center gap-2">
                    <span>{f.year}</span>
                    <Score value={f.score} className="text-[#F28C28]" />
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5 line-clamp-1">{f.kind === 'series' ? f.director : `Dir. ${f.director}`}</div>
                  <div className="text-[11px] text-[#F28C28] mt-0.5 line-clamp-1">as {f.role}</div>
                  <div className="mt-2 flex items-center gap-3 text-xs font-bold">
                    {f.trailer && (
                      <button onClick={() => trailer(f)} className="text-[#F28C28] hover:underline inline-flex items-center gap-1 cursor-pointer">
                        <Play className="w-3 h-3 fill-current" /> Trailer
                      </button>
                    )}
                    <Link to={`/film/${f.id}`} className="text-[var(--text-muted)] hover:text-[#F28C28]">More →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="mt-10 text-[11px] font-mono text-[var(--text-muted)]">
          Audience scores are from The Movie Database (TMDB) and are out of 10. Posters and stills are used to identify the films.
        </p>
      </section>
    </div>
  );
};
