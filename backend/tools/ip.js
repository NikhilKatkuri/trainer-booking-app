const { exec } = require("child_process");

function getIpAddress() {
  return new Promise((resolve, reject) => {
    exec("ipconfig", (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      const ipAddress = parseIpAddress(stdout); 
      resolve(ipAddress);
    });
  });
}

function parseIpAddress(output) {
  const lines = output.split("\n");
  for (const line of lines) {
    // Look for IPv4 Address pattern in Windows ipconfig output
    const match = line.match(/IPv4 Address[.\s]*:\s*(\d+\.\d+\.\d+\.\d+)/i);
    if (match) {
      return match[1];
    }
  }
  return null;
}

module.exports = { getIpAddress };
 
 