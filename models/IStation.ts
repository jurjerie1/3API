export interface NewStation {
    name: String, 
    open_hour: String, 
    close_hour: String, 
    image: String,
}

export interface Station extends NewStation {
    _id: string
}