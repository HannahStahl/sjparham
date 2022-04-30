const dev = {
  apiURL: 'https://dlnum6f7kj.execute-api.us-east-1.amazonaws.com/dev',
  emailURL: 'https://c0mrk8va37.execute-api.us-east-1.amazonaws.com/dev/email/send',
  emailAddress: 'hannahstahl14@gmail.com',
  userID: 'us-east-1:34ee9094-c95a-4f8f-b2c2-551ef33bd49f',
};

const prod = {
  apiURL: 'https://lbe32id9hg.execute-api.us-east-1.amazonaws.com/prod',
  emailURL: 'https://aiikn63n03.execute-api.us-east-1.amazonaws.com/prod/email/send',
  emailAddress: 'steveparham@gmail.com',
  userID: 'us-east-1:c48c660c-9634-4931-88df-9522a164db6f',
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  publicCloudfrontURL: 'https://d2bcozk40tdrts.cloudfront.net',
  sanityURL: 'https://4dwi694x.apicdn.sanity.io/v1/graphql/production/default',
  ...config,
};
