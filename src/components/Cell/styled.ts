import styled from "styled-components";
import { shadeColor } from "../../util/color";
import { CellValue } from "../../types";
import { ALIVE, DEAD, colors } from "../../constants";

const gradientStrengthCoefficient = 0.4;

const gradientBrightnessShift = -0.2;

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
  opacity: ${props => (props.hasEntered ? 1 : 0)};

  background: ${props => {
    const baseColor = props.value === ALIVE ? colors[ALIVE] : colors[DEAD];
    let colorChangeAmount = props.rowOffset * 100;
    colorChangeAmount = colorChangeAmount * gradientStrengthCoefficient;
    colorChangeAmount = colorChangeAmount + gradientBrightnessShift * 100;

    return shadeColor(baseColor, colorChangeAmount * -1);
}};

  &:hover,
  &:focus {
    transform: scale(0.9);
    background: ${props =>
    shadeColor(props.value === ALIVE ? colors[ALIVE] : colors[DEAD], 10)};
  }

  &:active {
    transform: scale(0.9);
    background: ${props =>
    shadeColor(props.value === ALIVE ? colors[ALIVE] : colors[DEAD], -30)};
  }
`;
