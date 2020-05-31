// Pull in our Quotes file
const quotes = require('./data/quotes.json')
// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Basic route
fastify.get('/', async (request, reply) => {
  return { redirect: 'you really want to go to /quote' }
})

// Basic quote route
fastify.get('/quote', function(request, reply) {
    return reply.send(JSON.stringify(quotes[Math.floor(Math.random() * quotes.length)]));
});

// Get quote for specific character
fastify.get('/quote/:character', function(request, reply) {
    const character = request.params.character.replace(/%20/g, " ");
    let charArray;
    if (character) {
        charArray = quotes.filter(function(quote) {
            return quote.character.toUpperCase() === character.toUpperCase()
        });
        if (charArray.length === 0) {
            return reply.code(404).type('text/html').send('Not Found');
        }
    } else {
        charArray = quotes;
    }
    return reply.send(JSON.stringify(charArray[Math.floor(Math.random() * charArray.length)]));
});

// Run the Server
const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()