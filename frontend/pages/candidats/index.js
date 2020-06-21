import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Input,
  CardContent,
  IconButton,
  InputAdornment,
  Typography,
  Hidden,
  Drawer,
  Fab,
  Divider,
} from "@material-ui/core";
import { Search, FilterList, Clear } from "@material-ui/icons";
import fetch from "../../lib/fetch";
import ApplicantCard from "../../components/pages/candidats/ApplicantCard";
import CheckList from "../../components/pages/candidats/CheckList";

const fabStyle = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
  zIndex: 10,
};

const closeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingBottom: 15,
};

const Applicants = ({ applicants, technologies, trainings }) => {
  const [data, setData] = useState(applicants);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrainings, setSelectedTrainings] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedTrainings]);

  const fetchData = async () => {
    const trainingFilter = selectedTrainings
      .map((selected) => {
        return `&training_in=${selected}`;
      })
      .join("");

    const applicants = await fetch(
      "get",
      `applicants?full_name_contains=${searchQuery}${trainingFilter}`
    );

    setData(applicants);
  };

  const onTrainingChange = (event) => {
    if (selectedTrainings.includes(event.target.name)) {
      setSelectedTrainings(
        selectedTrainings.filter((item) => item !== event.target.name)
      );
    } else {
      setSelectedTrainings((prev) => [...prev, event.target.name]);
    }
  };

  const onTechnologieChange = (event) => {
    if (selectedTechnologies.includes(event.target.name)) {
      setSelectedTechnologies(
        selectedTechnologies.filter((item) => item !== event.target.name)
      );
    } else {
      setSelectedTechnologies((prev) => [...prev, event.target.name]);
    }
  };

  useEffect(() => {
    const domFilteredData = data.filter((item) =>
      selectedTechnologies.some((value) =>
        JSON.stringify(item).includes(value.toString())
      )
    );

    setFilteredData(domFilteredData);
  }, [selectedTechnologies, data]);

  const onEnter = (event) => {
    if (event.keyCode == 13) {
      fetchData();
    }
  };

  const SideMenu = () => (
    <>
      <Input
        value={searchQuery}
        onChange={(event) => {
          event.persist();
          setSearchQuery(event.target.value);
        }}
        onKeyDown={onEnter}
        fullWidth
        placeholder="Rechercher..."
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={fetchData}>
              <Search />
            </IconButton>
          </InputAdornment>
        }
        style={{ marginBottom: 10 }}
      />
      <CheckList
        data={trainings}
        title="Compétences"
        labelField="title"
        selected={selectedTrainings}
        onChange={onTrainingChange}
      />
      <CheckList
        data={technologies}
        title="Technologies"
        labelField="name"
        selected={selectedTechnologies}
        onChange={onTechnologieChange}
      />
    </>
  );

  return (
    <Grid container spacing={3}>
      <Hidden mdDown>
        <Grid item lg={3}>
          <Card>
            <CardContent>
              <SideMenu />
            </CardContent>
          </Card>
        </Grid>
      </Hidden>
      <Hidden lgUp>
        <Fab color="primary" style={fabStyle} onClick={() => setOpen(true)}>
          <FilterList />
        </Fab>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{ style: { padding: 15 } }}
        >
          <div style={closeStyle}>
            <IconButton onClick={() => setOpen(false)} size="small">
              <Clear />
            </IconButton>
          </div>
          <SideMenu />
        </Drawer>
      </Hidden>
      <Grid item xs={12} sm={12} md={12} lg={9}>
        {!data.map || data.length === 0 ? (
          <Typography align="center" color="textSecondary">
            Aucun résultat
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredData && filteredData.length !== 0
              ? filteredData.map((applicant) => (
                  <ApplicantCard key={applicant._id} applicant={applicant} />
                ))
              : data.map((applicant) => (
                  <ApplicantCard key={applicant._id} applicant={applicant} />
                ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

Applicants.getInitialProps = async () => {
  const applicants = await fetch("get", "applicants");
  const technologies = await fetch("get", "technologies");
  const trainings = await fetch("get", "trainings");

  return { applicants, technologies, trainings };
};

export default Applicants;
