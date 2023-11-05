import { Search, Trash3 } from 'react-bootstrap-icons';
import ApiService from '../../Service/ApiService';
import './SearchHistory.css';

export const SearchHistory = ({ weatherDetail }) => {
    let data = JSON.parse(localStorage.getItem('history'));

    const handleSearch = (name) => {
        ApiService.getWeatherDetail(name).then(response => {
            if (response.status === 200) {
                weatherDetail(response);
            }
        });
    }

    const handleDelete = (name) => {
        const filteredItem = data.filter(item => item.name !== name);
        localStorage.setItem('history', JSON.stringify(filteredItem));
        window.location.reload(true);
    }

    return (
        data?.length > 0 ? (
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <div className="listItem">
                            <span className="listName">
                                {`${index + 1}. ${item.name}`}
                            </span>
                            <span className="listTimestamp">
                                {item.timestamp}
                                <Search
                                    className="iconButton"
                                    size={25}
                                    onClick={() => handleSearch(item.name)}
                                />
                                <Trash3
                                    className="iconButton"
                                    size={25}
                                    onClick={() => handleDelete(item.name)}
                                />
                            </span>
                        </div>
                        <hr className="line" />
                    </li>
                ))}
            </ul>
        ) :
            <div className="noRecordFound">No Record</div>
    );
}