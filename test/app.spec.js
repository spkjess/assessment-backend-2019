import axios from 'axios';

const API_URL = 'http://localhost:3000/graphql';

export const createIncident = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation CreateIncident {
        createIncident(
          title: "title1",
          description:"description1", 
          assignee: "user1", 
          status: "Created" 
        ) {
          title
        }
      }
    `,
    variables,
  });

export const assignIncident = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation AssignIncident {
        assignIncident(
          title: "title1",
          assignee: "user2", 
        ) {
          status
        }
      }
    `,
    variables,
  });

export const acknowledgeIncident = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation UpdateIncidentStatus {
        updateIncidentStatus(
          title: "title1",
          status: "Acknowledged", 
        ) {
          status
        }
      }
    `,
    variables,
  });

export const resolveIncident = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation UpdateIncidentStatus {
        updateIncidentStatus(
          title: "title1",
          status: "Resolved", 
        ) {
          status
        }
      }
    `,
    variables,
  });

export const deleteIncident = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation DeleteIncident {
        deleteIncident(
          title: "title1"
        ) {
          status
        }
      }
    `,
    variables,
  });

export const readIncident = async variables =>
  await axios.post(API_URL, {
    query: `
      query ($title: "title1") {
        incident(title: $title) {
          title,
          description,
          assignee,
          status
        }
      }
    `,
    variables,
  });

export const indexIncidents = async variables =>
  await axios.post(API_URL, {
    query: `
      {
        incidents {
          title,
          description,
          assignee,
          status
        }
      }
    `,
    variables,
  });

