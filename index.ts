import dictionary from './dictionary.json';

Bun.serve({
  port: Bun.env.PORT,
  fetch: async (request: Request) => {
    try {
      let path = new URL(request.url).pathname;
      const isFrenchVersion = path.includes(Bun.env.LANGUAGE_FR);

      if (isFrenchVersion) {
        path = path.replace(Bun.env.LANGUAGE_FR, Bun.env.LANGUAGE_EN);
      }

      const res = await fetch(`${Bun.env.HOST}${path}`);
      let content = await res.text();

      if (isFrenchVersion) {
        content = content.replace(/href="\/en-us\//g, 'href="/fr-fr/');

        const keys: string[] = Object.keys(
          dictionary as Record<string, string>
        );

        keys.forEach((key) => {
          const reg = new RegExp(key, 'g');
          content = content.replace(reg, dictionary[key]);
        });
      }

      let contentType = 'text/plain';

      if (path.endsWith('.html') || path.endsWith(Bun.env.LANGUAGE_EN)) {
        contentType = 'text/html';
      } else if (path.endsWith('.css')) {
        contentType = 'text/css';
      } else if (path.endsWith('.js')) {
        contentType = 'text/javascript';
      } else if (path.endsWith('.json')) {
        contentType = 'application/json';
      } else if (path.endsWith('.png')) {
        contentType = 'image/png';
      } else if (path.endsWith('.jpg')) {
        contentType = 'image/jpeg';
      } else if (path.endsWith('.gif')) {
        contentType = 'image/gif';
      } else if (path.endsWith('.svg')) {
        contentType = 'image/svg+xml';
      }

      return new Response(content, {
        headers: {
          'Content-Type': contentType,
        },
      });
    } catch (err: any) {
      return new Response(err.message, { status: 500 });
    }
  },
});

// Theses logs will be prompted in the terminal when the server is running :
console.log('🎉 The proxy server is now running locally ! 🎉');
console.log(
  `To check the EN version, go to : ${Bun.env.LOCAL_HOST}${Bun.env.LANGUAGE_EN}`
);
console.log(
  `To check the FR version, go to : ${Bun.env.LOCAL_HOST}${Bun.env.LANGUAGE_FR}`
);

console.log('You can kill the server by pressing Ctrl + C.');
