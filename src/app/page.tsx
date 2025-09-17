export default function Home() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center">
      <div className="xs:min-h-[96vh] flex min-h-[87vh] w-full grow flex-col items-center justify-center">
        <header className="page-layout h-16">
          <p className="">Header</p>
        </header>

        <div className="content-layout grow">
          <h1>Hello there</h1>
        </div>
      </div>

      <footer className="page-layout h-16">
        <p className="">Footer</p>
      </footer>
    </div>
  )
}
