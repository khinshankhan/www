export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex grow flex-col bg-secondary-background">{children}</main>
}
