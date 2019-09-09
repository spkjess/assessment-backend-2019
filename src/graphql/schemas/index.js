import { gql } from 'apollo-server-express';

import userSchema from './User';
import incidentSchema from './Incident';

const linkSchema = gql`
  scalar Date
`;

export default [linkSchema, userSchema, incidentSchema];
