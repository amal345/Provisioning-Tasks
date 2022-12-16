
// import {describe, expect, test} from '@jest/globals';

import { when, spy, anything,verify } from 'ts-mockito'
import { Datacache } from "../service/Datacache"
import { ProcessSimDirectory } from "./ProcessSimDirectory"

describe('when Testing simdirectory usecase is set', () => {
    describe('With valid input', () => {

        it('Should return respons', async () => {
            const testCase = {
                "phnnumber": "123457",
                "state": "Stock",
                "owner": "amalashokunni345@gmail.com"
            }
            const result = await ProcessSimDirectory.Create(testCase)
            console.log(result.simNumber);
            await expect(result.simNumber).toEqual("123457")
        })
    })

    describe('With Invalid input Phone Number', () => {

        it('Should return respons', async () => {
            const testCase = {

                "state": "Stock",
                "owner": "amal@gmail.com"
            }
            try {
                const result = await ProcessSimDirectory.Create(testCase)
            } catch (error: any) {
                expect(error.message).toBe("The phone number not be null or undefined")
            }

        })
    })

    describe('With Invalid input State', () => {

        it('Should return respons', async () => {
            const testCase = {
                "phnnumber": "12345457",
                "state": "Stocke",
                "owner": "amal@gmail.com"
            }
            try {
                const result = await ProcessSimDirectory.Create(testCase)
            } catch (error: any) {
                await expect(error.message).toBe("state must be of Stock, Active or Deactive")
            }

        })
    })

    describe('With Invalid input email', () => {

        it('Should return respons', async () => {
            const testCase = {
                "phnnumber": "123457",
                "state": "Stock",
                "owner": "amalgmail.com"
            }
            try {
                const result = await ProcessSimDirectory.Create(testCase)
            } catch (error: any) {
                expect(error.message).toBe("The email id is invalid")
            }

        })
    })


    describe('With valid input email to send', () => {

        it('Should return respons', async () => {

            const testCase = {
                "owner": "amalashokunni345@gmail.com",
                "subject": "Stock",
                "content": "amalgmail.com"
            }
            console.log(testCase);
            const result = await ProcessSimDirectory.sendmail(testCase.owner, testCase.subject, testCase.content)
            // console.log("hii")
            await expect(result).toBe("Email sent successfully")


        })
    })

    describe('With Invalid input email to send', () => {

        it('Should return respons', async () => {

            try {

                const testCase = {
                    "owner": "amalashokunnigmail.com",
                    "subject": "Stock",
                    "content": "amalgmail.com"
                }
                console.log(testCase);
                const result = await ProcessSimDirectory.sendmail(testCase.owner, testCase.subject, testCase.content)
                console.log("hii")
                // await expect(result).toBe("Email sent successfully")
            } catch (error: any) {
                await expect(error.message).toBe("The email id is invalid")
            }
        })
    })

})


describe('Mock the put method', () => {
        it('should return null from get method when data is not available in cache ',async () => {
            const testCase = {
                "phnnumber": "123457",
                "state": "Stock",
                "owner": "amalashokunni345@gmail.com"
            }
            const dataCaheMock = spy(Datacache);
            when(dataCaheMock.get(anything())).thenResolve(null)
           
            const result = await ProcessSimDirectory.show(testCase.phnnumber)
            expect(result).toBe(null)

        })

        it('should call put method when the data is not available in cache',async () => {

            const testCase = {
                "phnnumber": "123457",
                "state": "Stock",
                "owner": "amalashokunni345@gmail.com"
            }
            const dataCaheMock = spy(Datacache);
            when(dataCaheMock.get(anything())).thenResolve(null)
           
            const result = await ProcessSimDirectory.Create(testCase)
            verify(dataCaheMock.put(anything(),anything())).once()
            expect(result).toBe(null)

        })

        it('when testing the cretae', async () => {
            const testCase = {
                "phnnumber": "123457",
                "state": "Stock",
                "owner": "amalashokunni345@gmail.com"
            }
            const dataspy=jest.spyOn(Datacache,'get').mockResolvedValue(null)
            const result = await ProcessSimDirectory.show(testCase.phnnumber)
            expect(result).toBe(null)
            expect(dataspy).toBeCalled()
        })

        it('when testing the cretae method', async () => {
            const testCase = {
                "phnnumber": "123457",
                "state": "Stock",
                "owner": "amalashokunni345@gmail.com"
            }
            const datafloat=jest.fn().mockReturnValue(null)
            
            Datacache.get=datafloat
            const result = await ProcessSimDirectory.show(testCase.phnnumber)
            expect(result).toBe(null)
            
        })


    })





