import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardHeaderBody from "../../Shared/CardHeaderBody/CardHeaderBody";
import { ResultData } from '../ResultData/ResultData';
import { SearchForm } from "../SearchForm/SearchForm";
import { SearchHistory } from '../SearchHistory/SearchHistory';
import './WeatherPage.css';

export const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [history, setHistory] = useState(null);

    useEffect(() => {
        // Clear localStorage when the component is first loaded
        localStorage.clear();
    }, []);

    return (
        <Card>
            <CardHeaderBody header="Today's Weather">
                <SearchForm weatherDetail={setWeatherData} />
                {weatherData ?
                    <ResultData data={weatherData.data} historyData={setHistory} />
                    : null
                }
            </CardHeaderBody>
            <CardHeaderBody header="Search History">
                <SearchHistory data={history} weatherDetail={setWeatherData} />
            </CardHeaderBody>
        </Card>
    )
}