# Docker

### Docker 설치 전 필요한 패키지 설치

```bash
sudo apt-get -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

- apt-transport-https: 패키지 관리자가 https를 통해 데이터 및 패키지에 접근할 수 있도록 한다
- ca-certificates: certificate authority에서 발행되는 디지털 서명. SSL 인증서의 PEM 파일이 포함되어 있어 SSL 기반 앱이 SSL 연결이 되어있는지 확인할 수 있다
- curl: 특정 웹 사이트에서 데이터를 다운로드 받을 때 사용하는 패키
- gnupg-agent: OpenPGP 표준 규격의 데이터 통신을 암호화하고 서명할 수 있는 패키지
- software-properties-common: PPA를 추가하거나 제거할 때 사용한다.
    - PPA: Personal Package Archive(개인 패키지 저장소)를 의미하며, 캐노니컬社의 우분투에서 기본적으로 제공하는 패키지 외의 사적으로 만든 패키지를 의미한다

### Docker에 대한 GPC Key 인증 진행

- OK가 떴다면 정상적으로 등록이 되었다는 뜻이다

```bash
curl -fsSL <https://download.docker.com/linux/ubuntu/gpg> | sudo apt-key add -
```

### Docker 레포지토리 등록

- AMD64 계열
    
    ```bash
    sudo add-apt-repository "deb [arch=amd64] <https://download.docker.com/linux/ubuntu> $(lsb_release -cs) stable"
    ```
    
- ARM64 계열
    
    ```bash
    sudo add-apt-repository "deb [arch=arm64] <https://download.docker.com/linux/ubuntu> $(lsb_release -cs) stable"
    ```
    

### 패키지 리스트 갱신

```bash
sudo apt-get -y update
```

### Docker 패키지 설치

- apt-get을 이용하여 Docker를 설치한다
    - docker-ce: Docker Community Edition의 약
    - docker-ce-cli: Docker Community Edition의 CLI 환경에서 추가로 설치해야 하는 패키지
    - [containerd.io](http://containerd.io/): Docker 컨테이너 런타임

### Docker 일반 유저에게 권한 부여

- Docker는 항상 root로 실행되기 때문에 sudo를 사용하여 명령어를 입력해야 한다
- 사용자를 docker 그룹에 추가하여 sudo를 사용하지 않아도 docker 명령어를 사용할 수 있도록 한다

```bash
sudo usermod -aG docker ubuntu
```

- Docker 서비스 재시작
    - 이후, 사용자 세션 로그아웃 및 재로그인 필요

### Docker에서 실행되고 있는 컨테이너 목록 조회

```bash
docker ps -a
```

### Docker에서 실행되고 있는 컨테이너 로그 조회

- 단, docker logs로 조회되는 시간은 UTC-0이며, 변경불가
    - 필요시 별도의 logs 확인
    - 참고 : [https://github.com/docker/cli/issues/604](https://github.com/docker/cli/issues/604)

```bash
docker logs 컨테이너명
```

### Docker Compose 다운로드

- curl 명령을 이용하여 docker-compose 패키지를 /usr/local/bin/docker-compose 디렉토리에 다운로드 한다

```bash
sudo curl -L "<https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$>(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

### /usr/local/bin/docker-compose 권한 변경

- chmod를 이용하여 /usr/local/bin/docker-compose 디렉토리에 대해 모든 사용자에게 실행 권한을 추가시킨다