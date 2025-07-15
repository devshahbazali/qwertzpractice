type Key = {
  normal: string;
  shift: string;
  altGr?: string;
};

let QWERTZ: Key[][] = [
  // Row 1
  [
    { normal: '^', shift: '°' },
    { normal: '1', shift: '!' , },
    { normal: '2', shift: '"' , altGr: '²' },
    { normal: '3', shift: '§' , altGr: '³' },
    { normal: '4', shift: '$' },
    { normal: '5', shift: '%' },
    { normal: '6', shift: '&' },
    { normal: '7', shift: '/' , altGr: '{' },
    { normal: '8', shift: '(' , altGr: '[' },
    { normal: '9', shift: ')' , altGr: ']' },
    { normal: '0', shift: '=' , altGr: '}' },
    { normal: 'ß', shift: '?' , altGr: '\\' },
    { normal: '´', shift: '`' },
    { normal: 'back', shift: 'back' }
  ],
  // Row 2
  [
    { normal: 'q', shift: 'Q', altGr: '@' },
    { normal: 'w', shift: 'W' },
    { normal: 'e', shift: 'E', altGr: '€' },
    { normal: 'r', shift: 'R' },
    { normal: 't', shift: 'T' },
    { normal: 'z', shift: 'Z' },
    { normal: 'u', shift: 'U' },
    { normal: 'i', shift: 'I' },
    { normal: 'o', shift: 'O' },
    { normal: 'p', shift: 'P' },
    { normal: 'ü', shift: 'Ü' },
    { normal: '+', shift: '*', altGr: '~' }
  ],
  // Row 3
  [
    { normal: 'a', shift: 'A' },
    { normal: 's', shift: 'S' },
    { normal: 'd', shift: 'D' },
    { normal: 'f', shift: 'F' },
    { normal: 'g', shift: 'G' },
    { normal: 'h', shift: 'H' },
    { normal: 'j', shift: 'J' },
    { normal: 'k', shift: 'K' },
    { normal: 'l', shift: 'L' },
    { normal: 'ö', shift: 'Ö' },
    { normal: 'ä', shift: 'Ä' },
    { normal: '#', shift: "'" },
     { normal: 'Enter', shift: 'Enter', },
  ],
  // Row 4
  [
    { normal: 'Shift', shift: 'Shift' },
    { normal: '<', shift: '>', altGr: '|' },
    { normal: 'y', shift: 'Y' },
    { normal: 'x', shift: 'X' },
    { normal: 'c', shift: 'C' },
    { normal: 'v', shift: 'V' },
    { normal: 'b', shift: 'B' },
    { normal: 'n', shift: 'N' },
    { normal: 'm', shift: 'M' },
    { normal: ',', shift: ';' },
    { normal: '.', shift: ':' },
    { normal: '-', shift: '_' },
    { normal: 'Shift', shift: 'Shift' },

  ],
  
  // Row 6
  [
    { normal: 'ctrl', shift: 'ctrl' },
    { normal: 'win', shift: 'win' },
    { normal: 'alt', shift: 'alt' },
    { normal: ' ', shift: ' ' },
    { normal: 'alt gr', shift: 'alt gr' },
     { normal: 'ctrl', shift: 'ctrl' },
   
   
  ]
];

export { QWERTZ };