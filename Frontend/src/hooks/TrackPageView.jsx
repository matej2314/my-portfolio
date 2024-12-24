import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import ReactGA from 'react-ga4';

function TrackPageView() {
    const location = useLocation();
    const startTime = useRef(Date.now());

    useEffect(() => {

        ReactGA.send({
            hitType: 'pageview',
            page: location.pathname + location.search,
        });


        return () => {
            const timeSpent = (Date.now() - startTime.current) / 1000;
            ReactGA.event('time_on_page', { timeSpent });
        };
    }, [location]);

    return null;
}

export default TrackPageView;
