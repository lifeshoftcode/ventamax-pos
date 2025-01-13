import { Tooltip } from "antd";
import React, { useRef } from "react";
import useTruncate from "../../../../../../../hooks/useTruncate";
import styled from 'styled-components';

interface TextCellProps {
    value: string | null | undefined;
    useTooltip?: boolean;
}

const Container = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  display: inline-block;
`;

function TextCell ({ value, useTooltip = true }: TextCellProps) {
    const containerRef = useRef < HTMLDivElement > (null);
    const { isTruncated, truncatedText, textRef, showTooltip } = useTruncate(value, containerRef, useTooltip);

    if (!value) return null;

    return (
        <Tooltip title={showTooltip ? value : ''}   >
            <Container ref={containerRef}>
                <span ref={textRef}>{truncatedText}</span>
            </Container>
        </Tooltip>
    );
};

export default TextCell;