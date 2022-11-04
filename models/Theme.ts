export interface ITheme {
    background: string
    items: string[]
    box: string
}

export type TypeThemeTitle = 'cookies' | 'new year' | 'coins'
export const themeTitles: TypeThemeTitle[] = ['cookies', 'new year', 'coins']