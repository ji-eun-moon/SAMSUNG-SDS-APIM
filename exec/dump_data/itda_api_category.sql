-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9c201.p.ssafy.io    Database: itda_api
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `server_id` bigint DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `UK_46ccwnsi9409t36lurvtyljak` (`name`),
  KEY `FK2w8y6kvwwbi9xy4qq2sj782bc` (`server_id`),
  CONSTRAINT `FK2w8y6kvwwbi9xy4qq2sj782bc` FOREIGN KEY (`server_id`) REFERENCES `server` (`server_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'사원 출근, 퇴근 시간 조회, 등록, 전체 출근 기록 조회 기능을 제공하고 있습니다.','사원 출결 정보 관련',2),(2,'사원의 개인 정보, 연락처 정보, 입사일, 직급 및 부서, 연봉과 같은 기본 정보를 조회할 수 있는 기능을 제공하고 있습니다.','사원 정보 조회',2),(3,'해외 운송정보와 출발지, 도착지, 날짜에 관련한 기록 조회 기능을 제공하고 있습니다.','국내 운송 정보 관련',6),(4,'해외 운송정보와 출발지, 도착지, 날짜에 관련한 기록 조회 기능을 제공하고 있습니다.','해외 운송 정보 관련',6),(13,'해당 상품에 대한 상태나 라인을 조회하는 기능을 제공하고 있습니다.','MES - 상품 현황',21),(14,'작업자에 대한 생성, 조회와 작업일자 생성, 조회 기능을 제공하고 있습니다.','MES - 작업',21);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 11:46:39
