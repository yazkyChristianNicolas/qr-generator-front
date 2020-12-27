import { BaseCodeRequest } from './base-code-request';

export class StringToCodeRequest extends BaseCodeRequest{
    private data: string;

    public constructor(textToEncode:string, size:number){
        super(size);
        this.data = textToEncode;
    } 
}
