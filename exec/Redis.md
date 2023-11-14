# Redis

### EC2에 Redis 설치

### 업데이트

```powershell
sudo apt-get update
```

### 설치

```powershell
sudo wget http://download.redis.io/redis-stable.tar.gz
sudo tar xvzf redis-stable.tar.gz
cd redis-stable
make
```

### Redis 설정 편집

### 저장된 경로의 redis.conf 파일을 vim으로 열고 편집

```powershell
sudo vim /home/ubuntu/redis-stable/redis.conf
```

### redis.conf

```
maxmemory 500m # 최대메모리 설정
maxmemory-policy noeviction allkeys-lru # 초과시 가장 안 쓰인 거 부터 제거하는 정책.
bind 0.0.0.0 ::1 # 모든 IP 접근허용처리
requirepass {비밀번호 지정}
port 6378 # 포트 설정
# 기본 6379는 openvidu에서 사용하기때문에 6378포트 사용
stop-writes-on-bgsave-error no # 메모리 초과시 서버 정지하게 하지 않는다는 설정
```

### 설정 변경 후 Redis 서버 재시작

```powershell
sudo service redis restart
```

### ※ sevice 파일이 없을때

```
nano /etc/systemd/system/redis.service

# redis.service 파일
[Unit]
Description=Redis In-Memory Data Store
After=network.target

[Service]
User=ubuntu
Group=ubuntu
# redis-server위치 - redis.conf 위치
ExecStart=/usr/local/bin/redis-server /home/ubuntu/redis-stable/redis.conf
ExecStop=/usr/local/bin/redis-cli shutdown
Restart=always

[Install]
WantedBy=multi-user.target
```

### ※ make 시에 오류가 뜨거나 안된다면

```powershell
udo yum install tcl
make distclean
make
```

### 서버 실행

```powershell
cd src

./redis-server

redis-cli
```

---