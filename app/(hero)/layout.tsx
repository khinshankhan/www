export default function HeroLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grow bg-primary-background" id="article">
      {children}
    </main>
  )
}
