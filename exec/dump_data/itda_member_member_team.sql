-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9c201.p.ssafy.io    Database: itda_member
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
-- Table structure for table `member_team`
--

DROP TABLE IF EXISTS `member_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_team` (
  `member_team_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  `team_id` bigint DEFAULT NULL,
  PRIMARY KEY (`member_team_id`),
  KEY `FKgqbjnbjtn5tycg5ih6r80wmr1` (`member_id`),
  KEY `FKfly863tmgmm8wnj0u1sqgqu5u` (`team_id`),
  CONSTRAINT `FKfly863tmgmm8wnj0u1sqgqu5u` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`),
  CONSTRAINT `FKgqbjnbjtn5tycg5ih6r80wmr1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_team`
--

LOCK TABLES `member_team` WRITE;
/*!40000 ALTER TABLE `member_team` DISABLE KEYS */;
INSERT INTO `member_team` VALUES (1,1,1),(2,2,2),(3,2,3),(4,3,4),(5,3,3),(6,4,4),(7,4,5),(8,5,5),(9,5,6),(10,6,6),(11,6,2),(12,7,2),(13,7,3),(14,8,4),(15,8,3),(16,9,4),(17,9,5),(18,10,5),(19,10,6),(20,11,6),(21,11,2),(23,20,8),(24,21,9),(25,21,10),(28,23,11),(29,23,12),(30,25,2),(31,25,6),(32,32,2),(33,36,13),(34,36,14),(35,37,15),(36,38,16);
/*!40000 ALTER TABLE `member_team` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 11:46:41
