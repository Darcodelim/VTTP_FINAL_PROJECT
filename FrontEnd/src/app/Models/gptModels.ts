export interface GPTResponse{

    Country:string
    Region:string
    Municipal:string|null
    Duration:string
    Start_Date:string
    End_Date:string
    Activities:activity[]
    
    

}

export interface activity{

    Day:string
    Date:string
    Location:string
    Image:string
    Highlights:string[]

}



