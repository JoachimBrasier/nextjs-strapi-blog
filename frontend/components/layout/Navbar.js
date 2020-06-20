import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
import Link from "next/link";

export default () => (
  <AppBar position="static" style={{ marginBottom: 40 }}>
    <Container maxWidth="lg">
      <Toolbar style={{ padding: 0 }}>
        <Link href="/">
          <Typography variant="h6" style={{ flexGrow: 1, cursor: "pointer" }}>
            Pearl
          </Typography>
        </Link>
        <Link href="/candidats">
          <Button color="inherit">Candidats</Button>
        </Link>
        <Button color="inherit">Objectifs</Button>
      </Toolbar>
    </Container>
  </AppBar>
);
