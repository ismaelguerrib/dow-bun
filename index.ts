Bun.serve({
  port: Bun.env.PORT,
  fetch: async (request: Request) => {
    try {
      const path = new URL(request.url).pathname;

      const res = await fetch(`${Bun.env.HOST}${path}`);
      let content = await res.text();

      let contentType;

      switch (!!path) {
        case path.endsWith('.html') ||
          path.endsWith(Bun.env.LANGUAGE_EN as string) ||
          path.endsWith(Bun.env.LANGUAGE_FR as string):
          contentType = 'text/html';
          break;
      }

      return new Response(content, {
        headers: {
          'Content-Type': contentType as string,
        },
      });
    } catch (err: any) {
      return new Response(err.message, { status: 500 });
    }
  },
});

console.log('Run on', `${Bun.env.LOCAL_HOST}${Bun.env.LANGUAGE_EN}`);
