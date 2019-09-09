import { gql } from 'apollo-server-express';

export default gql`
	type Query {
		incidents(sortBy: String, cursor: String, limit: Int): IncidentConnection!
		incident(title: String!): Incident
	}
	
	type Mutation {
		createIncident(
			title: String!
			description: String
			assignee: String!
			status: String
		): Incident!
		assignIncident(
			title: String!
			assignee: String!
		): Incident!
		updateIncidentStatus(
			title: String!
			status: String!
		): Incident!
		deleteIncident(
			title: String!
		): Incident!
	}

	type IncidentConnection {
    edges: [Incident!]!
    pageInfo: PageInfo!
	}

	type PageInfo {
		hasNextPage: Boolean!
    endCursor: String!
	}
	
	type Incident {
		title: String!
		description: String
		assignee: String!
		status: String
		createdAt: Date
		updatedAt: Date 
	}
`;