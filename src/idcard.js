import {parserInternational,parserChina} from './module/method.js';

export default function(id){
    if(id.match(/^9\d{16}[0-9xX]$/)){
        return parserInternational(id);
    }else if(id.match(/^\d{17}[0-9xX]$/)){
        return parserChina(id);
    }else{
        return null;
    }
};
