export const metadata = {
  title: 'About',
  description: 'Learn more about me and this blog.',
};

export default function AboutPage() {
  return (
    <section className="prose prose-slate max-w-none">
      <h1>About</h1>
      <p>
        Hi, I’m the author of this blog. I write about web development, learning, and
        building products. This site is built with Next.js and MDX.
      </p>

      <h2>What you’ll find here</h2>
      <ul>
        <li>Notes on building with React, TypeScript, and Next.js</li>
        <li>Write-ups on interesting problems and how to solve them</li>
        <li>Opinions on developer experience and product design</li>
      </ul>

      <h2>Why I started this blog</h2>
      <p>
        Writing helps me learn. Sharing helps others. Over time, these ideas become a
        personal knowledge base that I can reference and improve.
      </p>

      <p>
        Thanks for visiting — I hope you find something useful. If you’d like to say
        hello, feel free to open an issue on the repo or connect elsewhere.
      </p>
    </section>
  );
}