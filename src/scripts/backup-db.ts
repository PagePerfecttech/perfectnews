import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execPromise = promisify(exec);

async function backupDatabase() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(process.cwd(), 'backups');
  const fileName = `backup-${timestamp}.sql`;
  const filePath = path.join(backupDir, fileName);

  // Ensure backup directory exists
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL not found in environment.");
    return;
  }

  console.log(`Starting database backup: ${fileName}...`);

  try {
    // Note: This requires pg_dump to be installed on the system
    const { stdout, stderr } = await execPromise(`pg_dump "${dbUrl}" > "${filePath}"`);
    
    if (stderr && !stderr.includes('DONE')) {
      console.warn("Backup warning:", stderr);
    }

    console.log(`Backup successful: ${filePath}`);
    
    // Retention policy: Keep last 10 backups
    const files = fs.readdirSync(backupDir).sort();
    if (files.length > 10) {
      const toDelete = files.slice(0, files.length - 10);
      toDelete.forEach(file => {
        fs.unlinkSync(path.join(backupDir, file));
        console.log(`Deleted old backup: ${file}`);
      });
    }

  } catch (error) {
    console.error("Backup failed:", error);
  }
}

// Check if running directly
if (require.main === module) {
  backupDatabase();
}

export default backupDatabase;
