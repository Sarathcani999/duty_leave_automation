-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2020 at 05:54 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodemysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `advisor`
--

CREATE TABLE `advisor` (
  `id` int(11) NOT NULL,
  `s_id` varchar(10) DEFAULT NULL,
  `dept` varchar(2) NOT NULL,
  `semester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `advisor`
--

INSERT INTO `advisor` (`id`, `s_id`, `dept`, `semester`) VALUES
(1, 'STF17CS002', 'CS', 5),
(2, 'STF16CS001', 'CS', 7);

-- --------------------------------------------------------

--
-- Table structure for table `attandence`
--

CREATE TABLE `attandence` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `tt_id` int(11) NOT NULL,
  `dsc_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attandence`
--

INSERT INTO `attandence` (`id`, `student_id`, `tt_id`, `dsc_id`) VALUES
(13, 'TVE17CS003', 34, 6),
(14, 'TVE17CS002', 35, 2),
(15, 'TVE16CS056', 37, 9),
(16, 'TVE16CS031', 38, 8);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`) VALUES
('CS201', 'Operating Systems'),
('CS301', 'Data Structure II'),
('CS302', 'Principles of Database Design'),
('CS303', 'Principles of Database Design II'),
('CS306', 'Soft Computing'),
('CS401', 'Networking And Cryptography'),
('CS402', 'Machine Learning'),
('CS403', 'Deep Learning');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `d_code` varchar(2) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `d_code`, `name`) VALUES
(1, 'CS', 'Computer Science'),
(2, 'EC', 'Electronics and Communication'),
(3, 'EE', 'Electrical and Electronics'),
(4, 'ME', 'Mechanical Engineering'),
(5, 'CE', 'Civil Engineering'),
(6, 'AR', 'Architecture');

-- --------------------------------------------------------

--
-- Table structure for table `dept_hod`
--

