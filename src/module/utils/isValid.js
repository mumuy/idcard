export default function (code){
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const checkCodeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    code = code.toUpperCase();
    let sum = 0;
    for (let i = 0; i < 17; i++) {
        sum += parseInt(code[i]) * weights[i];
    }
    let mod = sum%checkCodeMap.length;
    return checkCodeMap[mod]==code[17];
}