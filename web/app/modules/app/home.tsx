import * as React from "react";
import { AddProjectFormContainer } from "../project/add-project-form";
import { ProjectListContainer } from "../project/project-list";
export const Home = () => {
      return <div>
         <h2>Welcome to HackSpeed</h2>
         <AddProjectFormContainer />
         <ProjectListContainer />
      </div>;
   }
