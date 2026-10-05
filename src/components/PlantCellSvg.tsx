import React from 'react';

interface PlantCellSvgProps {
  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
  highlightPartId?: string | null;
  placedPartIds?: string[];
  isQuizOrDropMode?: boolean;
}

export const PlantCellSvg: React.FC<PlantCellSvgProps> = ({
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
          <radialGradient id="plantCytoplasmGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ecfdf5" />
            <stop offset="100%" stopColor="#d1fae5" />
          </radialGradient>
          <radialGradient id="plantVacuoleGrad" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="70%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </radialGradient>
          <radialGradient id="nucleusGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f3e8ff" />
            <stop offset="60%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7e22ce" />
          </radialGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#f59e0b" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* 1. Cell Wall (outermost rigid hexagonal layer) */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('cell_wall')}
          filter={isPartActive('cell_wall') ? 'url(#glow)' : undefined}
        >
          <polygon
            points="60,40 440,30 470,220 435,390 65,395 30,210"
            fill="#86efac"
            stroke={isPartActive('cell_wall') ? '#e11d48' : '#15803d'}
            strokeWidth={isPartActive('cell_wall') ? '10' : '8'}
            strokeLinejoin="round"
          />
          {/* Brick wall pattern lines on the cell wall border */}
          <line x1="150" y1="36" x2="150" y2="48" stroke="#166534" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="280" y1="33" x2="280" y2="46" stroke="#166534" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="390" y1="31" x2="390" y2="44" stroke="#166534" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="180" y1="388" x2="180" y2="397" stroke="#166534" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="320" y1="388" x2="320" y2="396" stroke="#166534" strokeWidth="2" strokeDasharray="3 3" />
        </g>

        {/* 2. Cell Membrane (inner layer right under wall) */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('cell_membrane')}
          filter={isPartActive('cell_membrane') ? 'url(#glow)' : undefined}
        >
          <polygon
            points="74,54 426,45 454,218 421,376 78,380 46,210"
            fill="none"
            stroke={isPartActive('cell_membrane') ? '#2563eb' : '#0284c7'}
            strokeWidth={isPartActive('cell_membrane') ? '7' : '4'}
            strokeDasharray={isPartActive('cell_membrane') ? 'none' : '6 3'}
            strokeLinejoin="round"
          />
        </g>

        {/* 3. Cytoplasm (interior fluid filling the cell) */}
        <g
          className="cursor-pointer transition-opacity"
          onClick={() => onSelectPart('cytoplasm')}
          filter={isPartActive('cytoplasm') ? 'url(#glow)' : undefined}
        >
          <polygon
            points="76,56 424,47 452,218 419,374 80,378 48,210"
            fill="url(#plantCytoplasmGrad)"
            opacity={isPartActive('cytoplasm') ? '0.95' : '0.85'}
          />
        </g>

        {/* 4. Vacuole (Large Central Sap Vacuole) */}
        <g
          className="cursor-pointer transition-all duration-200 hover:scale-[1.01] origin-center"
          onClick={() => onSelectPart('vacuole')}
          filter={isPartActive('vacuole') ? 'url(#glow)' : undefined}
        >
          <path
            d="M 180 120 C 250 90, 360 100, 380 160 C 400 230, 370 310, 310 330 C 240 350, 160 330, 140 250 C 125 180, 130 140, 180 120 Z"
            fill="url(#plantVacuoleGrad)"
            stroke={isPartActive('vacuole') ? '#0284c7' : '#38bdf8'}
            strokeWidth={isPartActive('vacuole') ? '5' : '3'}
            opacity="0.9"
          />
          {/* Water ripples inside vacuole */}
          <path d="M 220 180 Q 260 170 300 185" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round" />
          <path d="M 200 230 Q 250 215 310 240" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
          <text x="260" y="270" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold" opacity="0.75">
            Cell Sap
          </text>
        </g>

        {/* 5. Nucleus (pushed towards lower-left side) */}
        <g
          className="cursor-pointer transition-all duration-200 hover:scale-[1.02] origin-center"
          onClick={() => onSelectPart('nucleus')}
          filter={isPartActive('nucleus') ? 'url(#glow)' : undefined}
        >
          <circle
            cx="130"
            cy="170"
            r="44"
            fill="url(#nucleusGrad)"
            stroke={isPartActive('nucleus') ? '#facc15' : '#581c87'}
            strokeWidth={isPartActive('nucleus') ? '5' : '3'}
          />
          {/* Nucleolus (the dark inner core) */}
          <circle cx="124" cy="165" r="16" fill="#4a044e" opacity="0.85" />
          {/* Chromatin/DNA squiggles */}
          <path d="M 110 185 Q 125 195 145 188" stroke="#f3e8ff" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M 140 150 Q 155 165 148 180" stroke="#f3e8ff" strokeWidth="2" fill="none" opacity="0.8" />
        </g>

        {/* 6. Chloroplasts (Green ovals with thylakoid discs inside) */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('chloroplast')}
          filter={isPartActive('chloroplast') ? 'url(#glow)' : undefined}
        >
          {/* Chloroplast 1 - top left */}
          <g transform="translate(100, 75) rotate(-20)">
            <ellipse cx="0" cy="0" rx="30" ry="18" fill="#4ade80" stroke="#15803d" strokeWidth="2.5" />
            <line x1="-16" y1="-5" x2="16" y2="-5" stroke="#166534" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="-18" y1="2" x2="18" y2="2" stroke="#166534" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="-12" y1="9" x2="12" y2="9" stroke="#166534" strokeWidth="2" strokeDasharray="4 2" />
          </g>

          {/* Chloroplast 2 - bottom left */}
          <g transform="translate(110, 310) rotate(15)">
            <ellipse cx="0" cy="0" rx="32" ry="18" fill="#4ade80" stroke="#15803d" strokeWidth="2.5" />
            <line x1="-16" y1="-5" x2="16" y2="-5" stroke="#166534" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="-18" y1="2" x2="18" y2="2" stroke="#166534" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="-14" y1="9" x2="14" y2="9" stroke="#166534" strokeWidth="2" strokeDasharray="4 2" />
          </g>

          {/* Chloroplast 3 - top right */}
          <g transform="translate(390, 95) rotate(35)">
            <ellipse cx="0" cy="0" rx="28" ry="17" fill="#4ade80" stroke="#15803d" strokeWidth="2.5" />
            <line x1="-14" y1="-4" x2="14" y2="-4" stroke="#166534" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="-16" y1="3" x2="16" y2="3" stroke="#166534" strokeWidth="2" strokeDasharray="4 2" />
          </g>
        </g>

        {/* 7. Mitochondria (The Powerhouse - red/pink ovals with folded cristae) */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('mitochondria')}
          filter={isPartActive('mitochondria') ? 'url(#glow)' : undefined}
        >
          {/* Mitochondrion 1 - bottom right */}
          <g transform="translate(365, 335) rotate(-30)">
            <rect x="-26" y="-14" width="52" height="28" rx="14" fill="#fb7185" stroke="#be123c" strokeWidth="2.5" />
            <path d="M -18 -8 Q -10 0 -18 8 M -6 -10 Q 2 0 -6 10 M 8 -10 Q 16 0 8 10" stroke="#881337" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>

          {/* Mitochondrion 2 - upper center */}
          <g transform="translate(230, 75) rotate(10)">
            <rect x="-24" y="-13" width="48" height="26" rx="13" fill="#fb7185" stroke="#be123c" strokeWidth="2.5" />
            <path d="M -15 -7 Q -8 0 -15 7 M -3 -8 Q 4 0 -3 8 M 9 -8 Q 15 0 9 8" stroke="#881337" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        </g>

        {/* 8. Ribosomes (tiny orange dots) */}
        <g className="cursor-pointer" onClick={() => onSelectPart('ribosomes')} filter={isPartActive('ribosomes') ? 'url(#glow)' : undefined}>
          <circle cx="85" cy="115" r="3.5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="95" cy="130" r="3" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="180" cy="80" r="3.5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="195" cy="95" r="3" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="150" cy="355" r="3.5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="170" cy="365" r="3" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="410" cy="270" r="3.5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          <circle cx="400" cy="290" r="3" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
        </g>

        {/* Pointer Callout Lines for Active / Placed State */}
        {!isQuizOrDropMode && (
          <g className="pointer-events-none text-xs font-semibold">
            {/* Cell Wall label indicator */}
            <circle cx="50" cy="40" r="4" fill="#15803d" />
            <line x1="50" y1="40" x2="30" y2="25" stroke="#15803d" strokeWidth="1.5" />
            
            {/* Vacuole label indicator */}
            <circle cx="270" cy="180" r="4" fill="#0284c7" />

            {/* Nucleus indicator */}
            <circle cx="130" cy="170" r="4" fill="#7e22ce" />

            {/* Chloroplast indicator */}
            <circle cx="100" cy="75" r="4" fill="#15803d" />

            {/* Mitochondria indicator */}
            <circle cx="365" cy="335" r="4" fill="#be123c" />
          </g>
        )}
      </svg>

      {/* Plant-Only highlight banner */}
      <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
        <span>🌱 Plant Cell</span>
        <span className="bg-emerald-800 text-[10px] px-1.5 py-0.5 rounded-full">Fixed Shape</span>
      </div>
    </div>
  );
};
