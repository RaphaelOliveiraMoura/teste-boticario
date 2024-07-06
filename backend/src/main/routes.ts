import { AuthController } from "./controllers/auth";
import { CategoryController } from "./controllers/category";
import { ClientController } from "./controllers/client";
import { OrderController } from "./controllers/order";
import { ProductController } from "./controllers/product";
import { httpServer } from "./server";

const controllers = [
  new AuthController(),
  new CategoryController(),
  new ClientController(),
  new ProductController(),
  new OrderController(),
];

controllers.forEach((controller) => controller.route(httpServer));
