import { TOrder } from "./Settings";
import { ITheme } from "./Theme";

export interface IGameProps {
    order: TOrder
    range: string
    items: string
    theme: ITheme
}