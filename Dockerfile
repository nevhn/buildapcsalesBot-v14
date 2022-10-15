FROM node:16.18

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot


COPY package.json /usr/src/bot
RUN npm install


COPY . /usr/src/bot


CMD ["npm", "run", "build"]
CMD ["npm", "run", "slash"]
CMD ["npm", "run", "start"]
