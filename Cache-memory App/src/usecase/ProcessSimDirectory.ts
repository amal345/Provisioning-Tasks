
import * as EmailValidator from 'email-validator';
import { EventEmitter } from 'events';
import { SimDirectoory } from "../model/SimDirectory";
import { Datacache } from "../service/Datacache";
import { SendEmail } from "../service/SendEmail";
import { SimDirectory } from "../entities/simDirectory";
import {Produce} from "../service/kafka/produce";


export class ProcessSimDirectory extends EventEmitter {

    private static processsimdirectory: ProcessSimDirectory
    static GetInstance() {
        if (!this.processsimdirectory) {
            this.processsimdirectory = new ProcessSimDirectory();
        }
        return this.processsimdirectory;
    }



    static async Create(payload: any) {
        try {
            this.GetInstance().on("Send Mail", async (mailbody) => {
                await this.sendmail(mailbody.owner, mailbody.subject, mailbody.text, mailbody.content, mailbody.filename)
            })
            const sim: any = SimDirectoory.fromJson(payload);
            const cacheKey: string = sim.simNumber
            const result = await this.show(cacheKey)

            const subject: string = "Confirmation Mail";
            const text: string = "Your Data is Sucessfully inserted in the cache Memory"
            if (!EmailValidator.validate(sim.owner)) {
                throw new TypeError("The email id is invalid");
            }
            else if (!sim.simNumber) {

                throw new Error("The phone number not be null or undefined");

            }
            else if (result) {
                if (result.simNumber !== payload.phnnumber) {
                    const data = await this.SavetoCacheAndSendmail(cacheKey, sim, subject, text);
                    return data;
                }
                else {
                    throw new Error("The phone number already stored in cache");
                }
            }
            else {
                const data = await this.SavetoCacheAndSendmail(cacheKey, sim, subject, text);
                return data;
            }
        }
        catch (error) {
            throw error
        }
    }




    static async savetocache(cachekey: string, data: any) {
        try {
            const putdata = await Datacache.put(cachekey, data)
            return putdata
        }
        catch (error) {
            throw error
        }
    }



    static async SavetoCacheAndSendmail(cachekey: string, data: any, subject: string, text: string) {
        SimDirectory.saveSim(data.simNumber, data.state, data.owner)
        const putdata = await this.savetocache(cachekey, data)
        let content = `{Phone Number=${putdata.simNumber}, Sate:${putdata.state},Mail Id:${putdata.owner}}`
        let mailbody = { owner: putdata.owner, subject: subject, text: text, content: content, filename: 'ouputfile.txt' }
        this.GetInstance().emit("Send Mail", mailbody)
        return putdata;

    }



    static async sendmail(owner: string, subject: string, text: string, content?: string, filname?: string) {
        try {
            let attachments = {}
            if (content && filname) {
                attachments = {
                    attachments: [{
                        filename: filname,
                        content: content
                    }]
                }
            }
            if (!EmailValidator.validate(owner)) {
                throw new TypeError("The email id is invalid");
            }
            let mailbody = {
                subject: subject,
                text: text,
                ...attachments
            }
            await SendEmail.SendMAiler(owner, mailbody)
            return "Email sent successfully";
        }
        catch (error) {
            throw error
        }
    }



    static async Update(payload: any) {
        let response = {}
        const mapping: Map<String, String> = new Map([
            ['Activation', 'Active'],
            ['Deactivation', 'Deactive'],
            ['Reactivation', 'Active']
        ]);
        const state: any = mapping.get(payload.requestcategory)
        console.log(state); 
        if (!state) {
            response = {
                responseCode: 0,
                phnnumber:payload.sim_number,
                status: "Invalid Category"
            }
        }
        else {
            const simnumber = payload.sim_number
            await SimDirectory.updateSim(simnumber, state)
            response={
                responseCode: 1,
                requestId:payload.requestid,
                phnnumber:payload.sim_number,
                status: "Request is completed"
            }
        }
        console.log(response); 
        new Produce().kafkaProducer(response)
    }



    static async Delete(key: string) {
        try {
            const deleteddata = await SimDirectory.deleteSim(key)
            return deleteddata;
        }
        catch (error) {
            throw error;
        }
    }



    static async show(key: string) {
        try {
            if(key==="Getall")
            {
                const data = await SimDirectory.getAllSim()
                return data;
            }
            else{
            const data = await Datacache.get(key)
            if (!data) {

                const sim = await SimDirectory.getSim(key)
                const putdata = await this.savetocache(key, sim)
                // console.log(sim);
                return putdata;
            }
            else {
                return data;
            }
        }
        }
        catch (error) {
            throw error
        }
    }

}

