import { Howl } from "howler"

export const playAudio = (src: string, vol = 1) => {
    const sound = new Howl({
        src: [`${src}`],
        html5: true,
        preload: true,
        volume: vol
    })
    sound.play()
}