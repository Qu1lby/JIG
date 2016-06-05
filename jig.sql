-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Dim 05 Juin 2016 à 18:26
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `jig`
--

-- --------------------------------------------------------

--
-- Structure de la table `evenements`
--

CREATE TABLE IF NOT EXISTS `evenements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(300) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Contenu de la table `evenements`
--

INSERT INTO `evenements` (`id`, `libelle`, `date`) VALUES
(1, 'Tests sur les bases de données', '2016-06-03 21:56:34'),
(2, 'Qui va faire le BBQ chez Mery ?', '2016-06-05 16:24:34'),
(3, 'Deuxième Tentative de Bouyage', '2016-06-05 14:35:06'),
(4, 'Tentative de Bouyage', '2016-06-05 14:35:05'),
(6, 'Troisième tentative de Bouyage', '2016-06-05 14:39:35'),
(9, 'Quatrième tentative de Bouyage', '2016-06-05 15:54:40');

-- --------------------------------------------------------

--
-- Structure de la table `groupes`
--

CREATE TABLE IF NOT EXISTS `groupes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(10) NOT NULL,
  `img` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Contenu de la table `groupes`
--

INSERT INTO `groupes` (`id`, `nom`, `img`) VALUES
(1, 'Groupe 1', 'g1.png'),
(2, 'Groupe 2', 'g2.png'),
(3, 'Groupe 3', 'g3.png'),
(4, 'Groupe 4', 'g4.png'),
(5, 'Groupe 5', 'g5.png'),
(6, 'IAMD', 'iamd.png'),
(7, 'IL', 'il.png'),
(8, 'LE', 'le.png'),
(9, 'SIE', 'sie.png'),
(10, 'TRS', 'trs.png'),
(11, 'ALISE', 'alise.png'),
(12, 'Apprentis', 'apprentis.png');

-- --------------------------------------------------------

--
-- Structure de la table `pari`
--

CREATE TABLE IF NOT EXISTS `pari` (
  `id_event` int(11) NOT NULL,
  `id_groupe` int(11) NOT NULL,
  `id_groupe_pari` int(11) NOT NULL,
  `points` int(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_event`,`id_groupe`),
  KEY `id_groupe` (`id_groupe`),
  KEY `id_groupe_pari` (`id_groupe_pari`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `pari`
--

INSERT INTO `pari` (`id_event`, `id_groupe`, `id_groupe_pari`, `points`) VALUES
(1, 1, 1, 100),
(2, 1, 3, 20),
(2, 2, 3, 125),
(2, 3, 2, 35),
(2, 4, 8, 10),
(2, 5, 10, 40),
(2, 6, 6, 80),
(2, 7, 7, 58),
(2, 8, 9, 220);

-- --------------------------------------------------------

--
-- Structure de la table `points`
--

CREATE TABLE IF NOT EXISTS `points` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_groupe` int(11) NOT NULL,
  `id_event` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `index_points_grp` (`id_groupe`),
  KEY `index_points_event` (`id_event`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Contenu de la table `points`
--

INSERT INTO `points` (`id`, `id_groupe`, `id_event`, `points`, `date`) VALUES
(2, 1, 1, 200, '2016-06-03 22:08:01'),
(3, 4, 1, 300, '2016-06-04 11:45:34'),
(4, 9, 1, 400, '2016-06-04 11:45:48'),
(5, 4, 1, 120, '2016-06-04 11:46:32'),
(6, 12, 1, 120, '2016-06-04 20:01:32'),
(7, 10, 1, 50, '2016-06-04 20:01:32'),
(8, 8, 1, 25, '2016-06-04 20:01:32'),
(9, 6, 1, 8, '2016-06-04 20:01:32'),
(10, 2, 1, 0, '2016-06-04 20:04:30'),
(11, 3, 1, 0, '2016-06-04 20:04:30'),
(12, 5, 1, 0, '2016-06-04 20:04:30'),
(13, 7, 1, 0, '2016-06-04 20:04:30'),
(14, 11, 1, 0, '2016-06-04 20:04:30');

-- --------------------------------------------------------

--
-- Structure de la table `user_info`
--

CREATE TABLE IF NOT EXISTS `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `user_info`
--

INSERT INTO `user_info` (`id`, `nom`, `password`) VALUES
(1, 'JIG2017', 'sha1$375d4fe3$1$8186d5bc95600a1cfac53654cd207b492c7e8f4f');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `pari`
--
ALTER TABLE `pari`
  ADD CONSTRAINT `pari_ibfk_1` FOREIGN KEY (`id_event`) REFERENCES `evenements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pari_ibfk_2` FOREIGN KEY (`id_groupe`) REFERENCES `groupes` (`id`),
  ADD CONSTRAINT `pari_ibfk_3` FOREIGN KEY (`id_groupe_pari`) REFERENCES `groupes` (`id`);

--
-- Contraintes pour la table `points`
--
ALTER TABLE `points`
  ADD CONSTRAINT `points_event_constr` FOREIGN KEY (`id_event`) REFERENCES `evenements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `points_groupe_constr` FOREIGN KEY (`id_groupe`) REFERENCES `groupes` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
