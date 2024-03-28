import _china from './data/china.js';
import _international from './data/international.js';

export function isValid(id){
    id = id.toLowerCase();
    let id17 = id.substr(0,17);
    let last = id.charAt(17);
    let sum = 0;
    let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    id17.split('').forEach(function(value,index){
        sum += factor[index]*value;
    });
    let lastLetter = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    let mod = sum%lastLetter.length;
    return lastLetter[mod]==last;
};

export function parserInternational(id){
    let result = {};
    result['type'] = '外国人永久居留身份证';
    result['sign'] = _china[id.substring(1,3)+'0000']||'';
    result['country'] = _international[id.substring(3,6)]||'无国籍';
    result['birthday'] = id.substring(6,14).replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3');
    result['sex'] = id.charAt(16)%2?'男':'女';
    result['isValid'] = isValid(id);
    return result;
};

export function parserChina(id){
    let result = {};
    let code = id.substring(0,6);
    let province_code = code.replace(/\d{4}$/,'0000');
    let city_code = code.replace(/\d{2}$/,'00');
    let district_code = code;
    if(code.match(/^(81|82|83)0000/)){
        result['type'] = '港澳台居民居住证';
        result['sign'] = (_china[province_code]||'');
    }else if(code.match(/^(11|12|31|50)\d{4}/)||code.match(/^\d{2}90\d{2}$/)){
        result['type'] = '居民身份证';
        result['sign'] = (_china[province_code]||'') + (city_code!=district_code?(_china[district_code]||''):'');
    }else{
        result['type'] = '居民身份证';
        result['sign'] = (_china[province_code]||'') + (province_code!=city_code?(_china[city_code]||''):'') + (city_code!=district_code?(_china[district_code]||''):'');
    }
    result['country'] = '中国';
    result['birthday'] = id.substring(6,14).replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3');
    result['sex'] = id.charAt(16)%2?'男':'女';
    result['isValid'] = isValid(id);
    return result;
};
