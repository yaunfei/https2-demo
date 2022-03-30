const http2 = require("http2");
const fs = require("fs");
const client = http2.connect("https://localhost:8443", {
  ca: fs.readFileSync("localhost-cert.pem"),
});
client.on("error", (err) => console.error(err));

const req = client.request({ ":path": "/" });

req.on("response", (headers, flags) => {
  for (const name in headers) {
    console.log(`11111${name}: ${headers[name]}`);
  }
});

req.setEncoding("utf8");
let data = "";
req.on("data", (chunk) => {
  data += chunk;
  console.log("chunk", chunk);
});
req.on("end", () => {
  console.log(`\n2222${data}`);
  client.close();
});
req.end();
