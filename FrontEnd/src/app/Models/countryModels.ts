export interface Country{
    country:string
    regions:Region[]
}

export interface Region{

    region:string
    municipalities:municipal[]

}

export interface municipal{

    municipal:string
    Iata:string

}