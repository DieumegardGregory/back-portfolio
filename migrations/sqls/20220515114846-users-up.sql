CREATE TABLE IF NOT EXISTS `users` (
    `id_user` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(150) NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET = latin1;