export default function Home() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center">
      <div className="xs:min-h-[96vh] flex min-h-[87vh] w-full grow flex-col items-center justify-center">
        <header className="page-layout h-16">
          <p className="">Header</p>
        </header>

        <div className="content-layout grow">
          {/* make this header "scroll effect" */}
          <header className="py-14">
            <h1>Title of the page</h1>
            <span>Description of page</span>
          </header>

          <p>Hello there. Content goes here</p>

          {[0, 1, 2, 3, 4, 5].map((_, i) => (
            <p key={i}>
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
              Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
              placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum
              erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum,
              elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac
              dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id
              cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam
              erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus
            </p>
          ))}
        </div>
      </div>

      <footer className="page-layout h-16">
        <p className="">Footer</p>
      </footer>
    </div>
  )
}
