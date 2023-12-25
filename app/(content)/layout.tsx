export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grow relative z-0 bg-white dark:bg-zinc-900 flex flex-col justify-between">
      {children}
    </div>
  );
}
