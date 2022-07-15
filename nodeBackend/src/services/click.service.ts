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
        return await ClickModel.aggregate([
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
    }
}

export default ClickService;