import React, { type ReactNode } from "react"
import { Logo } from "@/components/layouts/elements/logo"
import { Shell } from "@/components/layouts/elements/shell"
import { color1_base, color1_bold, color2_base, color2_bold, defaultSeed } from "@/lib/constants"
import { Star } from "@/quicksilver/react/primitives/icons"
import { info } from "@/settings"

export function createStarGlow(color: string) {
  return `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`
}

/* pseudo randomness */

// Lehmer random number generator (PRNG)
export function seededRandom(seed: number) {
  // ensure the seed is within the valid range
  let value = seed % 2147483647 || 44364
  return () => {
    // Lehmer PRNG core logic
    value = (value * 16807) % 2147483647

    // normalize to return a value between 0 and 1
    return (value - 1) / 2147483646
  }
}

const backgroundColor = "var(--celestial-1)"

function OgLayout({ children }: { children: ReactNode }) {
  return (
    <Shell header={null}>
      <div className="py-14">
        <div id="og" className="h-[590px] w-[1125px] overflow-hidden text-foreground">
          <div className="noise h-full w-full" style={{ backgroundColor }}>
            {children}
          </div>
        </div>
      </div>
    </Shell>
  )
}

export default function Og() {
  // Seeded random generator instance
  const random = seededRandom(defaultSeed)

  // Helper to generate random rotation between -30 and 30 degrees
  function getRandomRotation() {
    return Math.floor(random() * 60 - 30)
  }

  const outerSz = "55px"
  // NOTE: puppeteer scales weirdly at certain sizes, so 165.5px works best here
  const innerSz = "165px"

  return (
    <OgLayout>
      <main className="relative flex h-full w-full items-center justify-center">
        {/* Background Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: `${outerSz} ${outerSz}, ${outerSz} ${outerSz}`,
            backgroundPosition: "center",
          }}
        />

        {/* Decorative Stars */}
        <div
          className="absolute top-8 left-8"
          style={{
            filter: createStarGlow(color1_bold),
            transform: `rotate(${getRandomRotation()}deg)`,
          }}
        >
          <Star className="size-[20px]" style={{ color: color1_bold }} />
        </div>
        <div
          className="absolute top-32 left-24"
          style={{
            filter: createStarGlow(color2_base),
            transform: `rotate(${getRandomRotation()}deg)`,
          }}
        >
          <Star className="size-[20px]" style={{ color: color2_base }} />
        </div>
        <div
          className="absolute top-16 right-32"
          style={{
            filter: createStarGlow(color2_bold),
            transform: `rotate(${getRandomRotation()}deg)`,
          }}
        >
          <Star className="size-[15px]" style={{ color: color2_bold }} />
        </div>
        <div
          className="absolute bottom-16 left-40"
          style={{
            filter: createStarGlow(color1_base),
            transform: `rotate(${getRandomRotation()}deg)`,
          }}
        >
          <Star className="size-[25px]" style={{ color: color1_base }} />
        </div>
        <div
          className="absolute right-20 bottom-24"
          style={{
            filter: createStarGlow(color1_bold),
            transform: `rotate(${getRandomRotation()}deg)`,
          }}
        >
          <Star className="size-[15px]" style={{ color: color1_bold }} />
        </div>
        <div
          className="absolute right-12 bottom-12"
          style={{
            filter: createStarGlow(color2_bold),
            transform: `rotate(${getRandomRotation()}deg)`,
          }}
        >
          <Star className="size-[30px]" style={{ color: color2_bold }} />
        </div>

        {/* Main Content */}
        <div className="relative z-10 p-8 text-center">
          {/* Blur Effect */}
          <div
            className="noise absolute inset-0 mx-auto max-w-xl"
            style={{
              backgroundColor,
              borderRadius: "0px",
              backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: `${innerSz} ${innerSz}, ${innerSz} ${innerSz}`,
              backgroundPosition: "center",
            }}
          ></div>

          {/* Logo */}
          <div className="relative z-10 flex justify-center">
            <style>
              {`
          #logo-container::before {
              top: 50%;
              left: 37%;
              transform: translate(0%, -50%);
              width:150px;
          }
        `}
            </style>
            <div id="logo-container" className="w-min-content noise bg-background-2">
              <Logo className="text-cyan-500 size-[150px]" />
            </div>
          </div>

          {/* Full Name */}
          <h1 className="noise relative z-10 mt-6 bg-background-2 text-60 font-bold tracking-tight text-foreground-strong">
            {info.fullname}
          </h1>

          {/* Tagline */}
          <h2 className="noise relative z-10 mx-auto mt-4 max-w-xl bg-background-2 text-24 text-balance text-foreground-subtle">
            Exploring the intersections of <span style={{ color: color2_bold }}>creativity</span>{" "}
            and <span style={{ color: color1_bold }}>technology</span>
          </h2>
        </div>
      </main>
    </OgLayout>
  )
}
