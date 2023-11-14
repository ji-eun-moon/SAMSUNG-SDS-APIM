# Elasticsearch

### ElasticSearch image pull

```bash
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.10.4
```

### 영구 볼륨 생성

```bash
docker volume create elasticsearch-volume
```

### **elasticSearch container 실행**

```bash
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -v elasticsearch-volume:/usr/share/elasticsearch/data -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.10.4
```

- **9200 port**
    - Elasticsearch HTTP API를 호스트에 노출하기 위한 포트
- **9300 port**
    - Elasticsearch 노드들 끼리 서로 통신하기 위한 tcp 포트
- **discovery.type**
    - Elasticsearch가 다중 노드 클러스터를 형성해야 하는지 여부를 지정 옵션
    - 기본 값은 multi-node (저는 싱글로 올리기 때문에 옵션을 지정하고 올렸습니다.)