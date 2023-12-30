import { Divider } from "@/components/primitives/divider";

interface ContentPageLayoutProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  filePath?: string;
  children: React.ReactNode;
}
export function ContentPageLayout({
  title,
  subtitle,
  filePath,
  children,
}: ContentPageLayoutProps) {
  return (
    <>
      <main>
        <header className="bg-zinc-50 dark:bg-zinc-950 py-14 text-center">
          <h1 className="">{title}</h1>
          <span>{subtitle}</span>
        </header>
        <div className="container mx-auto pt-6 flex flex-col md:flex-row-reverse gap-6">
          <div className="h-body w-full md:w-[220px] xl:w-[260px]">
            abc def ghi jkl mno pqr stu vwx ynz
          </div>
          <div className="w-full md:w-0 flex md:flex-1 flex-col">
            {children}
          </div>
        </div>
      </main>

      {filePath && (
        <div className="bg-zinc-50 dark:bg-zinc-950 pt-10">
          <div className="container mx-auto">
            <Divider />
            <div className="my-10 text-center md:text-right">
              <a
                href={`https://github.com/khinshankhan/www/blob/main/${filePath}`}
              >
                Edit on GitHub
              </a>
            </div>
            <Divider />
          </div>
        </div>
      )}
    </>
  );
}
