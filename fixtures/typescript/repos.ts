export type Commit = {
  id: string
  message: string
}

export type Repo = {
  url: string
  demoSite?: string
  npm?: string
  commits: Array<Commit>
  access: 'public' | 'private'
  stars: 0 | 42
}
