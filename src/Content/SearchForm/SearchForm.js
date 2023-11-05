import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ApiService from '../../Service/ApiService';
import FormInput from '../../Shared/FormInput/FormInput';
import './SearchForm.css';

export const SearchForm = ({ weatherDetail }) => {
    const [cityValue, setCityValue] = useState("");
    const [countryValue, setCountryValue] = useState("");
    const [error, setError] = useState('');

    const handleSearch = () => {
        ApiService.getWeatherDetail(cityValue + ',' + countryValue).then(response => {
            if (response.status === 200) {
                weatherDetail(response);
                setError(null)
            } else {
                setError('Please key in the correct city or country');
            }
        });
    }

    const handleClear = () => {
        setCityValue('');
        setCountryValue('');
    }

    return (
        <Form>
            <div className="row">
                <FormInput label="City" value={cityValue} setValue={setCityValue} />
                <FormInput label="Country" value={countryValue} setValue={setCountryValue} />
                <div className="col">
                    <Button className="onClickButton" onClick={handleSearch}>Search</Button>
                    <Button className="onClickButton" onClick={handleClear}>Clear</Button>
                </div>
            </div>
            {error ?
                <Form.Control.Feedback className="errorMessage" type="invalid">{error}
                </Form.Control.Feedback>
                : null
            }
        </Form>
    )
}