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
      const incident = await models.Incident.findOneAndUpdate(
        { title },
        { assignee }
      );

      return incident;
    }
  }
}