import styled from "@emotion/styled"
import { FC } from "react"
import { useDrop } from 'react-dnd'

interface ItemBinProps {
  name: string
}

export const ItemBin: FC<ItemBinProps> = ({ name }) => {
  let border = false
  const [{ }, drop] = useDrop(() => ({
    accept: name,
    drop: () => ({ name: name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <Circle
      ref={drop}
      data-testid={name}
      border={border ? '2px solid green' : 'none'}
    >

    </Circle>
  )
}

//styles
interface CircleProps {
  border: string
}

const Circle = styled.div<CircleProps>(props => ({
  width: "131px",
  height: "131px",
  border: props.border,
  borderRadius: '50%',
  background: "rgba(0, 0, 0, 0.06)",
  boxShadow: "inset 0px 4px 25px rgba(0, 0, 0, 0.25)"
}))