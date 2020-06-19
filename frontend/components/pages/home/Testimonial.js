import React from "react";
import {
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default ({ data }) => {
  const classes = useStyles();

  return (
    <section>
      <Typography variant="h5" align="center" style={{ padding: "20px 0" }}>
        Témoignages
      </Typography>
      <Grid container spacing={3}>
        {data.map((testimonial) => (
          <Grid item key={testimonial._id} xs={12} sm={6} md={4}>
            <Card style={{ height: "100%" }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={`http://localhost:1337${testimonial.image.url}`}
                    variant="square"
                    imgProps={{ style: { objectFit: "contain" } }}
                    className={classes.large}
                  />
                }
                title={testimonial.author}
                subheader={
                  <Rating
                    value={Number(testimonial.rate)}
                    readOnly
                    size="small"
                  />
                }
              />
              <CardContent style={{ paddingTop: 0 }}>
                <Typography variant="body2" color="textSecondary">
                  {testimonial.comment}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};
