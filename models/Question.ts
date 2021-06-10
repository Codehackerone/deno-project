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

  async create(this:any) {
    delete this.id;
    const oid= await questionCollection.insertOne(this);
    this.id = oid;
    return this;
  }
}

export enum QuestionType {
  TEXT = "text",
  CHOICE = "choice",
}