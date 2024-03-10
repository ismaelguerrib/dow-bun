Bun.serve({
  port: Bun.env.PORT,
  fetch: async (request: Request) => {
    try {
      const path = new URL(request.url).pathname;

      const res = await fetch(`${Bun.env.HOST}${path}`);
      let content = await res.text();

      return new Response(content);
    } catch (err: any) {
      return new Response(err.message, { status: 500 });
    }
  },
});

console.log('Run on', Bun.env.LOCAL_HOST);
