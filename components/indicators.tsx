import { flags } from "@/config"

export function BreakpointsIndicator() {
  if (process.env.NODE_ENV === "production") return null
  if (!flags.showBreakpointsIndicator) return null

  return (
    <div className="z-50 fixed bottom-1 left-1 flex size-6 items-center justify-center rounded-full bg-black p-3 font-mono text-xs text-white">
      <div className="block xs:hidden">xss</div>
      <div className="hidden xs:block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}
