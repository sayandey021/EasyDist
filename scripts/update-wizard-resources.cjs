const fs = require('fs');
const path = require('path');

const mainDir = path.join(__dirname, '../src/app/(main)');
const files = fs.readdirSync(mainDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => path.join(mainDir, d.name, d.name + '-wizard.tsx'))
  .filter(f => fs.existsSync(f));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Replace the Resources block in the wizard's "About" step
  const regex = /<div className="rounded-lg bg-muted\/50 p-4">[\s\S]*?<h4 className="font-semibold mb-2">Resources<\/h4>[\s\S]*?<\/ul>\s*<\/div>/g;
  
  if (regex.test(content)) {
    const newContent = `<div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="font-semibold mb-2">Prerequisites</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Software metadata (Name, Version, etc.)</li>
                      <li>Source code or binary download URL</li>
                      <li>Basic understanding of the platform</li>
                    </ul>
                  </div>`;
    content = content.replace(regex, newContent);
    fs.writeFileSync(f, content);
    console.log('Updated', f);
  } else {
    console.log('No match in', f);
  }
});
