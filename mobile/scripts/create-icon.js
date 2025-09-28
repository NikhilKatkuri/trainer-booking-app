// scripts/create-icon.js
const { exec } = require("child_process");

const file = process.argv[2];

if (!file) {
  console.error(
    "Please provide an SVG file name, e.g., npm run create-icon back.svg"
  );
  process.exit(1);
}

const cmd = `npx @svgr/cli --native --typescript assets/vectors/${file} --out-dir ./src/components/vectors`;

exec(cmd, (err, stdout, stderr) => {
  if (err) {
    console.error(stderr);
    process.exit(1);
  }
  console.log(stdout);
});
