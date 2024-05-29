import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import fs from 'fs';

describe('save-file.use-case.ts', (): void => {

    const customOptions={
        fileContent:'custom content',
        fileDestination:'custom-outputs/file-destination' ,
        fileName:'custom-table-name'
    }
    const file=`${customOptions.fileDestination}/${customOptions.fileName}.txt`
   
    
    // afterEach(()=>{
    //     const outputsFolderExist = fs.existsSync('outputs')
    //     if(outputsFolderExist) fs.rmSync('outputs',{recursive:true})
    //     const customOutputsFolderExist = fs.existsSync(customOptions.fileDestination)
    //     if(customOutputsFolderExist) fs.rmSync(customOptions.fileDestination,{recursive:true})
    // })


    test('should save file with default value', () => {

        //arrange
        const saveFile = new SaveFile();
        const filePath= 'outputs/table.txt'
        const options={
            fileContent:'test content'
        }

        //act
        const result = saveFile.execute(options);
        const fileExist = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath,{encoding:'utf-8'})

        //assert
        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    })

    test('should save file with custom values', () => {

        const saveFile = new SaveFile();
        const result = saveFile.execute(customOptions);
        const fileExist = fs.existsSync(file)
        const fileContent = fs.readFileSync(file,{encoding:'utf-8'})
        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);

    })

    test('should return false if directory could not be created', () => { 
        const saveFile= new SaveFile();
        const mkdirSpy = jest.spyOn(fs,'mkdirSync').mockImplementation(
            ()=>{throw new Error('error');}
        )

        const result = saveFile.execute(customOptions);
        expect(result).toBe(false);

        mkdirSpy.mockRestore();
     })
    test('should return false if file could not be created', () => { 
        const saveFile= new SaveFile();
        const mkdirSpy = jest.spyOn(fs,'mkdirSync').mockImplementation(
            ()=>{throw new Error('Custom writing error message');}
        )

        const result = saveFile.execute(customOptions);
        expect(result).toBe(false);
        mkdirSpy.mockRestore();
     })
});