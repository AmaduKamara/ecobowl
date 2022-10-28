const formater = require('currency-formatter');
const day = require("dayjs");

export const EMPTY_UUID = '00000000-0000-0000-0000-000000000000';

export const MonthFormater = (value) => {
    return day(value).format('YYYY-MM');
}

export const DateFormater = (value) => {
    return day(value).format('DD-MM-YYYY');
}

export const SalesFormater = (value) => {
    return day(value).format('YYYY-MM-DD');
}

export const ToLeones = (data) => {
    return formater.format(data, { code: 'SLL' }).replace('Le', 'Le ').replace('.00', '');
}

export const GuidGenerator = () => {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}