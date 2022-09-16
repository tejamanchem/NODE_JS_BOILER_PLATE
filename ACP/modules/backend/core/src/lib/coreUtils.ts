import { IQueryResponse } from "./interfaces";
import  {RgExpression}  from "../helper";

/**

 * generates error
 * @param status status code
 * @param message message of the error
 * @returns IQueryResponse object

 */

 export function generateError(status: number, message : string | any, options?:any){
     if(options){
        const regexExpression = new RgExpression();
        message = regexExpression.replaceString(message, options)
    }
    return { status : status, message : message, error : true }
}

/**

 * validates the IQueryResponse object

 * @param response IQueryResponse

 * @returns the response from IQueryResponse

 */

 export function validateResponse(response : IQueryResponse){

    if(response.error){

        throw new Error(response.message);

    }
    return response.response;

}