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
	}

	type Incident {
		title: String!
		description: String
		assignee: String!
		status: String
	}
`;