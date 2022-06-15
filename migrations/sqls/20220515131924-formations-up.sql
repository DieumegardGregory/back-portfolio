CREATE TABLE IF NOT EXISTS `formations` (
    `id_formation` INT AUTO_INCREMENT PRIMARY KEY,
    `name_formation` VARCHAR(80) NOT NULL,
    `place_formation` VARCHAR(40) NOT NULL,
    `year_formation` SMALLINT NOT NULL,
    `school` VARCHAR(80) NULL
)ENGINE = InnoDB DEFAULT CHARSET = latin1;