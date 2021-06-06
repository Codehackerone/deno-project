import { surveysCollection } from "../mongo.ts";

export default class Survey{
    public id:string="";

    constructor(
        public userId:string,
        public name:string,
        public description:string
    ){}

    create(){
        
    }
}