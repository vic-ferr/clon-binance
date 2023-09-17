import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLoader } from './LoaderProvider'
// import { CoinData } from '../models/CoinDataResponse'

export type CoinData = {
    uuid: string
    symbol: string
    name: string
    color: string
    iconUrl: string
    currentPrice: string
    change: string
    marketCap: string
}

interface ApiContextType {
    coinsData: CoinData[]
    fetchData: () => void
    addCrypto: (crypto: CoinData) => void;
    updateCrypto: (id: string, updatedCrypto: CoinData) => void;
    deleteCrypto: (id: string) => void;
}

interface ChildrenApiProps {
    children: React.ReactNode
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

export const ApiProvider: React.FC<ChildrenApiProps> = ({ children
}) => {
    const URL = "https://binance-production.up.railway.app/api/v1/cryptocurrencies"
    const [coinsData, setCoinsData] = useState<CoinData[]>([])
    const { addLoading, removeLoading } = useLoader()

    // Función para agregar criptomonedas al estado
    const addCrypto = (crypto: CoinData) => {
        setCoinsData([...coinsData, crypto]);
    };

    // Función para actualizar la información de una criptomoneda
    const updateCrypto = (id: string, updatedCrypto: CoinData) => {
        const updatedCryptos = coinsData.map((crypto) =>
            crypto.uuid === id ? updatedCrypto : crypto
        );
        setCoinsData(updatedCryptos);
    };

    // Función para eliminar una criptomoneda
    const deleteCrypto = (id: string) => {
        const updatedCryptos = coinsData.filter((crypto) => crypto.uuid !== id);
        setCoinsData(updatedCryptos);
    };

    const fetchData = async () => {
        try {
            addLoading()
            const response = await fetch(URL)
            if (response.ok) {
                const dataReponse = await response.json()

                const { status, data } = dataReponse
                if (status === 'true') {
                    setCoinsData(data)
                }
            } else {
                throw new Error('La respuesta de la red no fue exitosa.')
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error)
        } finally {
            removeLoading()
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <ApiContext.Provider value={{ coinsData, fetchData, addCrypto, updateCrypto, deleteCrypto }}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApiContext = (): ApiContextType => {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error("useApiContext must be used within an ApiProvider")
    }
    return context
}