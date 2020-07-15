import React, { useState } from "react";
import clsx from "clsx";
import "./App.css";
import {
  Button,
  Typography,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import Portrait from "@material-ui/icons/Portrait";
import DriveEta from "@material-ui/icons/DriveEta";
import CheckIcon from "@material-ui/icons/Check";
import { green } from "@material-ui/core/colors";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

class Document {
  file?: File;
  uploaded: boolean;
  loading: boolean;

  constructor() {
    this.uploaded = false;
    this.loading = false;
  }
}

export default function AddDocuments(props: any) {
  const classes = useStyles();
  const { action, state } = useStateMachine(updateAction);
  const [license, setLicense] = useState<Document>(new Document());
  const [picture, setPicture] = useState<Document>(new Document());

  const handleBack = () => props.history.push("/");
  const handleNext = () => {
    props.history.push("/summary");
    console.log(state);
  }

  const onLicenseSelected = (event: any) => {
    if (event.target.files.length === 1) {
      const file = event.target.files[0];
      upload(file, setLicense).then((fileId:string) => {
        state.data.licenseFileId = fileId;
        action(state.data);
      });
    }
  };
  const onPictureSelected = (event: any) => {
    if (event.target.files.length === 1) {
      const file = event.target.files[0];
      upload(file, setPicture).then((fileId:string) => {
        state.data.pictureFileId = fileId;
        action(state.data);
      });
    }
  };

  const upload = (file: File, stateFn: Function): Promise<string> => {
    stateFn((prevState: any) => ({...prevState, loading: true}));
    return new Promise((resolve: any) => setTimeout(() => {
      stateFn({
        file: file,
        loading: false,
        uploaded: true,
      });
      resolve.bind(null, file.name);
    }, 2000));
  }

  const buttonLicenseClassname = clsx({
    [classes.buttonSuccess]: license.uploaded,
  });

  const buttonPictureClassname = clsx({
    [classes.buttonSuccess]: picture.uploaded,
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add your documents
      </Typography>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            component="label"
            color="primary"
            className={buttonLicenseClassname}
            disabled={license.loading}
            startIcon={license.uploaded ? <CheckIcon /> : <DriveEta />}
          >
            Upload driving license
            <input
              accept="image/*"
              id="driverLicenseFile"
              type="file"
              style={{ display: "none" }}
              onChange={onLicenseSelected}
            />
          </Button>
          {license.loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            component="label"
            color="primary"
            className={buttonPictureClassname}
            disabled={picture.loading}
            startIcon={picture.uploaded ? <CheckIcon /> : <Portrait />}
          >
            Upload picture
            <input
              accept="image/*"
              id="driverLicenseFile"
              type="file"
              style={{ display: "none" }}
              onChange={onPictureSelected}
            />
          </Button>
          {picture.loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
      <Button onClick={handleBack}>Back</Button>
      <Button variant="contained" color="primary" onClick={handleNext}>
        Next
      </Button>
    </React.Fragment>
  );
}
