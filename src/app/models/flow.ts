import { Stage } from './stage';
import * as uuid from 'uuid';

export class Flow {
    constructor(public name:string,public stages:Stage[],public id:string=uuid.v4()){}
}