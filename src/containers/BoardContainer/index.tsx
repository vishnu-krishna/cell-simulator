import * as React from "react";
import { getCoordsFor } from "../../util/utils";
import Cell from "../../components/Cell";
import { StyledBoardCells, StyledBoardContainer } from "./styled";
import { BoardState } from "../../types";
import { ALIVE, DEAD } from "../../constants";

interface Props {
    boardState: BoardState;
    cols: number;
    rows: number;
    onBoardStateChanged: (newBoardState: BoardState) => void;
}

const replaceAtValue = (list: any, index: number, newValue: any) => {
    const result = [...list];
    result[index] = newValue;
    return result;
};

const BoardContainer = ({ boardState, rows, cols, onBoardStateChanged }: Props) => {
    const handleCellClicked = (index: number) => {
        onBoardStateChanged(
            replaceAtValue(
                boardState,
                index,
                boardState[index] === ALIVE ? DEAD : ALIVE
            )
        );
    };

    return (
        <StyledBoardContainer>
            <StyledBoardCells rows={rows} cols={cols}>
                {boardState.map((value, index) => {
                    const coords = getCoordsFor(index, rows, cols);
                    const rowOffset = coords.row / rows;

                    return (
                        <Cell
                            position={`${coords.row}-${coords.col}`}
                            value={value}
                            key={`${coords.row}-${coords.col}`}
                            rowOffset={rowOffset}
                            onClick={() => handleCellClicked(index)}
                        />
                    );
                })}
            </StyledBoardCells>
        </StyledBoardContainer>

    );
};

export default BoardContainer;
