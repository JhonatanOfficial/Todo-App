import { IResponse } from "@/types/response.interface";
import { ITask } from "@/types/task.interface";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_ROUTE,
});

export class TaskService {
  public static async GetAllTasks(): Promise<ITask[]> {
    return await axiosInstance.get("/GetAllTasks");
  }

  public static async CreateNewTask(task: ITask): Promise<IResponse> {
    try {
      const response = await axiosInstance.post("/CreateNewTask", task);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      
      return { message: "An unexpected error occurred", task: task };
    }
  }
}
