const urlConfig=()=>{
    if(process.env.NODE_ENV === "development"){
        return{
            url: 'http://localhost:4000',
            proxied_url: 'http://localhost:3000',
            GOOGLE_LOGIN_URL:"http://localhost:4000/auth/google",
            FACEBOOK_LOGIN_URL:"http://localhost:4000/auth/facebook",
            GITHUB_LOGIN_URL:"http://localhost:4000/auth/github"
        }      
    }else{
        return{
            url: 'http://localhost:4000',
            proxied_url: 'http://localhost:4000',
            GOOGLE_LOGIN_URL:"http://localhost:4000/auth/google",
            FACEBOOK_LOGIN_URL:"http://localhost:4000/auth/facebook"
        }
    }
}
export default urlConfig();