import { IsArray, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TarefaStatus } from "../entity/status.entity";
import { TarefaDto } from "./tarefa.dto";

export class StatusDto{

    constructor(
        id: number, 
        status: TarefaStatus,
        tarefas?: Array<TarefaDto>
    ) {
        this.id = id;
        this.status = status;
        this.tarefas = tarefas;
    }

    id: number

    @IsNotEmpty()
    @IsEnum(TarefaStatus)
    status: TarefaStatus;

    @IsArray()
    @IsOptional()
    tarefas?: Array<TarefaDto>; 
}