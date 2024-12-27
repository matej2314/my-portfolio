import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../store/auth-context';
import { cmsPages } from "./cmsPages-styles";
import useSendRequest from "../../hooks/useSendRequest";
import { analyticsUrl } from "../../url";
import CmsMenu from "./cms-components/CmsMenu";
import ManageCourses from './cms-components/ManageCourses';
import ManagePosts from './cms-components/ManagePosts';
import ManageProjects from './cms-components/ManageProjects';
import ManageServices from './cms-components/ManageServices';
import ManageSkills from './cms-components/ManageSkills';
import ManageInterests from "./cms-components/ManageInterests";
import ManageAbout from './cms-components/ManageAbout';
import { getSystemColor, getDeviceColor, preparePieChartData } from "../../utils/charts/PieChart";
import { dataCounter } from "../../utils/analyticsDataCounter";
import PieChart from '../charts/PieChart';
import DataList from './cms-components/analytics-data/DataList';
import DisplayData from "./cms-components/analytics-data/DisplayData";

export default function CmsMainPage() {
    const [selectedButton, setSelectedButton] = useState(null);
    const [analyticsData, setAnalyticsData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [eventsCounter, setEventsCounter] = useState({});
    const { isAuthenticated } = useContext(AuthContext);
    const { sendRequest, result, error, isLoading } = useSendRequest();

    const handleSelected = (button) => {
        setSelectedButton(button);
    };

    const handleCloseComponents = () => {
        setSelectedButton(null);
    };

    const selectedComponent = () => {
        switch (selectedButton) {
            case 'courses':
                return <ManageCourses />;
            case 'posts':
                return <ManagePosts />;
            case 'projects':
                return <ManageProjects />;
            case 'services':
                return <ManageServices />;
            case 'skills':
                return <ManageSkills />;
            case 'about':
                return <ManageAbout />;
            case 'interests':
                return <ManageInterests />;
            default:
                return null;
        }
    };

    useEffect(() => {
        const getAnalyticsData = async () => {
            try {
                const response = await sendRequest({
                    url: analyticsUrl,
                    method: 'GET',
                });

                if (!response) {
                    console.log('Brak danych z Google');
                    return;
                }

                if (Array.isArray(response)) {
                    setAnalyticsData(response);

                    const counter = response.reduce((acc, item) => {
                        if (item.eventName) {
                            acc[item.eventName] = (acc[item.eventName] || 0) + 1;
                        }
                        return acc;
                    }, {});

                    setEventsCounter(counter);
                    setIsLoaded(() => true);
                } else {
                    console.log('Odpowiedź z serwera nie jest tablicą:', response);
                }
            } catch (error) {
                console.error("Błąd pobierania danych analitycznych:", error);
            }
        };

        getAnalyticsData();
    }, []);


    const paths = isLoaded && analyticsData.filter((item) => item.pagePath !== undefined).map(item => item.pagePath);
    const devices = isLoaded && analyticsData.map((item) => item.deviceCategory);
    const displaytime = isLoaded && analyticsData.filter((item) => item.engagementRate !== undefined)
        .map(item => item.engagementRate)
        .reduce((acc, item) => acc + parseFloat(item), 0);
    const systems = isLoaded && analyticsData.map((item) => item.operatingSystem);
    const systemCounts = isLoaded && dataCounter(systems);
    const deviceCounts = isLoaded && dataCounter(devices);

    const systemsPieChartData = preparePieChartData(Object.entries(systemCounts), getSystemColor);
    const devicesPieChartData = preparePieChartData(Object.entries(deviceCounts), getDeviceColor);

    isLoaded && console.log(analyticsData);
    isLoaded && console.log(eventsCounter);


    return (
        <>
            {isAuthenticated ? (
                <main className={cmsPages.mainPage.main}>
                    <div className="w-full h-fit flex justify-center">
                        <CmsMenu handleSelected={handleSelected} onClose={handleCloseComponents} />
                    </div>
                    <div className={cmsPages.mainPage.contentWrapper}>
                        {selectedButton ? selectedComponent() : (
                            <div className={cmsPages.mainPage.analyticsWrapper}>
                                <div id="text-values" className={cmsPages.mainPage.text_values}>
                                    <DisplayData data={eventsCounter.first_visit} title={'Unique page views:'} isLoaded={isLoaded} />
                                    <DataList title={'Recent visited pages:'} array={paths} />
                                    <DisplayData data={eventsCounter.download_cv} title={'Number of CV downloads:'} isLoaded={isLoaded} />
                                    <DisplayData title={'Overall views time:'} data={`${parseFloat(displaytime).toFixed(2)} minutes`} isLoaded={isLoaded} />
                                    <DataList title={'Top 10 users devices (types):'} array={devices} />
                                    <DataList title={'Top 10 users OSs:'} array={systems} />
                                </div>
                                <div id="charts" className={cmsPages.mainPage.charts}>
                                    <div className={cmsPages.mainPage.chartWrapper}>
                                        <h2
                                            className={cmsPages.mainPage.chartDivH2}
                                        >
                                            Top 10 user's OSs - chart:
                                        </h2>
                                        <PieChart
                                            width={300}
                                            height={300}
                                            data={systemsPieChartData}
                                            innerRadius={150}
                                            outerRadius={100}
                                        />
                                    </div>
                                    <div className={cmsPages.mainPage.chartWrapper}>
                                        <h2
                                            className={cmsPages.mainPage.chartDivH2}
                                        >
                                            User's device type - chart:
                                        </h2>
                                        <PieChart
                                            width={300}
                                            height={300}
                                            data={devicesPieChartData}
                                            innerRadius={145}
                                            outerRadius={100}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main >
            ) : (
                <main className={cmsPages.mainPage.main}>
                    <CmsMenu handleSelected={handleSelected} onClose={handleCloseComponents} />
                    <div className={cmsPages.mainPage.parWrapper}>
                        <div className={cmsPages.mainPage.paragraph}>
                            <p className={cmsPages.mainPage.titlePar}>msliwowski.net - admin panel</p>
                            <p className={cmsPages.mainPage.linkPar}>Aby skorzystać z panelu,
                                <Link to="/login_admin"
                                    className="text-lime-600 hover:text-white"
                                >
                                    zaloguj się.
                                </Link></p>
                        </div>
                    </div>
                </main>
            )
            }
        </>
    );
}
