-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3310
-- Generation Time: Oct 29, 2021 at 07:49 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fridge`
--

-- --------------------------------------------------------

--
-- Table structure for table `fridges`
--

CREATE TABLE `fridges` (
  `IDofFridge` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Total` int(11) NOT NULL,
  `Remaining` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fridges`
--

INSERT INTO `fridges` (`IDofFridge`, `Name`, `Total`, `Remaining`) VALUES
(1, 'Suś', 25, 1),
(16, '', 48, 2);

-- --------------------------------------------------------

--
-- Table structure for table `magnets`
--

CREATE TABLE `magnets` (
  `IDofMagnet` int(11) NOT NULL,
  `IDofFridge` int(11) NOT NULL,
  `IDofFridgeMagnet` int(11) NOT NULL,
  `X` int(11) NOT NULL,
  `Y` int(11) NOT NULL,
  `Z` int(11) NOT NULL,
  `Width` int(11) NOT NULL,
  `Height` int(11) NOT NULL,
  `Content` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `magnets`
--

INSERT INTO `magnets` (`IDofMagnet`, `IDofFridge`, `IDofFridgeMagnet`, `X`, `Y`, `Z`, `Width`, `Height`, `Content`) VALUES
(58, 16, 45, 136, 204, 5, 100, 100, 'NEW JOB!!!'),
(60, 16, 47, 355, 162, 3, 100, 100, 'NEW JOB!!!'),
(62, 1, 23, 322, -171, 5, 100, 100, 'NEW JOB!!!');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fridges`
--
ALTER TABLE `fridges`
  ADD PRIMARY KEY (`IDofFridge`);

--
-- Indexes for table `magnets`
--
ALTER TABLE `magnets`
  ADD PRIMARY KEY (`IDofMagnet`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fridges`
--
ALTER TABLE `fridges`
  MODIFY `IDofFridge` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `magnets`
--
ALTER TABLE `magnets`
  MODIFY `IDofMagnet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
