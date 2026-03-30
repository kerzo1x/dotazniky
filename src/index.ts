import { authorisation, } from './auth';
import { quest } from './questionnaire';

const server = Bun.serve({
  port:3000,
  maxRequestBodySize: 1024 * 1024,
  routes: {

    // test route
    "/register": {
      POST: (req) => authorisation.registerPost(req),
    },
  },

  fetch(req) {
      return new Response("Not Found", { status: 404 });
  }
});

console.log(`>> Server running at: ${server.url}`);