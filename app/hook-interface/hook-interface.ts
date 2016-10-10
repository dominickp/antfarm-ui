import {Field} from "../hook/field";
import {Step} from "./step";
import {InterfaceMetadata} from "./interface-metadata";

export class HookInterface {

    sessionId: string;

    stepsComplete: boolean = false;

    fields: Field[];

    steps: Step[];

    jobs = [];

    metadata: InterfaceMetadata;

}