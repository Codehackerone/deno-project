import {Bson} from "../deps.ts";
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
    const questions = await questionCollection.find({ surveyId }, {
      noCursorTimeout: false,
    } as any);
    if (!questions) {
      return [];
    }
    return questions.map((q: any) => Question.prepare(q));
  }

  static async findOne(id: string): Promise<Question | null> {
    const question = await questionCollection.findOne(
      { _id: new Bson.ObjectID(id) },
      { noCursorTimeout: false } as any
    );
    if (!question) {
      return null;
    }
    return Question.prepare(question);
  }

  async create(this: any) {
    delete this.id;
    const oid = await questionCollection.insertOne(this);
    this.id = oid;
    return this;
  }

  public async update(
    text: string,
    type: QuestionType,
    required: boolean,
    data: any
  ) {
    this.text = text;
    this.type = type;
    this.required = required;
    this.data = data;
    await questionCollection.updateOne(
      { _id: this.id },
      {
        $set: {
          text: this.text,
          type: this.type,
          required: this.required,
          data: this.data,
        },
      }
    );
    return this;
  }

  async delete() {
    return questionCollection.deleteOne({ _id: this.id});
  }

  static prepare(data: any): Question {
    data = BaseModel.prepare(data);
    const question = new Question(
      data.surveyId,
      data.text,
      data.type,
      data.required,
      data.data
    );
    question.id = data.id;
    return question;
  }
}

export enum QuestionType {
  TEXT = "text",
  CHOICE = "choice",
}