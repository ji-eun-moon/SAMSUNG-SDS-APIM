# NginX

### NginX 설치 (Host OS)

```bash
sudo apt-get -y install nginx
```

### Nginx 삭제

- 혹시라도 nginx를 삭제 후 재설치할 일이 생기면 다음 명령어를 이용한다
    - `sudo apt-get -y remove --purge nginx`는 `/etc/nginx` 디렉토리에 찌꺼기를 남기기 때문이다

```bash
sudo apt-get -y remove --purge nginx nginx-full nginx-common(https://doitnow-man.tistory.com/entry/nginx-ubuntu-2004%EC%97%90%EC%84%9C-nginx-%EC%99%84%EB%B2%BD%ED%95%9C-%EC%82%AD%EC%A0%9C)
```

## SSL 설정 (CertBot)

### CertBot 다운로드

- snap을 이용해서 다운로드 한다
- `sudo apt-get -y install certbot` 명령어를 이용하면 다음과 같은 오류가 발생하기 때문이다
    - **The requested nginx plugin does not appear to be installed**

```bash
sudo snap install --classic certbot
```

### SSL 인증서 발급

- nginx 사용시
    - d : 등록할 도메인 Host 주소를 입력한다

```bash
sudo certbot --nginx -d develop.code-speed.com
```

- apache 사용시

```bash
sudo certbot --apache -d develop.code-speed.com
```

- 이메일 주소를 입력한다
    - c를 입력하고 Enter를 누르면 취소가 되며, 이메일을 입력하지 않으면 다음으로 진행되지 않는다
- 이메일로 재단 정보나 홍보성 수신물을 이메일로 받을 것인지 물어본다
    - n을 입력하고 Enter를 누른다
- 인증서가 발급되면 다음과 같은 곳에 `fullchain.pem`과 `privkey.pem`이 발급된다
    - 인증서는 발급하려는 도메인마다 디렉토리 위치가 다르니 주의
    - 인증서는 90일마다 갱신해야 하지만, `/etc/cron.d`에 자동으로 갱신되는 스크립트가 설치중 기록된다
    - 갱신되는지 테스트를 하고 싶다면 다음 명령어를 입력한다
        - `sudo certbot renew --dry-run`

### default 설정 편집

```bash
sudo vim /etc/nginx/sites-enabled/default
```

- 다음과 같이 추가
    - 단, `try_files $uri $uri/ =404;`는 주석처리

```bash
include /etc/nginx/conf.d/service-url.inc;
```

```bash
proxy_pass $service_url;
```

### service-url.inc 추가

- vim 편집기

```bash
sudo vim /etc/nginx/conf.d/service-url.inc
```

- 해당내용 추가 후 저장
    - nginx가 자동으로 80포트를 8081 포트로 전환
    - 반드시 맨 끝의 세미콜론(;)을 주의 (붙여야 함)
    - 외부 서버의 서비스를 리버스 프록시하는 경우는 상관없고, 내부 서버의 서비스를 리버시 프록시 하는 경우 `localhost`가 아닌, `127.0.0.1`을 사용할 것
        - 그렇지 않으면 resolve 오류가 발생한다
        - 오류가 발생한 경우 `tail -200f /var/log/nginx/error.log`를 통해 원인을 확인한다

```bash
set $service_url <http://127.0.0.1:8081>;
```