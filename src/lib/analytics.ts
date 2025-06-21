import redis from "@/db/redis";
import {getDate} from "@/lib/utils";
import {parse} from "date-fns";
import {TRACKING_DAYS} from "@/lib/constants/analytics-constant";

export interface   AnalyticsArgs {
retention?: number;
}

export interface TrackOptions {
    persist?: boolean;
}

export class Analytics {
    private retention: number = 60 * 60 * 24* TRACKING_DAYS

    constructor(opts?: AnalyticsArgs) {
        if (opts?.retention) {
            this.retention = opts.retention;
        }
    }

    async track(nameSpace: string, event: object = {}, opts?: TrackOptions) {
        let key = `analytics::${nameSpace}`;

        if( !opts?.persist) {
            key += `::${getDate()}`;
        }

        await redis.hincrby(key, JSON.stringify(event),1)
        if (!opts?.persist) {
            await redis.expire(key, this.retention);
        }
    }

    async retrieveDays(nameSpace: string, nDays: number) {
        type AnalyticsPromise = ReturnType<typeof this.retrieve>
        const promises: AnalyticsPromise[] = [];

        for (let i = 0; i < nDays; i++) {
            const formattedDate = getDate(i)
            const promise = this.retrieve(nameSpace, formattedDate);
            promises.push(promise);
        }

        const data = await Promise.all(promises);
        const result = data.sort((a,b) =>  (parse(a.date, 'yyyy-MM-dd', new Date()).getTime() - parse(b.date, 'yyyy-MM-dd', new Date()).getTime()))

        return result;
    }

    async retrieve(nameSpace: string, date: string) {
        let key = `analytics::${nameSpace}::${date}`;

        const data = await redis.hgetall<Record<string, string>>(key);

        return {
            date,
            events: Object.entries(data ?? []).map(([event, count]) => ({
                [event]: Number(count),
            })),
        }
    }

    async retrieveAll(nameSpace: string) {
        const key = `analytics::${nameSpace}`;
        const data = await redis.hgetall<Record<string, string>>(key)

        return {
            events: Object.entries(data ?? []).map(([event, count]) => ({
                [event]: Number(count),
            }))
        }
    }

    async visitorsByPage(nameSpace: string, page: string, opts?: any): Promise<{[key: string]: number}[] >{
        const allData = await this.retrieveAll(nameSpace);


        const filteredData = allData.events.filter((event) => {
            const eventKey = Object.keys(event)[0];
            const parsedEventKey = JSON.parse(eventKey)
            if(opts?.startsWith) {
                return parsedEventKey.page.startsWith(page)
            } else {
                return parsedEventKey.page === page;
            }
        });


        return filteredData;


    }
}

export const analytics = new Analytics()