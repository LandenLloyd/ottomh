import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../store";
import { WaitState, Game, Scores, Voting } from "../";

export const LobbyPage = () => {
    const { lobbyId } = useParams();
    const [stage, setStage] = useState("waitingRoom");
    const ws = useStore((state) => state.socket);
    
    const category = [
        "Food",
        "Animal",
        "Game",
        "Tech"
    ];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let cat = category[Math.floor(Math.random() * category.length)];
    let letter = characters[Math.floor(Math.random() * characters.length)];

    ws.onopen = (_) => {
        alert("websocket is open now");
    }

    ws.onclose = (_) => {
        alert("websocket is closed now");
    }

    return (
        <div className="container-fluid h-100">
            {stage === "waitingRoom" && <WaitState onStart={() => setStage("playGame")} id={lobbyId} />}

            {stage === "playGame" && <Game onTimeover={() => setStage("voting")} cat={cat} letter={letter} ws={ws}/>}

            {stage === "voting" && <Voting onTimeover={() => setStage("scores")} 
                words={['Lorem', 'Ipsum', 'is', 'simply', 'dummy', 'text', 'of', 'the', 'printing', 'and', 'typesetting',
                        'industry', 'The', 'first', 'list', 'was', 'too', 'short', 'for', 'testing', 'scroll', 'so',
                        'here', 'I', 'am', 'manually', 'extending', 'it']}/>}

            {stage === "scores" && <Scores />}
        </div>
    );
};