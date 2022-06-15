ALTER TABLE `subskills` 
ADD CONSTRAINT `fk_subskills_hardskills`
    FOREIGN KEY (`hardskill_id`)
    REFERENCES `hardskills` (`id_hardskill`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION;

ALTER TABLE `tasks` 
ADD CONSTRAINT `fk_tasks_experiences`
    FOREIGN KEY (`experience_id`)
    REFERENCES `experiences` (`id_experience`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION;