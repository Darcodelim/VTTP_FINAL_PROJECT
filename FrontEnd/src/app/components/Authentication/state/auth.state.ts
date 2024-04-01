
//There is no requirment to store the user password and username on the store, thus no state required


export interface LoginState{
    loginStatus:boolean
    username:string|null
}

export const initialLoginState:LoginState={
    loginStatus:false,
    username:null
}

//Need to think whether Do i need to store this
export interface loginErrorState{
    loginError:string|null

}

export const initialLoginErrorState:loginErrorState = {
    loginError:null

}



