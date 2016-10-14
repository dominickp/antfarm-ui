import {Field} from "../hook/field";
import {Step} from "./step";
import {InterfaceMetadata} from "./interface-metadata";
import {HeldJob} from "./held-job";

export class HookInterface {

    sessionId: string;

    stepsComplete: boolean = false;

    fields: Field[];

    steps: Step[];

    heldJobs: HeldJob[];

    metadata: InterfaceMetadata;

}