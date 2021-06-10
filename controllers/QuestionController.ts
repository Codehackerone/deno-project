import { RouterContext } from "../deps.ts";
import Question from "../models/Question.ts";
export class QuestionController {
  async getBySurvey(ctx: RouterContext) {
    const surveyId: string = ctx.params.surveyId!;
    const survey = await Question.findOne(surveyId);
    if (survey) {
      ctx.response.body = await Question.findBySurvey(surveyId);
    }
  }
}