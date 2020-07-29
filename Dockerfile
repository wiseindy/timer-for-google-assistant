FROM node:12.18.3
WORKDIR /timer
COPY package.json /timer
RUN npm install
COPY . /timer
CMD npm run build && npm run start:prod
EXPOSE 3000