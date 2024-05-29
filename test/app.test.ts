// process.argv=['node','app.ts','-b','10']
// import '../src/app'

import { ServerApp } from "../src/presentation/server-app";

describe('app', (): void => {
    test('should be call server.run with values',async () => { 
       const serverRunMock = jest.fn();
       ServerApp.run = serverRunMock;
       process.argv=['node','app.ts','-b','4','-l','5','-s','-n','boring','-d','salida']

       await import('../src/app')

       expect(serverRunMock).toHaveBeenCalledWith(
        {"base": 4, "destination": "salida", "limit": 5, "name": "boring", "showTable": true}
       );
     })
});