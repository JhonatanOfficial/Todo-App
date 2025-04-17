export interface ITask {
    id?: string;
    title: string;
    description?: string;
    createdAt?: string;
    status?: TaskStatus;
    donedAt?: string;
}

enum TaskStatus {
    pending,
    inProcess,
    done
}