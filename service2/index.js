const kue = require('kue');
// Hook kue up to redis
const queue = kue.createQueue({
  redis: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
  }
});

// Create a job
const job = queue
  .create('message', { message: 'i love you' })
  .priority('high') // enum: 'low', 'normal', 'medium', 'high', 'critical'. Also accepts a number.
  .delay(2000) // delay 2s before making the job 'active' (can also pass it a JS Date object to scedule a time)
  .attempts(5) // make 5 attempts before failing the job
  .backoff({ delay: 5 * 1000, type: 'fixed' }) // if job fails, wait 5s before next attempt
  .removeOnComplete(true) // remove job from redis when complete
  .save(err => {
    if (err) console.log('Job creation error:', err);
    else console.log('Created job:', job.id, new Date() );
  });

// Listen to events on the job
job
  .on('failed attempt', (errMsg, attemptNumber) =>
    console.log('Job id', job.id, 'failed on attempt', attemptNumber, 'with error message:', errMsg, new Date()))
  .on('complete', result =>
    console.log('Job id', job.id, 'completed with data:', result, new Date()));

// Listen to events on the queue
queue.on( 'error', err => {
  console.log( 'Error in da queue: ', err );
});