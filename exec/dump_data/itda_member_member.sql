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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `authority` enum('관리자','일반') DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `department` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `employee_id` varchar(10) NOT NULL,
  `image_url` varchar(1000) DEFAULT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(72) NOT NULL,
  `position` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_4rebv7u7h123c0kvaq3jv89ym` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'관리자','2023-11-02 08:57:01.000000','시스템 관리','cksdnd10001@naver.com','admin','/images/adminImg.png','ITDA 관리자','$2a$12$hj5sn3r9rEDmYLyD.Xnv3.ziLBpZ1lBj6NGABR9SBB/q3TBWyNq/m','관리자'),(2,'관리자','2023-11-02 09:19:58.731780','C201','son9aram@gmail.com','0916995','/images/profileImg.png','송아람','$2a$10$AEu3.gqcu5oFIS7sqTvJMOjPqRgepXb1vX8phI6j2swCQ1rkP5j6i','프론트엔드'),(3,'관리자','2023-11-02 09:19:58.962126','C201','cksdnd10001@naver.com','0912472','/images/profileImg3.png','이찬웅','$2a$10$XpuzTbJ4ykW5UTukMEP4guFNWG53DkVmR3sl8AwXdAkF2hdxgBZpu','백엔드'),(4,'관리자','2023-11-02 09:19:59.119789','C201','victoryddh5@naver.com','0912388','/images/profileImg.png','이도하','$2a$12$1Jys/2NlitcaOYBGgKas6eLZf2jHNAqE1DS8m3eGSrnFAAI5Tavm6','백엔드'),(5,'관리자','2023-11-02 09:19:59.277274','C201','son9aram@gmail.com','0910286','/images/profileImg.png','박서희','$2a$10$l6gn3u8p2MtwOeWAub1C2eEy1HBwif608EfPwJ.VwCyXrMkotBBiO','프론트엔드'),(6,'관리자','2023-11-02 09:19:59.431249','C201','son9aram@gmail.com','0912280','/images/itdaimage.png','문지은','$2a$10$GqfTmLXhlZqVymJM04ohMeoWutRTeZ4.wgOpO4sYdSlwyh7C33h5C','프론트엔드'),(7,'일반','2023-11-02 21:19:40.332264','C201','son9aram@gmail.com','0916996','/images/profileImg.png','송아람','$2a$10$yv0tig91yAVTkJQIfu/29O.brI3NJBM1Dr2cgTkd3QqWGYq1Pr/j.','프론트엔드'),(8,'일반','2023-11-02 21:19:40.542652','C201','cksdnd10001@naver.com','0912473','/images/profileImg.png','이찬웅','$2a$10$jccT4Qh4ivaP.OopycxWuOlpNCWRKngyEkNXguXi0qSHiB0h2mBHi','백엔드'),(9,'일반','2023-11-02 21:19:40.690890','C201','son9aram@gmail.com','0912389','/images/profileImg.png','이도하','$2a$10$tElFPlteqQZto0GB2UfZyOffbvd/Gm5t4YABzJBdpCqFTPO1XEJFu','백엔드'),(10,'일반','2023-11-02 21:19:40.836828','C201','son9aram@gmail.com','0910287','/images/profileImg.png','박서희','$2a$10$WkpHWVSo7Qz40of0nDMW2.wxwcr0fU8nYgNFtyKpLqThruQaFWf5.','프론트엔드'),(11,'일반','2023-11-02 21:19:40.984318','C201','son9aram@gmail.com','0912281','/images/profileImg.png','문지은','$2a$10$oWXPMWYbvob2Oo8Bp1krKe5pfDk9Fe2Hf/UYcZm6U.vEi/Fh8dcGu','프론트엔드'),(20,'일반','2023-11-03 15:53:58.070154','C201','victoryddh5@naver.com','2','/images/profileImg.png','테스트','$2a$10$xWaRa6wQl648pQgaEizRY.u75LIa2uJffgNYkulB0LsBk78yL5aBK','프론트엔드'),(21,'관리자','2023-11-10 11:40:57.836037','IT 개발','ssafy.itda@gmail.com','TEST1','/images/adminImg.png','관리자','$2a$10$5OkflMcXNxdD5HRJQSpynusenoKAxt3SI08eoKUK5R2BS45H.tTSy','관리자'),(23,'일반','2023-11-10 11:44:20.225450','IT 개발','mjieun0956@gmail.com','TEST2','/images/profileImg.png','일반','$2a$10$5qmq.LQKOZe8WMDgMCK7NOgpnRRLHaa.IWQjz67KTUR5prwwyP5VG','프론트엔드'),(25,'일반','2023-11-14 13:26:48.204581','IT 개발','cjjss11@naver.com','0916294','/images/userimg.png','최지수','$2a$10$Qc1hnADwv8ZJYK4BunBa0uzuqKJ.NnB45tiMPjnOxPPLQlzpdIvYy','프론트엔드'),(27,'일반','2023-11-16 00:18:19.731866','IT 개발','ssafy.itda@gmail.com','231030','/url','김사원','$2a$10$EIcfLIThyv5.11QearHleu0Uli0f8Trc5Q8qs27gcb4ok6WoToTLK','프론트엔드'),(28,'일반','2023-11-16 00:19:56.083838','aa','ssafy.itda@gmail.com','222222','/url','이찬웅','$2a$10$PMa92a.fXrJceEMM7Nr0petkezNqzHLDRO17leiLh025f7znb6XyS','aa'),(29,'일반','2023-11-16 00:21:50.155710','aa','ssafy.itda@gmail.com','333333','/url','송아람','$2a$10$lrV.rcZOcJ4RK05FgrYWMOS5eaKxdHJqhq7rKMsYwQKQCiiGK4p9C','aa'),(30,'일반','2023-11-16 16:45:04.121883','테스트계정','cksdnd10001@naver.com','TEST3','/images/profileImg3.png','테스트계정','$2a$10$IuTlw6NAAbJACzlMIvvNve2h9vUVCTw96wuYNFS2C8DkYP/uvFFta','테스트계정'),(32,'일반','2023-11-16 21:40:42.603286','IT 개발','gyg03134@gmail.com','0915534','/images/userimg.png','서지현','$2a$10$wSOdIm8IkOlubAw1bpjFben11n7ZktcdyxJzOLWKzhIR75JVVYE32','백엔드'),(33,'일반','2023-11-16 23:39:41.066273','IT 개발','ssafy.itda@gmail.com','175219','/url','김사원','$2a$10$D8v24jWy7EMYT6/prQ7NXe3IZGMKPrwSAQB27LldtXsbFdVc9F6v.','프론트엔드'),(34,'일반','2023-11-16 23:42:23.591195','IT 개발','ssafy.itda@gmail.com','175220','/url','박사원','$2a$10$sT9hDemTQbRJp7IpPIEriuujwvktkSQAPDdsQr7rJZrOxYZlstOGa','프론트엔드'),(36,'일반','2023-11-17 00:00:34.233068','department1','victoryddh5@naver.com','ㅁㄴㅇㅁㄴㅇ','/imageUrl1','name1','$2a$10$st8gcy3EsiVmL/nrM6VmkOTVQ2QEz2n8sqAMr.sNFTiFwbOcgNEbi','position1'),(37,'일반','2023-11-17 00:12:34.518435','SW 개발','ssafy.itda@gmail.com','0910280','/images/profileImg1.png','송아람','$2a$10$uRT0SXEKSJifDw6BH9/1tuqOsP.OBhI4pR0jbxIt2QZryiE2v2d8G','프론트엔드'),(38,'일반','2023-11-17 00:12:38.419514','SW 개발','mjieun0956@gmail.com','0910281','/images/profileImg.png','문지은','$2a$10$o0gkPGcg0G2zKPponT0bee77r1SUKlN.ne0CAzQvR5H2zrUqNYDka','백엔드');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
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
