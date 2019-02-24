import Skill from "../models/skill.model";
export const skillIsApplicable = (mySkill: Skill, targetSkill: Skill):boolean => {
   return (mySkill.category === targetSkill.category || 0)
    && mySkill.experience > targetSkill.experience * .8;
};

export const skillApplicability = (mySkill: Skill, targetSkill: Skill): number => {
   const applicable = skillIsApplicable(mySkill, targetSkill);
   if (!applicable){
      return 0;
   }
   return mySkill.experience > targetSkill.experience ? 1 : (mySkill.experience / targetSkill.experience);
};