export interface Project {
    title: string
    category: string
    description: string
    details: string[]
    photos: string[]
}

const modules = import.meta.glob('./assets/projects/*/index.ts', {
    eager: true,
})

export const PROJECTS: Project[] = Object.values(modules)
    .map((module: any) => module.project)
