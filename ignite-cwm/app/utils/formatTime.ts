import { formatDate } from "./formatDate";

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
/**
 * Function that returns the time since an event occured. Outputs a string in the following format
 * if time < 60 minutes : return "[number] mins ago".
 * if time < 24 hours : return "[number] hours ago"
 * if time >= 24 hours: return "[number] days ago"
 * 
 * @returns string 
 * @param timeDifferenceMs Current Time in ms minus time of event in ms
 */
export function formatTimeSince(timeDifferenceMs: number) {
    if(timeDifferenceMs < ONE_HOUR) {
        const timeDifInMins = Math.floor(timeDifferenceMs / ONE_MINUTE) 
        return `${timeDifInMins} minute${timeDifInMins !== 1 ? "s": ""} ago`
    } else if (timeDifferenceMs < ONE_DAY) {
        const timeDifInHours = Math.floor(timeDifferenceMs / ONE_HOUR)
        return `${timeDifInHours} hour${timeDifInHours > 1 ? "s": ""} ago`
    } else {
        const timeDifInDays = Math.floor(timeDifferenceMs / ONE_DAY)
        return `${timeDifInDays} day${timeDifInDays > 1? "s": ""} ago`
    }
}
/**
 * 
 * @param time 
 * @returns 
 */
export function formatSentOn(time: Date) {
    if(Date.now() - time.getTime() < ONE_DAY) {
        return time.toLocaleTimeString("en-US", {hour: "numeric", minute: "2-digit", hour12: true})
    }
    else {
        return formatDate(time.toISOString(), "MM/dd/yy")
    }
}
