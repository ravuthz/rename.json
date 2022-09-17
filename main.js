#! /usr/bin/env node
const fs = require("fs");
const packagePath = "./package.json";
const packageName = process.argv[2];
const packageAuthor = process.argv[3];
const packageVersion = process.argv[4];

function parseJSON(str) {
  try {
    const json = JSON.parse(str);
    return json != null && typeof json == "object" ? json : {};
  } catch (e) {
    return {};
  }
}

function parseString(json) {
  return JSON.stringify(json, null, 2);
}

try {
  const packageExist = fs.existsSync(packagePath);

  if (!packageName) {
    console.log(`
        node rename.js <name> (author) (version)

        Parameters:
        ===========

        - name: (Required) The name of the package to rename
        - author: (Optinal) The author of the package to rename. Default is empty.
        - version: (Optinal) The version of the package to rename. Default is 1.0.0

        Note:
        -----
        The author example "FullName <full_name@email.com>"
    `);
  }

  if (!packageExist) {
    console.log("Error: File package.json was not found!!!");
  }

  const packageJson = parseJSON(fs.readFileSync(packagePath).toString());

  packageJson.name = packageName;
  packageJson.author = packageAuthor || "";
  packageJson.version = packageVersion || "1.0.0";

  fs.writeFileSync(packagePath, parseString(packageJson));

  console.log("Package.json update successful");
} catch (e) {
  console.log(e.message);
}
