Bun.serve({
  port: Bun.env.PORT,
  fetch: async () => {
    const res = await fetch(Bun.env.HOST as string);
    const content = await res.text();
    return new Response(content);
  },
});

console.log('Run on', Bun.env.LOCAL_HOST);
