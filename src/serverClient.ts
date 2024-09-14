// import {
//   ApolloClient,
//   HttpLink,
//   InMemoryCache,
//   HttpOptions,
// } from "@apollo/client";
// import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

// export const { getClient } = registerApolloClient(() => {
//   const headers: HttpOptions["headers"] = {
//     Authorization: `${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
//   };

//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     defaultOptions: {
//       query: {
//         fetchPolicy: "no-cache",
//       },
//     },
//     link: new HttpLink({
//       uri: "https://graphql.datocms.com",
//       headers,
//     }),
//   });
// });
