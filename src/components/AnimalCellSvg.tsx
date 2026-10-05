import React from 'react';

interface AnimalCellSvgProps {
  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
  highlightPartId?: string | null;
  placedPartIds?: string[];
  isQuizOrDropMode?: boolean;
}

export const AnimalCellSvg: React.FC<AnimalCellSvgProps> = ({
  selectedPartId,
  onSelectPart,
  highlightPartId,
  placedPartIds = [],
  isQuizOrDropMode = false,
}) => {
  const isPartActive = (id: string) => selectedPartId === id || highlightPartId === id;

  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none">
      <svg
        viewBox="0 0 500 420"
        className="w-full h-auto drop-shadow-md overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="animalCytoplasmGrad" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="70%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fed7aa" />
          </radialGradient>
          <radialGradient id="animalNucleusGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f3e8ff" />
            <stop offset="65%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#6b21a8" />
          </radialGradient>
          <filter id="animalGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#f59e0b" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* 1. Cell Membrane (the flexible, blobby outermost boundary of animal cells) */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('cell_membrane')}
          filter={isPartActive('cell_membrane') ? 'url(#animalGlow)' : undefined}
        >
          {/* Organic, smooth curved blob path */}
          <path
            d="M 230 40 C 340 35, 450 70, 465 170 C 480 270, 440 370, 310 385 C 190 400, 50 375, 40 260 C 30 160, 110 45, 230 40 Z"
            fill="url(#animalCytoplasmGrad)"
            stroke={isPartActive('cell_membrane') ? '#2563eb' : '#0284c7'}
            strokeWidth={isPartActive('cell_membrane') ? '8' : '5'}
            strokeLinejoin="round"
          />
        </g>

        {/* 2. Cytoplasm (interactive inner surface click) */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('cytoplasm')}
          filter={isPartActive('cytoplasm') ? 'url(#animalGlow)' : undefined}
        >
          <path
            d="M 230 52 C 330 47, 435 80, 448 172 C 462 262, 426 355, 308 370 C 198 384, 65 360, 55 258 C 45 168, 120 57, 230 52 Z"
            fill={isPartActive('cytoplasm') ? '#fef08a' : 'transparent'}
            opacity="0.4"
          />
        </g>

        {/* 3. Nucleus (Large, centered in animal cell) */}
        <g
          className="cursor-pointer transition-all duration-200 hover:scale-[1.02] origin-center"
          onClick={() => onSelectPart('nucleus')}
          filter={isPartActive('nucleus') ? 'url(#animalGlow)' : undefined}
        >
          <circle
            cx="240"
            cy="195"
            r="54"
            fill="url(#animalNucleusGrad)"
            stroke={isPartActive('nucleus') ? '#facc15' : '#581c87'}
            strokeWidth={isPartActive('nucleus') ? '6' : '3.5'}
          />
          {/* Nucleolus */}
          <circle cx="230" cy="188" r="18" fill="#4a044e" opacity="0.9" />
          {/* Chromatin DNA threads */}
          <path d="M 215 215 Q 235 230 260 215" stroke="#f3e8ff" strokeWidth="2.5" fill="none" opacity="0.85" />
          <path d="M 250 170 Q 270 185 260 205" stroke="#f3e8ff" strokeWidth="2" fill="none" opacity="0.8" />
          {/* Nuclear pores (dots on the edge) */}
          <circle cx="188" cy="190" r="2.5" fill="#581c87" />
          <circle cx="288" cy="180" r="2.5" fill="#581c87" />
          <circle cx="230" cy="142" r="2.5" fill="#581c87" />
          <circle cx="250" cy="248" r="2.5" fill="#581c87" />
        </g>

        {/* 4. Small Temporary Vacuoles (NOT giant central vacuole) */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('vacuole')}
          filter={isPartActive('vacuole') ? 'url(#animalGlow)' : undefined}
        >
          {/* Small Vacuole 1 */}
          <g transform="translate(130, 130)">
            <ellipse cx="0" cy="0" rx="20" ry="16" fill="#bae6fd" stroke={isPartActive('vacuole') ? '#0284c7' : '#38bdf8'} strokeWidth="2" opacity="0.85" />
            <path d="M -8 -3 Q 0 -8 8 -4" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.8" />
          </g>

          {/* Small Vacuole 2 */}
          <g transform="translate(145, 290)">
            <ellipse cx="0" cy="0" rx="24" ry="18" fill="#bae6fd" stroke={isPartActive('vacuole') ? '#0284c7' : '#38bdf8'} strokeWidth="2" opacity="0.85" />
            <path d="M -10 -4 Q 0 -9 10 -5" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.8" />
          </g>

          {/* Small Vacuole 3 */}
          <g transform="translate(370, 130)">
            <ellipse cx="0" cy="0" rx="18" ry="14" fill="#bae6fd" stroke={isPartActive('vacuole') ? '#0284c7' : '#38bdf8'} strokeWidth="2" opacity="0.85" />
          </g>
        </g>

        {/* 5. Mitochondria (The Powerhouse) */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('mitochondria')}
          filter={isPartActive('mitochondria') ? 'url(#animalGlow)' : undefined}
        >
          {/* Mitochondrion 1 - bottom right */}
          <g transform="translate(345, 280) rotate(-25)">
            <rect x="-30" y="-16" width="60" height="32" rx="16" fill="#fb7185" stroke="#be123c" strokeWidth="3" />
            <path d="M -20 -9 Q -10 0 -20 9 M -6 -11 Q 4 0 -6 11 M 8 -11 Q 18 0 8 11" stroke="#881337" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>

          {/* Mitochondrion 2 - top center-right */}
          <g transform="translate(330, 95) rotate(20)">
            <rect x="-26" y="-14" width="52" height="28" rx="14" fill="#fb7185" stroke="#be123c" strokeWidth="2.5" />
            <path d="M -16 -8 Q -8 0 -16 8 M -4 -9 Q 4 0 -4 9 M 8 -9 Q 16 0 8 9" stroke="#881337" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>

          {/* Mitochondrion 3 - left */}
          <g transform="translate(100, 215) rotate(70)">
            <rect x="-24" y="-13" width="48" height="26" rx="13" fill="#fb7185" stroke="#be123c" strokeWidth="2.5" />
            <path d="M -15 -7 Q -7 0 -15 7 M -3 -8 Q 5 0 -3 8 M 9 -8 Q 17 0 9 8" stroke="#881337" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        </g>

        {/* 6. Ribosomes (protein factories - scattered dots) */}
        <g className="cursor-pointer" onClick={() => onSelectPart('ribosomes')} filter={isPartActive('ribosomes') ? 'url(#animalGlow)' : undefined}>
          <circle cx="180" cy="110" r="3.5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="195" cy="125" r="3" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="210" cy="105" r="3.5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="290" cy="120" r="3.5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="225" cy="275" r="3" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="240" cy="290" r="3.5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="260" cy="280" r="3" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="395" cy="210" r="3.5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="380" cy="230" r="3" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
        </g>
      </svg>

      {/* Animal Cell banner */}
      <div className="absolute top-2 right-2 bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
        <span>🐾 Animal Cell</span>
        <span className="bg-amber-800 text-[10px] px-1.5 py-0.5 rounded-full">Flexible Shape</span>
      </div>
    </div>
  );
};
