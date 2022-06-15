CREATE TABLE IF NOT EXISTS `experiences` (
    `id_experience` INT AUTO_INCREMENT PRIMARY KEY,
    `name_experience` VARCHAR(20) NOT NULL,
    `place_experience` VARCHAR(60) NOT NULL,
    `starting_year` SMALLINT NOT NULL,
    `ending_year` SMALLINT NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET = latin1;