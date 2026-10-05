export interface CellPart {
  id: string;
  name: string;
  nickname: string;
  functionText: string;
  consistentPhrasing: string;
  simpleDescription: string;
  foundIn: 'both' | 'plant-only';
  isPlantOnly: boolean;
  color: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
  };
  funFact: string;
  plantRoleNote?: string;
  animalRoleNote?: string;
  svgColor: string;
}

export const CELL_PARTS: CellPart[] = [
  {
    id: 'nucleus',
    name: 'Nucleus',
    nickname: 'The Brain',
    functionText: 'Controls all activities of the cell and contains genetic material (DNA).',
    consistentPhrasing: 'The Brain — Controls all activities inside the cell.',
    simpleDescription: 'Just like your brain tells your body what to do, the nucleus tells the cell how to grow, repair itself, and make new cells.',
    foundIn: 'both',
    isPlantOnly: false,
    color: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      text: 'text-purple-900',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-800',
      accent: '#9333ea',
    },
    funFact: 'It contains DNA — the secret recipe book for life!',
    plantRoleNote: 'Found pushed slightly to the side by the large central vacuole.',
    animalRoleNote: 'Usually floats near the middle of the animal cell.',
    svgColor: '#a855f7',
  },
  {
    id: 'cell_membrane',
    name: 'Cell Membrane',
    nickname: 'The Security Guard',
    functionText: 'Controls what enters and leaves the cell.',
    consistentPhrasing: 'The Security Guard — Controls substances entering and leaving the cell.',
    simpleDescription: 'A flexible thin barrier that lets food and oxygen come inside, while blocking harmful wastes and letting trash out.',
    foundIn: 'both',
    isPlantOnly: false,
    color: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-900',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-800',
      accent: '#2563eb',
    },
    funFact: 'In animal cells, this is the outermost layer! In plants, it sits just inside the cell wall.',
    plantRoleNote: 'Sits right beneath the tough outer cell wall.',
    animalRoleNote: 'The flexible outer boundary that allows animal cells to change shape.',
    svgColor: '#38bdf8',
  },
  {
    id: 'cytoplasm',
    name: 'Cytoplasm',
    nickname: 'The Jelly Floor',
    functionText: 'Jelly-like substance where chemical reactions happen and parts float.',
    consistentPhrasing: 'The Jelly Floor — Jelly-like substance where cellular activities take place.',
    simpleDescription: 'A watery jelly that fills the entire empty space inside the cell. It cushions and protects all the other cell organelles.',
    foundIn: 'both',
    isPlantOnly: false,
    color: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-900',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
      accent: '#d97706',
    },
    funFact: 'It is made of about 80% water, along with salts and sugars!',
    plantRoleNote: 'Forms a thin active layer moving between the vacuole and the cell membrane.',
    animalRoleNote: 'Fills up most of the volume inside animal cells.',
    svgColor: '#fef08a',
  },
  {
    id: 'mitochondria',
    name: 'Mitochondria',
    nickname: 'The Powerhouse',
    functionText: 'Releases energy for the cell through respiration.',
    consistentPhrasing: 'The Powerhouse — Releases energy for the cell to stay active.',
    simpleDescription: 'Breaks down nutrients from your food and oxygen to produce energy packets so you can run, jump, think, and grow!',
    foundIn: 'both',
    isPlantOnly: false,
    color: {
      bg: 'bg-rose-50',
      border: 'border-rose-300',
      text: 'text-rose-900',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-800',
      accent: '#e11d48',
    },
    funFact: 'Muscle cells have thousands of mitochondria because muscles need huge amounts of energy!',
    plantRoleNote: 'Works day and night to burn stored plant sugars for energy.',
    animalRoleNote: 'Super active; your body has billions of these tiny engines right now.',
    svgColor: '#fb7185',
  },
  {
    id: 'vacuole',
    name: 'Vacuole',
    nickname: 'The Storage Tank',
    functionText: 'Stores water, nutrients, and waste materials.',
    consistentPhrasing: 'The Storage Tank — Stores water, nutrients, and cell sap.',
    simpleDescription: 'In plants, it is ONE giant water balloon in the middle keeping the plant upright and crisp. In animals, there are several small temporary tanks.',
    foundIn: 'both',
    isPlantOnly: false,
    color: {
      bg: 'bg-cyan-50',
      border: 'border-cyan-300',
      text: 'text-cyan-900',
      badgeBg: 'bg-cyan-100',
      badgeText: 'text-cyan-800',
      accent: '#0891b2',
    },
    funFact: 'When a plant lacks water, its vacuole shrinks and the whole plant wilts!',
    plantRoleNote: 'Very large and central; filled with cell sap that keeps plant stems firm.',
    animalRoleNote: 'Small, numerous, and temporary; stores food droplets or waste.',
    svgColor: '#67e8f9',
  },
  {
    id: 'cell_wall',
    name: 'Cell Wall',
    nickname: 'The Brick Wall',
    functionText: 'Gives the plant cell a regular shape, strength, and support.',
    consistentPhrasing: 'The Brick Wall — Gives the plant cell shape and structural protection.',
    simpleDescription: 'A tough, sturdy outer casing made of cellulose. Because plants do not have skeletons, cell walls give trees and flowers their strong structure.',
    foundIn: 'plant-only',
    isPlantOnly: true,
    color: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      text: 'text-emerald-950',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      accent: '#059669',
    },
    funFact: 'Made of strong plant fibers called cellulose — the same fiber used to make paper!',
    plantRoleNote: 'Outermost layer of plant cells. Animals NEVER have a cell wall so they can move!',
    svgColor: '#34d399',
  },
  {
    id: 'chloroplast',
    name: 'Chloroplast',
    nickname: 'The Solar Panel',
    functionText: 'Absorbs sunlight to make food for the plant through photosynthesis.',
    consistentPhrasing: 'The Solar Panel — Absorbs sunlight to make food by photosynthesis.',
    simpleDescription: 'Packed with green pigment called chlorophyll. It traps sunlight energy and turns air and water into sweet glucose food for the plant.',
    foundIn: 'plant-only',
    isPlantOnly: true,
    color: {
      bg: 'bg-lime-50',
      border: 'border-lime-300',
      text: 'text-lime-950',
      badgeBg: 'bg-lime-100',
      badgeText: 'text-lime-800',
      accent: '#65a30d',
    },
    funFact: 'Chloroplasts give leaves their bright green color!',
    plantRoleNote: 'Crucial for plant survival. Never found in animal cells because animals eat food!',
    svgColor: '#84cc16',
  },
  {
    id: 'ribosomes',
    name: 'Ribosomes',
    nickname: 'The Protein Factory',
    functionText: 'Makes proteins needed for growth and cell repair.',
    consistentPhrasing: 'The Protein Factory — Produces essential proteins for growth.',
    simpleDescription: 'Tiny microscopic dots that assemble proteins from amino acids — like mini construction workers building materials for the cell.',
    foundIn: 'both',
    isPlantOnly: false,
    color: {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      text: 'text-orange-900',
      badgeBg: 'bg-orange-100',
      badgeText: 'text-orange-800',
      accent: '#ea580c',
    },
    funFact: 'A single cell can contain millions of these tiny protein builders!',
    plantRoleNote: 'Floats in cytoplasm and lines internal transport channels.',
    animalRoleNote: 'Crucial for making muscle proteins and enzymes.',
    svgColor: '#fdba74',
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  choices: string[];
  correctAnswer: string;
  partId: string;
  hint: string;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which part is the POWERHOUSE that gives energy to the cell?',
    choices: ['Nucleus', 'Mitochondria', 'Vacuole', 'Cell Wall'],
    correctAnswer: 'Mitochondria',
    partId: 'mitochondria',
    hint: 'Think of the organelle nicknamed "The Powerhouse"!',
    explanation: 'Mitochondria release energy for the cell through respiration — nicknamed The Powerhouse!',
  },
  {
    id: 2,
    question: 'Which part acts like "The Brain" and controls all cellular activities?',
    choices: ['Cytoplasm', 'Cell Membrane', 'Nucleus', 'Chloroplast'],
    correctAnswer: 'Nucleus',
    partId: 'nucleus',
    hint: 'It holds the DNA instructions and controls the whole cell!',
    explanation: 'The Nucleus is nicknamed "The Brain" — it directs all activities and contains DNA.',
  },
  {
    id: 3,
    question: 'Which of these parts is found ONLY in plant cells to give them a fixed, rigid shape?',
    choices: ['Cell Wall', 'Cell Membrane', 'Nucleus', 'Mitochondria'],
    correctAnswer: 'Cell Wall',
    partId: 'cell_wall',
    hint: 'It acts like "The Brick Wall" on the outside of plant cells!',
    explanation: 'The Cell Wall is plant-only! It provides strength, support, and a regular shape.',
  },
  {
    id: 4,
    question: 'Which part acts as "The Solar Panel" to trap sunlight and make food by photosynthesis?',
    choices: ['Ribosomes', 'Chloroplast', 'Vacuole', 'Cytoplasm'],
    correctAnswer: 'Chloroplast',
    partId: 'chloroplast',
    hint: 'It contains green chlorophyll and is only found in plants!',
    explanation: 'Chloroplasts absorb sunlight to make food for plants through photosynthesis (The Solar Panel).',
  },
  {
    id: 5,
    question: 'Which part acts like "The Security Guard", controlling what enters and leaves the cell?',
    choices: ['Cell Membrane', 'Cell Wall', 'Cytoplasm', 'Nucleus'],
    correctAnswer: 'Cell Membrane',
    partId: 'cell_membrane',
    hint: 'This thin flexible barrier is present in BOTH plant and animal cells!',
    explanation: 'The Cell Membrane is "The Security Guard" — guarding what comes in and goes out.',
  },
  {
    id: 6,
    question: 'What is "The Jelly Floor" where chemical reactions happen and organelles float?',
    choices: ['Vacuole', 'Cytoplasm', 'Nucleus', 'Chloroplast'],
    correctAnswer: 'Cytoplasm',
    partId: 'cytoplasm',
    hint: 'It fills the cell with a jelly-like liquid!',
    explanation: 'The Cytoplasm is the jelly-like substance where all chemical reactions take place.',
  },
  {
    id: 7,
    question: 'Which part acts as "The Storage Tank" for water, nutrients, and waste materials?',
    choices: ['Vacuole', 'Mitochondria', 'Cell Membrane', 'Ribosomes'],
    correctAnswer: 'Vacuole',
    partId: 'vacuole',
    hint: 'Plant cells have a huge one in the center to stay firm!',
    explanation: 'The Vacuole is "The Storage Tank" storing water, food, and cell sap.',
  },
  {
    id: 8,
    question: 'A scientist looks under a microscope and spots green chloroplasts and a tough cell wall. What kind of cell is it?',
    choices: ['Animal Cell', 'Plant Cell', 'Bacteria only', 'Human blood cell'],
    correctAnswer: 'Plant Cell',
    partId: 'chloroplast',
    hint: 'Remember: Cell Wall and Chloroplasts are ONLY in plant cells!',
    explanation: 'Only Plant Cells possess both a Cell Wall and Chloroplasts!',
  },
];

