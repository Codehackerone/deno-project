import { surveysCollection } from "../mongo.ts";

export default class Survey{
    public id:string="";

    constructor(
        public userId:string,
        public name:string,
        public description:string
    ){}

    async create(this:any){
        delete this.id;
        const oid=await surveysCollection.insertOne(this);
        delete this._id;
        this.id=oid;
        return this;
    }

    static async findByUser(userId:string):Promise<any>{
        let surveys= surveysCollection.find({userId},{noCursorTimeout:false} as any);
        return surveys.toArray();
    }

    static async findById(_id:string):Promise<any>{
        let survey=surveysCollection.findOne({_id},{noCursorTimeout:false} as any);
        return survey;
    }
}