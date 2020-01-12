import { Step } from './step';
import * as uuid from 'uuid';
export class Stage{
    constructor(public name:string,public steps:Step[],public _id:string=''){}
}