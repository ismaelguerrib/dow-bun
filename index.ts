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

      let contentType;

      switch (!!path) {
        case path.endsWith('.html') ||
          path.endsWith(Bun.env.LANGUAGE_EN) ||
          path.endsWith(Bun.env.LANGUAGE_FR):
          contentType = 'text/html';
          break;
        case path.endsWith('.css'):
          contentType = 'text/css';
          break;
        case path.endsWith('.js'):
          contentType = 'text/javascript';
          break;
        case path.endsWith('.json'):
          contentType = 'application/json';
          break;
        case path.endsWith('.png'):
          contentType = 'image/png';
          break;
        case path.endsWith('.jpg'):
          contentType = 'image/jpg';
          break;
        case path.endsWith('.gif'):
          contentType = 'image/gif';
          break;
        case path.endsWith('.svg'):
          contentType = 'image/svg+xml';
          break;
        default:
          contentType = 'text/plain';
          break;
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

console.log('Run on', `${Bun.env.LOCAL_HOST}${Bun.env.LANGUAGE_FR}`);
