const server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Pull in our Quotes file
const quotes = require('./data/quotes.json');
// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
});

// Basic quote route
fastify.get('/quote', function(request, reply) {
    return reply.send(JSON.stringify(quotes[Math.floor(Math.random() * quotes.length)]));
});

// Get quote for specific character
fastify.get('/quote/:character', function(request, reply) {
    const character = request.params.character.replace(/%20/g, " ");
    console.log(character);
    const charArray = quotes.filter(function(quote) {
        return quote.character.toUpperCase() === character.toUpperCase()
    });
    if (charArray.length === 0) {
    	return reply.code(404).type('text/html').send('Not Found');
    }
    return reply.send(JSON.stringify(charArray[Math.floor(Math.random() * charArray.length)]));
});

// Run the server
fastify.listen(3000, '0.0.0.0', function(err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
});