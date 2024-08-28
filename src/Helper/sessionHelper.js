import cookies from 'js-cookie'
export async function setToken(token){
    const expirationTime = Date.now() + 24*60*60*1000;
    const tokenData = { token, expirationTime };
    localStorage.setItem('token', JSON.stringify(tokenData));
}

export  function getToken(){
    const objectToken= JSON.parse(localStorage.getItem('token'));
    if(objectToken){
        if(Date.now()>objectToken.expirationTime){
            localStorage.clear();
            return null;
        }
        else {
            return objectToken.token;
        }
    }
    else {
        return null;
    }
}

export function removeSession(){
    localStorage.clear();
    window.location.href='/login'
}

export function setOtp(otp){
    cookies.set('otp',otp,{expires:1/288});
}

export function getOtp(){
    return cookies.get('otp');
}

export async function setEmail(email){
    localStorage.setItem('email',email);
}
export async function getEmail(){
    return localStorage.getItem('email');
}

export async function setUserDetails(details){
    localStorage.setItem('userDetails',JSON.stringify(details))
}

export  function getUserDetails(){
    return JSON.parse(localStorage.getItem('userDetails'));
}
