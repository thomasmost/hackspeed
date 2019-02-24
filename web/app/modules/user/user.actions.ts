import Skill from "server/models/skill.model";

export const ADD_SKILL = "ADD_SKILL";
export const REMOVE_SKILL = "REMOVE_SKILL";


export class AddSkill {
   constructor(public skill: Skill){}
   readonly type = ADD_SKILL;
};

export class RemoveSkill {
   constructor(public skill_id: number){}
   readonly type = REMOVE_SKILL;
};
