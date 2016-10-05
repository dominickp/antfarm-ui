import {Field} from "./field";
import {Step} from "./step";

export class HookInterface {

    sessionId: string;

    stepsComplete: boolean = false;

    fields: Field[];

    steps: Step[];

    jobs = [];

}