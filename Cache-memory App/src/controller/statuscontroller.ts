
import { ProcessSimDirectory } from '../usecase/ProcessSimDirectory'




export class Status_Controller {
    async Getuser(key: string) {
        try {
            const data = await ProcessSimDirectory.show(key)
            return data
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }




    async Putuser(payload: any) {
        try {
            const data = await ProcessSimDirectory.Create(payload)
            return data
        }
        catch (error) {
            throw error;
        }

    }

    
    
    // async updateSim(key: string, payload: any) {

    //     try {
    //         const data = await ProcessSimDirectory.Update(key, payload)
    //         return data
    //     }
    //     catch (error) {
    //         throw error;
    //     }

    // }

   
   
   
    async deleteSim(key: string) {
        try {
            const data = await ProcessSimDirectory.Delete(key)
            return data;
        }
        catch (error) {
            throw error;
        }
    }

}