CREATE TABLE IF NOT EXISTS `projects` (
    `id_project` INT AUTO_INCREMENT PRIMARY KEY,
    `name_project` VARCHAR(50) NOT NULL,
    `imgUrl_project` VARCHAR(255) NULL,
    `display_project` TINYINT DEFAULT 1,
    `description_project` TEXT
)ENGINE = InnoDB DEFAULT CHARSET = latin1;