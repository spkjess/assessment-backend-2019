export default {
  Mutation: {
    createIncident: async (
      parent,
      {
        title,
        description,
        assignee,
        status
      },
      { models },
    ) => {
      const incident = await models.Incident.create({
        title,
        description,
        assignee,
        status,
      });
      return incident;
    },
    assignIncident: async (
      parent,
      {
        title,
        assignee
      },
      { models },
    ) => {
      const incident = await models.Incident.updateOne(
        { title },
        { assignee }
      );
      return incident;
    },
    updateIncidentStatus: async (
      parent,
      {
        title,
        status
      },
      { models },
    ) => {
      const incident = await models.Incident.updateOne(
        { title },
        { status }
      );
      return incident;
    },
    deleteIncident: async (
      parent,
      {
        title
      },
      { models },
    ) => {
      const incident = await models.Incident.remove(
        { title }
      );
      return incident;
    }
  },
}