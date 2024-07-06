import { AuthController } from "./controllers/auth";
import { CategoryController } from "./controllers/category";
import { ClientController } from "./controllers/client";
import { httpServer } from "./services";

const controllers = [
  new AuthController(),
  new CategoryController(),
  new ClientController(),
];

controllers.forEach((controller) => controller.route(httpServer));
