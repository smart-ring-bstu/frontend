import { relative } from 'node:path'
import { ESLint } from 'eslint'

// Escape values for GitHub Actions workflow commands.
function escapeData(value) {
  return value.replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A')
}

function escapeProperty(value) {
  return escapeData(value).replaceAll(',', '%2C').replaceAll(':', '%3A')
}

const eslint = new ESLint()
for (const result of await eslint.lintFiles('.')) {
  const file = escapeProperty(relative(process.cwd(), result.filePath))
  for (const finding of result.messages) {
    if (finding.fatal) throw new Error(result.filePath + ': ' + finding.message)
    const title = escapeProperty(finding.ruleId ?? 'ESLint')
    console.log(`::warning file=${file},line=${finding.line ?? 1},title=${title}::${escapeData(finding.message)}`)
  }
}
