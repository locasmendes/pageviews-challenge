export function generateKey(length:number=3){
    const maxLen = 60;
    if(length > maxLen){
        length = maxLen;
    }
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ){
       result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return result;
}