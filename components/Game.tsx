import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { IGameProps } from "../models/IGameProps";
import styled from '@emotion/styled'
import { Item } from "./Item";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd'
import { ItemBin } from "./ItemBin";
import { IItem } from "../models/IItem";
import { FulledBin } from "./FulledBin";
import { generateItems, sortItems } from "../utils/items";
import { PlayButton } from "./Settings";
import { keyframes } from "@emotion/react";
import { playAudio } from "../utils/audio";
import { Howl } from "howler";
import { TouchBackend } from 'react-dnd-touch-backend'
import { isMobile } from "../utils/mobileCheck";

interface GameProps {
    params: IGameProps
    setProcess: Dispatch<SetStateAction<'settings' | 'game'>>
    setMusicPlaying: Dispatch<SetStateAction<boolean>>
}

export const Game: FC<GameProps> = ({ params, setProcess, setMusicPlaying }) => {
    const { range, items: quantity, theme, order } = params
    const [items, setItems] = useState<IItem[]>(generateItems(parseInt(quantity), range, theme.items, order))
    const [itemsPlaced, setItemsPlaced] = useState<string[]>([])

    const itemSuccessHandler = (name: string) => {
        if (itemsPlaced.length + 1 === items.length) {
            playAudio('/audio/game-end.mp3')
        }
        setItemsPlaced([...itemsPlaced, name])
    }

    return (
        <DndProvider backend={!isMobile() ? HTML5Backend : TouchBackend}>
            <Container>
                {itemsPlaced.length === items.length &&

                    <WinPopup>
                        <WinText>Молодец! Ты успешно справился с заданием!</WinText>
                        <PlayButton onClick={() => { setMusicPlaying(false), playAudio('/audio/button.mp3'), setProcess('settings'), setItemsPlaced([]) }}>ЗАНОВО</PlayButton>
                    </WinPopup>
                }
                <ItemsWrapper>
                    {items.map(item => {
                        const { value, img, coordinates, isPlaced } = item
                        if (isPlaced) return

                        return (
                            <Item
                                key={value}
                                name={value}
                                img={img}
                                coordinates={coordinates}
                                itemSuccessHandler={itemSuccessHandler}
                            />
                        )
                    })}
                </ItemsWrapper>
                <OrderWrapper direction={order === 'asc' ? 'row' : 'row-reverse'}>
                    <span className="span">{order === 'asc' ? 'По возрастанию' : 'По убыванию'}</span>
                    <Arrow src="/arrow.png" rotate={order === 'asc' ? '0' : '180deg'} />
                </OrderWrapper>
                <Box background={theme.box}>
                    {sortItems(items, order).map((item) => {
                        for (let k = 0; k < itemsPlaced.length; k++) {
                            if (item.value === itemsPlaced[k]) {
                                return <FulledBin key={item.value} img={item.img} value={item.value} />
                            }
                        }
                        return <ItemBin name={item.value} key={item.value} />
                    })}
                </Box>
            </Container>
        </DndProvider>
    )
}

//styles
const Container = styled.div({
    width: '100%',
    padding: '133px 45px 0'
})

const ItemsWrapper = styled.div({
    width: '100%',
    height: '307px'
})

interface OrderWrapperStyles {
    direction: string
}

const OrderWrapper = styled.div<OrderWrapperStyles>(props => (`
    display: flex;
    flex-direction: ${props.direction};
    width: 100%;
    height: 68px;
    margin-top: 39px;
    & .span {
        margin-top: 4px;
        font-weight: 400;
        font-size: 36px;
        line-height: 44px;
        color: #FFFFFF;
        z-index: 2;
        text-shadow: rgb(36, 37, 70) 3px 0px 0px, rgb(36, 37, 70) 2.83487px 0.981584px 0px, rgb(36, 37, 70) 2.35766px 1.85511px 0px, rgb(36, 37, 70) 1.62091px 2.52441px 0px, rgb(36, 37, 70) 0.705713px 2.91581px 0px, rgb(36, 37, 70) -0.287171px 2.98622px 0px, rgb(36, 37, 70) -1.24844px 2.72789px 0px, rgb(36, 37, 70) -2.07227px 2.16926px 0px, rgb(36, 37, 70) -2.66798px 1.37182px 0px, rgb(36, 37, 70) -2.96998px 0.42336px 0px, rgb(36, 37, 70) -2.94502px -0.571704px 0px, rgb(36, 37, 70) -2.59586px -1.50383px 0px, rgb(36, 37, 70) -1.96093px -2.27041px 0px, rgb(36, 37, 70) -1.11013px -2.78704px 0px, rgb(36, 37, 70) -0.137119px -2.99686px 0px, rgb(36, 37, 70) 0.850987px -2.87677px 0px, rgb(36, 37, 70) 1.74541px -2.43999px 0px, rgb(36, 37, 70) 2.44769px -1.73459px 0px, rgb(36, 37, 70) 2.88051px -0.838247px 0px;
    }
`))

interface ArrowStyles {
    rotate: string
}

const Arrow = styled.img<ArrowStyles>(props => ({
    width: '357',
    height: '68px',
    position: 'absolute',
    rotate: props.rotate
}))

interface BoxStyles {
    background: string
}

const Box = styled.div<BoxStyles>(props => ({
    width: '890px',
    height: '223px',
    display: 'flex',
    gap: '4px',
    justifyContent: 'center',
    margin: '8px auto 0',
    padding: '45px',
    background: `url("${props.background}")`
}))

const WinPopup = styled.div({
    width: '854px',
    height: '598px',
    textAlign: 'center',
    background: 'url("/win-popup.png")',
    position: 'absolute',
    zIndex: '9'
})

const WinText = styled.p({
    width: '519px',
    fontWeight: 400,
    fontSize: "40px",
    lineHeight: "51px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#5F40A1",
    margin: '258px auto 0'
})