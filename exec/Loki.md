# Loki

```jsx
// 설정 파일 작성
wget <https://raw.githubusercontent.com/grafana/loki/v2.9.1/cmd/loki/loki-local-config.yaml> -O loki-config.yaml
// 도커 실행
docker run --name loki -d -v $(pwd):/mnt/config -p 3100:3100 grafana/loki:2.9.1 -config.file=/mnt/config/loki-config.yaml
```

### 스프링 부트를 통해 로그 전송

- gradle 추가

```jsx
implementation("com.github.loki4j:loki-logback-appender:1.4.2")
```

- 로그 전송 파일 생성

```jsx
// logback-spring.xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true">
    <property name="LOG_PATH" value="./logs"/>
    <property name="LOG_FILE_NAME" value="my"/>
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>
    <!-- 콘솔에 로그를 남기는 appender -->
    <include resource="org/springframework/boot/logging/logback/console-appender.xml"/>
    <!-- 파일에 로그를 남기는 appender -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_PATH}/${LOG_FILE_NAME}.log</file>
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN}</pattern>
            <charset>utf8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${LOG_PATH}backup/app-%d{yyyy-MM-dd}.%i.log.zip</fileNamePattern>
            <maxFileSize>100MB</maxFileSize>
            <maxHistory>30</maxHistory>
            <totalSizeCap>3GB</totalSizeCap>
        </rollingPolicy>
    </appender>
    <appender name="LOKI" class="com.github.loki4j.logback.Loki4jAppender">
        <http>
            <url><http://k9c201.p.ssafy.io:3100/loki/api/v1/push></url>
        </http>
        <format>
            <label>
                <pattern>app=gateway,host=8000,traceID=%X{traceId:-NONE},level=%level</pattern>
            </label>
            <message>
                <pattern>
                    {
                    "level":"%level",
                    "class":"%logger{36}",
                    "thread":"%thread",
                    "message": "%message",
                    "requestId": "%X{X-Request-ID}"
                    }
                </pattern>
            </message>
            <sortByTime>true</sortByTime>
        </format>
    </appender>
    <!-- 최상위 로거 설정 -->
    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="LOKI" />
    </root>
    <logger name="org.springframework.web" level="error">
        <appender-ref ref="FILE"/>
    </logger>
</configuration>
```

- application.yml

```jsx
management:
  server:
    port: 8000
  endpoint:
    logfile:
      external-file: ./logs/my.log
```

- 그라파나에서 로키 데이터 베이스 등록 후 사용
