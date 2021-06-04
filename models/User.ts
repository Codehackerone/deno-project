import { usersCollection } from "../mongo.ts";
export default class User{
    static findOne(params: object){
        // var users=await usersCollection.findOne(params);
        return usersCollection.findOne(params,{noCursorTimeout:false} as any);
    }
}``