CREATE TABLE `dept_hod` (
  `id` int(11) NOT NULL,
  `dept` varchar(2) NOT NULL,
  `hod_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dept_hod`
--

INSERT INTO `dept_hod` (`id`, `dept`, `hod_id`) VALUES
(1, 'CS', 'STF17CS004'),
(2, 'CE', NULL),
(3, 'EE', NULL),
(4, 'EC', NULL),
(5, 'ME', NULL),
(6, 'AR', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dept_sem_course`
--

CREATE TABLE `dept_sem_course` (
  `id` int(11) NOT NULL,
  `c_id` varchar(10) NOT NULL,
  `dept` varchar(2) NOT NULL,
  `semester` int(11) NOT NULL,
  `s_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dept_sem_course`
--

INSERT INTO `dept_sem_course` (`id`, `c_id`, `dept`, `semester`, `s_id`) VALUES
(2, 'CS301', 'CS', 5, 'STF16CS002'),
(6, 'CS302', 'CS', 5, 'STF17CS002'),
(7, 'CS303', 'CS', 5, 'STF17CS002'),
(8, 'CS401', 'CS', 7, 'STF16CS001'),
(9, 'CS402', 'CS', 7, 'STF16CS002'),
(10, 'CS306', 'CS', 5, 'STF17CS005'),
(11, 'CS403', 'CS', 7, 'STF16CS003');

-- --------------------------------------------------------

--
-- Table structure for table `duty_leave`
--

CREATE TABLE `duty_leave` (
  `id` int(11) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `description` varchar(300) NOT NULL,
  `date_of_application` date NOT NULL,
  `date_for_application` date NOT NULL,
  `hour` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `staff_approved` tinyint(1) NOT NULL DEFAULT '0',
  `hod_approved` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `duty_leave`
--

INSERT INTO `duty_leave` (`id`, `subject`, `description`, `date_of_application`, `date_for_application`, `hour`, `student_id`, `staff_approved`, `hod_approved`) VALUES
(1, 'Medical Leave', 'blah... blah... blah...jnasssssssssssssssssssssssssssssssssssssssssssssssssssssdnklasfmfasmcasjkkasjndkj', '2019-11-20', '2019-02-02', 2, 'TVE17CS002', 1, 1),
(2, 'asd', 'sad desc', '2019-11-20', '0000-00-00', 1, 'TVE17CS002', 1, 1),
(3, 'asdasda', 'sad desc', '2019-11-20', '2019-11-20', 1, 'TVE17CS002', 1, 1),
(4, 'asdasda', 'asd', '2019-11-20', '2019-11-29', 1, 'TVE17CS002', 1, 0),
(5, 'new', 'new', '2019-11-20', '2019-11-29', 3, 'TVE17CS002', 1, 0),
(7, 'Mess Duty', 'I was having Mess Duty During the 2 nd hour of 25/11/2019', '2019-11-25', '2019-11-25', 2, 'TVE16CS056', 1, 1),
(10, 'Test', 'test', '2019-11-26', '2019-11-27', 3, 'TVE16CS056', 1, 1),
(11, 'NSS', 'NSS', '2019-11-26', '2019-11-28', 1, 'TVE16CS011', 1, 1),
(12, 'new ', 'new', '2019-11-26', '2019-11-28', 6, 'TVE16CS056', 1, 1),
(13, 'Mess Duty', 'mess duty', '2019-11-26', '2019-12-02', 2, 'TVE16CS056', 1, 1),
(14, 'Demo', 'Demo Purpose', '2019-11-27', '2019-12-02', 6, 'TVE16CS056', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `dept` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `name`, `dept`) VALUES
('STF16CS001', 'Abdul Nizar', 'CS'),
('STF16CS002', 'Vipin Vasu', 'CS'),
('STF16CS003', 'Salim', 'CS'),
('STF17CS002', 'Susheela', 'CS'),
('STF17CS004', 'Sumesh Divakaran', 'CS'),
('STF17CS005', 'Deepti', 'CS'),
('STF17CS010', 'Piyoosh', 'CS');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `dept` varchar(2) NOT NULL,
  `sem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `dept`, `sem`) VALUES
('TVE16CS011', 'Hani', 'CS', 7),
('TVE16CS031', 'Govind', 'CS', 7),
('TVE16CS056', 'Sarath C Ani', 'CS', 7),
('TVE16CS058', 'Shyamjith M C', 'CS', 7),
('TVE17CS002', 'Ajay Murali', 'CS', 5),
('TVE17CS003', 'Ajay V', 'CS', 5),
('TVE17CS044', 'Navaneeth', 'CS', 5);

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `name`) VALUES
(1, 'sarath');

-- --------------------------------------------------------

--
-- Table structure for table `timetable`
--

