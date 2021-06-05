import { usersCollection } from "../mongo.ts";
export default class User{
    public id:String;
    public name:String;
    public email:String;
    public password:String;

    constructor({id="",name="",email="",password=""}){
        this.id=id;
        this.email=email;
        this.name=name;
        this.password=password;
    }

    static findOne(params: object){
        return usersCollection.findOne(params,{noCursorTimeout:false} as any);
    }

    async save(this:any){
        delete this.id;
        const oid=await usersCollection.insertOne(this);
        this.id=oid;
        return this;
    }
}