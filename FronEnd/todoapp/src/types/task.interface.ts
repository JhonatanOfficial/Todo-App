export interface ITask {
    id?: string;
    title: string;
    description?: string;
    createdAt?: string;
    status?: TaskStatus;
    donedAt?: string | null;
}

export enum TaskStatus {
    pending,
    inProcess,
    done
}