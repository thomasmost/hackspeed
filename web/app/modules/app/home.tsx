import * as React from "react";
import { AddProjectFormContainer } from "../project/add-project-form";
import { ProjectListContainer } from "../project/project-list";
import { render } from "react-dom";
import { connect } from "react-redux";
import { getProjectsForUser } from "../project/project.actions";
import { Dispatch } from "redux";


interface IDashboardProps {
   onLoad: () => void;
}
export class Home extends React.Component<IDashboardProps> {

   componentDidMount() {
      this.props.onLoad();
   }

   render() {
      return (
      <div>
         <h2>Welcome to HackSpeed</h2>
         <AddProjectFormContainer />
         <ProjectListContainer />
      </div>
      );
   }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
   return {
      onLoad: () => {
         dispatch(getProjectsForUser());
      }
   };
};

export const DashboardContainer: React.ComponentClass<{}> = connect(
  () => ({}),
  mapDispatchToProps
)(Home);
