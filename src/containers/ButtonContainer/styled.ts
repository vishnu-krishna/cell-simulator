import styled from "styled-components";

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 100px
`;

export const StyledButton = styled.button<{ vibrant?: boolean }>`
  background: ${props => (props.vibrant ? "#FF5722" : "#4CAF50")};
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${props => (props.vibrant ? "#FF5722" : "#3E8E41")};
  }

  &:active {
    background: ${props => (props.vibrant ? "#FF5722" : "#3E8E41")};
  }
`;
