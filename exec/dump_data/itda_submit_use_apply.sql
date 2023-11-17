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
-- Table structure for table `use_apply`
--

DROP TABLE IF EXISTS `use_apply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `use_apply` (
  `use_apply_id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `deny_reason` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `state` enum('거절','대기','승인') DEFAULT NULL,
  `team_name` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`use_apply_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `use_apply`
--

LOCK TABLES `use_apply` WRITE;
/*!40000 ALTER TABLE `use_apply` DISABLE KEYS */;
INSERT INTO `use_apply` VALUES (17,1,'사원 출결 정보 관련','2023-11-15 22:47:44.321056',NULL,'','2023-11-15 23:01:00.130523','승인','개발 2팀','문지은'),(18,2,'사원 정보 조회','2023-11-15 22:47:49.572434',NULL,'','2023-11-15 23:01:00.130523','승인','개발 2팀','문지은'),(19,3,'국내 운송 정보 관련','2023-11-15 22:47:57.607985',NULL,'','2023-11-15 23:01:00.130523','승인','개발 2팀','문지은'),(20,4,'해외 운송 정보 관련','2023-11-15 22:48:02.697819',NULL,'','2023-11-15 23:01:00.130523','승인','개발 2팀','문지은'),(22,1,'사원 출결 정보 관련','2023-11-15 22:06:06.489475',NULL,'','2023-11-17 02:21:17.928112','승인','개발 1팀','송아람'),(23,2,'사원 정보 조회','2023-11-15 22:06:15.166510',NULL,'신청합니다.','2023-11-17 02:21:20.902018','승인','개발 1팀','송아람'),(24,3,'국내 운송 정보 관련','2023-11-15 22:06:21.195360',NULL,'신청합니다.','2023-11-17 02:21:23.394319','승인','개발 1팀','송아람'),(25,4,'해외 운송 정보 관련','2023-11-15 22:06:25.989578',NULL,'신청합니다.','2023-11-17 02:21:26.635630','승인','개발 1팀','송아람'),(28,1,'사원 출결 정보 관련','2023-11-16 11:56:56.090121',NULL,'신청할래요',NULL,'대기','project4','박서희'),(30,1,'사원 출결 정보 관련','2023-11-16 22:55:25.281416',NULL,'신청합니다','2023-11-17 01:06:36.842602','승인','개발 5팀','박서희'),(31,2,'사원 정보 조회','2023-11-17 01:01:42.340291',NULL,'사원 정보 조회 사용 신청 합니다.',NULL,'대기','개발 3팀','일반'),(32,3,'국내 운송 정보 관련','2023-11-17 02:23:55.759373',NULL,'국내 운송 정보 관련 사용 신청 합니다.',NULL,'대기','개발 3팀','일반'),(33,4,'해외 운송 정보 관련','2023-11-17 02:28:55.068977',NULL,'해외 운송 정보 관련 사용 신청 합니다.',NULL,'대기','개발 3팀','일반'),(34,1,'사원 출결 정보 관련','2023-11-17 02:42:58.835845',NULL,'사원 출결 정보 관련 사용 신청합니다.',NULL,'대기','개발 3팀','일반'),(35,2,'사원 정보 조회','2023-11-17 03:12:07.345467','거절합니다','사원 정보 조회 사용 신청합니다.','2023-11-17 11:39:15.270587','거절','개발 5팀','문지은'),(39,14,'MES - 작업','2023-11-17 09:35:25.836224',NULL,'','2023-11-17 09:38:18.820576','승인','개발 3팀','일반'),(40,13,'MES - 상품 현황','2023-11-17 09:35:31.608759',NULL,'','2023-11-17 09:38:17.160780','승인','개발 3팀','일반');
/*!40000 ALTER TABLE `use_apply` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 11:46:42
