# Prometheus + Grafana

### 스프링 부트 설정

```jsx
// build.gradle 파일에 추가
implementation 'org.springframework.boot:spring-boot-starter-actuator' //actuator 추가

// health 관련 설정
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

## promethus.yml 파일 작성

```jsx
global:
  scrape_interval: 1s
  evaluation_interval: 1s

scrape_configs:
  - job_name: 'itda-gateway'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['k9c201.p.ssafy.io:8000']
  - job_name: 'mongo-exporter'
    static_configs:
      - targets: ['k9c201.p.ssafy.io:9216']
```

### 도커 실행

```jsx
docker run -p 9090:9090 -v /Users/andrew/dev/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

### 프로메테우스 확인

![Untitled](Prometheus%20+%20Grafana%205a68958cbcc147f48d97520f80d31dfe/Untitled.png)

### 그라파나 연결 - 도커로 실행

```jsx
$ docker run -d -p 3000:3000 grafana/grafana
```

- 웹에서 http://localhost:3000 으로 접속 할 수 있다. (초기 비밀번호: admin/admin)
- 이제 Grafana에서 Datasource를 Prometheus로 설정하고, Prometheus에서 바라보는 exporter를 dash보드 형태로 구성할 수 있다.
- 로그인 이후에, Configuration - Add data soruce를 한다.
    
    ![130017249-de1ae4d6-bfed-4e6e-929a-74d91f30f2d8.png](Prometheus%20+%20Grafana%205a68958cbcc147f48d97520f80d31dfe/130017249-de1ae4d6-bfed-4e6e-929a-74d91f30f2d8.png)
    

prometheus를 선택하고

- url에 : prometheus 서버 정보를 입력한다. (mac환경에서 docker로 띄웠기 때문에, `host.docker.internal`로 설정하였다.)
- `save & test` 버튼을 누르고 저장한다.
    
    ![130017235-c631b789-9e2b-497e-8449-4c4ae8cf1543.png](Prometheus%20+%20Grafana%205a68958cbcc147f48d97520f80d31dfe/130017235-c631b789-9e2b-497e-8449-4c4ae8cf1543.png)
    
- 이제는 create dashboard를 해서, dashboard에 들어갈 panel항목들을 자신이 보고 싶어하는 지표들을 넣어서, 구성할 수 있다.
- 대시보드 ID입력 - 19004