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
-- Table structure for table `use_check`
--

DROP TABLE IF EXISTS `use_check`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `use_check` (
  `use_check_id` bigint NOT NULL AUTO_INCREMENT,
  `secret_key` varchar(255) DEFAULT NULL,
  `team_name` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`use_check_id`),
  KEY `FKawr8i41nyn5sf0jv7eiii1obr` (`category_id`),
  CONSTRAINT `FKawr8i41nyn5sf0jv7eiii1obr` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `use_check`
--

LOCK TABLES `use_check` WRITE;
/*!40000 ALTER TABLE `use_check` DISABLE KEYS */;
INSERT INTO `use_check` VALUES (1,'77kRuJetCToCpsvvdDJtRVMaW3cKqAfuViZlKgjpZug=','개발 5팀',2),(3,'77kRuJetCToCpsvvdDJtRdIevgqptoQ+dPEwBui4w70=','개발 6팀',2),(4,'77kRuJetCToCpsvvdDJtRUEk17YwfYJ1rS3Kkr/ued8=','개발 3팀',2),(5,'Es1JarGzuDDx0pyWimnxKcCzvKQMElR9+PKSyqrIHYs=','개발 3팀',1),(6,'W51sk/bxuzMf4/TodMrwjEEGWENohXoaWcbR1k3sgnI=','개발 3팀',3),(7,'1Cz/PsfosZXMuLGUm9x7XxSErfhKNarLo2yvvEGmD10=','개발 3팀',4),(11,'Es1JarGzuDDx0pyWimnxKUySh0CXbWOZojjulI8XX8U=','개발 5팀',1),(12,'Es1JarGzuDDx0pyWimnxKRCQYzHyQgpNfv96lcvlsCE=','개발 1팀',1),(13,'77kRuJetCToCpsvvdDJtRehl+2I5DjNR3YoFuioqS9o=','개발 1팀',2),(14,'W51sk/bxuzMf4/TodMrwjC4Uuzphq8F9JZZSUZhNfyI=','개발 1팀',3),(15,'1Cz/PsfosZXMuLGUm9x7X44WKEbhXi1irCLg8vw8j3k=','개발 1팀',4),(17,'9VEwAEnIMJyPzEPIPNarfzY/wHypyTlK4stAVv4MQBs=','개발 3팀',13),(18,'2zYBm+qjbZHUACvq69RY0fsZzzTuqSvZlHC/sPKteR0=','개발 3팀',14);
/*!40000 ALTER TABLE `use_check` ENABLE KEYS */;
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
