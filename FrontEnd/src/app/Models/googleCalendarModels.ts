export interface authorizationLink{
    authorizationURL:string

}

export interface authorizationStatus
{
    authorizationStatus:boolean;
}

export interface revokeStatus
{
    status:string;
}

export interface eventFormFormat{

    title:string
    startDate:Date
    endDate:Date
}