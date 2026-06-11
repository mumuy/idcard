import internationalParser from './module/rule/international.js';
import chinaParser from './module/rule/china.js';
import organizationParser from './module/rule/organization.js';

export default function(id){
    for (const item of [internationalParser,chinaParser,organizationParser]) {
        if(item.match.test(id)){
            return item.parse(id);
        }
    }
    return null;
}