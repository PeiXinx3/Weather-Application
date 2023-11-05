import './InformationWithinRow.css';

export const InformationWithinRow = ({ label, data }) => {
    return (
        <div className="info-row">
            <span className="label">{label + ':'}</span>
            <span className="spacing">{data}</span>
        </div>
    );
}

export default InformationWithinRow;