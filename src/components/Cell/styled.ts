import styled from "styled-components";
import { CellValue } from "../../types";
import { ALIVE, DEAD, colors } from "../../constants";

export const Root = styled.button<{
    value: CellValue;
    rowOffset: number;
    hasEntered: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: transform 0.1s ease-out, background 0.1s ease-out,
  opacity 0.1s linear;
  cursor: pointer;
  border: none;
  margin: 0;
  opacity: ${({ hasEntered }) => (hasEntered ? 1 : 0)};

  background: ${({ value }) => {
    return value === ALIVE ? colors[ALIVE] : colors[DEAD];
  }};

  &:hover,
  &:focus {
    transform: scale(0.9);
    box-shadow: 0 0 11px rgba(33, 33, 33, .2);
  }

  &:active {
    transform: scale(0.9);
    box-shadow: 0 0 11px rgba(33, 33, 33, .2);

  }
`;