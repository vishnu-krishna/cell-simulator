import styled from "styled-components";

import { CELL_GAP, CELL_SIDE_LENGTH } from "../../constants";

export const StyledBoardCells = styled.div<{ rows: number; cols: number }>`
  display: grid;
  grid-template-rows: repeat(${props => props.rows}, ${CELL_SIDE_LENGTH}px);
  grid-template-columns: repeat(${props => props.cols}, ${CELL_SIDE_LENGTH}px);
  grid-gap: ${CELL_GAP}px;
`;

export const StyledBoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
