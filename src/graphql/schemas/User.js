import { gql } from 'apollo-server-express';

export default gql`
	type User {
		name: String!
		email: String!
		role: String!
	}
`;