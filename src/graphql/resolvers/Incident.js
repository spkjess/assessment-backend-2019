export default {
  Query: {
    incidents: async (parent, args, { models }) => {
      return await models.Incident.find();
    },
    incident: async (parent, { title }, { models }) => {
      return await models.Incident.findOne({ title });
    }
  },
  Mutation: {
    createIncident: async (
      parent,
      args,
      { models },
    ) => {
      await models.Incident.create(args);
      return args;
    },
    assignIncident: async (
      parent,
      {
        title,
        assignee
      },
      { models },
    ) => {
      await models.Incident.updateOne(
        { title },
        { assignee }
      );
      return {
        title,
        assignee
      };
    },
    updateIncidentStatus: async (
      parent,
      {
        title,
        status
      },
      { models },
    ) => {
      await models.Incident.updateOne(
        { title },
        { status }
      );
      return {
        title,
        status
      };
    },
    deleteIncident: async (
      parent,
      {
        title
      },
      { models },
    ) => {
      await models.Incident.remove(
        { title }
      );
      return { title };
    }
  },
}