import React, { createContext, useContext } from "react";
import "./App.css";
import {
  Typography, Stepper, Step, StepLabel, Paper, CssBaseline, AppBar, Toolbar
} from "@material-ui/core";
import { BrowserRouter as Router, Route, useLocation, useHistory, Switch } from "react-router-dom";
import PersonalData from "./PersonalData";
import AttachDocs from "./AttachDocs";
import Summary from "./Summary";
import { createStore } from "little-state-machine";

const steps = ['Personal information', 'Attach documents', 'Review and submit'];
const stepPaths = ['/', '/documents', '/summary'];

export interface UserFormData {
  firstName: string,
  lastName: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  zip: string,
  country: string,
  phoneNumber: string,
  drivingLicense: string,
  licenseFileId: string,
  pictureFileId: string
}

createStore({
  data: {}
});

export default function Registration() {
  const [activeStep, setActiveStep] = React.useState(0);
  
  let location = useLocation();
  React.useEffect(() => {
    setActiveStep(stepPaths.indexOf(location.pathname));
  }, [location]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            YACS (Yet Another Car-Sharing Company)
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Paper>
          <Typography component="h1" variant="h4" align="center">
            Registration
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Switch>
            <Route exact path="/" component={PersonalData} />
            <Route path="/documents" component={AttachDocs} />
            <Route path="/summary" components={Summary} />
          </Switch>
        </Paper>
      </main>
    </React.Fragment>
  );
}