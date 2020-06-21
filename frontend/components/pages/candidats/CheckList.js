import React from "react";
import {
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";

export default ({ title, data, labelField, selected, onChange }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">{title}</FormLabel>
    <FormGroup>
      {data.map((item) => (
        <FormControlLabel
          key={item._id}
          control={
            <Checkbox
              checked={selected.includes(item._id)}
              color="primary"
              onChange={onChange}
              name={item._id}
            />
          }
          label={item[labelField]}
        />
      ))}
    </FormGroup>
  </FormControl>
);
