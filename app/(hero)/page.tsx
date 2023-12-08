function Wave() {
  return (
    <img
      alt=":wave:"
      src="https://github.githubassets.com/images/icons/emoji/unicode/1f44b.png?v8"
      className="inline aspect-auto h-[1em] w-[1em] animate-wave"
    />
  );
}

export default function Home() {
  return (
    <main className="">
      <h1 className="">
        Henlo <Wave />
      </h1>
    </main>
  );
}
