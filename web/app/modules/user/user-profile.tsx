import * as React from "react";
import { Control, Form } from "react-redux-form";
import { connect } from "react-redux";
import { api } from "web/app/api";
import User from "../../../../server/models/user.model";
import Select from "react-select";
import Skill from "../../../../server/models/skill.model";
import {Skills} from "../../../../server/models/skill.const";
import { Dispatch } from "redux";
import { AddSkill, RemoveSkill } from "./user.actions";
import { clientSession } from "../auth/auth.session";

interface UserProfileProps {
   user: User;
   viewingUserId: number;
   onAddSkill(skill: Skill): void;
   onRemoveSkill(skill_id: number): void;
}

interface UserProfileState{
   editing: boolean;
   skill: Skill;
}

class UserProfile extends React.Component<UserProfileProps, UserProfileState> {

   state = {
      editing: false,
      skill: {} as any
   }
   renderAddSkillForm() {
      const {skill} = this.state;
      const hasCategory = skill.category;
      const subcategories: string[] = Skills[skill.category] || [];
      return(
         <form>
            <Select
               options={Object.keys(Skills)}
               placeholder = "Category"
               onChange = {(val)=>{
                  skill.category = val as string;
                  this.setState({skill});
               }}
               >
            </Select>
            {subcategories.length && <Select
               options={subcategories}
               onChange = {(val)=>{
                  skill.category = val as string;
                  this.setState({skill});
               }}
            >
            </Select>}
            Experience:
            <input
               type="range"
               min="0"
               max="20"
               value={skill.experience}
               onChange={(changeEvent) => {
                  skill.experience = parseInt(changeEvent.currentTarget.value);
                  this.setState({skill});
               }}
            />
            <input
               type="submit"
               onClick={() => this.props.onAddSkill(skill)}
            />
         </form>
      );
   }

   renderSkill(skill: Skill) {
      const {editing} = this.state;
      return (
         <div>
            {skill.category} - {skill.subcategory}: {skill.experience}
            {editing && <span
               className="delete"
               onClick={() => this.props.onRemoveSkill(skill.id)}
            >
               X
            </span>}
         </div>
      );
   }


   render() {
      const {user, viewingUserId} = this.props;
      const {editing} = this.state;
      return (
         <div>
            <h2>{user.name}</h2><img src={user.email}></img>
            {viewingUserId === user.id && <a onClick={() => this.setState({editing: !editing})}>Edit</a>}
            <h3>Skills:</h3>
            {user.skills && user.skills.map(this.renderSkill)}
         </div>
      );
   }
}

///////////////////////////////////
//      Container Component
///////////////////////////////////

const mapDispatchToProps = (dispatch: Dispatch) => {
   return {
      onAddSkill: (skill: Skill) => dispatch(new AddSkill(skill)),
      onRemoveSkill: (skill_id: number) => dispatch(new RemoveSkill(skill_id))
   };
};

const mapStateToProps = (state: any) => {
  return {user: clientSession.user,
         viewingUserId: clientSession.user.id};
};

export const UserProfileContainer: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);