export const chessRules = [
  {
    id: 'objective',
    title: 'Objective', // Will be replaced by i18n
    content: 'The objective in chess is to checkmate your opponent\'s king. Checkmate happens when the king is in a position to be captured (in "check") and cannot escape from capture.',
  },
  {
    id: 'movement',
    title: 'Piece Movement',
    content: 'Each of the 6 different kinds of pieces moves differently. Pieces cannot move through other pieces (though the knight can jump over other pieces), and can never move onto a square with one of their own pieces. However, they can be moved to take the place of an opponent\'s piece which is then captured. Pieces a re generally moved into positions where they can capture other pieces (by landing on their square and then replacing them), defend their own pieces in case of capture, or control important squares in the game.',
  },
  {
    id: 'king',
    title: 'The King',
    content: 'The king is the most important piece, but is one of the weakest. The king can only move one square in any direction - up, down, to the sides, and diagonally.',
  },
  {
    id: 'queen',
    title: 'The Queen',
    content: 'The queen is the most powerful piece. She can move in any one straight direction - forward, backward, sideways, or diagonally - as far as possible as long as she does not move through any of her own pieces.',
  },
  {
    id: 'rook',
    title: 'The Rook',
    content: 'The rook may move as far as it wants, but only forward, backward, and to the sides. The rooks are particularly powerful pieces when they are protecting each other and working together!',
  },
  {
    id: 'bishop',
    title: 'The Bishop',
    content: 'The bishop may move as far as it wants, but only diagonally. Each bishop starts on one color (light or dark) and must always stay on that color.',
  },
  {
    id: 'knight',
    title: 'The Knight',
    content: 'Knights move in a very different way from the other pieces – going two squares in one direction, and then one more move at a 90 degree angle, just like the shape of an “L”. Knights are also the only pieces that can move over other pieces.',
  },
  {
    id: 'pawn',
    title: 'The Pawn',
    content: 'Pawns are unusual because they move and capture in different ways: they move forward, but capture diagonally. Pawns can only move forward one square at a time, except for their very first move where they can move forward two squares. Pawns can only capture one square diagonally in front of them.',
  },
  {
    id: 'castling',
    title: 'Castling',
    content: 'Castling is a special rule that allows you to do two important things in one move: get your king to safety (hopefully), and get your rook out of the corner and into the game. On a player\'s turn he may move his king two squares over to one side and then move the rook from that side\'s corner to right next to the king on the opposite side. However, the following conditions must be met: it must be that king\'s very first move, it must be that rook\'s very first move, there cannot be any pieces between the king and the rook, and the king may not be in check or pass through check.',
  },
  {
    id: 'en-passant',
    title: 'En Passant',
    content: 'If a pawn moves out two squares on its first move, and by doing so lands to the side of an opponent\'s pawn, the opponent\'s pawn has the option of capturing the first pawn as it passes by. This special move must be done immediately after the first pawn has moved past, otherwise the option to capture it is no longer available.',
  },
  {
    id: 'pawn-promotion',
    title: 'Pawn Promotion',
    content: 'If a pawn reaches the other side of the board, it can become any other chess piece (called promotion) except for a king. A pawn is usually promoted to a queen.',
  },
];

export const tournaments = [
  {
    id: 'tata-steel',
    name: 'Tata Steel Chess Tournament',
    date: 'January 13-29, 2025',
    location: 'Wijk aan Zee, Netherlands',
    description: 'One of the most prestigious events in the international chess calendar, often called the "Wimbledon of Chess".',
    link: 'https://tatasteelchess.com/',
  },
  {
    id: 'candidates',
    name: 'Candidates Tournament',
    date: 'April 2-25, 2026',
    location: 'TBD',
    description: 'An eight-player chess tournament organized by FIDE to determine the challenger for the World Chess Championship.',
    link: 'https://en.wikipedia.org/wiki/Candidates_Tournament',
  },
  {
    id: 'sinquefield-cup',
    name: 'Sinquefield Cup',
    date: 'August 18-29, 2025',
    location: 'St. Louis, USA',
    description: 'An annual, invitation-only chess tournament in St. Louis, featuring some of the world\'s best players.',
    link: 'https://grandchesstour.org/',
  },
  {
    id: 'norway-chess',
    name: 'Norway Chess',
    date: 'May 26 - June 7, 2025',
    location: 'Stavanger, Norway',
    description: 'An annual closed tournament, that has become one of the world\'s top chess tournaments.',
    link: 'https://norwaychess.no/en/',
  },
];

export const players = [
  {
    id: 'magnus-carlsen',
    name: 'Magnus Carlsen',
    country: 'Norway',
    rating: 2830,
    title: 'Grandmaster',
    profileImageId: 'magnus-carlsen',
    links: {
      chesscom: 'https://www.chess.com/member/magnuscarlsen',
      lichess: 'https://lichess.org/@/DrNykterstein',
    },
  },
  {
    id: 'garry-kasparov',
    name: 'Garry Kasparov',
    country: 'Russia',
    rating: 2812,
    title: 'Grandmaster',
    profileImageId: 'garry-kasparov',
    links: {
      chesscom: 'https://www.chess.com/member/garrykasparov',
      lichess: null,
    },
  },
  {
    id: 'bobby-fischer',
    name: 'Bobby Fischer',
    country: 'USA',
    rating: 2785,
    title: 'Grandmaster',
    profileImageId: 'bobby-fischer',
    links: {
      chesscom: null,
      lichess: null,
    },
  },
  {
    id: 'judit-polgar',
    name: 'Judit Polgár',
    country: 'Hungary',
    rating: 2735,
    title: 'Grandmaster',
    profileImageId: 'judit-polgar',
    links: {
      chesscom: 'https://www.chess.com/member/juditpolgar',
      lichess: null,
    },
  },
  {
    id: 'hikaru-nakamura',
    name: 'Hikaru Nakamura',
    country: 'USA',
    rating: 2794,
    title: 'Grandmaster',
    profileImageId: 'hikaru-nakamura',
    links: {
      chesscom: 'https://www.chess.com/member/hikaru',
      lichess: 'https://lichess.org/@/Hikaru',
    },
  },
  {
    id: 'fabiano-caruana',
    name: 'Fabiano Caruana',
    country: 'USA',
    rating: 2805,
    title: 'Grandmaster',
    profileImageId: 'fabiano-caruana',
    links: {
      chesscom: 'https://www.chess.com/member/fabianocaruana',
      lichess: null,
    },
  },
];

