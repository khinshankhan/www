import { Divider } from "@/components/primitives/divider";

interface ContentPageLayoutProps {
  children: React.ReactNode;
}
export function ContentPageLayout({ children }: ContentPageLayoutProps) {
  return (
    <>
      <main>
        <header className="bg-zinc-950 py-14 text-center">
          <h1 className="">Writings?</h1>
          <span>Yay.</span>
        </header>
        <div className="container mx-auto pt-6">{children}</div>
      </main>

      <div className="bg-zinc-50 dark:bg-zinc-950 pt-10">
        <div className="container mx-auto">
          <Divider />
          <div className="my-10">Henlo</div>
          <Divider />
        </div>
      </div>
    </>
  );
}
