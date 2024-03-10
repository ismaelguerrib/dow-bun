// https://bun.sh/

const host = Bun.env.HOST;

Bun.serve({
  port: 36107,
  fetch: async () => {
    const res = await fetch(`https://${host}`);
    const content = await res.text();
    return new Response(content);
  },
});

console.log('Run on http://localhost:36107');
