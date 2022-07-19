import moment from "moment";
import { HISTOGRAM_INTERVALS } from "../constants/general.constant";
import ClickModel from "../models/click.model";

class ClickService {
    private static instance: ClickService;


    static getInstance = () => {
        if (!ClickService.instance) {
            ClickService.instance = new ClickService();
        }
        return ClickService.instance;
    };

    createClick = async (shortUrl: string) => {
        const now = Date();
        return await ClickModel.create({shortUrl, accessDate: now});
    }

    getShortUrlClicks = async (shortUrl: string) => {
        return await ClickModel.count({shortUrl});
    }

    getHistogram = async (shortUrl: string, interval: HISTOGRAM_INTERVALS ) => {
        if (interval === HISTOGRAM_INTERVALS.MONTH) {
            const histogram = await ClickModel.aggregate([
                {$match:
                    {'shortUrl': shortUrl}
                },
                { 
                    "$group": {
                        _id: {
                            $dateTrunc: { 
                                date:  "$accessDate", unit: "month"}
                            }
                        , count: {$sum:1}
                    }
                }
            , {
                $sort: {_id: -1}
            }
            ]).exec();
            const histogramRes = histogram.map(data => {
                data.date = moment(data._id).format('YYYY-MM');
                data.clicks = data.count;
                data.count = undefined;
                data._id = undefined;
                return data;
            });
            const totalCount = histogram.map(data => data.clicks).reduce((count, sum) => count + sum, 0);
            return {histogram: histogramRes, totalCount};
        } else {
            const histogram = await ClickModel.aggregate([
                {$match:
                    {'shortUrl': shortUrl}
                },
                { 
                    "$group": {
                        _id: {
                            $dateTrunc: { 
                                date:  "$accessDate", unit: "day"}
                            }
                        , count: {$sum:1}
                    }
                }
            , {
                $sort: {_id: -1}
            }
            ]).exec();
            const histogramRes = histogram.map(data => {
                data.date = moment(data._id).format('MM-DD');
                data.clicks = data.count;
                data.count = undefined;
                data._id = undefined;
                return data;
            });
            const totalCount = histogram.map(data => data.clicks).reduce((count, sum) => count + sum, 0);
            return {histogram: histogramRes, totalCount};
        }
        
        
    }
}

export default ClickService;