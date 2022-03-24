import * as React from "react";
import { useState, useEffect } from "react";
import { StyledButtonContainer, StyledButton } from "./styled";

const STEP_TIME = 500;

interface Props {
    rows: number;
    cols: number;
    onStep: () => void;
    onResetBoard: () => void;
}

const ButtonContainer = ({ onStep, ...props }: Props) => {
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (isAutoPlaying) {
            timer = setTimeout(onStep, STEP_TIME);
        }

        return () => clearTimeout(timer);
    }, [isAutoPlaying, onStep]);

    return (
        <>
            <StyledButtonContainer>
                <StyledButton onClick={onStep} data-test-id={'next-gen-button'}>Next Gen</StyledButton>
                <StyledButton onClick={toggleAutoPlay} vibrant={isAutoPlaying} data-test-id={'start-button'}>
                    {isAutoPlaying ? "Stop" : "Start"}
                </StyledButton>
                <StyledButton onClick={props.onResetBoard} data-test-id={'reset-button'}>Reset</StyledButton>

            </StyledButtonContainer>
        </>
    );
};

export default ButtonContainer;
