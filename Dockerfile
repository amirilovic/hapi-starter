# Use latest version of node v8
FROM node:8.4.0

#create an app directory
RUN mkdir /app

#make /app as the working directory
WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY src/ /app/src/

#expose default port of the docker to 3000
EXPOSE 3030

#runs this command when the container is created, can be overriden in the docker-compose.yml
CMD ["npm", "start"]