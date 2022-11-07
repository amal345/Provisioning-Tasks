import cache from 'memory-cache';


export class Datacache {


  static async get(key: string) {
    try {
      const cacheddata = await cache.get(key)
      return cacheddata;
    }
    catch (error) {
      // console.log(error)
      throw error
    }


  }

  
  static async put(key: string, value: any) {

    try {
      const putdata = await cache.put(key, value, 10000)

      return putdata;
    }
    catch (error) {
      throw error
    }

  }



}