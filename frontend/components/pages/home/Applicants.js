import React from "react";
import Link from "next/link";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
} from "@material-ui/core";

export default ({ data }) => {
  return (
    <section>
      <Typography variant="h5" align="center" style={{ padding: "20px 0" }}>
        Les derniers candidats inscrits
      </Typography>
      <Grid container spacing={3}>
        {data.map((applicant) => (
          <Grid item key={applicant._id} xs={12} sm={4} md={3}>
            <Card>
              <CardMedia
                image={`http://localhost:1337${applicant.picture.url}`}
                style={{ height: 200 }}
              />
              <CardContent>
                <Typography variant="h6">{applicant.full_name}</Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  {applicant.training.job_title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {applicant.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Link href={`/candidats/${applicant._id}`}>
                  <Button variant="contained" color="primary" fullWidth>
                    En savoir plus
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};
