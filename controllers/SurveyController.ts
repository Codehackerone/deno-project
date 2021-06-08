import { RouterContext } from "../deps.ts";
import Survey from "../models/Survey.ts";
class SurveyController{
    async getAllForUser(ctx:RouterContext){
        let surveys=await Survey.findByUser("1");
        ctx.response.body=surveys;
    }
    async getSingle(ctx:RouterContext){
        const id=ctx.params.id!;
        const survey=await Survey.findById(id);
        if(!survey)
        {
            ctx.response.status=404;
            ctx.response.body={message:"Incorrect ID"};
            return;
        }
        ctx.response.body=survey;   
    }
    async create(ctx:RouterContext){
        const {name,description}=await ctx.request.body().value;
        const survey=new Survey('1',name,description);
        await survey.create();
        ctx.response.status=201;
        ctx.response.body=survey;
    }
    async update(ctx:RouterContext){
        const id: string = ctx.params.id!;
        const {name,description}=await ctx.request.body().value;
        const survey: Survey | null =await Survey.findById(id);
        if(!survey){
            ctx.response.status=404;
            ctx.response.body={message:"Survey not found"};
            return; 
        } 
        await survey.update({name,description});
        ctx.response.body={message:"survey updated",survey};
        return;
    }
    async delete(ctx:RouterContext){
    
    }
}

const surveyController=new SurveyController();
export default surveyController;