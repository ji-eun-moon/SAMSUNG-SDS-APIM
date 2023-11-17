# Back-end

DockerFile 작성

```
# jdk 이미지 불러오기
FROM openjdk:17-jdk-slim

# Docker Container에서 작업이 이루어지는 위치
WORKDIR /root

ARG JAR_FILE=build/libs/*.jar

# 현재 경로/target/be-0.0.1-SNAPSHOT.jar에 해당하는 파일을 Docker Container의 WORKDIR 위치로 복사 (이미지 생성할 때 동작)
COPY ${JAR_FILE} app.jar

# COPY된 jar파일 실행하기 (컨테이너 실행할 때 동작)
CMD ["java", "-jar", "./app.jar"]
```

### Build 과정

```
npm run build
docker build -t {docker-hub 계정}/{docker-hub 레포지토리}:{태그} .
docker push {docker-hub 계정}/{docker-hub 레포지토리}:{태그}
```

### push 후에 ubuntu 환경에서 pull 받기

```
sudo docker pull {docker-hub 계정}/{docker-hub 레포지토리}:{태그}

sudo docker run -d -p {포트}:{포트} --name {컨테이너명} {back 이미지명 혹은 태그}
```