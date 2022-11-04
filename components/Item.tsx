import styled from "@emotion/styled"
import { FC,  useState } from "react"
import { useDrag, DragPreviewImage } from "react-dnd"
import { ICoordinates } from "../models/IItem"
import { playAudio } from "../utils/audio"

interface ItemProps {
    name: string
    img: string
    itemSuccessHandler: (name: string) => void
    coordinates: ICoordinates
}

interface DropResult {
    name: string
}

export const Item: FC<ItemProps> = ({ name, img, itemSuccessHandler, coordinates }) => {
    const [display, setDisplay] = useState<string>('flex')

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: name,
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>()
            if (item && dropResult) {
                setDisplay('none')
                itemSuccessHandler(name)
                playAudio('/audio/success.mp3')
            } else {
                playAudio('/audio/error.mp3')
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    const opacity = isDragging ? 0 : 1
    return (
        <>
            
            <Img coordinates={coordinates} ref={drag} background={img} data-testid={`box`} opacity={opacity} display={display}>
                {name}
            </Img>
        </>
    )
}

//styles
interface ItemStyles {
    opacity: number
    display: string
    coordinates: ICoordinates
    background: string
}

const Img = styled.div<ItemStyles>(props => ({
    display: props.display,
    opacity: props.opacity,
    position: 'absolute',
    width: '157px',
    height: '157px',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: props.coordinates.top,
    marginLeft: props.coordinates.left,
    background: `url('${props.background}')`,
    fontWeight: 400,
    fontSize: "56px",
    lineHeight: "68px",
    letterSpacing: "2px",
    color: "#FFFFFF",
    textShadow: "rgb(36, 37, 70) 5px 0px 0px, rgb(36, 37, 70) 4.90033px 0.993347px 0px, rgb(36, 37, 70) 4.60531px 1.94709px 0px, rgb(36, 37, 70) 4.12668px 2.82321px 0px, rgb(36, 37, 70) 3.48353px 3.58678px 0px, rgb(36, 37, 70) 2.70151px 4.20735px 0px, rgb(36, 37, 70) 1.81179px 4.6602px 0px, rgb(36, 37, 70) 0.849836px 4.92725px 0px, rgb(36, 37, 70) -0.145998px 4.99787px 0px, rgb(36, 37, 70) -1.13601px 4.86924px 0px, rgb(36, 37, 70) -2.08073px 4.54649px 0px, rgb(36, 37, 70) -2.94251px 4.04248px 0px, rgb(36, 37, 70) -3.68697px 3.37732px 0px, rgb(36, 37, 70) -4.28444px 2.57751px 0px, rgb(36, 37, 70) -4.71111px 1.67494px 0px, rgb(36, 37, 70) -4.94996px 0.7056px 0px, rgb(36, 37, 70) -4.99147px -0.291871px 0px, rgb(36, 37, 70) -4.83399px -1.27771px 0px, rgb(36, 37, 70) -4.48379px -2.2126px 0px, rgb(36, 37, 70) -3.95484px -3.05929px 0px, rgb(36, 37, 70) -3.26822px -3.78401px 0px, rgb(36, 37, 70) -2.4513px -4.35788px 0px, rgb(36, 37, 70) -1.53666px -4.75801px 0px, rgb(36, 37, 70) -0.560763px -4.96846px 0px, rgb(36, 37, 70) 0.437495px -4.98082px 0px, rgb(36, 37, 70) 1.41831px -4.79462px 0px, rgb(36, 37, 70) 2.34258px -4.41727px 0px, rgb(36, 37, 70) 3.17346px -3.86382px 0px, rgb(36, 37, 70) 3.87783px -3.15633px 0px, rgb(36, 37, 70) 4.4276px -2.32301px 0px, rgb(36, 37, 70) 4.80085px -1.39708px 0px, rgb(36, 37, 70) 4.98271px -0.415447px 0px"
}))