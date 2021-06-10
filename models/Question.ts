import { questionCollection } from "../mongo.ts";
import BaseModel from "./BaseModel.ts";

export default class Question extends BaseModel {
  public id: string = "";
  constructor(
    public surveyId: string,
    public text: string,
    public type: QuestionType,
    public required: boolean,
    public data: any
  ) {
    super();
  }

  static async findBySurvey(surveyId: string): Promise<Question[]> {
    const questions = await questionCollection.find({ surveyId });
    if (!questions) {
      return [];
    }
    return questions.map((q:any)=> Question.prepare(q));
  }

  async create(this: any) {
    delete this.id;
    const oid = await questionCollection.insertOne(this);
    this.id = oid;
    return this;
  }

  static prepare(data: any): Question {
    data = BaseModel.prepare(data);
    const question = new Question(
      data.surveyId,
      data.text,
      data.type,
      data.required,
      data.data,
    );
    question.id = data.id;
    return question;
  }
}

export enum QuestionType {
  TEXT = "text",
  CHOICE = "choice",
}