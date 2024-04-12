#Creating environment for angular
FROM node:21 AS ng-builder
WORKDIR /ngapp 

#Install Angular
RUN npm i -g @angular/cli

COPY frontend/package*.json .
# COPY frontend/package-lock.json .
COPY frontend/ngsw-config.json .
COPY frontend/angular.json .
COPY frontend/tsconfig.* .
COPY frontend/src src

#Installing node_modules from looking at package-lock.json, else "npm i" would install all the modules based on package.json which is the latest package which we do not wish to have that as it changes everytime
#ng build would only run if npm ci ran
RUN npm ci && ng build

# /ngapp/dist/frontend/browser/*
#Starting with this linux server
FROM maven:3-eclipse-temurin-21 AS sb-builder 

#Create a directory call/app
#Create a directory call/sbapp
#go into the directory cd/app

WORKDIR /sbapp

#Everything after this is in /app
# "." at the back adds everything from the current directory to the WORKDIR with the exact name
COPY backend/mvnw .
COPY backend/mvnw.cmd .
COPY backend/pom.xml .

COPY backend/.mvn .mvn
COPY backend/src src
# the output location was changed during building:/ngapp/dist/front-end
COPY --from=ng-builder /ngapp/dist/frontend/browser/  /sbapp/src/main/resources/static
#Build the application
RUN mvn package -Dmaven.test.skip=true


FROM openjdk:21-jdk-bullseye

WORKDIR /app

COPY --from=sb-builder /sbapp/target/finalProject-0.0.1-SNAPSHOT.jar  app.jar

##Run the application

#Define environment variables
ENV PORT=8080

# ENV SPRING_REDIS_HOST=localhost
# ENV SPRING_REDIS_PORT=6379
# ENV SPRING_REDIS_USERNAME=NOT_SET
# ENV SPRING_REDIS_PASSWORD=NOT_SET

ENV SPRING_DATA_MONGODB_URI= 

ENV SPRING_DATASOURCE_URL=


ENV OPENAI_API_KEY=
ENV OPENAI_MODEL=
ENV OPENAI_API_URL=

ENV BASE_URL=
ENV GOOGLE_CLIENT_ID=
ENV GOOGLE_CLIENT_SECRET=
ENV GOOGLE_CLIENT_REDIRECT=

            
# Expose the port so that it could be run on this port on your local computer when calling docker container run -d -p (8080):3050, as PORT in the environment variable is only an object, it must be referenced
EXPOSE ${PORT} 

#Run the program
# By doing SERVER_PORT = ${PORT} it changes the application port "server.port" in the application.properties to the exposed port number, so when we run the container, it would be 8080:8080(application port) rather than 8080:3050
ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar

#docker build -t darcodelim/ssf-day14:v1.0.0 .
#dive darcodelim/ssf-day14:v1.0.0