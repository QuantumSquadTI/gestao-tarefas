import { IsArray, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TarefaStatus } from "../entity/status.entity";
import { TarefaDto } from "./tarefa.dto";

export class StatusDto{
    @IsNotEmpty()
    @IsEnum(TarefaStatus)
    status: TarefaStatus;

    @IsArray()
    @IsOptional()
    tarefas?: Array<TarefaDto>; 

    constructor(status: TarefaStatus, tarefas?: Array<TarefaDto>) {
        this.status = status;
        this.tarefas = tarefas;
    }
}