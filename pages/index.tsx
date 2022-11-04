import styled from "@emotion/styled"
import { useState } from "react"
import { Game } from "../components/Game"
import { Settings } from "../components/Settings"
import { IGameProps } from "../models/IGameProps"
import { TOrder } from "../models/Settings"
import { randomizeTheme } from "../utils/theme"
import { Howl } from 'howler'
import ReactHowler from "react-howler"

export default function Home() {
  const [process, setProcess] = useState<'settings' | 'game'>('settings')
  const [gameProps, setGameProps] = useState<IGameProps>()
  const [isMusicPlaying, setMusicPlaying] = useState<boolean>(false)

  const startHandler = (order: TOrder, items: string, range: string) => {
    setGameProps({
      order,
      items,
      range,
      theme: randomizeTheme()
    })
    setProcess('game')
  }

  const music = new Howl({
    src: ['/audio/game.mp3'],
    html5: true,
    preload: true,
    volume: 0.3
  })

  return (
    <Container
      background={process === 'game' && gameProps?.theme.background ? gameProps.theme.background : '/background-settings.png'}
    >
      <ReactHowler
        loop={true}
        playing={isMusicPlaying}
        src={['/audio/game.mp3']}
        volume={0.4}
      />
      {process === 'settings' && <Settings setMusicPlaying={setMusicPlaying} startHandler={startHandler} />}
      {process === 'game' && gameProps && <Game
        params={gameProps}
        setProcess={setProcess}
        setMusicPlaying={setMusicPlaying}
      />}
    </Container>
  )
}

//styles
interface ContainerStyles {
  background: string
}

const Container = styled.div<ContainerStyles>(props => ({
  width: '980px',
  height: '810px',
  margin: '0 auto',
  background: `url('${props.background}')`
}))


