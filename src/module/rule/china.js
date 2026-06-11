import _china from '../data/china.js';
import isValid from '../utils/isValid.js';

export default {
    match:/^\d{17}[0-9X]$/,
    parse(code){
        const result = {};
        const district_code = code.slice(0,6);
        const province_code = district_code.replace(/\d{4}$/,'0000');
        const city_code = district_code.replace(/\d{2}$/,'00');
        if(district_code.match(/^(81|82|83)0000/)){
            result['type'] = '港澳台居民居住证';
            result['sign'] = (_china[province_code]||'');
        }else if(district_code.match(/^(11|12|31|50)\d{4}/)||district_code.match(/^\d{2}90\d{2}$/)){
            result['type'] = '居民身份证';
            result['sign'] = (_china[province_code]||'') + (city_code!=district_code?(_china[district_code]||''):'');
        }else{
            result['type'] = '居民身份证';
            result['sign'] = (_china[province_code]||'') + (province_code!=city_code?(_china[city_code]||''):'') + (city_code!=district_code?(_china[district_code]||''):'');
        }
        result['country'] = '中国';
        result['birthday'] = code.slice(6,14).replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3');
        result['sex'] = code.charAt(16)%2?'男':'女';
        result['isValid'] = this.isValid(code);
        return result;
    },
    isValid
}