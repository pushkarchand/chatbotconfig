import * as uuid from 'uuid';
export class Step{
    constructor(public name:string,public actions:Action[],public id:string=uuid.v4()){}
}

export class Action{
    constructor(public name:string,public message:Message){}
}

export class Message{
    constructor(public texts:string[],public isTemplate:boolean){}
}
