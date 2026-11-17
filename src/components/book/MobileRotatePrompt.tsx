import React from 'react';
import { BookOpen, List } from 'lucide-react';
import { CornerFiligree, EditorialDivider, GeometricRosette } from '../ornaments/IslamicOrnaments';

interface MobileRotatePromptProps {
  visible: boolean;
  currentPositionLabel: string;
  onReturnToCover: () => void;
  onOpenIndex: () => void;
}

export const MobileRotatePrompt: React.FC<MobileRotatePromptProps> = ({
  visible,
  currentPositionLabel,
  onReturnToCover,
  onOpenIndex,
}) => {
  return (
    <section
      aria-label="Rotate device to landscape orientation"
      aria-hidden={!visible}
      className={`fixed inset-x-0 top-14 bottom-0 z-30 flex items-center justify-center p-4 sm:p-6 transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-fluent)] ${
        visible
          ? 'visible opacity-100 pointer-events-auto scale-100'
          : 'invisible opacity-0 pointer-events-none scale-[0.985]'
      }`}
      style={{
        background:
          'radial-gradient(ellipse 90% 80% at 50% 42%, #0D3025 0%, #061A14 58%, #030D0A 100%)',
      }}
    >
      {/* Subtle geometric astrolabe emblem watermark behind frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.06] text-[#DFC99B]"
      >
        <GeometricRosette className="w-[340px] h-[340px]" />
      </div>

      {/* Double Antique Gold framed Midnight Emerald orientation folio */}
      <div className="relative w-full max-w-[390px] max-h-full overflow-y-auto folio-scroll rounded-[6px] border border-[#C8A253]/50 bg-[#051610]/92 p-1.5 shadow-[0_26px_64px_rgba(0,0,0,0.72)]">
        <div className="relative border border-[#C8A253]/28 px-5 py-6 flex flex-col items-center text-center gap-4">
          <CornerFiligree
            position="tl"
            className="absolute top-1.5 left-1.5 w-6 h-6 text-[#C8A253]"
          />
          <CornerFiligree
            position="tr"
            className="absolute top-1.5 right-1.5 w-6 h-6 text-[#C8A253]"
          />
          <CornerFiligree
            position="bl"
            className="absolute bottom-1.5 left-1.5 w-6 h-6 text-[#C8A253]"
          />
          <CornerFiligree
            position="br"
            className="absolute bottom-1.5 right-1.5 w-6 h-6 text-[#C8A253]"
          />

          <p className="text-[11px] uppercase tracking-[0.22em] text-[#DFC99B]/85 font-medium">
            Landscape Reading Mode
          </p>

          {/* Animated Portrait-to-Landscape Phone Vector Illustration */}
          <div className="relative my-1 flex items-center justify-center">
            <svg
              viewBox="0 0 180 140"
              fill="none"
              shapeRendering="geometricPrecision"
              xmlns="http://www.w3.org/2000/svg"
              className="w-44 h-34"
              aria-hidden="true"
            >
              {/* Astrolabe compass arc */}
              <circle
                cx="90"
                cy="70"
                r="58"
                stroke="#C8A253"
                strokeOpacity="0.22"
                strokeWidth="1"
                strokeDasharray="3 4"
              />

              {/* Subtle resting landscape target outline */}
              <rect
                x="44"
                y="42"
                width="92"
                height="56"
                rx="8"
                stroke="#C8A253"
                strokeOpacity="0.3"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Directional curved arrow showing 90° counterclockwise landscape turn */}
              <path
                d="M 48 28 A 52 52 0 0 0 28 66"
                stroke="#DFC99B"
                strokeOpacity="0.72"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M 24 60 L 28 67.5 L 34.5 62"
                stroke="#DFC99B"
                strokeOpacity="0.82"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Rotating phone chassis */}
              <g className="animate-phone-rotate" style={{ transformOrigin: '90px 70px' }}>
                <rect
                  x="62"
                  y="24"
                  width="56"
                  height="92"
                  rx="8"
                  fill="#081E17"
                  stroke="#D4B46A"
                  strokeWidth="1.6"
                />
                {/* Screen */}
                <rect
                  x="66"
                  y="32"
                  width="48"
                  height="76"
                  rx="3"
                  fill="#0D2C22"
                  stroke="#C8A253"
                  strokeOpacity="0.4"
                  strokeWidth="0.9"
                />
                {/* Speaker notch & home indicator */}
                <line
                  x1="84"
                  y1="28"
                  x2="96"
                  y2="28"
                  stroke="#C8A253"
                  strokeOpacity="0.6"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="90" cy="112" r="1.8" fill="#C8A253" fillOpacity="0.65" />

                {/* Miniature folio text bars revealed inside landscape view */}
                <g className="animate-phone-spread">
                  <line
                    x1="90"
                    y1="36"
                    x2="90"
                    y2="104"
                    stroke="#C8A253"
                    strokeOpacity="0.55"
                    strokeWidth="0.9"
                  />
                  <line x1="72" y1="44" x2="85" y2="44" stroke="#DFC99B" strokeOpacity="0.7" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="72" y1="52" x2="84" y2="52" stroke="#DFC99B" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
                  <line x1="72" y1="60" x2="85" y2="60" stroke="#DFC99B" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
                  <rect x="95" y="42" width="14" height="22" rx="1.5" stroke="#DFC99B" strokeOpacity="0.6" strokeWidth="0.9" />
                  <line x1="95" y1="72" x2="108" y2="72" stroke="#DFC99B" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
                  <line x1="95" y1="80" x2="106" y2="80" stroke="#DFC99B" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
                </g>
              </g>
            </svg>
          </div>

          <h2 className="font-editorial text-2xl sm:text-[26px] font-semibold tracking-[0.06em] text-[#F3EDE2] leading-tight text-balance">
            PLEASE ROTATE YOUR DEVICE
          </h2>

          <EditorialDivider className="w-36" />

          <p className="text-sm text-[#DFC99B]/90 leading-relaxed max-w-[30ch]">
            For the best reading experience, please turn your phone sideways to
            explore Science of Creation.
          </p>

          <p className="text-[11px] text-[#B6C2BB] tabular-nums">
            Reading position preserved: <span className="text-[#F3EDE2] font-medium">{currentPositionLabel}</span>
          </p>

          <div className="w-full pt-3 mt-1 border-t border-[#C8A253]/25 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onReturnToCover}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-[4px] border border-[#C8A253]/45 text-xs font-medium text-[#F3EDE2] hover:border-[#D4B46A] hover:text-[#DFC99B] transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4B46A]" />
              <span>Book Cover</span>
            </button>
            <button
              type="button"
              onClick={onOpenIndex}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-[4px] border border-[#C8A253]/45 text-xs font-medium text-[#F3EDE2] hover:border-[#D4B46A] hover:text-[#DFC99B] transition-colors cursor-pointer"
            >
              <List className="w-3.5 h-3.5 text-[#D4B46A]" />
              <span>Contents</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
