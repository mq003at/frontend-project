import { setupServer } from "msw/node";
import { rest } from "msw";
import { Category, Product, UpdatedProduct } from "../../types/common";
import { AccountCredential, SessionCredential, User } from "../../types/user";
import jwt from "jsonwebtoken";

// Initiate api
let productList: Product[] = [
  {
    id: 1,
    title: "Bespoke Cotton Cheese",
    price: 970,
    description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    images: ["https://api.lorem.space/image/fashion?w=640&h=480&r=1328", "https://api.lorem.space/image/fashion?w=640&h=480&r=1390", "https://api.lorem.space/image/fashion?w=640&h=480&r=7588"],
    creationAt: "2023-01-03T21:20:04.000Z",
    updatedAt: "2023-01-03T21:20:04.000Z",
    category: {
      id: 1,
      name: "nuevo",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=4441",
      creationAt: "2023-01-03T21:20:03.000Z",
      updatedAt: "2023-01-03T22:31:49.000Z",
    },
  },
  {
    id: 2,
    title: "Practical Frozen Bike",
    price: 872,
    description: "The Football Is Good For Training And Recreational Purposes",
    images: ["https://api.lorem.space/image?w=640&h=480&r=400", "https://api.lorem.space/image?w=640&h=480&r=263", "https://api.lorem.space/image?w=640&h=480&r=5425"],
    creationAt: "2023-01-03T21:20:04.000Z",
    updatedAt: "2023-01-03T21:20:04.000Z",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=4933",
      creationAt: "2023-01-03T21:20:03.000Z",
      updatedAt: "2023-01-03T21:20:03.000Z",
    },
  },
  {
    id: 3,
    title: "Ergonomic Bronze Chicken",
    price: 486,
    description: "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    images: ["https://api.lorem.space/image/watch?w=640&h=480&r=8520", "https://api.lorem.space/image/watch?w=640&h=480&r=7601", "https://api.lorem.space/image/watch?w=640&h=480&r=8864"],
    creationAt: "2023-01-03T21:20:04.000Z",
    updatedAt: "2023-01-03T21:20:04.000Z",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=2889",
      creationAt: "2023-01-03T21:20:03.000Z",
      updatedAt: "2023-01-03T21:20:03.000Z",
    },
  },
];

let userList: User[] = [
  {
    id: 1,
    email: "john@mail.com",
    password: "changeme",
    name: "Jhon",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6440",
    creationAt: "2023-01-08T23:40:24.000Z",
    updatedAt: "2023-01-08T23:40:24.000Z",
  },
  {
    id: 2,
    email: "maria@mail.com",
    password: "12345",
    name: "Maria",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=1901",
    creationAt: "2023-01-08T23:40:24.000Z",
    updatedAt: "2023-01-08T23:40:24.000Z",
  },
  {
    id: 3,
    email: "admin@mail.com",
    password: "admin123",
    name: "Admin",
    role: "admin",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=7019",
    creationAt: "2023-01-08T23:40:24.000Z",
    updatedAt: "2023-01-08T23:40:24.000Z",
  },
];

let categoryList: Category[] = [
  {
    id: 1,
    name: "Clothes",
    image: "https://api.lorem.space/image/fashion?w=640&h=480&r=3248",
    creationAt: "2023-01-08T23:40:24.000Z",
    updatedAt: "2023-01-09T22:56:59.000Z",
  },
  {
    id: 2,
    name: "Electronics",
    image: "https://api.lorem.space/image/watch?w=640&h=480&r=9458",
    creationAt: "2023-01-08T23:40:24.000Z",
    updatedAt: "2023-01-08T23:40:24.000Z",
  },
  {
    id: 3,
    name: "Furniture",
    image: "https://api.lorem.space/image/furniture?w=640&h=480&r=9523",
    creationAt: "2023-01-08T23:40:24.000Z",
    updatedAt: "2023-01-09T22:57:09.000Z",
  },
];

