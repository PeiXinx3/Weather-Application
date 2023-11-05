import moment from 'moment';
import { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle } from 'react-bootstrap';
import InformationWithinRow from "../../Shared/InformationWithinRow/InformationWithinRow";
import './ResultData.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ResultData = ({ data, historyData }) => {
    const currentTime = new Date();
    const formattedDate = moment(currentTime).format('YYYY-MM-DD hh:mm A');
    const formattedTime = moment(currentTime).format('hh:mm:ss A');

    const iconPath = `/icons/${data.weather[0].icon}.png`;

    // Load history from localStorage on component mount or initialize with an empty array
    let storedHistory = JSON.parse(localStorage.getItem('history'));
    if (!storedHistory) {
        storedHistory = [];
        localStorage.setItem('history', JSON.stringify(storedHistory));
    }

    const [history, setHistory] = useState(storedHistory);

    useEffect(() => {
        const newHistoryEntry = {
            name: data.name + ', ' + data.sys.country,
            timestamp: formattedTime,
        };

        // Check if an entry with the same name already exists in the history
        const existingEntryIndex = history.findIndex(entry => entry.name === newHistoryEntry.name);

        if (existingEntryIndex !== -1) {
            // Replace the existing entry's timestamp with the new timestamp
            const updatedHistory = [...history];
            updatedHistory[existingEntryIndex].timestamp = newHistoryEntry.timestamp;

            // Convert timestamps to 24-hour format and sort in descending order
            const sortedHistory = updatedHistory.sort((a, b) => {
                const timeA = a.timestamp.replace(' AM', '').split(':');
                const timeB = b.timestamp.replace(' AM', '').split(':');

                const dateA = new Date(0, 0, 0, parseInt(timeA[0], 10), parseInt(timeA[1], 10), parseInt(timeA[2], 10));
                const dateB = new Date(0, 0, 0, parseInt(timeB[0], 10), parseInt(timeB[1], 10), parseInt(timeB[2], 10));

                return dateB - dateA
            });
            setHistory(sortedHistory);
        } else {
            // Add the new entry to the history
            setHistory([newHistoryEntry, ...history]);
        }

        localStorage.setItem('history', JSON.stringify(history));

    }, [data]);

    useEffect(() => {

        historyData(history)
        localStorage.setItem('history', JSON.stringify(history));

    }, [history]);

    return (
        <Card style={{ border: 0, marginLeft: '15px', fontSize: '12px' }}>
            <span>{data.name + ', ' + data.sys.country}</span>
            <CardTitle className="resultCardTitle">
                {data.weather[0].main}
                <img src={iconPath} alt="Icon" className="weatherIcon" />
            </CardTitle>
            <CardBody className="resultCardBody">
                <InformationWithinRow label="Description" data={data.weather[0].description} />
                <InformationWithinRow label="Temperature" data={data.main.temp_min + '°C ~ ' + data.main.temp_max + '°C'} />
                <InformationWithinRow label="Humidity" data={data.main.humidity + '%'} />
                <InformationWithinRow label="Time" data={formattedDate} />
            </CardBody>
        </Card>
    )
}