CREATE TABLE IF NOT EXISTS `tasks` (
    `id_task`INT AUTO_INCREMENT PRIMARY KEY,
    `name_task` VARCHAR(50) NOT NULL,
    `experience_id` INT
)ENGINE = InnoDB DEFAULT CHARSET = latin1;