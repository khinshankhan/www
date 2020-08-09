import React from "react";
import Layout from "src/layout";
import projects from "src/assets/projects.json";
import Grid from "@material-ui/core/Grid";
import Card from "src/components/Card";
import { normalizeUrl } from "src/utils";

const defaultValues = {
  title: "TBD",
  preview:
    "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  writeup: "/404",
  description: "[DESCRIPTION WIP]",
  links: [],
};

const Projects = () => {
  return (
    <Layout title="Projects">
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={project.name}>
            <Card
              title={project.name || defaultValues.title}
              preview={project.preview || defaultValues.preview}
              writeup={`/projects/${normalizeUrl(project.name)}`}
              description={project.description || defaultValues.description}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Projects;
