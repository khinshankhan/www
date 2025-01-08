import React, { type ReactNode } from "react"
import { Star } from "@/components/base/icon"
import { Logo } from "@/components/base/logo"
import { color1_base, color1_bold, color2_base, color2_bold, defaultSeed } from "@/lib/constants"
import { createStarGlow, seededRandom } from "@/lib/utils"
import { info } from "@/settings"

function OgLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="py-14">
        <div id="og" className="bg-background h-[590px] w-[1125px] text-foreground">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Og() {
  // Seeded random generator instance
  const random = seededRandom(defaultSeed)

  // Helper to generate random rotation between -30 and 30 degrees
  function getRandomRotation() {
    return Math.floor(random() * 60 - 30)
  }

  return (
    <OgLayout>
      <main className="relative flex h-full w-full items-center justify-center">
        {/* Background Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1%, transparent 1%),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px, 50px 50px, 50px 50px",
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
            className="absolute inset-0 mx-auto max-w-xl bg-transparent backdrop-blur-sm"
            style={{
              borderRadius: "10px",
            }}
          ></div>

          {/* Logo */}
          <div className="relative z-10 flex justify-center">
            <Logo className="text-cyan-500 h-[150px] w-[150px]" />
          </div>

          {/* Full Name */}
          <h1 className="relative z-10 mt-6 text-6xl font-bold tracking-tight text-knockout">
            {info.fullname}
          </h1>

          {/* Tagline */}
          <h2 className="relative z-10 mx-auto mt-4 max-w-xl text-xl text-balance text-muted-foreground">
            Exploring the intersections of <span style={{ color: color2_bold }}>creativity</span>{" "}
            and <span style={{ color: color1_bold }}>technology</span>
          </h2>
        </div>
      </main>
    </OgLayout>
  )
}