// Stock function to randomize string
function makeid(length: number) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Initiating mock server, with get / post / update / etc... method
const handler = [
  // GET request, return mock data
  rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    return res(ctx.json(productList));
  }),

  // POST request, replace data in server with the input data from req
  rest.post("https://api.escuelajs.co/api/v1/products", async (req, res, ctx) => {
    const product: Product = await req.json();
    if (product.price < 0) return res(ctx.status(400, "Invalid data. Price should not be negative."));
    else {
      productList.push(product);
      return res(ctx.json(product));
    }
  }),

  // PUT request, replace data in server with the input data from req
  rest.put(`https://api.escuelajs.co/api/v1/products/:id`, async (req, res, ctx) => {
    const update: Partial<Product> = await req.json();
    const id = parseInt(req.params.id as string);
    const foundProduct = productList.find((i) => i.id === id);
    if (!foundProduct) return res(ctx.status(404, "Cannot find product id"));
    else {
      productList = productList.map((item) => (item.id === id ? { ...foundProduct, ...update } : item));
      return res(ctx.json({ ...foundProduct, ...update }));
    }
  }),

  // DELETE request, replace data in server with the input data from req
  rest.delete(`https://api.escuelajs.co/api/v1/products/:id`, async (req, res, ctx) => {
    const id = parseInt(req.params.id as string);
    const foundProduct = productList.find((item) => item.id === id);
    if (!foundProduct) return res(ctx.status(404, "Cannot find id"));
    else {
      productList = productList.filter((item) => item.id !== id);
      return res(ctx.json({ message: "Product deleted successfully" }));
    }
  }),

  // POST request to upload images
  rest.post(`https://api.escuelajs.co/api/v1/files/upload`, async (req, res, ctx) => {
    const file = await req.json();
    const name = makeid(4);
    return res(
      ctx.json({
        originalname: `Djhv7NO - Imgur.png`,
        filename: `${name}.png`,
        location: `https://api.escuelajs.co/api/v1/files/${name}.png`,
      })
    );
  }),

  // GET all users
  rest.get(`https://api.escuelajs.co/api/v1/users`, async (req, res, ctx) => {
    return res(ctx.json(userList));
  }),

  // LOGIN auth
  rest.post(`https://api.escuelajs.co/api/v1/auth/login`, async (req, res, ctx) => {
    const account: AccountCredential = await req.json();
    const foundUser = userList.find((user) => user.email === account.email && user.password === account.password);
    if (!foundUser) return res(ctx.status(401, "Unauthorized"));
    else {
      const access_token = jwt.sign(foundUser, "accesskeymock");
      const refresh_token = jwt.sign(foundUser, "refreshkeymock");
      return res(ctx.json({ access_token, refresh_token } as SessionCredential));
    }
  }),

  // LOGIN
  rest.get(`https://api.escuelajs.co/api/v1/auth/profile`, async (req, res, ctx) => {
    const access_token_arr = await req.headers.get("Authorization")?.split(" ");
    if (!access_token_arr) return res(ctx.status(401, "Unauthorized"));
    else {
      const access_token = access_token_arr[1];
      const foundUser = jwt.verify(access_token, "accesskeymock");
      return res(ctx.json(foundUser));
    }
  }),

  // Get all category
  rest.get(`https://api.escuelajs.co/api/v1/categories`, async (req, res, ctx) => {
    return res(ctx.json(categoryList));
  }),

  // Add new cat
  rest.post(`https://api.escuelajs.co/api/v1/categories`, async (req, res, ctx) => {
    let data: Category = await req.json();
    data.id = categoryList.length + 1;
    categoryList.push(data);
    return res(ctx.json(data));
  }),

  // Update the cat
  rest.put(`https://api.escuelajs.co/api/v1/categories/:id`, async (req, res, ctx) => {
    const update: Partial<Category> = await req.json();
    const id = parseInt(req.params.id as string);
    const foundCat = categoryList.find((i) => i.id === id);
    if (!foundCat) return res(ctx.status(404, "Cannot find product id"));
    else {
      const updatedCat = { ...foundCat, ...update };
      categoryList = categoryList.map((item) => (item.id === id ? updatedCat : item));
      return res(ctx.json(updatedCat));
    }
  }),

  // Get all category
  rest.get(`https://api.escuelajs.co/api/v1/categories`, async (req, res, ctx) => {
    return res(ctx.json(categoryList));
  }),
];

const server = setupServer(...handler);
export default server;
