import { CreateTable } from '../../../src/domain/use-cases/create-table.use-case';


describe('create-table.use-case.ts', (): void => {
    test('should create table with default values', () => { 
        //arrange
        const createTable = new CreateTable();
        const table= createTable.execute({base:2});
        const rows = table.split('\n').length;

        //assert
        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('2 x 1 = 2');
        expect(table).toContain('2 x 10 = 20');
        expect(rows).toBe(10);
     })

     test('should create table with custom values', () => { 
        const options={
            base:3,
            limit:20
        }
        const createTable = new CreateTable();
        const table= createTable.execute(options);
        const rows = table.split('\n').length;

        expect(table).toContain(`${options.base} x 1 = ${options.base}`);
        expect(table).toContain(`${options.base} x 20 = ${options.base*20}`);
        expect(rows).toBe(options.limit);



      })
});


