import React from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import updateAction from "./updateAction";

export default function PersonalData(props: any) {
  const { register, handleSubmit } = useForm();
  const { action, state } = useStateMachine(updateAction);

  const onSubmit = (data: any) => {
    action(data);
    props.history.push("/documents");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Personal information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            inputRef={register}
            defaultValue={state.data.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            inputRef={register}
            defaultValue={state.data.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            // required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="address-line1"
            inputRef={register}
            defaultValue={state.data.address1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="address-line2"
            inputRef={register}
            defaultValue={state.data.address2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="address-level2"
            inputRef={register}
            defaultValue={state.data.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            inputRef={register}
            defaultValue={state.data.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="postal-code"
            inputRef={register}
            defaultValue={state.data.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="country"
            inputRef={register}
            defaultValue={state.data.country}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="phoneNumber"
            name="phoneNumber"
            label="Phone number"
            fullWidth
            autoComplete="phone-number"
            inputRef={register}
            defaultValue={state.data.phoneNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="drivingLicense"
            name="drivingLicense"
            label="Driving license"
            fullWidth
            autoComplete="driving-license"
            inputRef={register}
            defaultValue={state.data.drivingLicense}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" type="submit">
        Next
      </Button>
    </form>
  );
}
