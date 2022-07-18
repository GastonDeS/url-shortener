import momentz, { isDate } from 'moment-timezone';

export const getEndOfDate = (sDate: Date | string) => {
    return momentz.tz(sDate, 'America/Argentina/Buenos_Aires').endOf('day');
};

export const getStartOfDate = (sDate: Date | string) => {
    if (isDate(sDate) && sDate !== null && !isNaN(new Date(sDate).getTime())) // rarisimo js
        return  momentz.tz(sDate, 'America/Argentina/Buenos_Aires').startOf('day').toDate();
    return undefined;
};