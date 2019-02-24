import * as React from "react";
import { Control, Form } from "react-redux-form";
import { connect } from "react-redux";
import { getProjects } from "./project.actions";
import { api } from "web/app/api";

interface IAddProjectFormProps {
   onSubmit: () => void;
}

class AddProjectForm extends React.Component<IAddProjectFormProps> {
   handleSubmit(val: any) {
     // Do anything you want with the form value
     console.log(val);
     api.send("/api/projects/add", {
       method: "POST",
       headers: {
         "Accept": "application/json",
         "Content-Type": "application/json",
       },
       body: JSON.stringify(val)
     })
     .then( () => {
       this.props.onSubmit();
     });
   }

   handleClearAll() {
     // Do anything you want with the form value
     fetch("/api/projects/", {
       method: "DELETE",
       headers: {
         "Accept": "application/json",
         "Content-Type": "application/json",
       }
     })
     .then( () => {
       this.props.onSubmit();
     });
   }

  render() {
    return (
      <div>
         <label>Your Projects</label>
         <Form model="addProject" onSubmit={(val) => this.handleSubmit(val)}>
            <label className="prompt">Project Name</label>
            <Control.text model=".name" />
            <button>Add Project</button>
         </Form>
         <button onClick={() => this.handleClearAll()}>Delete All</button>
      </div>
    );
  }
}


///////////////////////////////////
//      Container Component
///////////////////////////////////

const mapStateToProps = () => {
   return {};
};


const mapDispatchToProps = (dispatch: any) => {
   return {
      onSubmit: () => {
         dispatch(getProjects());
      },
   };
};

export const AddProjectFormContainer: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProjectForm);