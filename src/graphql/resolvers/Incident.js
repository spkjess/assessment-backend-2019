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
    }
  }
}