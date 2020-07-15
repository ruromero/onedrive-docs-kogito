import React from "react";
import {
  Typography, Button
} from "@material-ui/core";

export default function Summary(props: any) {
  const handleBack = () => props.history.push("/documents");
  const handleNext = () => props.history.push("/");
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review and submit
      </Typography>
      <Button onClick={handleBack}>Back</Button>
      <Button variant="contained" color="primary" onClick={handleNext}>
        Submit
      </Button>
    </React.Fragment>
  );
}
