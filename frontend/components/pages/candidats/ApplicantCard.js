import React from "react";
import Link from "next/link";
import {
  Grid,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";

export default ({ applicant }) => (
  <Grid item key={applicant._id} xs={12} sm={4} md={3} lg={4}>
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
);
