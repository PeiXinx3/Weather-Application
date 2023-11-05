import Card from 'react-bootstrap/Card';
import './CardHeaderBody.css';

export const CardHeaderBody = ({ header, children }) => {
    return (
        <>
            <Card.Header>
                {header}
            </Card.Header>
            <Card.Body>
                {children}
            </Card.Body>
        </>
    );
}

export default CardHeaderBody;