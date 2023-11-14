# MySQL

- 도커 컨테이너 재시작시 재실행되는것을 막기위해 서버에 직접 설치

### EC2에 MySQL 설치

### 우분투 서버 업데이트

```powershell
$ sudo apt-get update
```

### MySQL-server 설치

```powershell
$ sudo apt-get install mysql-server
```

### MySQL 기본 설정

### 외부 접속 기능 설정 (포트 3306 오픈)

```powershell
$ sudo ufw allow 3306
```

### MySQL 실행

```powershell
$ sudo systemctl start mysql
```

### Ubuntu 서버 재시작시 MySQL 자동 재시작

```powershell
$ sudo systemctl enable mysql
```

### My

### MySQL 접속

```powershell
$ sudo /usr/bin/mysql -u root -p
```

### MySQL 비밀번호 변경 방법

```sql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '바꿀비번';
```

### 데이터 베이스 만들고 확인

```sql
mysql> CREATE DATABASE asap;
mysql> SHOW DATABASES;
```

### 데이터베이스를 사용할 계정 `c208` 만들고 확인

```sql
mysql> CREATE USER 'c202'@'%' IDENTIFIED BY 'mysql비번';
mysql> FLUSH PRIVILEGES;
mysql> SELECT User, Host, authentication_string FROM mysql.user;
```

### 데이터베이스를 사용할 계정 `testuser` 에 권한 부여

```sql
mysql> GRANT ALL PRIVILEGES ON asap.* TO'c202'@'%';
mysql> FLUSH PRIVILEGES;
mysql> SHOW GRANTS FOR'c202'@'%';
mysql> SELECT User, Host, authentication_string FROM mysql.user;
```