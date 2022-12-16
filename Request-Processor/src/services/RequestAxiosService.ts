import axios, {AxiosResponse} from 'axios';

export class RequestAxiosService{

    static async getSim(key: string){

        const response:AxiosResponse=await axios.get(`http://localhost:3000/status/${key}`)
        // console.log(response.data);
        return response.data
        
        

    }

}