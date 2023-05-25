import { useEffect, useContext } from "react";
import useRefreshToken from "./useRefreshToken";
import { API } from "../Middleware/api";
import { UserContext } from "../Context";

const usePrivate = () => {
    const refresh = useRefreshToken();
    const { user } = useContext(UserContext);

    useEffect(() => {
        const requestIntercept = API.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        )
        const responseIntercept = API.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return API(prevRequest);
                }
                return Promise.reject(error);
            }
        )

        return () => {
            API.interceptors.request.eject(requestIntercept);
            API.interceptors.response.eject(responseIntercept);
        }
    }, [user, refresh]);

    return API;
}

export default usePrivate;