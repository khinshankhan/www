import { Divider } from "@/components/primitives/divider";
import type { TocItem } from "@/lib/mdx-plugins/remark-toc";
import clsx from "clsx";

interface ContentPageLayoutProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  filePath?: string;
  toc?: TocItem[];
  showToc?: boolean;
  children: React.ReactNode;
}

export function ContentPageLayout({
  title,
  subtitle,
  filePath,
  toc = [],
  showToc = true,
  children,
}: ContentPageLayoutProps) {
  return (
    <>
      <main>
        <header className="bg-zinc-50 dark:bg-zinc-950 py-14 text-center">
          <h1 className="">{title}</h1>
          <span>{subtitle}</span>
        </header>

        <div className="container mx-auto pt-6 flex flex-col lg:flex-row-reverse gap-6 isolate relative pb-6">
          {showToc && toc.length > 0 && (
            <div className="h-full lg:sticky md:top-28">
              <div>sidebar stuff</div>
              {toc.map((item) => (
                <div
                  key={item.id}
                  className={clsx(
                    item.level === 1 && "pl-0",
                    item.level === 2 && "pl-4",
                    item.level === 3 && "pl-8",
                    item.level === 4 && "pl-12",
                    item.level === 5 && "pl-16",
                    item.level === 6 && "pl-20",
                  )}
                >
                  {item.text}
                </div>
              ))}
            </div>
          )}
          <div className="w-full lg:w-0 flex lg:flex-1 flex-col">
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
