import {Application} from "express";
import {Connection} from "typeorm";
import XLXS from 'xlsx'

interface Args {
    app:Application
    connection:Connection
}

export const GetWineMonthSheet = ({app, connection}:Args) => {

    app.get('/wine/get/sheet', (req, res) => {
        const current_datetime = new Date();
        let formatted_date =
            current_datetime.getFullYear() +
            "-" +
            (current_datetime.getMonth() + 1);

        let wb = XLXS.utils.book_new();
        wb.Props = {
            Title: formatted_date,
            Subject: "Monthly Report",
            Author: "Water's Edge Winery",
            CreatedDate: current_datetime
        }
        let nameSplit = current_datetime.toDateString().split(' ');
        let name = nameSplit[1] + nameSplit[3];
        wb.SheetNames.push(name);

        // Content
        let ws_date = [['Hello', 'World']];
        let ws = XLXS.utils.aoa_to_sheet(ws_date);
        wb.Sheets[name] = ws;

        // Output
        let wbout = XLXS.write(wb, {bookType: "xlsx", type:"binary"})

        let wbRes = {
            wb: wbout,
            name: formatted_date + ".xlsx"
        }

        res.status(200).send(wbRes);
    });
}