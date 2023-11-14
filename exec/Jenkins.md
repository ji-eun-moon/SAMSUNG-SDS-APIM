# Jenkins

용어

- CI(Continuous Integration): 빌드/테스트 자동화 프로세스
- CD(Continuous Delivery): 배포 자동화 프로세스

## Jenkins 설치 (Docker)

### Jenkins 이미지 받기

- docker의 pull 명령을 통해 최신 LTS 버전의 jenkins 이미지를 다운로드 한다
- Java 8, 11

```bash
docker pull jenkins/jenkins:lts
```

- Java 17

### Jenkins 컨테이너 실행

- Jenkins 컨테이너를 명령어를 통해 서비스를 띄운다
    - sudo : 관리자 권한으로 명령어를 실행한다
    - d : 컨테이너를 **데몬**으로 띄운다
    - e TZ=Asia/Seoul : 환경변수 설정 (컨테이너 내부 시간대를 Asia/Seoul로 지정)
    - p 8080:8080 : 컨테이너 외부와 내부 포트에 대해 **포워딩** 한다
        - 왼쪽 : Host Port
        - 오른쪽 : Container Port
    - v /etc/localtime:/etc/localtime:ro : Host OS의 localtime을 컨테이너의 localtime과 동기화
    - v /jenkins:/var/jenkins_home : 도커 컨테이너의 데이터는 컨테이너가 종료되면 사라지기 때문에, **볼륨 마운트** 옵션을 이용하여 Jenkins 컨테이너의 /var/jenkins_home 디렉토리를 Host OS의 /jenkins와 연결하여 데이터를 유지한다
    - -name jenkins : 도커 컨테이너의 이름을 설정하는 옵션
    - u root : 컨테이너가 실행될 리눅스 사용자 계정 지정 (root)
- Java 8, 11

```bash
docker run -d --env JENKINS_OPTS=--httpPort=8080 -v /etc/localtime:/etc/localtime:ro -e TZ=Asia/Seoul -p 8080:8080 -v /jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose --name jenkins -u root jenkins/jenkins:lts
```

- Java 17

```bash
docker run -d --env JENKINS_OPTS=--httpPort=8080 -v /etc/localtime:/etc/localtime:ro -e TZ=Asia/Seoul -p 8080:8080 -v /jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose --name jenkins -u root jenkins/jenkins:jdk17
```

- Jenkins 종료
- 정상적으로 컨테이너가 실행되었는지 확인하기 위해, netstat 명령어를 활용하여 포트가 개방되어 있는지 확인한다
    - 아래의 사진에서는 0.0.0.0:8080을 통해, Jenkins 컨테이너가 외부 아이피에 대해 8080 포트가 개방되어 있는 것을 확인할 수 있다

### Jenkins 접속

- 포워딩 및 방화벽 개방 작업까지 완료되었다면, 서버 IP 및 포트번호를 웹 브라우저에 입력하고 접속한다.
    - 웹 페이지에서는 비밀번호를 확인하기 위해 /var/jenkins_home/secrets/initialAdminPassword 경로에 있다고 하는데, 이 경로는 Jenkins가 설치되어 있는 컨테이너 안의 파일이기 때문에 아래와 같은 방법을 이용해야 한다
- jenkins 컨테이너 안으로 접속하기 위해 다음 명령어를 활용하여 컨테이너의 bash 쉘에 접속한다

```bash
docker exec -it jenkins /bin/bash
```

- 해당하는 디렉토리로 이동한다

```bash
cd /var/jenkins_home/secrets
```

- cat 명령어를 이용하여 초기 비밀번호를 확인한다. 이후, exit을 하여 컨테이너의 bash 쉘에서 나가 Host OS의 쉘로 복귀한다

```bash
cat initialAdminPassword
```

- 조금 전 확인한 방법으로 얻어낸 관리자 비밀번호를 입력한다

## Jenkins 기본 설정

### 기본 플러그인 설치

- 초기 페이지에 접속하면, 우선 추천하는 플러그인을 설치한다 **(Install suggested plugins)**

### 관리자 계정 설정

