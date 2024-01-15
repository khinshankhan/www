import React from "react"

export function PageLayout({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <>
      <section className="flex grow flex-col bg-secondary-background">
        <header className="bg-primary-background py-14 text-center">
          <h1 className="text-balance">{title}</h1>
          <span className="text-balance">{subtitle}</span>
        </header>

        <article>{children}</article>
      </section>
      <div className="mt-8 bg-primary-background pt-8">second footer</div>
    </>
  )
}
