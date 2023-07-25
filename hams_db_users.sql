CREATE DATABASE  IF NOT EXISTS `hams_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hams_db`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hams_db
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1921917f-463d-4162-9d91-b1ff08ea670b','Ella Dela Cruz','1689403683858_thumb16.jpg',2,'sample@gmail.com','$2b$10$ly28iagaZHU0PW.kpf.LfOGXNOSEyZjMhZfLCBnW0n7OY5Dm4vHyK',1),('2e079530-1420-48a4-a70f-44b38d295e81','Staff 1 Sample','1689403840784_thumb16.jpg',2,'staff1@gmail.com','$2b$10$EZhftWWrI0tDUPY8JYKQXeVJG/UODEpkcH/EcSybs04FKWDh6D8IK',1),('41ed2ad9-b54a-41fe-a59c-7e8feb887419','Juan Dela Cruz',NULL,2,'juan@gmail.com','$2b$10$xA3wJjBS63Rrw1s8rJureOPy0lZ/cZ55n97KmFXqCHIfEUxwX5C3u',1),('4ac78e7c-cc71-4bda-a1f7-d6aac11a3485','Test Teacher','1689403914105_thumb16.jpg',2,'teacher@hmail.com','$2b$10$7aJULM0f8ecucsNtei42FOsw/cwbdicA/.RRI8j9wcVqSKXt9b9XC',0),('7aa2dde7-66b1-49aa-82c7-82737bbb46a3','Test Teacher','1689404132180_a5a92597c6f7599d8ac4fc7f094e23b2-removebg-preview.png',2,'teacher34@hmail.com','$2b$10$DutL.eClZILSIqzG9csvP.xKF.qClZKwdiOsTVDJsO1TcwzdqfYqG',1),('8094f5da-38a6-41f7-89ac-6d1963db6153','Test Teacher','1689404037666_thumb16.jpg',2,'teacher4@hmail.com','$2b$10$Spv/KakisSmGsDVJtRzbR.b1zNocLtj3szhuTqdGEzObLByG8Zodi',1),('94e42f33-77e0-4aac-ab61-60bbf66392c6','Tearcher 1','1689399440003_profile.jpg',2,'teacher1@gmail.com','$2b$10$UX0ivG8hb5QN9VHzXaDZMeZ8BrDE33Z3xKLEhBxI3fByivgDImpl.',0),('a0f2f8cb-d824-43d2-b4c5-a444dc6c47f0','Hams Admin','1689398817861_thumb16.jpg',0,'hams.admin@gmail.com','$2b$10$7WOWOceIG3x7/Dq4rzvWi.Oi8IfqUcKFXN76UlQ0teM9z2CY8sGvC',0),('c606dc29-bac5-4f43-93c3-f5d7cd867e4c','Tearcher 2','1689399503440_profile.jpg',2,'teacher2@gmail.com','$2b$10$dcC1PycOPLSOKnjhFSCGNOW3//.jzvgR6fYra4Mu1A9pM/zJujVnW',0),('ec274924-a1f7-4c59-ab0a-8dd1e7069945','Ella','1689403595260_thumb16.jpg',2,'ella@gmail.com','$2b$10$sCffWGO2Mq2ND25H.jhgK.f9NOHzjcN0R97fF/labYBzPjTal5jne',1),('f67e646d-f147-4a4a-9755-82374ab49d6f','Sample','1689404265175_a5a92597c6f7599d8ac4fc7f094e23b2-removebg-preview.png',2,'teach@gmail.com','$2b$10$l83a6mHZN/P1JdjPuzUxu.bDH7AhIt5C0k5WpDAoaNSxZd4V20uZi',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-26  2:13:36
