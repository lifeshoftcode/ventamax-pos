import React from 'react';
import { Button, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { setNote } from "../../../features/noteModal/noteModalSlice";

export function NoteButton({ value }) {
    const dispatch = useDispatch();
    const hasNote = Boolean(value);

    return (
        <Tooltip title={value || 'Sin nota'}>
            <Button
                onClick={() => dispatch(setNote({ note: value, isOpen: true }))}
                disabled={!hasNote}
            >
                ver
            </Button>
        </Tooltip>
    );
}