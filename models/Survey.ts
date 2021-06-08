import { surveysCollection } from "../mongo.ts";
import BaseModel from "./BaseModel.ts";

export default class Survey extends BaseModel{
    public id:string="";

    constructor(
        public userId:string,
        public name:string,
        public description:string
    ){
        super();
        this.userId = userId;
        this.name = name;
        this.description = description;
    }

    async create(this:any){
        delete this.id;
        const oid=await surveysCollection.insertOne(this);
        delete this._id;
        this.id=oid;
        return this;
    }

    static async findByUser(userId:string):Promise<Survey[]>{
        let surveys= surveysCollection.find({userId},{noCursorTimeout:false} as any);
        return surveys.map((survey:any) => Survey.prepare(survey));
    }

    static async findById(_id:string):Promise<Survey|null>{
        let survey=surveysCollection.findOne({_id},{noCursorTimeout:false} as any);
        if(!survey)return null;
        else return Survey.prepare(survey);
    }

    async update({ name, description }: { name: string; description: string }):Promise<Survey> {
        const { modifiedCount } = await surveysCollection.updateOne({ _id:this.id  }, {
            $set: { name, description },
          });
        if (modifiedCount > 0) {
          this.name = name;
          this.description = description;
        }
        return this;
      }

    static prepare(data: any): Survey {
        data = BaseModel.prepare(data);
        const survey = new Survey(
          data.userId,
          data.name,
          data.description,
        );
        survey.id = data.id;
        return survey;
      }
}