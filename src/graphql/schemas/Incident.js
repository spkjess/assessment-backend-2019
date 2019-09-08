import { gql } from 'apollo-server-express';

export default gql`
	type Query {
		title: String!
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
	}

	type Incident {
		title: String!
		description: String
		assignee: String!
		status: String
	}
`;