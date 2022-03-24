import * as React from "react";
import { useEffect, useState } from "react";

import { Root } from "./styled";
import { CellValue } from "../../types";

interface Props {
    value: CellValue;
    onClick: (e: React.MouseEvent) => void;
    rowOffset: number;
    position: string;
}

const Cell = ({ value, onClick, rowOffset, position }: Props) => {
    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        setHasEntered(true);
    }, []);

    return (
        <Root
            data-test-id={position}
            onClick={onClick}
            value={value}
            rowOffset={rowOffset}
            hasEntered={hasEntered}
        />
    );
};

export default Cell;
