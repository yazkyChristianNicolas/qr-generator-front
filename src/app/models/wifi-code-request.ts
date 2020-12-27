import { BaseCodeRequest } from "./base-code-request";

export class WifiCodeRequest extends BaseCodeRequest{
    private ssid: string;
    private password: string;
    private encryption: string;
    private hidden: boolean;

    public constructor(ssid, password, encryption, hidden,size:number){
        super(size);
        this.encryption = encryption;
        this.ssid = ssid;
        this.password = password;
        this.hidden = hidden;
    }
}
