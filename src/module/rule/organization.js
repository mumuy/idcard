import _china from '../data/china.js';
import _organization from '../data/organization.js';

export default {
    match:/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{9}[0-9A-Z]$/,
    parse(code){
        const result = {};
        const sign_code = code.slice(0,1);
        const organization_code = code.slice(0,2);
        const district_code = code.slice(2,8);
        result['type'] = '统一社会信用代码';
        result['sign'] = _organization[sign_code]||'';
        result['organization'] = _organization[organization_code]||'';
        result['location'] = _china[district_code]||'';
        result['isValid'] = this.isValid(code);
        return result;
    },
    isValid(code){
        const values = {
            '0':0,
            '1':1,
            '2':2,
            '3':3,
            '4':4,
            '5':5,
            '6':6,
            '7':7,
            '8':8,
            '9':9,
            'A':10,
            'B':11,
            'C':12,
            'D':13,
            'E':14,
            'F':15,
            'G':16,
            'H':17,
            'J':18,
            'K':19,
            'L':20,
            'M':21,
            'N':22,
            'P':23,
            'Q':24,
            'R':25,
            'T':26,
            'U':27,
            'W':28,
            'X':29,
            'Y':30,
        };  // 前17位字符值
        const weights = [1,3,9,27,19,26,16,17,20,29,25,13,8,24,10,30,28]; // 前17位权重
        const checkCodeMap = Object.keys(values);
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            const char = code[i];
            sum += values[char] * weights[i];
        }
        const mod = sum % checkCodeMap.length;
        return checkCodeMap[checkCodeMap.length - mod] == code[17];
    }
}