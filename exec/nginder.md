# ngrinder

```bash
sudo apt-get update
```

```bash
sudo docker pull ngrinder/controller:3.5.3
```

- 부하 테스트를 위한 웹 인터페이스 제공
- 테스트 프로세스를 체계화
- 테스트 결과를 수집해 통계로 제공

```bash
sudo docker pull ngrinder/agent:3.5.3
```

- agent 모드가 실행되면 타겟이 된 머신에 프로세스와 쓰레드를 실행시켜 부하를 발생
- monitor 모드가 실행되면 대상 시스템의 CPU와 Memory 측정

```bash
docker run -d -v ~/ngrinder-controller:/opt/ngrinder-controller --name controller -p 7070:80 -p 16001:16001 -p 12000-12009:12000-12009 ngrinder/controller:3.5.3

docker run -d -v ~/ngrinder-agent:/opt/ngrinder-agent --name agent ngrinder/agent k9c201a.p.ssafy.io:7070
```