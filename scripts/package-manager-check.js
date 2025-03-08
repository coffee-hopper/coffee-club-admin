if (process.env.npm_execpath && !process.env.npm_execpath.includes('pnpm')) {
  console.error('Please use pnpm instead of npm or yarn to install dependencies.')
  process.exit(1)
} 