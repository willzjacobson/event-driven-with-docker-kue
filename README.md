# What's this?
This repo demonstrates an implementation of Event Driven Architecture using open source tools.
Here's my blog article explaining its uses (and what's missing from it): <URL>
Fork and extend as you please!

Tools used are:
 - [NodeJS](https://nodejs.org/en/)
 - [Docker-Compose](https://docs.docker.com/compose/) - A gorgeously elegant tool for spinning up and managing development environments (you'll need Docker Engine release 1.13.0+ for this demo)
 - [Kue](https://github.com/Automattic/kue) - A priority job queue backed by Redis, built for nodeJS
 - [Redis](https://redis.io/) - A super fast key value store, which Kue uses to store its events

# Build
 - From the root directory of this repo: `docker-compose build`

# Run
 - From the root directory of this repo: `docker-compose up`

You should see the system and application logs for each service. Here are the application logs you should see from service1 and service2 (with different timestamps):

/*
service2    | Created job: 1 2019-02-18T03:49:15.569Z
service1    | Received message: i love you
service2    | Job id 1 failed on attempt 1 with error message: i dont love you 2019-02-18T03:49:17.599Z
service1    | Received message: i love you
service2    | Job id 1 failed on attempt 2 with error message: i dont love you 2019-02-18T03:49:22.604Z
service1    | Received message: i love you
service2    | Job id 1 completed with data: I love you too 2019-02-18T03:49:27.615Z
*/


# Clean up
 - To stop the containers: `ctrl + c`
 - To delete the containers, from the root directory of this repo: `docker-compose down`
 - To delete the images: `docker image rm redis willzj/demo_service1 willzj/demo_service2`
