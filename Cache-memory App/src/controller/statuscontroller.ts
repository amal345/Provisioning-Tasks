
import { statususecase } from '../usecase/statususecase'

export class Status_Controller {
    async Getuser(key: string) {
        const data = await statususecase.Do(key)
        try {

            return data

        }
        catch (error) {

            console.log(error);
            throw error;

        }

    }
    async Putuser(key: string, value: any) {

        

        try {

            const data = await statususecase.Create(key, value)

            //  console.log(result);

            return data

        }
        catch (error) {
            throw error;
        }

    }
}