CREATE TABLE `timetable` (
  `id` int(11) NOT NULL,
  `ymd` date NOT NULL,
  `hour` int(11) NOT NULL,
  `dsc_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `timetable`
--

INSERT INTO `timetable` (`id`, `ymd`, `hour`, `dsc_id`) VALUES
(9, '2019-11-19', 1, 2),
(10, '2019-11-19', 2, 6),
(11, '2019-11-20', 1, 2),
(12, '2019-11-21', 1, 7),
(13, '2019-11-23', 1, 2),
(15, '2019-11-24', 1, 2),
(17, '2019-11-24', 2, 7),
(18, '2019-11-24', 3, 7),
(19, '2019-11-24', 4, 7),
(20, '2019-11-24', 6, 7),
(21, '2019-11-25', 1, 8),
(22, '2019-11-25', 2, 8),
(23, '2019-11-26', 1, 9),
(24, '2019-11-26', 2, 2),
(25, '2019-11-26', 6, 2),
(26, '2019-11-26', 3, 10),
(27, '2019-11-27', 1, 8),
(28, '2019-11-27', 2, 8),
(29, '2019-11-27', 3, 8),
(30, '2019-11-28', 1, 11),
(31, '2019-11-28', 2, 11),
(32, '2019-11-28', 6, 9),
(33, '2019-11-30', 1, 6),
(34, '2019-11-30', 2, 6),
(35, '2019-12-01', 1, 2),
(36, '2019-12-02', 1, 9),
(37, '2019-11-02', 2, 9),
(38, '2019-12-02', 6, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(10) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `usertype` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `pass`, `usertype`) VALUES
('AD15TVE001', 'abcd', 0),
('STF16CS001', 'teacher', 2),
('STF16CS002', 'teacher', 2),
('STF16CS003', 'teacher', 2),
('STF17CS002', '1234567890', 2),
('STF17CS004', 'asd', 2),
('STF17CS005', 'teacher', 2),
('STF17CS010', 'teachrer', 2),
('TVE16CS011', 'student', 1),
('TVE16CS031', 'student', 1),
('TVE16CS056', 'student', 1),
('TVE16CS058', 'student', 1),
('TVE17CS002', '1234567890', 1),
('TVE17CS003', '1234567890', 1),
('TVE17CS044', 'asdfg', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advisor`
--
ALTER TABLE `advisor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `s_id_2` (`s_id`),
  ADD KEY `dept` (`dept`),
  ADD KEY `s_id` (`s_id`);

--
-- Indexes for table `attandence`
--
ALTER TABLE `attandence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tt_id` (`tt_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `dsc_id` (`dsc_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `d_code` (`d_code`);

--
-- Indexes for table `dept_hod`
--
ALTER TABLE `dept_hod`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hod_id` (`hod_id`),
  ADD KEY `dept` (`dept`);

--
-- Indexes for table `dept_sem_course`
--
ALTER TABLE `dept_sem_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dept` (`dept`),
  ADD KEY `c_id` (`c_id`),
  ADD KEY `s_id` (`s_id`);

--
-- Indexes for table `duty_leave`
--
ALTER TABLE `duty_leave`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dept` (`dept`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `dept` (`dept`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timetable`
--
ALTER TABLE `timetable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dsc_id` (`dsc_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advisor`
--
ALTER TABLE `advisor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `attandence`
--
ALTER TABLE `attandence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `dept_hod`
--
ALTER TABLE `dept_hod`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `dept_sem_course`
--
ALTER TABLE `dept_sem_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `duty_leave`
--
ALTER TABLE `duty_leave`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `timetable`
--
ALTER TABLE `timetable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `advisor`
--
ALTER TABLE `advisor`
  ADD CONSTRAINT `advisor_ibfk_1` FOREIGN KEY (`s_id`) REFERENCES `staff` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `advisor_ibfk_2` FOREIGN KEY (`dept`) REFERENCES `department` (`d_code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attandence`
--
ALTER TABLE `attandence`
  ADD CONSTRAINT `attandence_ibfk_1` FOREIGN KEY (`tt_id`) REFERENCES `timetable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attandence_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attandence_ibfk_3` FOREIGN KEY (`dsc_id`) REFERENCES `dept_sem_course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dept_hod`
--
ALTER TABLE `dept_hod`
  ADD CONSTRAINT `dept_hod_ibfk_1` FOREIGN KEY (`dept`) REFERENCES `department` (`d_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dept_hod_ibfk_2` FOREIGN KEY (`hod_id`) REFERENCES `staff` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `dept_sem_course`
--
ALTER TABLE `dept_sem_course`
  ADD CONSTRAINT `dept_sem_course_ibfk_2` FOREIGN KEY (`c_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dept_sem_course_ibfk_3` FOREIGN KEY (`dept`) REFERENCES `department` (`d_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dept_sem_course_ibfk_4` FOREIGN KEY (`s_id`) REFERENCES `staff` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `duty_leave`
--
ALTER TABLE `duty_leave`
  ADD CONSTRAINT `duty_leave_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`dept`) REFERENCES `department` (`d_code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`dept`) REFERENCES `department` (`d_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `timetable`
--
ALTER TABLE `timetable`
  ADD CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`dsc_id`) REFERENCES `dept_sem_course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
