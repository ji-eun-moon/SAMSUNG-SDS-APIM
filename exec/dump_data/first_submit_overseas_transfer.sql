-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9c201a.p.ssafy.io    Database: first_submit
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
-- Table structure for table `overseas_transfer`
--

DROP TABLE IF EXISTS `overseas_transfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `overseas_transfer` (
  `transfer_id` bigint NOT NULL AUTO_INCREMENT,
  `arrival_date` date DEFAULT NULL,
  `departure_date` date DEFAULT NULL,
  `departure_location` varchar(255) DEFAULT NULL,
  `destination_location` varchar(255) DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `quantity` bigint DEFAULT NULL,
  `transport_cost` bigint DEFAULT NULL,
  `transportation` varchar(255) DEFAULT NULL,
  `unit_price` bigint DEFAULT NULL,
  `way_bill_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`transfer_id`),
  UNIQUE KEY `UK_7n41heesyfhfyq007fo48s3hr` (`way_bill_number`)
) ENGINE=InnoDB AUTO_INCREMENT=888 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `overseas_transfer`
--

LOCK TABLES `overseas_transfer` WRITE;
/*!40000 ALTER TABLE `overseas_transfer` DISABLE KEYS */;
INSERT INTO `overseas_transfer` VALUES (1,'2023-03-18','2023-03-17','Seoul','New York','가공 식품',91,2494037,'비행기',27407,'PER0001'),(2,'2023-03-19','2023-03-18','Tokyo','London','전자제품',120,3123600,'선박',32050,'PER0002'),(3,'2023-04-02','2023-04-01','Beijing','Paris','의류',75,1352250,'트럭',18030,'PER0003'),(4,'2023-04-03','2023-04-02','Berlin','Sydney','가구',110,4507800,'기차',40980,'PER0004'),(5,'2023-04-21','2023-04-20','Shanghai','Los Angeles','전자제품',95,2792500,'비행기',29500,'PER0005'),(6,'2023-04-22','2023-04-21','Seoul','Toronto','의류',80,1603200,'선박',20040,'PER0006'),(7,'2023-11-09','2023-11-08','Moscow','Bangkok','가공 식품',85,1962650,'트럭',23090,'PER0007'),(8,'2023-11-10','2023-11-09','Istanbul','Cairo','전자제품',100,3568000,'트럭',35680,'PER0008'),(9,'2023-11-11','2023-11-10','London','New Delhi','의류',105,3018750,'비행기',28750,'PER0009'),(10,'2023-11-12','2023-11-11','Paris','Tokyo','가구',88,2148960,'선박',24420,'PER0010'),(11,'2023-12-02','2023-12-01','New York','Seoul','전자제품',92,2852000,'비행기',31000,'PER0011'),(12,'2023-12-03','2023-12-02','London','Tokyo','의류',78,1546740,'선박',19830,'PER0012'),(13,'2023-12-16','2023-12-15','Bangkok','Paris','가공 식품',103,2797230,'트럭',27210,'PER0013'),(14,'2023-12-17','2023-12-16','Sydney','Berlin','전자제품',115,4370000,'기차',38000,'PER0014'),(15,'2023-12-26','2023-12-25','Cairo','Istanbul','가구',98,2309680,'트럭',23560,'PER0015'),(16,'2023-12-27','2023-12-26','New Delhi','London','의류',86,1843480,'비행기',21380,'PER0016'),(17,'2024-01-11','2024-01-10','Toronto','Seoul','전자제품',94,2434600,'선박',25900,'PER0017'),(18,'2024-01-12','2024-01-11','Paris','New York','가공 식품',105,3018750,'비행기',28750,'PER0018'),(19,'2024-01-26','2024-01-25','Tokyo','London','의류',80,1603200,'선박',20040,'PER0019'),(20,'2024-01-27','2024-01-26','Beijing','Moscow','가구',120,3123600,'트럭',32050,'PER0020'),(21,'2024-02-11','2024-02-10','Los Angeles','Sydney','전자제품',85,1962650,'비행기',23090,'PER0021'),(22,'2024-02-12','2024-02-11','Toronto','Istanbul','의류',110,4507800,'트럭',40980,'PER0022'),(23,'2024-02-26','2024-02-25','Cairo','Berlin','가공 식품',95,2792500,'기차',29500,'PER0023'),(24,'2024-02-27','2024-02-26','New Delhi','Bangkok','전자제품',75,1352250,'선박',18030,'PER0024'),(25,'2024-03-11','2024-03-10','Seoul','Paris','의류',110,4507800,'트럭',40980,'PER0025'),(26,'2024-03-12','2024-03-11','Moscow','Tokyo','가구',88,2148960,'비행기',24420,'PER0026'),(27,'2024-03-26','2024-03-25','Berlin','New York','전자제품',105,3018750,'비행기',28750,'PER0027'),(28,'2024-03-27','2024-03-26','Sydney','London','가공 식품',92,2852000,'선박',31000,'PER0028'),(29,'2024-04-11','2024-04-10','Istanbul','Beijing','의류',75,1352250,'트럭',18030,'PER0029'),(30,'2024-04-12','2024-04-11','Paris','Cairo','전자제품',115,4370000,'기차',38000,'PER0030'),(31,'2024-04-26','2024-04-25','Bangkok','New Delhi','가구',80,1603200,'선박',20040,'PER0031'),(32,'2024-04-27','2024-04-26','Seoul','Toronto','의류',103,2797230,'비행기',27210,'PER0032'),(33,'2024-05-11','2024-05-10','New York','Paris','전자제품',98,2309680,'트럭',23560,'PER0033'),(34,'2024-05-12','2024-05-11','London','Tokyo','가공 식품',105,3018750,'비행기',28750,'PER0034'),(35,'2024-05-26','2024-05-25','Moscow','Berlin','의류',80,1603200,'기차',20040,'PER0035'),(36,'2024-05-27','2024-05-26','Tokyo','Sydney','전자제품',120,3123600,'선박',32050,'PER0036'),(37,'2024-06-11','2024-06-10','Istanbul','Cairo','가구',85,1962650,'트럭',23090,'PER0037'),(38,'2024-06-12','2024-06-11','Paris','New Delhi','의류',110,4507800,'비행기',40980,'PER0038'),(39,'2024-06-26','2024-06-25','Toronto','Seoul','가공 식품',94,2434600,'비행기',25900,'PER0039'),(40,'2024-06-27','2024-06-26','New York','Tokyo','전자제품',103,2797230,'선박',27210,'PER0040'),(41,'2024-07-11','2024-07-10','Berlin','Moscow','의류',105,3018750,'기차',28750,'PER0041'),(42,'2024-07-12','2024-07-11','Sydney','London','가구',78,1546740,'비행기',19830,'PER0042'),(43,'2024-07-26','2024-07-25','Cairo','Istanbul','전자제품',92,2852000,'트럭',31000,'PER0043'),(44,'2024-07-27','2024-07-26','New Delhi','Bangkok','가공 식품',98,2309680,'트럭',23560,'PER0044'),(45,'2024-08-11','2024-08-10','Seoul','Paris','의류',115,4370000,'비행기',38000,'PER0045'),(46,'2024-08-12','2024-08-11','Moscow','Tokyo','전자제품',86,1843480,'선박',21380,'PER0046'),(47,'2024-08-26','2024-08-25','Berlin','New York','가공 식품',120,3123600,'기차',32050,'PER0047'),(48,'2024-08-27','2024-08-26','Sydney','London','전자제품',94,2434600,'비행기',25900,'PER0048'),(49,'2024-09-11','2024-09-10','Istanbul','Beijing','의류',103,2797230,'트럭',27210,'PER0049'),(50,'2024-09-12','2024-09-11','Paris','Cairo','가구',85,1962650,'기차',23090,'PER0050'),(51,'2024-09-26','2024-09-25','Bangkok','New Delhi','전자제품',92,2852000,'비행기',31000,'PER0051'),(52,'2024-09-27','2024-09-26','Seoul','Toronto','의류',78,1546740,'트럭',19830,'PER0052');
/*!40000 ALTER TABLE `overseas_transfer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 11:47:28
