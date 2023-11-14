# Front-end

Dockerfile 작성

```docker
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -y

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev"]
```

ec2 `docker login`

vscode `docker login`

### vscode로 build/push

```bash
npm run build

docker build -t sionyang/itda:itda-front-v1.01 .

docker push sionyang/itda:itda-front-v1.01
```

### ec2에서 pull/run

```bash
docker pull sionyang/itda:itda-front-v1.01

docker run -d -p 3000:3000 --name itda-fe sionyang/itda:itda-front-v1.01
```

---