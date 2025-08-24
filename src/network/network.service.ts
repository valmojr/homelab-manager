import { Injectable } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class NetworkService {
  getLocalAddress(): string {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]!) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
    return 'Failed to get local address';
  }

  async getExternalAddress(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) {
        return 'Failed to get external IP';
      }
      const data = await response.json();
      return data.ip || 'Failed to parse external IP';
    } catch {
      return 'Failed to get external IP';
    }
  }

  async testExternalDomain(domain = 'https://valmo.dev'): Promise<string> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(domain, { signal: controller.signal });
      clearTimeout(timeout);

      if (response.ok) {
      return `${domain} is UP`;
      } else {
      return `${domain} is DOWN (status: ${response.status})`;
      }
    } catch (error: any) {
      return `${domain} is DOWN (${error.message})`;
    }
  }

  async generateReport() {
    return [
      `*Network*`,
      `🌐 Local - ${this.getLocalAddress()}`,
      `🌍 External - ${await this.getExternalAddress()}`,
      `🔗 Domain - ${await this.testExternalDomain()}`,
    ].join('\n');
  }
}
