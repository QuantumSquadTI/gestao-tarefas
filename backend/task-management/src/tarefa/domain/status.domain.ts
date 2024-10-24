import { TarefaStatus } from "../entity/status.entity";
import { Tarefa } from "./tarefa.domain";

export class Status{
    private _id: number;
    private _status: TarefaStatus;
    private _tarefas: Array<Tarefa>;

    constructor(id: number, status: TarefaStatus, tarefas: Array<Tarefa> = []) {
        this._id = id;
        this._status = status;
        this._tarefas = tarefas;
    }

    //Métodos

    

    // Getters
    get getId(): number {
        return this._id;
    }

    get getStatus(): TarefaStatus {
        return this._status;
    }

    get getTarefas(): Array<Tarefa> {
        return this._tarefas;
    }

    // Setters
    set setStatus(status: TarefaStatus) {
        this._status = status;
    }

    set setTarefas(tarefa: Array<Tarefa>) {
        this._tarefas = tarefa;
    }
}