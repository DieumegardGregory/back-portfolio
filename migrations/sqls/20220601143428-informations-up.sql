CREATE TABLE IF NOT EXISTS `informations` (
    `id_information` INT AUTO_INCREMENT PRIMARY KEY,
    `profile` TEXT NOT NULL,
    `looking_for` TEXT NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET = latin1;