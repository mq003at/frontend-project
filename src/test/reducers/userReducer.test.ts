import { authCredential, fetchAllUsers, loginUser, userReducer } from "../../redux/reducers/userReducer";
import server from "../shared/server";
import { store } from "../../redux/store";
import { AccountCredential } from "../../types/user";

// Import server from shared, this will be a mock server and would be used when the project start
beforeAll(() => server.listen());
afterAll(() => server.close());

// describe("Test userReducer", () => {
//   test("Should return initial state", () => {
//     expect(store.getState().userReducer.userList.length).toBe(0);
//   });

//   test("Should fetch all users", async () => {
//     await store.dispatch(fetchAllUsers());
//     expect(store.getState().userReducer.userList.length).toBe(3);
//     console.log(store.getState().userReducer.userList)
//   });

//   test("Should login user", async () => {
//     const credential: AccountCredential = {
//       email: "john@mail.com",
//       password: "changeme"
//     }
//     await store.dispatch(authCredential(credential))
//     const access_token = store.getState().userReducer.session?.access_token as string
//     await store.dispatch(loginUser(access_token))
//     expect(store.getState().userReducer.currentUser?.email).toBe("john@mail.com")
//   })
// });
