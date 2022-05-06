const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields: 'title' and 'author'.

  type Items {
    text: String
    id: String
    warm: Boolean
    cold: Boolean
  }

  type PackingList {
    type: String
    gender: String
    basicClothes: [Items]
    accessories: [Items]
    shoes: [Items]
    activities: [Items]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {
    packingLists: [PackingList]
  }
`;
const packingLists = [
  {
    type: "basic",
    // gender: "female",

    basicClothes: [
      { text: "underwear", id: "underwear", category: "underGarments" },
      { text: "bras", id: "bra", category: "underGarments" },
      { text: "socks", id: "socks", categoryId: "underGarments" },
      {
        text: "fleeces / hoodies",
        id: "comfortableTopLayer",
        categoryId: "topLayer",
      },
      { text: "jackets", id: "jacket", categoryId: "topLayer" },
      { text: "coats", id: "socks", cold: true, categoryId: "topLayer" },
      { text: "raincoat / poncho", id: "raincoat", categoryId: "topLayer" },
      { text: "t-shirts", id: "tShirt", categoryId: "baseLayer" },
      { text: "long sleeves tops", id: "longSleeves", categoryId: "baseLayer" },
      { text: "jeans", id: "jeans", categoryId: "baseLayer" },
      { text: "tracksuit", id: "jeans", warm: true, categoryId: "baseLayer" },
      { text: "leggings", id: "activeWearPants", categoryId: "baseLayer" },
    ],
    accessories: [
      { text: "scarf", id: "scarf" },
      { text: "sun hat", id: "hat", warm: true },
      { text: "beanie", id: "beanie", cold: true },
      { text: "Sun Glasses", id: "sun glasses" },
    ],
    shoes: [{ text: "trainers / comfy shoes", id: "trainers" }],
    activities: {
      text: "swimming costume",
      id: "swimmingCostume",
      categoryId: "swimming",
    },
  },
  {
    type: "basic",
    gender: "male",
    underGarments: [
      { text: "underwear", id: "underwear" },
      { text: "socks", id: "socks" },
      ,
    ],
    topLayer: [
      { text: "fleece / hoodie", id: "comfortableTopLayer" },
      { text: "man jacket", id: "jacket" },
      { text: "man coat", id: "socks" },
      ,
    ],
  },

  //   {
  //     // title: "The Great Gatsby",
  //     // author: "peter",
  //     undergarments: ["underwear, bra, socks,"],
  //     gender: "female",
  //   },
  //   {
  //     title: "Wuthering Heights",
  //     author: "Emily Brontë",
  //   },
];

const resolvers = {
  Query: {
    // // packingLists: () => packingLists,
    // packingLists: (root, args, context) => {
    //   // this returns an array
    //   return packingLists.filter(
    //     (PackingList) => PackingList.gender === args.gender
    //   );
    // },
    // packingLists2: (root, args, context) => {
    //   return packingLists2.filter(
    //     (PackingList) => PackingList.type === args.type
    //   );
    // },
    packingLists: () => packingLists,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