- 이후 관리자 계정을 설정한다.
- 서버 인스턴스 설정을 확인하고 Save and Finish 클릭

## Jenkins 내부에 Docker 패키지 설치 (컨테이너 재시작시마다 하는 작업)

### Jenkins 컨테이너 접속

```bash
docker exec -it jenkins /bin/bash
```

### Docker Repository 등록 및 docker-ce 패키지 설치

### Jenkins 컨테이너 접속

```bash
docker exec -it jenkins /bin/bash
```

### Docker Repository 등록 및 docker-ce 패키지 설치

- AMD64 환경

```bash
apt-get update && apt-get -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common && curl -fsSL <https://download.docker.com/linux/$>(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && add-apt-repository "deb [arch=amd64] <https://download.docker.com/linux/$>(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable" && apt-get update && apt-get -y install docker-ce
```

- ARM64 환경

### Docker Jenkins에서 Host Docker 접근권한 부여

```bash
groupadd -f docker
```

```bash
usermod -aG docker jenkins
```

```bash
chown root:docker /var/run/docker.sock
```

### Docker Compose 다운로드

- curl 명령을 이용하여 docker-compose 패키지를 /usr/local/bin/docker-compose 디렉토리에 다운로드 한다

```bash
curl -L "<https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$>(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

### /usr/local/bin/docker-compose 권한 변경

- chmod를 이용하여 /usr/local/bin/docker-compose 디렉토리에 대해 jenkins 사용자에게 실행 권한을 추가시킨다

```bash
chmod +x /usr/local/bin/docker-compose
```

### Gitlab Webhook 지정

- Gitlab에 특정 브랜치에 merge request가 된 경우 Webhook을 통해 빌드 및 서비스 재배포 이벤트 발동
- Gitlab의 배포할 서비스의 Repository 접속
- Settings - Webhooks 클릭
    - URL : Jenkins의 Item URL 입력 (양식 : `http://[Jenkins Host]:[Jenkins Port]/project/[파이프라인 아이템명]`)
    - Secret token : Jenkins의 Gitlab trigger 고급 설정 중 Secret token Generate 버튼을 이용해 만든 토큰 입력
    - Trigger : Push events 체크, merge request가 되면 Jenkins 이벤트가 발동하게 할 브랜치 입력

### 파이프라인 예시

```
// back-end-discovery

pipeline {
    agent any

    // 환경 변수 설정
    environment {
        registryCredential = 'sionyang-docker'
        dockerImage = 'sionyang/itda:itda-discovery-v1.0'
        releaseServerAccount = 'ubuntu'
        releaseServerUri = 'k9c201.p.ssafy.io'
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'BE-discovery/develop',
                    credentialsId: 'gitlab-sion',
                    url: 'https://lab.ssafy.com/s09-final/S09P31S106'
            }
            post {
                failure {
                    echo '=============\n Git Clone 실패\n============='
                }
            }
        }

        stage('Jar Build') {
            steps {
                dir ('discorveryService') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean bootJar'
                }
            }
            post {
                failure {
                    echo '=============\n Jar Build 실패\n============='
                }
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    dir('discorveryService') {
                        sh "docker build -t $dockerImage ."
                    }
                }
            }
            post {
                failure {
                    echo '=============\n Docker 이미지 빌드 실패\n============='
                }
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        sh "docker push $dockerImage"
                    }
                }
            }
            post {
                failure {
                    echo '=============\n DockerHub 푸시 실패\n============='
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ubuntu-c201']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri 'docker stop itda-discovery || true && docker rm itda-discovery || true'
                    """
                    sh """
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri 'docker pull $dockerImage && docker run -d -e TZ=Asia/Seoul -p 8761:8761 --name itda-discovery $dockerImage'
                    """
                }
            }
            post {
                failure {
                    echo '=============\n EC2 배포 실패\n============='
                }
            }
        }
    }

    post {
        success {
            echo '=============\n 성공성공성공성공\n============='
        }
        failure {
            echo '=============\n 실패실패실패실패\n============='
        }
    }
}
```