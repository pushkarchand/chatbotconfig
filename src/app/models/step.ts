import * as uuid from 'uuid';
export class Step{
    constructor(public name:string,public actions:Action[],public _id:string=''){}
}


export class Action{
    constructor(public name:string,public message:Message){}
}

export class Message{
    constructor(public texts:string[],public isTemplate:boolean){}
}
