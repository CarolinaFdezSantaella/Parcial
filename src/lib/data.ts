export const chessRules = [
  {
    id: 'objective',
    title: 'Objective',
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
