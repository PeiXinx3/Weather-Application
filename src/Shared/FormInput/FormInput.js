import { FormControl, FormLabel } from 'react-bootstrap';
import './FormInput.css';

export const FormInput = ({ label, value, setValue }) => {
    return (
        <div className="col">
            <FormLabel>{label + ':'} </FormLabel>
            <FormControl
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

export default FormInput;