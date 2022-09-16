import { Logger, LoggerInterface } from "../logger";

const log:LoggerInterface = new Logger(__filename)

export default class RgExpression{
    constructor(){}

    /**
     * Regular Expression method to get the variables from the text
     * @param text message which has custom Arguments. Arguments should be in ${customArgumnet} format
     * @returns list of custom arguments from the text ex: [customArgumnet]
     */
    public getMetaDataKeys(text:any){
        log.info(`collect keys in placeholder from text ${text.substring(0,25)}..... `)
        const regexExpression = new RegExp(/\$\{([^}]+)\}/gm);
        const array = [...text.matchAll(regexExpression)];
        var variable_list:any = array.map((varible) =>{return varible[1]});
        return variable_list;
    }

    /**
     * Regular Expression which replaces the custom arguments with the values inside the text
     * @param text message which has arguments
     * @param metadata object of key value pairs
     * @returns text with values without arguments
     */
    public replaceString(text: string, metadata: { [x: string]: any; }){
        const regexExpression = new RegExp(/\$\{([^}]+)\}/gm);
        const replacedString = text.replace(regexExpression, function(matched){
            matched = matched.replace(/[${}]/gm,'');
            return metadata[matched];
        });
        return replacedString;
    }

    /**
     * get dynamic variables from the text with format {{..{variable}}..}
     * @param text 
     * @returns 
     */
    public getVariablesInCurlyBraces(text:any){
        log.info(`collecting keys in curly Brace from text: ${text.substring(0,25)}..... `)
        const regexExpression = new RegExp(/\{{+([^}]+)\}/gm);
        const array = [...text.matchAll(regexExpression)];
        var variable_list:any = array.map((variable) =>{return variable[1]});
        log.info(`found ${variable_list.length} variables in text: ${text.substring(0,25)}.....`)
        return variable_list;
    }

    /**
     * 
     * @param text 
     * @returns 
     */
    public getAlphanumericValues(text:any) {
        const regexExpression = new RegExp(/[^/?#"'\s.]\w+/gm);
        const array = [...text.matchAll(regexExpression)];
        var variable_list:any = array.map((variable) =>{return variable[0]});
        return variable_list
    }

}