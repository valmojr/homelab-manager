import { Injectable } from '@nestjs/common';

@Injectable()
export class FinancialService {
  async generateReport() {
    return [
      `*Financeiro*`,
      `Não implementado ainda.`,
    ].join('\n');
  }
}
