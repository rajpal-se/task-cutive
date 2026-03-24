import { useEffect, useState } from "react";

function getCountdownLabel(dueDate: Date, nowMs: number, isCompleted: boolean) {
    if (isCompleted) {
        return "Completed";
    }

    const dueMs = dueDate?.getTime();
    if (!Number.isFinite(dueMs)) {
        return "Remaining: -";
    }

    const diffSeconds = Math.ceil((dueMs - nowMs) / 1000);
    const isOverdue = diffSeconds < 0;
    const totalSeconds = Math.abs(diffSeconds);

    const MINUTE = 60;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;

    let value = 0;
    let unit = "secs";

    if (totalSeconds >= YEAR) {
        value = Math.ceil(totalSeconds / YEAR);
        unit = value === 1 ? "year" : "years";
    } else if (totalSeconds >= MONTH) {
        value = Math.min(12, Math.ceil(totalSeconds / MONTH));
        unit = value === 1 ? "month" : "months";
    } else if (totalSeconds >= DAY) {
        value = Math.min(30, Math.ceil(totalSeconds / DAY));
        unit = value === 1 ? "day" : "days";
    } else if (totalSeconds >= HOUR) {
        value = Math.min(24, Math.ceil(totalSeconds / HOUR));
        unit = value === 1 ? "hour" : "hours";
    } else if (totalSeconds >= MINUTE) {
        value = Math.min(60, Math.ceil(totalSeconds / MINUTE));
        unit = value === 1 ? "min" : "mins";
    } else {
        value = Math.min(60, totalSeconds);
        unit = value === 1 ? "sec" : "secs";
    }

    if (isOverdue) {
        return `Overdue by: ${value} ${unit}`;
    }

    return `Remaining: ${value} ${unit}`;
}

export function useCountdown(dueDate: Date, isCompleted: boolean) {
    const [nowMs, setNowMs] = useState(() => Date.now());

    useEffect(() => {
        const timer = window.setInterval(() => {
            setNowMs(Date.now());
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    return getCountdownLabel(dueDate, nowMs, isCompleted);
}
