# Uptrace Monitoring example from Feb 20th, 2023

## Description
- Watches over an express nodejs app. The app connects with redis and postgres and exchanges some data and you can check the pg data with pgadmin4. The default server script pulls from list of posts and puts it into a redis cache for 10 seconds.
 
The services (redis, postgres, and pgadmin4) run through docker-compose while nodejs runs by issuing: `node your_app_name`.

## In order to run this code you need to

### Install on your host: main Dependencies 
- Nodejs =v14
- Npm =v6.14.18
- Docker =v19.03.12, build 48a66213fe
- Docker-compose =v2.15.1
- An Uptrace DSN link to send your traces to Uptrace. Uptrace can be setup locally or over the cloud, removing that responsability from your end for a while. On 2023 it allowed <=50GB of data to be analyzed for free. To create an account follow the [Uptrace's homepage](https://app.uptrace.dev/) and it will set you up with a SDN link by default to help you get started.

### Install on your host: nodejs dependencies
- It is all setup over package.json, do a `npm i` on the source folder

### Configure
- Change Pgadmin's username with `PGADMIN_DEFAULT_EMAIL` on `docker-compose.yml` to your own email.
- Change the DSN on `uptrace.configureOpentelemetry` to point to the dsn link provided by your Uptrace project instance.

## Deployment

From the source folder:
- `docker-compose up -d`
- `node server.js`


### Passwords
* Anywhere a password is asked for, type `password`. 

### Troubleshooting
* The Pgadmin container seems to take a long time to start up so give it roughly 5 minutes and it should be started

### Exposed ports
* By default these are the exposed ports. Only port 3000 exposed is required for this to work. If you want to use pgadmin then you also need to expose 8080 for this to work too
- Redis service - localhost:5432 refreshes the the Postgres data each 10s
- Postgres database service - localhost:6379 stores the data from initialize.sql
- Nodejs service - localhost:3000 displays the data fetched from the Redis service
- Pgadmin4 service - localhost:8080 watches over the Postgres database service
