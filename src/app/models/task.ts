export class Task {
    constructor(
        public title:string,
        public description:string,
        public project: string,
        public category: string,
        public priority: string,
        public deadlineDate: string,
        public deadlineTime: string,
        public isDone: boolean,
        public addedTime: string
    ){}
}