import { PDFParse } from "pdf-parse";
import fs from "node:fs/promises";
const parser = new PDFParse({
  data: await fs.readFile("public/resume/joao-telo-resume.pdf"),
});
const result = await parser.getScreenshot({ desiredWidth: 1000 });
for (const page of result.pages)
  await fs.writeFile(`artifacts/resume-${page.pageNumber}.png`, page.data);
console.log(await parser.getInfo({ parsePageInfo: true }));
await parser.destroy();
