let EmailRegx= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let MobileRegx=/^(?:\+?88)?01[3-9]\d{8}$/;

export function isEmail(value){
    return !EmailRegx.test(value)
}

export function isNumber(value){
    return !MobileRegx.test(value);
}

export function isEmpty(value){
    return value.length===0;
}

export function is6digitPass(value){
    return value.length<6
}

export const getBase64 =async (file) => new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject('Error: ', error);
})