import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Award, Calendar, CheckCircle2, Trophy } from 'lucide-react';
import { Link } from '../../../navigation';
import { getWebPageSchema, getBreadcrumbSchema, BASE_URL } from '../../../utils/schema';

interface AwardDetail {
  id: string;
  name: string;
  summary: string;
  wins: number;
  nominations: number;
  historyParagraphs: string[];
  keyWins: string[];
  externalSource?: { label: string; url: string };
}

const AWARDS: AwardDetail[] = [
  {
    id: 'academy-awards',
    name: 'Academy Awards (Oscars)',
    summary:
      'Leonardo DiCaprio won the Academy Award for Best Actor in 2016 for his leading performance in The Revenant at the 88th Academy Awards. Across his 30+ year career, he has earned eight total Oscar nominations from the Academy of Motion Picture Arts and Sciences, including seven for acting and one for Best Picture as producer of The Wolf of Wall Street.',
    wins: 1,
    nominations: 8,
    historyParagraphs: [
      'DiCaprio earned his first Oscar nomination at age 19 for playing Arnie Grape in Lasse Hallström\'s What\'s Eating Gilbert Grape (1993), establishing him as one of cinema\'s foremost acting talents.',
      'He went on to receive Best Actor nominations for Martin Scorsese\'s The Aviator (2004), Edward Zwick\'s Blood Diamond (2006), Scorsese\'s The Wolf of Wall Street (2013), Quentin Tarantino\'s Once Upon a Time in Hollywood (2019), and Paul Thomas Anderson\'s One Battle After Another (2025). In addition, he was nominated for Best Picture as a producer of The Wolf of Wall Street in 2014.',
      'In 2016, his portrayal of frontiersman Hugh Glass in Alejandro G. Iñárritu\'s The Revenant culminated in a historic Academy Award win, during which he dedicated his acceptance speech to global climate action and indigenous rights.',
    ],
    keyWins: [
      '2016 Winner: Best Actor in a Leading Role (The Revenant)',
      '1994 Nominee: Best Supporting Actor (What\'s Eating Gilbert Grape)',
      '2005 Nominee: Best Actor (The Aviator)',
      '2007 Nominee: Best Actor (Blood Diamond)',
      '2014 Nominee: Best Actor (The Wolf of Wall Street)',
      '2014 Nominee: Best Picture Producer (The Wolf of Wall Street)',
      '2020 Nominee: Best Actor (Once Upon a Time… in Hollywood)',
      '2026 Nominee: Best Actor (One Battle After Another)',
    ],
    externalSource: {
      label: 'Oscars.org Official Database',
      url: 'https://awardsdatabase.oscars.org/',
    },
  },
  {
    id: 'golden-globes',
    name: 'Golden Globe Awards',
    summary:
      'Leonardo DiCaprio has won three Golden Globe Awards from fifteen nominations: Best Actor in a Drama for The Aviator (2005) and The Revenant (2016), and Best Actor in a Musical or Comedy for The Wolf of Wall Street (2014).',
    wins: 3,
    nominations: 15,
    historyParagraphs: [
      'The Hollywood Foreign Press Association recognized DiCaprio early in his career, beginning with his nomination for What\'s Eating Gilbert Grape in 1994, followed by Titanic in 1998 and Catch Me If You Can in 2003.',
      'His creative work with Martin Scorsese brought major Golden Globe triumphs, beginning with his win for portraying aviation pioneer Howard Hughes in The Aviator (2004) and stockbroker Jordan Belfort in The Wolf of Wall Street (2013).',
      'His third win arrived in 2016 for The Revenant, marking a sweep across the major awards season.',
    ],
    keyWins: [
      '2016 Winner: Best Actor in a Motion Picture – Drama (The Revenant)',
      '2014 Winner: Best Actor in a Motion Picture – Musical or Comedy (The Wolf of Wall Street)',
      '2005 Winner: Best Actor in a Motion Picture – Drama (The Aviator)',
    ],
    externalSource: {
      label: 'GoldenGlobes.com Archive',
      url: 'https://goldenglobes.com/person/leonardo-dicaprio/',
    },
  },
  {
    id: 'bafta-awards',
    name: 'BAFTA Film Awards',
    summary:
      'Leonardo DiCaprio won the British Academy Film Award (BAFTA) for Best Actor in a Leading Role in 2016 for The Revenant. He has earned seven BAFTA nominations spanning his collaborations with Martin Scorsese, Christopher Nolan, and Quentin Tarantino.',
    wins: 1,
    nominations: 7,
    historyParagraphs: [
      'The British Academy of Film and Television Arts has nominated DiCaprio for leading roles in The Aviator, The Departed, The Wolf of Wall Street, The Revenant, Once Upon a Time in Hollywood, and Don\'t Look Up.',
      'In February 2016 at the Royal Opera House in London, DiCaprio accepted the BAFTA for Best Actor for The Revenant, thanking British cinema mentors and his co-star Tom Hardy.',
    ],
    keyWins: [
      '2016 Winner: Best Actor in a Leading Role (The Revenant)',
      'Nominated for The Aviator, The Departed, The Wolf of Wall Street, Once Upon a Time in Hollywood, Don\'t Look Up',
    ],
    externalSource: {
      label: 'BAFTA Awards Database',
      url: 'https://awards.bafta.org/',
    },
  },
  {
    id: 'sag-awards',
    name: 'Screen Actors Guild Awards',
    summary:
      'Leonardo DiCaprio won the Screen Actors Guild Award for Outstanding Performance by a Male Actor in a Leading Role in 2016 for The Revenant. He has received fifteen SAG Award nominations across lead actor and ensemble categories.',
    wins: 1,
    nominations: 15,
    historyParagraphs: [
      'Voted on by his peer actors, the SAG Awards have recognized DiCaprio throughout his career, including ensemble nominations for Titanic, Gangs of New York, The Aviator, The Departed, and Once Upon a Time in Hollywood.',
      'His lead actor triumph for The Revenant in 2016 was celebrated as a milestone in contemporary dramatic commitment.',
    ],
    keyWins: [
      '2016 Winner: Outstanding Performance by a Male Actor in a Leading Role (The Revenant)',
    ],
    externalSource: {
      label: 'SAG Awards Official Archive',
      url: 'https://www.sagawards.org/',
    },
  },
  {
    id: 'critics-choice',
    name: 'Critics\' Choice Movie Awards',
    summary:
      'Leonardo DiCaprio has won two Critics\' Choice Movie Awards: Best Actor for The Revenant (2016) and Best Actor in a Comedy for The Wolf of Wall Street (2014), along with fifteen career nominations from the Critics Choice Association.',
    wins: 2,
    nominations: 15,
    historyParagraphs: [
      'The Critics Choice Association has repeatedly lauded DiCaprio\'s versatility, celebrating both his physical commitment in historical epics and his razor-sharp comedic timing.',
    ],
    keyWins: [
      '2016 Winner: Best Actor (The Revenant)',
      '2014 Winner: Best Actor in a Comedy (The Wolf of Wall Street)',
    ],
    externalSource: {
      label: 'Critics Choice Association',
      url: 'https://www.criticschoice.com/',
    },
  },
  {
    id: 'un-messenger-of-peace',
    name: 'United Nations Messenger of Peace',
    summary:
      'In September 2014, United Nations Secretary-General Ban Ki-moon appointed Leonardo DiCaprio as a UN Messenger of Peace with a dedicated mandate on global climate change. DiCaprio addressed world leaders at the UN Climate Summit and at the 2016 signing of the Paris Climate Accord.',
    wins: 1,
    nominations: 1,
    historyParagraphs: [
      'UN Messengers of Peace are distinguished individuals carefully selected from the fields of art, literature, and science who have agreed to help focus worldwide attention on the work of the United Nations.',
      'DiCaprio has leveraged this global mandate to advocate for transitioning toward 100% clean energy, preserving oceanic habitats, protecting Indigenous territorial sovereignty, and eliminating fossil fuel subsidies.',
    ],
    keyWins: [
      '2014 Designation: UN Messenger of Peace on Climate Change by Ban Ki-moon',
      'Keynote Address: UN Climate Summit (New York, 2014)',
      'Signatory Delegate: Paris Climate Agreement (2016)',
    ],
    externalSource: {
      label: 'United Nations Messengers of Peace',
      url: 'https://www.un.org/en/messengers-peace',
    },
  },
  {
    id: 'clinton-global-citizen',
    name: 'Clinton Global Citizen Award',
    summary:
      'In September 2014, Leonardo DiCaprio received the Clinton Global Citizen Award from President Bill Clinton in recognition of outstanding philanthropic leadership and his foundation\'s multi-million-dollar commitments to biodiversity preservation.',
    wins: 1,
    nominations: 1,
    historyParagraphs: [
      'The Clinton Global Citizen Awards honor outstanding individuals in civil society, philanthropy, and government who exemplify global citizenship through their vision and concrete impact.',
      'President Clinton praised DiCaprio for deploying his platform and capital to safeguard fragile ecosystems and empower grassroots environmental defenders across the globe.',
    ],
    keyWins: [
      '2014 Recipient: Clinton Global Citizen Award for Philanthropic Environmental Leadership',
    ],
    externalSource: {
      label: 'Clinton Foundation Archive',
      url: 'https://www.clintonfoundation.org/',
    },
  },
];

