import { resolve } from 'path'
import { createConnection } from 'typeorm'
import {SimDirectory} from '../entities/simDirectory'

export class DbConfig {

   static  connection() {
     
     return new Promise((resolve, reject)=>{
     
      try {
         const conn= createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'default',
            password: 'default',
            database: 'Provisioning_Test',
            entities:[SimDirectory]
           
         })

         resolve(conn)

      }
      catch (error: any) {
         reject(error)

         throw new Error(error)
      }
   })
   }
}

