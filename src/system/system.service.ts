import { Injectable } from '@nestjs/common';
import * as os from 'os';
import * as fs from 'fs';
import { execSync } from 'child_process';

@Injectable()
export class SystemService {
  generateReport(): string {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const usedMemGB = (usedMem / 1024 / 1024 / 1024).toFixed(2);
    const totalMemGB = (totalMem / 1024 / 1024 / 1024).toFixed(2);
    const memPercent = ((usedMem / totalMem) * 100).toFixed(2);

    const loadAvg = os.loadavg()[0];
    const cpuCount = os.cpus().length;
    const cpuUsagePercent = ((loadAvg / cpuCount) * 100).toFixed(2);

    function getDiskUsage(): string {
      try {
        const stat = fs.statSync('/');
        if (process.platform === 'linux' || process.platform === 'darwin') {
          const output = execSync('df -h /').toString();
          const lines = output.trim().split('\n');
          if (lines.length > 1) {
            const parts = lines[1].split(/\s+/);
            return `${parts[2]} / ${parts[1]} (${parts[4]})`;
          }
        }
        return 'Disk usage not available';
      } catch {
        return 'Disk usage not available';
      }
    }

    function getLinuxDistro(): string {
      if (process.env.LINUX_DISTRO) {
        return process.env.LINUX_DISTRO as string;
      } else {
        if (process.platform === 'linux') {
          try {
            const osRelease = fs.readFileSync('/etc/os-release', 'utf8');
            const match = osRelease.match(/^PRETTY_NAME="(.+)"$/m);
            if (match) {
              return match[1];
            }
          } catch { }
        }
        return `${os.type()} ${os.release()}`;
      }
    }

    function getHostname(): string {
      return process.env.HOSTNAME ? process.env.HOSTNAME : os.hostname();
    }

    const body = {
      os: getLinuxDistro(),
      hostname: getHostname(),
      cpu_usage: `${loadAvg.toFixed(2)} (${cpuUsagePercent}%)`,
      memory: `${usedMemGB} GB / ${totalMemGB} GB (${memPercent}%)`,
      uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
      disk_usage: getDiskUsage(),
    }

    return [
      `*Sistema*`,
      `🖥️ OS - ${body.os}`,
      `📛 HOST - ${body.hostname}`,
      `💻 CPU - ${body.cpu_usage}`,
      `🧠 RAM - ${body.memory}`,
      `⏱️ UPT - ${body.uptime}`,
      `💾 Disco - ${body.disk_usage}`,
    ].join('\n');
  }
}
