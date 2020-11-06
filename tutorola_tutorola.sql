-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2020 at 05:39 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tutorola_tutorola`
--
CREATE DATABASE IF NOT EXISTS `tutorola_tutorola` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `tutorola_tutorola`;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE IF NOT EXISTS `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `message`) VALUES
(1, 'Akshay', '1880akshay@gmail.com', 'Test msg'),
(2, 'Akshay', '1880akshay@gmail.com', 'test 123'),
(3, 'Akshay', '1880akshay@gmail.com', 'test message'),
(4, 'Akshay', '1880akshay@gmail.com', 'test'),
(5, 'Akshay', '1880akshay@gmail.com', 'test2');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subjectId` int(11) NOT NULL,
  `topicId` int(11) NOT NULL,
  `teacherId` int(11) NOT NULL,
  `teacherName` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `rating` varchar(255) NOT NULL,
  `keywords` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `subjectId`, `topicId`, `teacherId`, `teacherName`, `price`, `rating`, `keywords`) VALUES
(1, 1, 1, 1, 'Akshay', '300', '4', '[\"Physics and Measurement\",\"Physics\",\"Akshay\"]'),
(2, 1, 4, 1, 'Akshay', '500', '3.5', '[\"Work, Energy and Power\",\"Physics\",\"Akshay\"]'),
(3, 2, 7, 1, 'Akshay', '700', '4.5', '[\"States of Matter\",\"Chemistry\",\"Akshay\"]'),
(4, 3, 10, 1, 'Akshay', '800', '', '[\"Functions\",\"Mathematics\",\"Akshay\"]'),
(5, 4, 2, 1, 'Akshay', '400', '3', '[\"Biological Classification\",\"Biology\",\"Akshay\"]'),
(6, 4, 12, 1, 'Akshay', '700', '2.5', '[\"Locomotion and Movement\",\"Biology\",\"Akshay\"]');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE IF NOT EXISTS `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `tokenStatus` varchar(255) NOT NULL,
  `profileImage` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `password`, `token`, `tokenStatus`, `profileImage`) VALUES
(3, 'Akshay Jain', '1880akshay@gmail.com', 'akshay123', '1880akshay@gmail.com@@22$9$2020..$6$15$9', 'true', 'image_user3.jpg'),
(15, 'Akshay Jain', '1880hacker@gmail.com', 'akshay123', '1880hacker@gmail.com@@6$10$2020..$15$53$0', 'false', 'avatar.png');

-- --------------------------------------------------------

--
-- Table structure for table `student_info`
--

