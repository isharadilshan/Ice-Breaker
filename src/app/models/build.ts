export class Build {
    constructor(
        public server:string,
        public project:string,
        public buildDate: string,
        public buildTime: string,
        public buildExpireDate: string,
        public buildExpireTime: string,
        public buildVersion: string,
        public buildURL: string
    ){}
}
