import { Router, RouterContext } from "./deps.ts";
const router = new Router();
import authController from "./controllers/AuthController.ts";
import surveyController from "./controllers/SurveyController.ts";

router
  .get("/", (ctx: RouterContext) => {
    ctx.response.body = "Hello World";
  })
  //For user
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  //For survey
  .get("/api/surveys", surveyController.getAll)
  .get("/api/survey", surveyController.getAllForUser)
  .get("/api/survey/:id", surveyController.getSingle)
  .post("/api/survey", surveyController.create)
  .put("/api/survey/:id", surveyController.update)
  .delete("/api/survey/:id", surveyController.delete);

export default router;
