import { error, log } from "console";
import { SimDirectoory } from "../model/SimDirectory";
import { Datacache } from "../service/Datacache";

export class statususecase {

    static async savetocache(cachekey: string, data: any) {

        try {

            const putdata = await Datacache.put(cachekey, data)
            return putdata
        }
        catch (error) {
            throw error

        }
    }

    static async Do(key: any) {

        try {

            const data = await Datacache.get(key)
            return data
        }
        catch (error) {
            throw error
        }


    }

    static async Create(key: string, payload: any) {


        try {
            const result = await this.Do(key)
            // console.log(result);
            // console.log(JSON.stringify(result))

            // console.log(typeof result);


            if (result != null) {
                console.log(`phone number stored in previous cache ${ result.phnnumber}`);
                console.log(`The New phone number inserted in cache ${ payload.phnnumber}`);
                if(result.phnnumber!==payload.phnnumber)
                {
                    const simdirectory = await SimDirectoory.fromJson(payload)
                    const data = this.savetocache(key, payload)
                    return data;
                }
                else{
                    throw new Error("The phone number already stored in cache");
                }
            }
               
            else {
                    await SimDirectoory.fromJson(payload)
                    const data = this.savetocache(key, payload)
                    return data;
                }

            
            

        } catch (error) {
            throw error
        }
    }

}



// validation
// if required any external calls
