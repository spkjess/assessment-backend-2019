import axios from 'axios';

const API_URL = 'http://localhost:3000/graphql';

export const createIncident = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation CreateIncident {
        createIncident(
          title:"title1",
          description:"description1", 
          assignee: "user", 
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
          title:"title1",
          assignee: "user2", 
        ) {
          assignee
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
          title:"title1",
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
          title:"title1",
          status: "Resolved", 
        ) {
          status
        }
      }
    `,
    variables,
  });