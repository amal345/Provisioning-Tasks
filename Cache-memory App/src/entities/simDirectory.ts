
import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm'

@Entity('sim_directory')

export class SimDirectory extends BaseEntity {



    @Column({
        name: 'id'
    })
    id!: string
    @PrimaryColumn({
        name: 'sim_number'
    })
    simNumber!: string
    @Column()
    state!: string

    @Column()
    owner!: string

    static async saveSim(simnumber: string, state: string, owner: string) {
        const simDirectory = new SimDirectory()
        simDirectory.simNumber = simnumber
        console.log(simDirectory.simNumber);
        
        simDirectory.state = state
        simDirectory.owner = owner

        // simDirectory.save()

        //  Query Builder insertion  
        await SimDirectory.createQueryBuilder()
            .insert()
            .into(SimDirectory)
            .values([simDirectory])
            .execute();

    }

    static async getAllSim() {
        const sim = await SimDirectory.find()
        return sim

    }

    static async getSim(phnnumber: string) {
        const simDirectory = new SimDirectory()
        const sim = await SimDirectory.findOne(simDirectory.simNumber = phnnumber)
        //  console.log(sim);
//         const sim = await SimDirectory
//            .createQueryBuilder()
//            .select()
//            .where("sim_number = :simnumber", { simnumber: phnnumber })
//            .execute()
           
// console.log(sim);

        return sim;


    }

    static async updateSim(phnumber: string, state: string) {

        const simDirectory = new SimDirectory()
        simDirectory.state = state;


        // const sim = await SimDirectory.findOne(simDirectory.simNumber = phnnumber)
        // sim.state = payload.state;
        // await SimDirectory.save(sim)



        //Update using Query builder

        const sim = await SimDirectory
            .createQueryBuilder()
            .update(SimDirectory)
            .set(simDirectory)
            .where("sim_number = :simnumber", { simnumber: phnumber })
            .execute()
        return


    }

    static async deleteSim(key: string) {
        const simDirectory = new SimDirectory()


        // const sim: any = await SimDirectory.findOne(simDirectory.simNumber = key)
        // await SimDirectory.remove(sim)

        // using Query Builder

        await SimDirectory.createQueryBuilder()
            .delete()
            .from(SimDirectory)
            .where("sim_number = :simnumber", { simnumber: key })
            .execute()


        return "Sim is Deleted"
    }

    // static saveSim(simnumber: string, state: string, owner: string) {
    //     const simDirectory = new SimDirectory()
    //     simDirectory.simNumber = simnumber
    //     simDirectory.state = state
    //     simDirectory.owner = owner
    //     simDirectory.save()
    // }
}