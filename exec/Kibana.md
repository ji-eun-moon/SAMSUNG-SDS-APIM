# Kibana

### **kibana docker image**

```bash
docker pull docker.elastic.co/kibana/kibana:7.10.4
```

### **kibana container 실행**

```bash
docker run -d --link elasticsearch:elasticsearch -p 5601:5601 --name kibana docker.elastic.co/kibana/kibana:7.6.2
```

### **kibana es 설정 확인**

```bash
docker exec -i -t kibana7 cat /usr/share/kibana/config/kibana.yml
```

### kibana

- Kibana에서는 Dev Toools에서 직접적인 Data node에 적제된 Document 들을 개발하기 전에 조회하거나 여러 가지 Command 명령어를 실행하며 진행 가능
- ELK에 설정된 물리적 Node 정보 Document 정보주샤드(Primary Shards), 복제샤드(Replica Shards) 정보
- Logstash에서 관리하는 Piplines 실행되는 Job 기능 정보
- 운영 중인 인스턴스에 ELK 프로세스 확인 가능하기 때문에 필수적인 기능 중 하나