export interface DiagramHotspot {
  partId: string;
  name: string;
  labelPosition: { x: number; y: number }; // percentage 0-100
  pointerPosition: { x: number; y: number };
}

export const PLANT_CELL_HOTSPOTS: DiagramHotspot[] = [
  { partId: 'cell_wall', name: 'Cell Wall', labelPosition: { x: 14, y: 16 }, pointerPosition: { x: 26, y: 20 } },
  { partId: 'cell_membrane', name: 'Cell Membrane', labelPosition: { x: 14, y: 38 }, pointerPosition: { x: 28, y: 36 } },
  { partId: 'chloroplast', name: 'Chloroplast', labelPosition: { x: 14, y: 64 }, pointerPosition: { x: 34, y: 62 } },
  { partId: 'cytoplasm', name: 'Cytoplasm', labelPosition: { x: 14, y: 84 }, pointerPosition: { x: 38, y: 78 } },
  { partId: 'vacuole', name: 'Vacuole', labelPosition: { x: 86, y: 22 }, pointerPosition: { x: 62, y: 36 } },
  { partId: 'nucleus', name: 'Nucleus', labelPosition: { x: 86, y: 52 }, pointerPosition: { x: 70, y: 58 } },
  { partId: 'mitochondria', name: 'Mitochondria', labelPosition: { x: 86, y: 80 }, pointerPosition: { x: 64, y: 76 } },
];

export const ANIMAL_CELL_HOTSPOTS: DiagramHotspot[] = [
  { partId: 'cell_membrane', name: 'Cell Membrane', labelPosition: { x: 14, y: 24 }, pointerPosition: { x: 30, y: 28 } },
  { partId: 'cytoplasm', name: 'Cytoplasm', labelPosition: { x: 14, y: 54 }, pointerPosition: { x: 38, y: 56 } },
  { partId: 'vacuole', name: 'Vacuole (Small)', labelPosition: { x: 14, y: 82 }, pointerPosition: { x: 42, y: 74 } },
  { partId: 'nucleus', name: 'Nucleus', labelPosition: { x: 86, y: 28 }, pointerPosition: { x: 56, y: 46 } },
  { partId: 'mitochondria', name: 'Mitochondria', labelPosition: { x: 86, y: 64 }, pointerPosition: { x: 64, y: 66 } },
  { partId: 'ribosomes', name: 'Ribosomes', labelPosition: { x: 86, y: 86 }, pointerPosition: { x: 58, y: 76 } },
];
