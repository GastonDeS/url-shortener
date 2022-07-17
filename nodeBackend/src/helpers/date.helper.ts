import momentz from 'moment-timezone';

export const getEndOfDate = (sDate: Date | string) => {
    return momentz.tz(sDate, 'America/Argentina/Buenos_Aires').endOf('day');
};

export const getStartOfDate = (sDate: Date | string) => {
    return momentz.tz(sDate, 'America/Argentina/Buenos_Aires').startOf('day');
};