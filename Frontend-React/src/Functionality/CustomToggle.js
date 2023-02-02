import { Button, useAccordionButton } from "react-bootstrap";

export default function CustomToggle({ children, eventKey }) {
    return (
        <Button onClick={useAccordionButton(eventKey, () => { })} variant="outline-success shadow" className="btn" >
            {children}
        </Button>
    );
}