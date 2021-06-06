import { RouterContext } from "../deps.ts";
import Survey from "../models/Survey.ts";
class SurveyController{
    async getAllForUser(ctx:RouterContext){
        ctx.response.body=[];
    }
    async getSingle(ctx:RouterContext){
    
    }
    async create(ctx:RouterContext){
        const {name,desription}=await ctx.request.body().value;
        const survey=new Survey('1',name,desription);
        await survey.create();
        ctx.response.status=201;
        ctx.response.body=survey;
    }
    async update(ctx:RouterContext){
    
    }
    async delete(ctx:RouterContext){
    
    }
}

const surveyController=new SurveyController();
export default surveyController;