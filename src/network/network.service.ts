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

  async testExternalDomain(external_domain?: string): Promise<string> {
    let domain = external_domain ? external_domain : process.env.EXTERNAL_DOMAIN;
    if (!domain) {
      return 'No external domain configured';
    }
    try {
      const response = await fetch(`https://${domain}`, { method: 'HEAD' });
      if (response.ok) {
        return '✅ Domain is reachable';
      } else {
        return `❌ Domain returned status ${response.status}`;
      }
    } catch {
      return '❌ Domain is not reachable';
    }
  }

  async generateReport() {
    return [
      `*Rede*`,
      `🌐 Local - ${this.getLocalAddress()}`,
      `🌍 Externa - ${await this.getExternalAddress()}`,
      `🔗 DNS - ${await this.testExternalDomain()}`,
    ].join('\n');
  }
}
