import axios from 'axios';

const OPEN_WEATHER_API = 'https://api.openweathermap.org/';
const API_KEY = '3b8c2836f7ef226db7b0ec6ce489d347';
const getRequest = async url => {
    return axios.get(url).catch(err => { return err });

}

const GET_WEATHER_DETAIL = OPEN_WEATHER_API + '/data/2.5/weather?q='

class ApiService {
    getWeatherDetail = query => getRequest(GET_WEATHER_DETAIL + query + '&appid=' + API_KEY);

}

export default new ApiService();
