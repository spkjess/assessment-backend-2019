import { UserInputError } from 'apollo-server';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    incidents: async (parent, { sortBy, cursor, limit }, { models }) => {

      const cursorOptions = cursor
        ? {
          createdAt: {
            $lt: fromCursorHash(cursor),
          },
        }
        : {};
      const query = {
        sort: {},
        limit: limit + 1,
      };

      query.sort[sortBy] = -1;

      const incidents = await models.Incident.find(
        cursorOptions,
        null,
        query
      );

      const hasNextPage = incidents.length > limit;
      const edges = hasNextPage ? incidents.slice(0, -1) : incidents;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
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
      const user = await models.User.findOne({ name: args.assignee });

      if (user.role !== "Engineer") {
        throw new UserInputError(
          'Incident should be assigned to an Engineer.',
        );
      }

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