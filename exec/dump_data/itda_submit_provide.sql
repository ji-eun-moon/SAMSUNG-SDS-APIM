-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9c201.p.ssafy.io    Database: itda_submit
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
-- Table structure for table `provide`
--

DROP TABLE IF EXISTS `provide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provide` (
  `provide_id` bigint NOT NULL AUTO_INCREMENT,
  `apply_type` enum('변경','신규') DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `deny_reason` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `employee_id` varchar(255) DEFAULT NULL,
  `endpoint` varchar(255) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `provider_name` varchar(255) DEFAULT NULL,
  `server_name` varchar(255) DEFAULT NULL,
  `state` enum('거절','대기','승인') DEFAULT NULL,
  `team_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`provide_id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provide`
--

LOCK TABLES `provide` WRITE;
/*!40000 ALTER TABLE `provide` DISABLE KEYS */;
INSERT INTO `provide` VALUES (1,'신규','2023-11-08 23:30:18.884918','테스트가 실패 했습니다.','삼성 SDS 사원 관련 api 들이 있습니다.','0910281','http://k9c201.p.ssafy.io:8100','2023-11-08 23:34:36.128155','문지은','삼성 SDS 사원 서버','거절','개발 2팀'),(2,'신규','2023-11-08 23:32:06.664770',NULL,'삼성 SDS 사원 관련 API','0910281','http://k9c201a.p.ssafy.io:8100','2023-11-09 11:51:41.552381','문지은','삼성 SDS 사원 서버','승인','개발 2팀'),(21,'신규','2023-11-09 21:46:53.452564','테스트가 실패 했습니다.','삼성 sds 사원 관리','0910281','http://k9c201a.p.ssafy.io/api','2023-11-09 21:49:12.070766','문지은','삼성 sds 사원 관리','거절','개발 2팀'),(22,'신규','2023-11-09 21:50:16.255798',NULL,'삼성 sds 사원 관리','0910281','http://k9c201a.p.ssafy.io:8100','2023-11-09 21:50:51.343219','문지은','삼성 sds 사원 관리','승인','개발 2팀'),(48,'신규','2023-11-12 01:05:13.486434',NULL,'국내, 해외의 운송 정보 관련 서버 입니다.','0910281','http://k9c201a.p.ssafy.io:8103','2023-11-12 01:06:14.842863','문지은','운송 정보 관련 서버','승인','개발 2팀'),(63,'신규','2023-11-15 23:14:43.083222','테스트가 실패 했습니다.','MES 관련 서버입니다.','0910280','http://k9c201a.p.ssafy.io:8101','2023-11-15 23:15:19.116254','송아람','MES','거절','개발 1팀'),(64,'신규','2023-11-15 23:27:28.096557','테스트가 실패 했습니다.','MES 관련 서버입니다.','0910280','http://k9c201a.p.ssafy.io:8101','2023-11-16 08:52:55.470313','송아람','MES','거절','개발 1팀'),(65,'신규','2023-11-16 20:52:32.813702',NULL,'SCM 서버 신청','0912281','http://test.com',NULL,'문지은','SCM 서버 신청합니다.','대기','project5'),(68,'신규','2023-11-17 09:33:40.500706',NULL,'MES 관련 서버입니다','0910280','http://k9c201a.p.ssafy.io:8101','2023-11-17 09:34:23.181076','송아람','MES','승인','개발 1팀');
/*!40000 ALTER TABLE `provide` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 11:46:43
