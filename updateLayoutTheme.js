const fs = require("fs");

const file="src/app/layout.js";

let data=fs.readFileSync(file,"utf8");


data=data.replace(
`import "./globals.css";`,
`import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";`
);


data=data.replace(
`<body className="min-h-full flex flex-col">{children}</body>`,
`<body className="min-h-full flex flex-col">
<ThemeProvider>
{children}
</ThemeProvider>
</body>`
);


fs.writeFileSync(file,data);

console.log("Theme provider connected");
