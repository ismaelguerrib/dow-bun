Bun.serve({
  port: Bun.env.PORT,
  fetch: async () => {
    try {
      const res = await fetch(Bun.env.HOST as string);
      const content = await res.text();
      return new Response(content);
    } catch (err: any) {
      return new Response(err.message, { status: 500 });
    }
  },
});

console.log('Run on', Bun.env.LOCAL_HOST);
