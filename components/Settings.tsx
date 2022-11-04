import styled from '@emotion/styled'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { TOrder } from '../models/Settings'
import { Howl } from 'howler'
import { playAudio } from '../utils/audio'

interface SettingsProps {
    startHandler: (order: TOrder, items: string, range: string) => void
    setMusicPlaying: Dispatch<SetStateAction<boolean>>
}

export const Settings: FC<SettingsProps> = ({ startHandler, setMusicPlaying }) => {
    const [items, setItems] = useState<string>('2')
    const [range, setRange] = useState('1')
    const [order, setOrder] = useState<TOrder>('asc')

    return (
        <Wrapper>
            <ContainerBorder>
                <Container>
                    <Title margin='36px'>Кол-во предметов</Title>
                    <Datalist width='455px'>
                        <Option>2</Option>
                        <Option>3</Option>
                        <Option>4</Option>
                        <Option>5</Option>
                    </Datalist>
                    <Input
                        width='366px'
                        type='range'
                        step={1}
                        min={2}
                        max={5}
                        value={items}
                        onChange={(e) => { setItems(e.target.value), playAudio('/audio/swap.mp3') }}
                    />
                    <Title margin='45px'>Значения</Title>
                    <Datalist width='605px'>
                        <Option>А</Option>
                        <Option>9</Option>
                        <Option>19</Option>
                        <Option>50</Option>
                        <Option>99</Option>
                        <Option>999</Option>
                    </Datalist>
                    <Input
                        width='531px'
                        type='range'
                        step={1}
                        min={1}
                        max={6}
                        value={range}
                        onChange={(e) => { setRange(e.target.value), playAudio('/audio/swap.mp3') }}
                    />
                    <ButtonWrapper marginTop='72px'>
                        <Button
                            onClick={() => { setOrder('asc'), playAudio('/audio/order.mp3') }}
                            opacity={order === 'asc' ? 1 : .56}
                        >
                            По возрастанию
                        </Button>
                        <Button
                            opacity={order === 'desc' ? 1 : .56}
                            onClick={() => { setOrder('desc'), playAudio('/audio/order.mp3') }}
                        >
                            По убыванию
                        </Button>
                    </ButtonWrapper>
                    <PlayButton onClick={() => { startHandler(order, items, range), playAudio('/audio/button.mp3'), setMusicPlaying(true) }}>
                        Играть
                    </PlayButton>
                </Container>
            </ContainerBorder>
        </Wrapper>
    )
}

//styles
const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '659px',
    height: '620px',
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
    borderRadius: '40px'
})

const ContainerBorder = styled.div`
    width: 699px;
    height: 660px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    border-radius: 40px;
    position: relative;
    background: linear-gradient(to bottom, #4C42BD, #101F32);
    padding: 3px;
`

interface TitleStles {
    margin: string
}

const Title = styled.p<TitleStles>(props => ({
    fontWeight: 400,
    marginTop: props.margin,
    fontSize: "32px",
    lineHeight: "44px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#423F45"
}))

const Wrapper = styled.div({
    paddingTop: '91px',
})

interface InputStyles {
    width: string
}

const Input = styled.input<InputStyles>(props => ({
    WebkitAppearance: "none",
    appearance: "none",
    background: "#FFD748",
    cursor: "pointer",
    width: props.width,
    height: '21px',
    borderRadius: '10px',
    position: 'relative',
    paddingTop: '1px'
}))

const Datalist = styled.datalist<InputStyles>(props => ({
    display: "flex",
    justifyContent: "space-between",
    height: "auto",
    overflow: "hidden",
    marginTop: '17px',
    width: props.width
}))


const Option = styled.option({
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "29px",
    color: "#4F4B61",
    textAlign: 'center',
    width: '100%'
})

interface ButtonWrapperStyles {
    marginTop: string
}

const ButtonWrapper = styled.div<ButtonWrapperStyles>(props => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: props.marginTop,
    width: '531px'
}))

interface ButtonStyles {
    opacity: number
}

const Button = styled.button<ButtonStyles>(props => ({
    fontWeight: 700,
    fontSize: "31px",
    lineHeight: "39px",
    display: "flex",
    alignItems: "center",
    color: "#423F45",
    padding: '2px 21px 4px 24px',
    background: "#FFD748",
    borderRadius: "20px",
    opacity: props.opacity,

}))

export const PlayButton = styled.button`
    margin: 95px auto 0;
    padding: 5px 76px 13px 73px;
    background: #38DF7A;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
    webkit-box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    fontWeight: 400;
    font-size: 32px;
    line-height: 42px;
    color: #FFFFFF;
    &:hover {
        margin-top: 90px;
    }
`