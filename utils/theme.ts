import { ITheme, TypeThemeTitle } from "../models/Theme"

interface generateThemeSrcsResult {
    background: string
    items: string[]
    box: string
}

const generateThemeSrcs = (theme: TypeThemeTitle): generateThemeSrcsResult => {
    const items: string[] = []
    for (let i = 0; i < 5; i++) {
        items.push(`/Themes/${theme}/item${i + 1}.png`)
    }

    return {
        background: `/Themes/${theme}/background.png`,
        items: items,
        box: `/Themes/${theme}/box.png`
    }
}

export const randomizeTheme = (): ITheme => {
    const randomVal = Math.floor(Math.random() * 3)
    switch(randomVal) {
        case 0:
            return generateThemeSrcs('cookies')
        case 1:
            return generateThemeSrcs('coins')
        default: 
            return generateThemeSrcs('new year')
    }
}