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
import { mapData, filterData, filterAndMap, countEvents } from "../../utils/modifyAnalyticsData";
import PieChart from '../charts/PieChart';
import BarChart from '../charts/BarChart';
import { formatDataToBar } from "../../utils/charts/barChart.js";
import DataList from './cms-components/analytics-data/DataList';
import DisplayData from "./cms-components/analytics-data/DisplayData";

export default function CmsMainPage() {
    const [selectedButton, setSelectedButton] = useState(null);
    const [analyticsData, setAnalyticsData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [eventsCounter, setEventsCounter] = useState({});
    const { isAuthenticated } = useContext(AuthContext);
    const { sendRequest } = useSendRequest();

    const handleSelected = (button) => {
        setSelectedButton(button);
    };

    const handleCloseComponents = () => {
        setSelectedButton(null);
    };

    const componentMap = {
        courses: <ManageCourses />,
        posts: <ManagePosts />,
        projects: <ManageProjects />,
        services: <ManageServices />,
        skills: <ManageSkills />,
        about: <ManageAbout />,
        interests: <ManageInterests />,
    };

    const selectedComponent = componentMap[selectedButton] || null;

    useEffect(() => {
        const getAnalyticsData = async () => {
            try {
                const response = await sendRequest({
                    url: analyticsUrl,
                    method: 'GET',
                });

                if (Array.isArray(response)) {
                    setAnalyticsData(response);

                    const counter = countEvents(response);

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

    const paths = isLoaded && filterAndMap(analyticsData, (item) => item.pagePath !== undefined, (item) => item.pagePath);
    const devices = isLoaded && mapData(analyticsData, (item) => item.deviceCategory);
    const displaytime = isLoaded && filterAndMap(analyticsData, (item) => item.engagementRate !== undefined, (item) => item.engagementRate)
        .reduce((acc, item) => acc + parseFloat(item), 0);
    const systems = isLoaded && mapData(analyticsData, (item) => item.operatingSystem);
    const firstVisit = isLoaded && filterData(analyticsData, (item) => item.eventName == 'first_visit');

    const systemCounts = isLoaded && dataCounter(systems);
    const deviceCounts = isLoaded && dataCounter(devices);

    const systemsPieChartData = preparePieChartData(Object.entries(systemCounts), getSystemColor);
    const devicesPieChartData = preparePieChartData(Object.entries(deviceCounts), getDeviceColor);
    const visitsLineGraphData = isLoaded && formatDataToBar(firstVisit);

    return (
        <>
            {isAuthenticated ? (
                <main className={cmsPages.mainPage.main}>
                    <div className="w-full h-fit flex justify-center">
                        <CmsMenu handleSelected={handleSelected} onClose={handleCloseComponents} />
                    </div>
                    <div className={cmsPages.mainPage.contentWrapper}>
                        {selectedButton ? selectedComponent : (
                            <div className={cmsPages.mainPage.analyticsWrapper}>
                                <div id="text-values" className={cmsPages.mainPage.text_values}>
                                    {isLoaded && (
                                        <>
                                            <DisplayData data={eventsCounter.first_visit} title={'Unique page views:'} isLoaded={isLoaded} />
                                            <DataList title={'Recent visited pages:'} array={paths} />
                                            <DisplayData data={eventsCounter.download_cv} title={'Number of CV downloads:'} isLoaded={isLoaded} />
                                            <DisplayData title={'Overall views time:'} data={`${parseFloat(displaytime).toFixed(2)} minutes`} isLoaded={isLoaded} />
                                            <DataList title={'Top 10 users devices (types):'} array={devices} />
                                            <DataList title={'Top 10 users OSs:'} array={systems} />
                                        </>
                                    )}
                                </div>
                                <div id="barChart" className="w-full h-full flex flex-col justify-center items-center rounded-md bg-zinc-500/60 py-2">
                                    <h2 className={`${cmsPages.mainPage.chartDivH2} text-xl`}>Recent unique visits:</h2>
                                    {isLoaded && <BarChart width={650} height={400} data={visitsLineGraphData} />}
                                </div>
                                <div id="charts" className={cmsPages.mainPage.charts}>
                                    {isLoaded && (
                                        <>
                                            <div className={cmsPages.mainPage.chartWrapper}>
                                                <h2
                                                    className={`${cmsPages.mainPage.chartDivH2} text-xl`}
                                                >
                                                    Top 10 user's OSs - chart:
                                                </h2>
                                                <PieChart
                                                    width={460}
                                                    height={460}
                                                    data={systemsPieChartData}
                                                    innerRadius={230}
                                                    outerRadius={150}
                                                />
                                            </div>
                                            <div className={cmsPages.mainPage.chartWrapper}>
                                                <h2
                                                    className={`${cmsPages.mainPage.chartDivH2} text-xl`}
                                                >
                                                    User's device type - chart:
                                                </h2>
                                                <PieChart
                                                    width={460}
                                                    height={460}
                                                    data={devicesPieChartData}
                                                    innerRadius={230}
                                                    outerRadius={150}
                                                />
                                            </div>
                                        </>
                                    )}
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
            )}
        </>
    );
}
