const express = require('express')
const redis = require('redis')
const util = require('util')
const { Pool } = require('pg')
const otel = require('@opentelemetry/api')
const uptrace = require('@uptrace/node')

uptrace
  .configureOpentelemetry({
    // Set dsn or UPTRACE_DSN env var.
    dsn: 'https://c0xtpshAHNSfWTB-_76s6Q@uptrace.dev/1417',
    serviceName: 'server-test',
    serviceVersion: '1.0.0',
  })
  .start()
  .then(server)

const tracer = otel.trace.getTracer('uptrace/node', '1.0.0') 


const pgClient = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_db',
  password: 'password',
  port: 5432,
})
 
// create express application instance
async function server() {
  await tracer.startActiveSpan('server', async (span) => {
  
  let app

  try {
      app = express()

      const hostRedis = "127.0.0.1"
      const redisPort = "6379"
      const redisClient = redis.createClient(redisPort, hostRedis)

      const get = util.promisify(redisClient.get).bind(redisClient);
      const set = util.promisify(redisClient.set).bind(redisClient);

      app.get('/', async (req, res) => {
              const redisData = await get('latestposts')
              if (redisData) {
                return res.json({source: 'redis', data: JSON.parse(redisData)})
              }
              const data = await pgClient.query('select * from posts')
              await set('latestposts', JSON.stringify(data.rows), 'EX', 10)
              res.json({source: 'pg', data: data.rows});
      });

              app.listen(3000, () => {
                console.log('listening');
      });
    } catch(exc) {
      span.recordException(exc)
      span.setStatus({ code: otel.SpanStatusCode.ERROR, message: String(exc) })
    } finally {
      span.end()
    }

    
  })

   // Send buffered spans.
   setTimeout(async () => {
    await uptrace.shutdown()
  })
}