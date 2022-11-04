import { ICoordinates, IItem } from "../models/IItem";
import { TOrder } from "../models/Settings";

const getUniqueRandomNumbers = (quantity: number, min: number, max: number): number[] => {
    let i = 0
    let values: number[] = []
    while (i < quantity) {
        let val = Math.floor(Math.random() * (max - min + 1)) + min
        let isSame: boolean = false
        for (let i = 0; i < values.length; i++) {
            if (values[i] === val) {
                isSame = true
            }
        }
        if (isSame) continue
        values.push(val)
        i++
    }
    return values
}

const InitialCoordinates = {
    _2: <ICoordinates[]>[{ top: '0', left: '249px' }, { top: '0', left: '451px' }],
    _3: <ICoordinates[]>[{ top: '100px', left: '151px' }, { top: '0', left: '355px' }, { top: '100px', left: '548px' }],
    _4: <ICoordinates[]>[{ top: '100px', left: '47px' }, { top: '0', left: '254px' }, { top: '100px', left: '444px' }, { top: '0', left: '653px' }],
    _5: <ICoordinates[]>[{ top: '100px', left: '0' }, { top: '0', left: '217px' }, { top: '148px', left: '337px' }, { top: '0', left: '452px' }, { top: '100px', left: '676px' }],
}

export const generateItems = (quantity: number, range: string, images: string[], order: TOrder): IItem[] => {
    let coordinates: ICoordinates[] = []
    let items: IItem[] = []
    let values: number[] = []

    //getting right coordinates
    switch (quantity) {
        case 2:
            coordinates = InitialCoordinates._2
            break
        case 3:
            coordinates = InitialCoordinates._3
            break
        case 4:
            coordinates = InitialCoordinates._4
            break
        case 5:
            coordinates = InitialCoordinates._5
            break
    }

    switch (range) {
        case '1':
            values = getUniqueRandomNumbers(quantity, 0, 32)
            break
        case '2':
            values = getUniqueRandomNumbers(quantity, 1, 9)
            break
        case '3':
            values = getUniqueRandomNumbers(quantity, 10, 19)
            break
        case '4':
            values = getUniqueRandomNumbers(quantity, 20, 50)
            break
        case '5':
            values = getUniqueRandomNumbers(quantity, 51, 99)
            break
        case '6':
            values = getUniqueRandomNumbers(quantity, 100, 999)
            break
    }

    let alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'
    for (let i = 0; i < values.length; i++) {
        items[i] = {
            value: range !== '1' ? values[i].toString() : alphabet[values[i]],
            img: images[i],
            isPlaced: false,
            coordinates: coordinates[i]
        }
    }
    return items
}

export const sortItems = (items: IItem[], order: TOrder) => {
    let itemValues: string[] = []
    let returnArr: IItem[] = []
    for (let i = 0; i < items.length; i++) {
        itemValues.push(items[i].value)
    }

    if (isNaN(parseInt(items[0].value))) {
        itemValues.sort()
        if (order === 'desc') {
            itemValues.reverse()
        }
    } else {
        let helpArr: number[] = []
        for (let i = 0; i < itemValues.length; i++) {
            helpArr.push(parseInt(itemValues[i]))
        }
        helpArr.sort(function (a, b) { return order === 'asc' ? a - b : b - a })
        for (let i = 0; i < itemValues.length; i++) {
            itemValues[i] = helpArr[i].toString()
        }
    }
    for (let k = 0; k < itemValues.length; k++) {
        for (let i = 0; i < items.length; i++) {
            if (itemValues[k] === items[i].value) {
                returnArr.push(items[i])
                break
            }
        }
    }
    return returnArr
}