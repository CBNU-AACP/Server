FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . /usr/src/app
EXPOSE 3001
CMD ["node", "app.js"]