




const runCommand=async(args:string[])=>{
    process.argv=[...process.argv,...args];
    const {yarg}= await import('../../../src/config/plugins/yargs.plugin');
    return yarg;
}


describe('yargs.plugin.ts', (): void => {

    const originalArgv = process.argv;
    beforeEach(()=>{
        process.argv=originalArgv;
        jest.resetModules();
    })
    test('should return default value', async() => { 
        const yarg = await runCommand(['-b','5'])
        expect(yarg).toEqual(expect.objectContaining(
            {
                b: 5,
                l: 10,
                s: false,
                n: 'multiplication-table',
                d: 'outputs'
            }
        ))
     })

     test('should return configuration with custom values', async () => { 
        const yarg = await runCommand(['-b','4','-l','5','-s','-n','boring','-d','salida'])
        expect(yarg).toEqual(expect.objectContaining(
            {
                b: 4,
                l: 5,
                s: true,
                n: 'boring',
                d: 'salida'
            }
        ))
      })
});