
import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import { ServerApp } from '../../src/presentation/server-app';
describe('server-app.ts', (): void => {

    const options={
        base:2,
        limit:10,
        showTable:false,
        name:'test-name:',
        destination:'test-destination'
    }

    beforeEach(()=>{
        jest.clearAllMocks();
    })


    test('should create server app instance', () => { 
        const serverApp=new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp)
        expect(typeof ServerApp.run).toBe('function')
     })

     test('should ServerApp with options', () => { 

        const logSpy = jest.spyOn(console,'log')
        const createTableSpy = jest.spyOn(CreateTable.prototype,'execute')
        const saveFileSpy = jest.spyOn(SaveFile.prototype,'execute')
        
        ServerApp.run(options);
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('server runing...');
        expect(logSpy).toHaveBeenLastCalledWith('File created..!!!');
        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({base:options.base,limit:options.limit});
        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent:expect.any(String),
            fileDestination:options.destination,
            fileName:options.name
        });
    })

    test('should run with custom values mocked', () => {
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock= jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock= jest.fn().mockReturnValue(true);

        CreateTable.prototype.execute=createMock;
        SaveFile.prototype.execute=saveFileMock;
        console.log=logMock
        console.error=logErrorMock

        ServerApp.run(options)

        expect(logMock).toHaveBeenCalledWith('server runing...')
        expect(createMock).toHaveBeenCalledWith({"base": options.base, "limit": options.limit})
        expect(saveFileMock).toHaveBeenCalledWith(
            {
                fileContent:expect.any(String),
                fileDestination:options.destination,
                fileName:options.name
            }
        )
        expect(logMock).toHaveBeenCalledWith('File created..!!!')
        expect(logErrorMock).not.toHaveBeenCalledWith()
        

     }) 
});