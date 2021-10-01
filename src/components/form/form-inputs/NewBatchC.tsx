import React, {FC, useEffect, useState} from 'react';

interface Props {

}

export const NewBatchC: FC<Props> = () => {
    interface wine {
        wine_id: number
        fancy_name: string
        wine_style: string
    }

    const [wines, setWines] = useState<wine[]>([]);
    const getWines = () => {
        fetch('/wine/get/kit',
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(async res => {
            console.log("Status: " + res.status);
            if (res.status === 200) {
                const rWines: wine[] = await res.json();
                setWines(rWines);
            } else {
                setWines([
                    {
                        wine_id: 0,
                        wine_style: "ERROR",
                        fancy_name: "ERROR"
                    }
                ]);
            }
        })
    }
    getWines();
    return (
        <div>
            {/*<div className="input-group">*/}
            {/*    <span className="input-group-text">Kit: </span>*/}
            {/*    /!*Add autocompletion to text*!/*/}
            {/*    <input type="text" className="form-control"/>*/}
            {/*</div>*/}
            <div className="input-group">
                <span className="input-group-text">Select Wine</span>
                <select className="form-select">
                    <option selected>Choose a wine!</option>
                    {wines.map(({wine_id, wine_style, fancy_name}) =>
                        (<option value={wine_id} key={wine_id}> {fancy_name} </option>)
                    )}
                </select>
            </div>
            <div className="input-group">
                <span className="input-group-text">Current Date & Time</span>
                <input type="datetime-local"
                       className="form-control"/>
            </div>
            <div className="input-group">
                <span className="input-group-text">Number of Kits</span>
                <input type="number" className="form-control"/>
            </div>
            <div className="input-group">
                <span className="input-group-text">
                    Brix Amount
                </span>
                <input type="number"
                       className="form-control"/>
            </div>
            <div className="input-group">
                <span className="input-group-text">
                    SG Amount
                </span>
                <input type="number"
                       className="form-control"/>
            </div>
            <div className="input-group">
                <span className="input-group-text">
                  Starting Tank
                </span>
                <input type="text"
                       className="form-control"/>
            </div>
            <div className="input-group">
                <span className="input-group-text">
                    Temperature
                </span>
                <input type="number"
                       className="form-control"/>
            </div>
            <div className="input-group">
                <span className="input-group-text">
                    Notes
                </span>
                <input type="text"
                       className="form-control"/>
            </div>
        </div>
    );
};