CREATE TABLE IF NOT EXISTS `student_info` (
  `id` int(11) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `subjects` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_info`
--

INSERT INTO `student_info` (`id`, `phoneNumber`, `city`, `class`, `subjects`) VALUES
(3, '8700996422', '', '12', '[3]');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE IF NOT EXISTS `subject` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `name`, `logo`) VALUES
(1, 'Physics', 'subjects/physics.png'),
(2, 'Chemistry', 'subjects/chemistry.png'),
(3, 'Mathematics', 'subjects/mathematics.png'),
(4, 'Biology', 'subjects/biology.png');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE IF NOT EXISTS `teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `tokenStatus` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `email`, `password`, `token`, `tokenStatus`) VALUES
(1, 'Akshay', '1880akshay@gmail.com', 'akshay123', 'teacher1880akshay@gmail.com22$9$2020$12$14$52', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE IF NOT EXISTS `topic` (
  `subjectId` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`subjectId`, `id`, `name`) VALUES
(1, 1, 'Physics and Measurement'),
(1, 2, 'Kinematics'),
(1, 3, 'Laws of Motion'),
(1, 4, 'Work, Energy and Power'),
(1, 5, 'System of Particles and Rotational Motion'),
(1, 6, 'Gravitation'),
(1, 7, 'Mechanical Properties of Solids and Fluids'),
(1, 8, 'Thermal Properties of Matter'),
(1, 9, 'Thermodynamics and Kinetic Theory of Gases'),
(1, 10, 'Oscillations'),
(1, 11, 'Waves'),
(1, 12, 'Electrostatics-1 (Electric Charge, Field and Potential)'),
(1, 13, 'Moving Charges and Magnetism'),
(1, 14, 'Magnetism and Matter'),
(1, 15, 'Electromagnetic Induction'),
(1, 16, 'Alternating Current'),
(1, 17, 'Electromagnetic Waves'),
(1, 18, 'Ray Optics'),
(1, 19, 'Wave Optics'),
(1, 20, 'Dual Nature of Radiation and Matter'),
(1, 21, 'Atoms and Nuclei'),
(1, 22, 'Semiconductor Electronics: Material Devices & Simple Circuits'),
(1, 23, 'Communication System'),
(1, 24, 'Electrostatics-2 (Capacitance)'),
(2, 1, 'Basic Concepts in Chemistry'),
(2, 2, 'Chemical Bonding'),
(2, 3, 'Solutions'),
(2, 4, 'Redox Reactions'),
(2, 5, 'Equilibrium'),
(2, 6, 'Surface Chemistry'),
(2, 7, 'States of Matter'),
(2, 8, 'Atomic Structure'),
(2, 9, 'Chemical Thermodynamics'),
(2, 10, 'Electrochemistry'),
(2, 11, 'Chemical Kinetics'),
(2, 12, 'Polymers'),
(2, 13, 'Organic Compounds – Characterisation and Purification'),
(2, 14, 'Hydrocarbons'),
(2, 15, 'Basics of Organic Chemistry'),
(2, 16, 'Principles of Practical Chemistry'),
(2, 17, 'Oxygen, Halogens, and Nitrogen Organic Compounds'),
(2, 18, 'Biomolecules'),
(2, 19, 'Chemistry in Everyday Life'),
(2, 20, 'Hydrogen'),
(2, 21, 'Periodic Table'),
(2, 22, 'S-block Elements'),
(2, 23, 'P-block Elements'),
(2, 24, 'D and F-block Elements'),
(2, 25, 'Environmental Chemistry'),
(2, 26, 'Salt Analysis'),
(2, 27, 'Coordination Compounds'),
(2, 28, 'Metallurgy'),
(3, 1, 'Trigonometric Functions & Equations'),
(3, 2, 'Complex Numbers'),
(3, 3, 'Quadratic Equations and Inequations'),
(3, 4, 'Permutations and Combinations'),
(3, 5, 'Mathematical Induction and Binomial Theorem'),
(3, 6, 'Sequence and Series'),
(3, 7, 'Straight Lines and Pair of Straight Lines'),
(3, 8, 'Circle'),
(3, 9, 'Conic Sections'),
(3, 10, 'Functions'),
(3, 11, 'Limits, Continuity and Differentiability'),
(3, 12, 'Differentiation'),
(3, 13, 'Properties of Triangle'),
(3, 14, 'Inverse Trigonometric Functions'),
(3, 15, 'Matrices and Determinants'),
(3, 16, 'Applications of Derivatives'),
(3, 17, 'Indefinite Integrals'),
(3, 18, 'Definite Integrals and Applications of Integral'),
(3, 19, 'Differential Equations'),
(3, 20, 'Vector Algebra and 3D Geometry'),
(3, 21, 'Probability'),
(3, 22, 'Miscellaneous (Sets, Relations, Statistics & Mathematical Reasoning'),
(4, 1, 'The Living World'),
(4, 2, 'Biological Classification'),
(4, 3, 'Plant Kingdom'),
(4, 4, 'Animal Kingdom'),
(4, 5, 'Morphology of Flowering Plants'),
(4, 6, 'Anatomy of Flowering Plants'),
(4, 7, 'Structural Organisation in Animals'),
(4, 8, 'Cell – The Unit of Life'),
(4, 9, 'Biomolecules'),
(4, 10, 'Cell Cycle and Cell Division'),
(4, 11, 'Excretory Products and Their Elimination'),
(4, 12, 'Locomotion and Movement'),
(4, 13, 'Neural Control and Coordination'),
(4, 14, 'Chemical Coordination and Integration'),
(4, 15, 'Reproduction in Organisms'),
(4, 16, 'Sexual Reproduction in Flowering Plants'),
(4, 17, 'Human Reproduction '),
(4, 18, 'Reproductive Health'),
(4, 19, 'Principles of Inheritance and Variations'),
(4, 20, 'Molecular Basis of Inheritance'),
(4, 21, 'Transport in Plants'),
(4, 22, 'Mineral Nutrition'),
(4, 23, 'Photosynthesis in Higher Plants'),
(4, 24, 'Respiration in Plants'),
(4, 25, 'Plant Growth and Development'),
(4, 26, 'Digestion and Absorption'),
(4, 27, 'Breathing and Exchange of Gases'),
(4, 28, 'Body Fluids and Circulation '),
(4, 29, 'Biodiversity and Conservation'),
(4, 30, 'Evolution'),
(4, 31, 'Human Health and Diseases'),
(4, 32, 'Strategies for Enhancement in Food Production '),
(4, 33, 'Microbes in Human Welfare '),
(4, 34, 'Biotechnology : Principles and Processes'),
(4, 35, 'Biotechnology and Its Applications'),
(4, 36, 'Organisms and Populations'),
(4, 37, 'Ecosystem'),
(4, 38, 'Environmental Issues');

-- --------------------------------------------------------

--
-- Table structure for table `topic_request`
--

CREATE TABLE IF NOT EXISTS `topic_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `topic` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tutor_request`
--

CREATE TABLE IF NOT EXISTS `tutor_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tutor_request`
--

INSERT INTO `tutor_request` (`id`, `name`, `email`, `phoneNumber`, `class`) VALUES
(1, 'Avinash Kumar', 'akavi98012@gmail.cim', '8789426446', '12'),
(2, 'Shital Dey ', 'shitaldey1@gmail.com', '9668809707', '12'),
(3, 'Ankan Das', 'ankan8377@gmail.com', '9883348965', 'drop'),
(4, 'Tushar Gupta', 'tushargupta2363@gmail.com', '7897989115', '11'),
(5, 'Harsh Saxena', 'mapsharsh2491@gmail.com', '8130180600', '12');

-- --------------------------------------------------------

--
-- Table structure for table `webinar`
--

CREATE TABLE IF NOT EXISTS `webinar` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `jee` varchar(255) NOT NULL,
  `neet` varchar(255) NOT NULL,
  `school` varchar(255) NOT NULL,
  `referralCode` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `webinar`
--

INSERT INTO `webinar` (`id`, `name`, `email`, `phoneNumber`, `jee`, `neet`, `school`, `referralCode`) VALUES
(1, 'Prince kumar raj', 'princey0079@gmail.com', '9973914883', 'true', 'false', '', ''),
(2, 'Gherade Pratibha', 'gheradepratibha@gmail.com', '8956260292', 'true', 'false', '', ''),
(3, 'Avinash Kumar', 'akavi98012@gmail.com', '8789426446', 'true', 'false', '', ''),
(4, 'Trithi', 'amintrithi@gmail.com', '9137701365', 'true', 'false', '', ''),
(5, 'Rounak Biswas', 'rounakbiswas76@gmail.com', '7363943289', 'false', 'true', '', ''),
(6, 'Anukul Kumar ojha ', 'anukulkumarojhaanukulkumarojha@gmail.com', '8409460722', 'false', 'true', '', ''),
(7, 'Shital ', 'Shitaldey1@gmail.com', '9668809707', 'true', 'false', '', ''),
(8, 'Amina', 'aimenjutt82@gmail.com', '3104555994', 'true', 'false', '', ''),
(9, 'VISHAL SHIRSAT', 'vishal.shirsat@emerson.com', '9822029633', 'true', 'false', 'PACE', ''),
(10, 'chandan', 'hackershacker@gmail.com', '8496048927', 'true', 'false', 'sarvodaya', ''),
(11, 'Archit Agarwal', 'architagarwal147@gmail.com', '6398929834', 'true', 'false', 'Saraf public school', ''),
(12, 'Ankan Das', 'ankan8377@gmail.com', '9883348965', 'false', 'true', 'Shyampur High school', ''),
(13, 'VISHAL SHIRSAT', 'vishaljshirsat@gmail.com', '9822029633', 'true', 'false', 'Loyola ', ''),
(15, 'Md ehtasham', 'mdehtasham610@gmail.com', '8521012852', 'false', 'true', 'K l h s dagarua', ''),
(16, 'Apurva Anand', 'apurva00002@gmail.com', '7667004124', 'false', 'true', 'Shivam Convent', ''),
(17, 'Sujal', 'kumarsujal374@gmail.com', '9065597071', 'true', 'false', 'SA INTERNATIONAL PUBLIC SCHOOL', ''),
(18, 'Suzal kumar', 'suzal2006@gmail.com', '6203001561', 'true', 'false', 'Kendriya vidyalaya', ''),
(19, 'divye jain', 'jaindivye12@gmail.com', '9818702995', 'false', 'true', 'mount abu public school', ''),
(20, 'Lagan singh tomar', 'lagansinghtomar29@gmail.com', '7011883458', 'false', 'true', 'Bal bharati public school', ''),
(22, 'Rehan', 'rehanshiekh1532003@gmail.com', '9599651101', 'true', 'true', 'R.P.V.V', ''),
(23, 'Atharva', 'atharvapagale9@gmail.com', '9011500304', 'true', 'false', 'V.p', ''),
(24, 'ujjawal gupta', 'chhaya197923@gmail.com', '9268381144', 'false', 'true', 'mount abu public school', ''),
(25, 'Amit Kumar', 'kamitssm@gmail.com', '1236458798', 'true', 'false', 'Iit kgp', 'amit'),
(26, 'Aditya', 'adityarohtagi1302@gmail.com', '9268342224', 'false', 'true', 'Mount Abu Public School', ''),
(27, 'Aditya', 'adityarohtagi1302@gmail.com', '9268342224', 'false', 'true', 'Mount Abu Public School', ''),
(28, 'Harsh SAXENA', 'mapsharsh2491@gmail.com', '8130180600', 'true', 'false', 'Mount Abu school', ''),
(30, 'Amit Kumar', 'kamitssm@gmail.com', '6204264344', 'true', 'false', 'ABCD', ''),
(31, 'Amit Kumar', 'kamitssm@gmail.com', '6204264344', 'true', 'false', 'ABCD', ''),
(32, 'Akshay', '1880akshay@gmail.com', '8700996422', 'true', 'false', 'Maps', ''),
(33, 'Amit Kumar', 'kamitssm@gmail.com', '6204264344', 'true', 'false', 'ABCD', ''),
(34, 'Amit', 'adsfdgfyh@gmail.com', '6789976545', 'true', 'false', 'bgtred', ''),
(35, 'fdffgsdwrty', 'trttyty@g', '5457996513', 'true', 'true', 'fdfhdfeqwwq', 'f');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
