import { addProductAndImage, addProductToServer, deleteProduct, fetchAllProducts, modifyProduct, sortAllByCategory, sortAllByPrice } from '../../redux/reducers/productReducer';
import { store } from '../../redux/store';
import { Product } from '../../types/common';
import server from '../shared/server';

// Import server from shared, this will be a mock server and would be used when the project start
beforeAll(() => server.listen());
afterAll(() => server.close());

// describe("Test actions", () => {
//   // Starting with initial state
//   test("Initial state", () => expect(store.getState().productReducer.length).toBe(0));

//   // GET all data from product and parse it into product reducer
//   test("Should fetch all", async () => {
//     await store.dispatch(fetchAllProducts());
//     expect(store.getState().productReducer.length).toBe(3);
//   });

//   // Add one more product to product reducer, and POST them all to the server
//   test("Should add product", async () => {
//     // Dummy product to test mock server
//     const newProduct: Product = {
//       id: 236,
//       title: "Incredible Steel Table",
//       price: 273,
//       description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
//       images: ["https://api.lorem.space/image/fashion?w=640&h=480&r=4945", "https://api.lorem.space/image/fashion?w=640&h=480&r=4572", "https://api.lorem.space/image/fashion?w=640&h=480&r=9932"],
//       creationAt: "2023-01-04T12:41:40.000Z",
//       updatedAt: "2023-01-04T12:41:40.000Z",
//       category: {
//         id: 4,
//         name: "Shoes",
//         image: "https://api.lorem.space/image/shoes?w=640&h=480&r=2020",
//         creationAt: "2023-01-03T21:20:03.000Z",
//         updatedAt: "2023-01-03T21:20:03.000Z",
//       },
//     };
//     await store.dispatch(addProductToServer(newProduct));
//   });

//   test("Should fetch all after the add", async () => {
//     await store.dispatch(fetchAllProducts());
//     expect(store.getState().productReducer.length).toBe(4);
//   });

//   test("Should modify the product", async () => {
//     await store.dispatch(modifyProduct({id: 2, update: {price: 999}}));
//     expect((store.getState().productReducer.find((product: Product) => product.id === 2)).price).toBe(999);
//   });

//   test("Should sort by price", () => {
//     store.dispatch(sortAllByPrice("asc"));
//     expect(store.getState().productReducer[0].price).toBe(273);
//   });

//   test("Should sort by category", () => {
//     store.dispatch(sortAllByCategory("asc"));
//   });

//   test("Should delete the added product", async () => {
//     await store.dispatch(deleteProduct(1))
//     expect(store.getState().productReducer.length).toBe(3);
//   })

//   test("Should add product with uploaded images", async () => {
//     const imageArray: File[] = [{
//       lastModified: 0,
//       name: "test file img",
//       webkitRelativePath: "",
//       size: 0,
//       type: "",
//       arrayBuffer: function (): Promise<ArrayBuffer> {
//         throw new Error("Function not implemented.");
//       },
//       slice: function (start?: number | undefined, end?: number | undefined, contentType?: string | undefined): Blob {
//         throw new Error("Function not implemented.");
//       },
//       stream: function () {
//         throw new Error("Function not implemented.");
//       },
//       text: function (): Promise<string> {
//         throw new Error("Function not implemented.");
//       }
//     }]

//     const product: Product = {
//       id: 248,
//       title: "One Two Three",
//       price: 273,
//       description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
//       images: [],
//       creationAt: "2023-01-04T12:41:40.000Z",
//       updatedAt: "2023-01-04T12:41:40.000Z",
//       category: {
//         id: 4,
//         name: "Shoes",
//         image: "https://api.lorem.space/image/shoes?w=640&h=480&r=2020",
//         creationAt: "2023-01-03T21:20:03.000Z",
//         updatedAt: "2023-01-03T21:20:03.000Z",
//       },
//     };
//     await store.dispatch(addProductAndImage({imageArray, product}))
//   })

//   test("Should fetch for the final time", async () => {
//     await store.dispatch(fetchAllProducts());
//     console.log("Final product", store.getState().productReducer)
//     expect(store.getState().productReducer.length).toBe(4);
//   });
// });
