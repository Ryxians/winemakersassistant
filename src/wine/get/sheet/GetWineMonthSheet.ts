import {Application} from "express";
import {Connection} from "typeorm";
import XLXS from 'xlsx'
import {Wine} from "../../../database/entities/Wine";
import {Batch} from "../../../database/entities/Batch";

interface Args {
    app:Application
    connection:Connection
}

export const GetWineMonthSheet = ({app, connection}:Args) => {

    app.get('/wine/get/sheet/:month&:year', async (req, res) => {
        // The request gives a month and a year
        // @ts-ignore
        let {month, year} = req.params;

        // Create a time using that month and year
        const current_datetime = new Date(year, month);

        // Format the date into an appropriate file name
        let formatted_date =
            current_datetime.getFullYear() +
            "-" +
            (current_datetime.getMonth() + 1);

        // Create Excel Workbook
        let wb = XLXS.utils.book_new();
        wb.Props = {
            Title: formatted_date,
            Subject: "Monthly Report",
            Author: "Water's Edge Winery",
            CreatedDate: current_datetime
        }

        // Name of individual sheet will be Month and Year
        let nameSplit = current_datetime.toDateString().split(' ');
        let name = nameSplit[1] + nameSplit[3];
        wb.SheetNames.push(name);

        // This is the contents of the excel sheet
        let ws_data = [{}];

        // Get the wine repository
        const wineRep = connection.manager.getRepository(Wine);

        // Grab all the wines with their batchs and outputs
        let wines = await wineRep.createQueryBuilder("wine").
        leftJoinAndSelect("wine.batchs", "batchs").leftJoinAndSelect("batchs.output", "output")
            .select()
            .getMany();

        // Filter the wines based on the date
        wines = wines.filter(w => {

            // Filter the batchs based on the date
           let b = w.batchs.filter(b => {

               // Filter the outputs based on the date
               let o = b.output.filter(o => {
                   // Get bottling date
                   let tempdate = new Date(o.date);

                   // If its the same month and year return the output
                   if (tempdate.getUTCMonth() === current_datetime.getUTCMonth() &&
                       tempdate.getFullYear() === current_datetime.getFullYear()) {
                       return o;
                   }
               })

               // If there are outputs, update the outputs and return the batch
               if (o && o.length > 0) {
                   b.output = o;
                   return b;
               }

           });

           // If there is a batch, update the batchs and return the wine
           if (b && b.length > 0) {
               w.batchs = b;
               return w;
           };
        });

        // For each wine, create a row in the excel sheet
        wines.forEach(w => {
            // Amount of wine in liters
            let bottled = 0;

            // For each batch
            for (const batch of w.batchs){
                // For each output,
                // get the ml by multiplying the size of the container
                // and the number of the container
                for (const out of batch.output) {
                    bottled += out.numberOfContainer * out.containerSize;
                }
            }

            // Divide bottled by 1000 to convert to liters
            bottled = bottled/1000;

            // Add new row
            ws_data.push({"Style": w.wine_style, "Fancy Name": w.fancy_name, "Output (Liters)":bottled});
        })

        // turn content into sheet
        let ws = XLXS.utils.json_to_sheet(ws_data);
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