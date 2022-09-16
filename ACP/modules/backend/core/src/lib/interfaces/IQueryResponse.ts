//this interface will be used to return response from service to indicate errors , messages, valid response
export interface IQueryResponse {
    //status of that operation
    status?: number;

    //message to user
    message?: string | any;

    //valid response on successful operation
    response?: any;

    //if any error occurs
    error?: boolean;

    //whole error object to throw
    errorObj?:{};
}