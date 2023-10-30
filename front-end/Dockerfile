FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm build
# pakage.json 'prod' 스크립트를 사용하여 빌드 후 시작
CMD [ "npm", "run", "start" ]
