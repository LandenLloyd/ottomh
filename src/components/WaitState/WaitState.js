import './waitStateStyle.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const WaitState = ({id}) => {
    const navigate = useNavigate();

    let ws;
    
    if (window.location.protocol === 'https:') {
        ws = new WebSocket(`wss://${window.location.host}/sockets/${id}`);
    } else {
        ws = new WebSocket(`ws://${window.location.host}/sockets/${id}`);
    }

    ws.onopen = (_) => {
        alert("websocket is open now");
    }

    ws.onclose = (_) => {
        alert("websocket is closed now");
    }

    ws.onerror = (error) => {
        alert(`WebSocketd error: ${error.message}
        No room exists with this code ${id}`);
        navigate("/");
        ws.close();
    }

    ws.onmessage = (event) => {
        alert(``);
    }

    return(
        <div className="waitState">
            <h1>OTTOMH</h1>
            <div>
                <h2>Code:</h2>
                {id}
                <br/>
                <Button variant="primary">Copy URL</Button>
            </div>
            <div>
                <br/>
                <h2>Players joined:</h2>
                <p>"Players"</p>
            </div>
            <Button variant="primary" type="submit">Start</Button>
            <Button variant="primary" type="button" href="/">Refresh to home</Button>
        </div>
    );
}
