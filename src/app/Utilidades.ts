
export class Utilidades {

    constructor() { }

   getBtoa(txt: any) {
        let codificado = btoa(JSON.stringify(txt));
        console.log("CODIFICADO: "+ codificado);
        return codificado;
    }

}