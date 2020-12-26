export class WifiCodeRequest {
    private ssid: string;
    private password: string;
    private encryption: string;
    private hidden: boolean;

    public constructor(ssid, password, encryption, hidden){
        this.encryption = encryption;
        this.ssid = ssid;
        this.password = password;
        this.hidden = hidden;
    }
}