interface PageProps {
  params: Promise<{ awardId: string }>;
}

export async function generateStaticParams() {
  return AWARDS.map((a) => ({
    awardId: a.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { awardId } = await params;
  const award = AWARDS.find((a) => a.id === awardId);
  if (!award) return { title: 'Award Not Found' };

  const rawTitle = `${award.name} | Leonardo DiCaprio`;
  const title = rawTitle.length > 62 ? award.name : rawTitle;
  const rawDesc = award.summary;
  // Keep the HTML-escaped attribute under 155 chars (apostrophes expand to &#x27;).
  const description = rawDesc.length > 140 ? `${rawDesc.slice(0, 137).trimEnd()}...` : rawDesc;

  return {
    title,
    description,
    alternates: {
      canonical: `/achievements/${awardId}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/achievements/${awardId}`,
      siteName: 'Leonardo DiCaprio Official',
      images: [
        {
          url: '/og/leonardo-dicaprio-1200x630.jpg',
          width: 1200,
          height: 630,
          alt: `${award.name} Honor`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/leonardo-dicaprio-1200x630.jpg'],
    },
  };
}

export default async function AwardDetailPage({ params }: PageProps) {
  const { awardId } = await params;
  const award = AWARDS.find((a) => a.id === awardId);
  if (!award) notFound();

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Achievements & Honors', path: '/achievements' },
    { name: award.name, path: `/achievements/${award.id}` },
  ]);

  const pageSchema = getWebPageSchema({
    path: `/achievements/${award.id}`,
    name: award.name,
    description: award.summary,
    type: 'ItemPage',
    image: '/og/leonardo-dicaprio-1200x630.jpg',
  });

  return (
    <article className="min-h-screen pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([pageSchema, breadcrumbsSchema]) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/achievements"
          className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 hover:text-orange-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Achievements &amp; Honors</span>
        </Link>

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border border-orange-500/30 bg-orange-500/10 text-orange-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>Official Recognition Dossier</span>
          </div>

          <h1 className="cinema-title text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            {award.name}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm font-mono text-slate-300 mb-6">
            <span className="px-3 py-1 rounded-lg border border-white/10 bg-white/5">
              Wins: <strong className="text-orange-400 font-bold">{award.wins}</strong>
            </span>
            <span className="px-3 py-1 rounded-lg border border-white/10 bg-white/5">
              Nominations: <strong className="text-white font-bold">{award.nominations}</strong>
            </span>
          </div>

          {/* Factual 2-3 sentence summary answering who/what/when */}
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1322] text-slate-200 text-base leading-relaxed">
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-2">
              Factual Summary
            </span>
            {award.summary}
          </div>
        </header>

        <section aria-labelledby="history-heading" className="my-10 space-y-6 text-base sm:text-lg text-slate-300 leading-relaxed">
          <h2 id="history-heading" className="cinema-title text-2xl font-bold text-white">
            Historical Context &amp; Significance
          </h2>
          {award.historyParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <section aria-labelledby="highlights-heading" className="my-10 p-6 rounded-2xl border border-white/10 bg-[#0c1220]">
          <h2 id="highlights-heading" className="cinema-title text-xl font-bold text-white mb-4">
            Key Honors &amp; Citations
          </h2>
          <ul className="space-y-2.5">
            {award.keyWins.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {award.externalSource && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href={award.externalSource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 hover:text-orange-300"
              >
                <span>Verify via {award.externalSource.label}</span>
                <Award className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </section>

        <footer className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            <span>Last updated: October 13, 2026</span>
          </div>
          <Link href="/achievements" className="text-orange-400 hover:underline">
            View All Awards &amp; Honors →
          </Link>
        </footer>
      </div>
    </article>
  );
}
