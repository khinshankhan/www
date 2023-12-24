import { Divider } from "@/components/primitives/divider";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grow relative z-0 pt-6 bg-white dark:bg-zinc-900 flex flex-col justify-between">
      <div className="container mx-auto">{children}</div>

      <div className="bg-zinc-50 dark:bg-zinc-950 pt-10">
        <div className="container mx-auto">
          <Divider />
          <div className="my-10">Henlo</div>
          <Divider />
        </div>
      </div>
    </div>
  );
}
