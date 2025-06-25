import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] items-center justify-items-center p-8 sm:p-20 gap-16 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900 text-gray-900 dark:text-white">
      {/* HERO SECTION */}
      <main className="row-start-2 w-full max-w-4xl text-center flex flex-col items-center gap-12">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Welcome to Your Next.js App
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Kickstart your project with modern tools, responsive layouts, and performance in mind.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            className="rounded-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-sm sm:text-base font-medium hover:bg-opacity-80 transition"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 Deploy Now
          </a>
          <a
            className="rounded-full border border-gray-400 dark:border-gray-600 px-6 py-3 text-sm sm:text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            📚 Read Docs
          </a>
        </div>

        {/* FEATURES */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12 w-full">
          {[
            {
              icon: "/rocket.svg",
              title: "Blazing Fast",
              desc: "Built for performance from the ground up.",
            },
            {
              icon: "/code.svg",
              title: "Developer Friendly",
              desc: "TypeScript support, routing, and hot reload out of the box.",
            },
            {
              icon: "/lock.svg",
              title: "Secure by Default",
              desc: "Modern security patterns included.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-white/5 shadow-sm backdrop-blur"
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={40}
                height={40}
                className="mb-4 dark:invert"
              />
              <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="row-start-3 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/file.svg" alt="Learn" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/window.svg" alt="Examples" width={16} height={16} />
          Examples of next.js
        </a>
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/globe.svg" alt="Next.js site" width={16} height={16} />
          nextjs.org →
        </a>
        <a
  href="/snakeGame"
  className="rounded-full bg-green-600 text-white px-6 py-3 text-sm sm:text-base font-medium hover:bg-green-500 transition"
>
  🎮 Play Snake Game For Free
</a>
      </footer>
    </div>
  );
}
