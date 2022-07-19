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

    getHistogram = async (shortUrl: string) => {
        const histogram = await ClickModel.aggregate([
            {$match:
                {'shortUrl': shortUrl}
            },
            { 
                "$group": {
                    _id: {
                        $dateTrunc: { 
                            date:  "$accessDate", unit: "minute"}
                        }
                    , count: {$sum:1}
                }
            }
        , {
            $sort: {_id: -1}
        }
            ]).exec();
        const totalCount = histogram.map(data => data.count).reduce((count, sum) => count + sum, 0);
        return {histogram, totalCount};
    }
}

export default ClickService;