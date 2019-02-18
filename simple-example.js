const kue = require('kue')
// Hook kue up to redis
const queue = kue.createQueue({
    redis: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
    }
});

// Subscribe to a job with type 'message' (can be any string)
queue.process('message', (job, done) => {
    console.log('Message data:', job.data); // 'i love you'
    try {
        const result = performAction(job.data); // 'I know'
        // Pass null for error argument, and send data for the event creator to use
        done(null, result);
    } catch(err) {
        done(err);
    }
});

// Create a job with type 'message'
const job = queue
    .create('message', 'i love you') // payload can be any JS datatype
    .save(err => {
        if (err) console.log('Job creation error:', err);
        else console.log('Created job:', job.id);
    });

// When job is complete, do something else
job.on('complete', result => {
    console.log('Job id', job.id, 'completed with data:', result);
    // Job id <id> completed with data: 'I know'
});

function performAction(data) {
    // do stuff with data...
    return 'I know';
}
