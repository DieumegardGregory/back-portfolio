CREATE TABLE IF NOT EXISTS `subskills` (
    `id_subskill` INT AUTO_INCREMENT PRIMARY KEY,
    `name_subskill` VARCHAR(20) NOT NULL,
    `hardskill_id` INT
)ENGINE = InnoDB DEFAULT CHARSET = latin1;