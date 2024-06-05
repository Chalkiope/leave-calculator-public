import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://graphql.datocms.com": {
        headers: {
          Authorization: `f8e01b7c6901e97308c1abf444f15b`,
        },
      },
    },
  ],
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["src/graphql/*.graphql"],
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false, // HERE
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
