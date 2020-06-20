import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  LinearProgress,
  Box,
  Avatar,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import ReactMarkdown from "react-markdown";
import { Room, Check, Clear } from "@material-ui/icons";
import fetch from "../../lib/fetch";

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    alignItems: "center",
    display: "flex",
  },
  iconMargin: {
    marginRight: 5,
  },
  logo: {
    maxWidth: 24,
    maxHeight: 24,
  },
}));

const Applicant = ({ applicant }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={3}>
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
            <Typography className={classes.wrapIcon}>
              {applicant.available ? (
                <>
                  <Check
                    className={classes.iconMargin}
                    style={{ color: green[500] }}
                  />
                  Disponible
                </>
              ) : (
                <>
                  <Clear className={classes.iconMargin} color="error" />
                  Indisponible
                </>
              )}
            </Typography>
            <Typography className={classes.wrapIcon}>
              <Room className={classes.iconMargin} />
              {applicant.location}
            </Typography>
            {applicant.skills ? (
              <div style={{ marginTop: 15 }}>
                {applicant.skills.map((skill) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    style={{ margin: "5px 0" }}
                    key={skill._id}
                  >
                    <Box width={24}>
                      <Avatar
                        src={`http://localhost:1337${skill.technology.logo.url}`}
                        variant="square"
                        className={classes.logo}
                      />
                    </Box>
                    <Box width="100%" ml={1}>
                      <LinearProgress
                        value={Number(skill.level)}
                        variant="determinate"
                      />
                    </Box>
                  </Box>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Typography variant="body1" component="div">
          <ReactMarkdown source={applicant.curriculum} />
        </Typography>
      </Grid>
    </Grid>
  );
};

Applicant.getInitialProps = async ({ query }) => {
  const { id } = query;
  const applicant = await fetch("get", `applicants/${id}`);

  return { applicant };
};

export default Applicant;
