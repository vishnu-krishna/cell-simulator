import React, { useCallback, useState } from "react";
import { BoardState, GameState } from "../../types";
import { getNextGeneration, emptyGameState } from "../../util/utils";
import ButtonContainer from "../../containers/ButtonContainer";
import { StyledMainContainer } from "./styled";
import BoardContainer from '../../containers/BoardContainer';

function App() {
    const [rows, setRows] = useState<number>(emptyGameState.rows);
    const [cols, setCols] = useState<number>(emptyGameState.cols);
    const [boardState, setBoardState] = useState<BoardState>(
        emptyGameState.boardState
    );

    const setGameState = (gameState: GameState) => {
        setBoardState(gameState.boardState);
        setRows(gameState.rows);
        setCols(gameState.cols);
    };

    const resetBoard = () => {
        setGameState(emptyGameState);
    };

    const step = useCallback(
        () => setBoardState(getNextGeneration(boardState, rows, cols)),
        [setBoardState, boardState, rows, cols]
    );
    return (
        <StyledMainContainer>
            <BoardContainer
                boardState={boardState}
                cols={cols}
                rows={rows}
                onBoardStateChanged={setBoardState}
            />
            <ButtonContainer
                onStep={step}
                onResetBoard={resetBoard}
                rows={rows}
                cols={cols}
            />
        </StyledMainContainer>
    );
}

export default App;
