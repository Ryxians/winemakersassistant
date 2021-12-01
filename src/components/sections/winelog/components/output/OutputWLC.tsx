import React, {FC} from 'react';
import {Output} from '@entities/Output'
import {Blended_Output} from '@entities/Blended_Output'

interface Props {
    output: Output | Blended_Output
}

export const OutputWLC: FC<Props> = ({output}) => {
    const {date, numberOfContainer, containerSize, fillLevel, fillLevelTwo, notes, bottleTeam} = output;

    // Break time into a date and time
    let time = date.toLocaleString().split(',');
    return (
        <>
            <h3>Output</h3>
            <table className="table table-sm table-striped table-bordered border-dark text-start">
                <tbody>
                <tr>
                    <td>Date: {time[0]}</td>
                    <td>Bottling Team: {bottleTeam.username}</td>
                </tr>
                <tr>
                    <td>Fill Level: {fillLevel}</td>
                    <td>Fill Level: {fillLevelTwo}</td>
                </tr>
                <tr>
                    <td colSpan={2}>{containerSize + "ml Bottles: " + numberOfContainer}</td>
                </tr>
                <tr>
                    <td colSpan={2}>Notes: {notes}</td>
                </tr>
                </tbody>
            </table>
        </>
    );
};