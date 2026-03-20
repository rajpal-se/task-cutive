import { getRefreshAccessTokenApi } from "../apis";
import { LS } from "../constants";

let intervalId: NodeJS.Timeout | null = null;

async function refreshAccessToken(): Promise<string | null> {
    try {
        const refreshToken = localStorage.getItem(LS.REFRESH_TOKEN);
        if (!refreshToken) {
            return null;
        }
        const response = await getRefreshAccessTokenApi();
        const accessToken = response?.data?.accessToken;
        if (accessToken) {
            localStorage.setItem(LS.ACCESS_TOKEN, accessToken);
            return accessToken;
        }
        return null;
    } catch (e) {
        localStorage.removeItem(LS.REFRESH_TOKEN);
        localStorage.removeItem(LS.ACCESS_TOKEN);
        return null;
    }
}

async function startRefreshAccessService() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(refreshAccessToken, 50 * 60 * 1000);
    return await refreshAccessToken();
}

export async function getAccessToken(): Promise<string | null> {
    const accessToken = localStorage.getItem(LS.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(LS.REFRESH_TOKEN);

    if (!refreshToken) {
        return null;
    } else {
        const refreshTokenExp = JSON.parse(
            atob(refreshToken.split(".")[1]),
        ).exp;
        const currentTime = Math.floor(Date.now() / 1000);
        if (refreshTokenExp - currentTime < 12 * 60 * 60) {
            return null;
        }
    }

    if (accessToken) {
        const accessTokenExp = JSON.parse(atob(accessToken.split(".")[1])).exp;
        const currentTime = Math.floor(Date.now() / 1000);
        const diff = Math.abs(accessTokenExp - currentTime);

        const fiveMinutes = 5 * 60;

        if (diff - fiveMinutes > 0) {
            setTimeout(startRefreshAccessService, (diff - fiveMinutes) * 1000);
            return accessToken;
        } else {
            return await startRefreshAccessService();
        }
    }

    return null;
}