export const championships = [
  {
    id: 'wcc-2024',
    year: 2024,
    winner: 'Gukesh D',
    loser: 'Ding Liren',
    location: 'Singapore',
    description: 'The World Chess Championship 2024 was a chess match between the reigning world champion Ding Liren and the challenger Gukesh D to determine the World Chess Champion. Gukesh won the match, becoming the 18th World Champion.',
  },
  {
    id: 'wcc-1972',
    year: 1972,
    winner: 'Bobby Fischer',
    loser: 'Boris Spassky',
    location: 'Reykjavík, Iceland',
    description: 'Dubbed the "Match of the Century," this championship match during the Cold War saw American challenger Bobby Fischer defeat Soviet champion Boris Spassky, ending 24 years of Soviet dominance.',
  },
  {
    id: 'wcc-1997',
    year: 1997,
    winner: 'Garry Kasparov',
    loser: 'Deep Blue (Computer)',
    location: 'New York, USA',
    description: 'A landmark match where a reigning world champion, Garry Kasparov, was defeated by a computer, IBM\'s Deep Blue, under standard tournament time controls. It was a major milestone in the history of artificial intelligence.',
  },
];

export const chessOpenings = [
    {
      id: "ruy-lopez",
      name: "Ruy López (Spanish Game)",
      moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5",
      description: "One of the oldest and most popular openings. White develops a piece, attacks the knight that defends the e5-pawn, and prepares to castle. It leads to a wide variety of strategic and tactical positions.",
      strategy: {
        white: "Put pressure on Black's center, control the e-file, and develop pieces to support an attack on the kingside or exploit weaknesses in Black's pawn structure.",
        black: "Defend the e5-pawn, challenge White's control of the center, and create counterplay on the queenside or by breaking in the center."
      }
    },
    {
      id: "italian-game",
      name: "Italian Game",
      moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4",
      description: "A family of openings characterized by quiet, strategic play. White's bishop on c4 puts pressure on Black's weak f7-square and controls the center.",
      strategy: {
        white: "Control the center, complete development, and build a slow but steady attack. The Giuoco Piano ('Quiet Game') is a common variation.",
        black: "Equalize in the center, develop pieces harmoniously, and prepare to counter White's plans. The Two Knights Defense is a more aggressive response."
      }
    },
    {
      id: "sicilian-defense",
      name: "Sicilian Defense",
      moves: "1. e4 c5",
      description: "Black's most popular and best-scoring response to 1. e4. Black immediately fights for the center by challenging d4 and creating an asymmetrical pawn structure, which often leads to complex and sharp positions.",
      strategy: {
        white: "Try to open the center with d4 to exploit the lead in development. Often attacks on the kingside.",
        black: "Use the c-pawn to control the d4-square, and seek counterplay on the queenside using the semi-open c-file."
      }
    },
    {
      id: "french-defense",
      name: "French Defense",
      moves: "1. e4 e6",
      description: "A solid and resilient opening. Black allows White to establish a space advantage in the center with 2. d4, intending to challenge it later. Games are often closed or semi-closed in nature.",
      strategy: {
        white: "Maintain the space advantage in the center and try to create an attack on the kingside.",
        black: "Undermine White's center with moves like ...c5 or ...f6, and create counterplay. Black's main challenge is often the passivity of the light-squared bishop."
      }
    },
    {
      id: "caro-kann-defense",
      name: "Caro-Kann Defense",
      moves: "1. e4 c6",
      description: "Known for its extreme solidity and safety. Black prepares to challenge White's center with 2...d5 without creating the same difficulties for the light-squared bishop as in the French Defense.",
      strategy: {
        white: "Choose between an aggressive line (Advance Variation) or a classical setup to maintain a small but lasting space advantage.",
        black: "Achieve a solid pawn structure, complete development, and aim for a favorable endgame."
      }
    },
    {
      id: "queens-gambit",
      name: "Queen's Gambit",
      moves: "1. d4 d5 2. c4",
      description: "One of the most played and respected openings. White offers a 'gambit' of the c-pawn to deflect Black's central d-pawn. Black can accept (Queen's Gambit Accepted) or decline (Queen's Gambit Declined).",
      strategy: {
        white: "Use the space advantage and central control to launch an attack or squeeze Black positionally.",
        black: "(Declined) Maintain a solid central foothold and develop pieces. (Accepted) Give back the pawn to disrupt White's coordination and complete development."
      }
    },
    {
      id: "indian-defenses",
      name: "Indian Defenses",
      moves: "1. d4 Nf6",
      description: "A modern and flexible way for Black to respond to 1. d4. Instead of occupying the center with pawns, Black controls it with pieces, leading to a wide range of setups like the King's Indian, Nimzo-Indian, and Queen's Indian.",
      strategy: {
        white: "Build a strong pawn center and use the space advantage to develop an attack.",
        black: "Control the center from a distance, fianchetto one or both bishops, and aim to undermine and attack White's pawn center."
      }
    }
];
