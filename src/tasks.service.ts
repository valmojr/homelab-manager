import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";

@Injectable()
export default class TasksService {
  constructor() {}

  @Interval(10000)
  async sendReport() {
    return ;
  }
}