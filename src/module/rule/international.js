import _china from '../data/china.js';
import _international from '../data/international.js';
import isValid from '../utils/isValid.js';

export default {
    match:/^9\d{16}[0-9X]$/,
    parse(code){
        const result = {};
        const province_code = code.slice(1,3)+'0000';
        const country_code = code.slice(3,6);
        result['type'] = '外国人永久居留身份证';
        result['sign'] = _china[province_code]||'';
        result['country'] = _international[country_code]||'无国籍';
        result['birthday'] = code.slice(6,14).replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3');
        result['sex'] = code[16]%2?'男':'女';
        result['isValid'] = this.isValid(code);
        return result;
    },
    isValid
}