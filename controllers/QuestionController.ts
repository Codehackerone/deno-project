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

  async create(ctx: RouterContext) {
    const surveyId: string = ctx.params.surveyId!;
    const survey = await Question.findOne(surveyId);
    if (!survey) {
      return;
    }
    const { text, type, required, data
    } = await ctx.request.body().value;
    const question = new Question(surveyId, text, type, required, data);
    await question.create();
    ctx.response.status = 201;
    ctx.response.body = question;
  }
}