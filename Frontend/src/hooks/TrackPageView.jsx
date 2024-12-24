import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import ReactGA from 'react-ga4';

function TrackPageView() {
    const location = useLocation();
    const startTime = useRef(Date.now());
    const prevLocation = useRef(location.pathname + location.search);

    useEffect(() => {
        if (location.pathname + location.search !== prevLocation.current) {
            ReactGA.send({
                hitType: 'pageview',
                page: location.pathname + location.search,
            });
            prevLocation.current = location.pathname + location.search;
        }

        return () => {
            const timeSpent = (Date.now() - startTime.current) / 1000;
            ReactGA.event('time_on_page', { timeSpent });
        };
    }, [location]);

    return null;
}

export default TrackPageView;
