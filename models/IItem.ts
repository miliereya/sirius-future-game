export interface ICoordinates {
    top: string
    left: string
}

export interface IItem {
    value: string
    img: string
    isPlaced: boolean
    coordinates: ICoordinates
}