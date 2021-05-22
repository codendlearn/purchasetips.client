export interface IProduct {
    addedOn: string
    category?: string
    history: IProductHistory[]
    id: string
    imageUrl?: string
    isActive: boolean
    maxPrice: number
    minPrice: number
    price?: number
    title: string
    url: string
}

export interface IProductHistory {
    url?: string,
    currentprice: number
    previousprice: number
    notified?: boolean
    updatedOn?: Date
}