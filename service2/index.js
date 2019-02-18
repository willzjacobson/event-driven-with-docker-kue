const kue = require('kue');
// Hook kue up to redis
const queue = kue.createQueue({
    redis: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
    }
});

let count = 0;

// Subscribe to a job with type 'message'
queue.process('message', (job, done) => {
    console.log('Received message:', job.data.message);
    count++;
    // fail 3 times before completing the job (for demo)
    if (count < 3) {
        // callback expects error as first parameter
        done(new Error('i dont love you'));
    } else {
        // null for error argument means the job passes.
        // Include a payload of any JS datatype as 2nd argument
        done(null, 'I love you too');
    }
});

