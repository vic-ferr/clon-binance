import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { CoinData } from '../../../models/CoinDataResponse'
import { useLocation, useNavigate } from 'react-router-dom'

const BuyCoin = () => {
  const [coin, setCoin] = useState<CoinData | undefined>(undefined)
  const [isCompraVisible, setCompraVisible] = useState(false)


  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idCoin = params.get('coin');
  console.log(idCoin)


  const navigate = useNavigate()
  useEffect(() => {
    getCoinId()
  }, [])

  const getCoinId = async () => {
    try {
      const response = await axios.get(`https://binance-production.up.railway.app/api/v1/cryptocurrencies/${idCoin}`)
      const coinData: CoinData = response.data
      setCoin(coinData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCompraClick = () => {
    // Cuando haces clic en Comprar, muestra el cartel de compra y oculta la tarjeta
    setCompraVisible(true)
    setTimeout(() => {
      // Después de 3 segundos, redirige al usuario al mercado
      navigate('/wallets')
    }, 3000)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="-100px"
      height="100vh"
    >
      {isCompraVisible ?
        ( // Mostrar el cartel de compra si isCompraVisible es true
          <Alert severity="success">
            <AlertTitle>Compra</AlertTitle>
            Compra realizada correctamente
          </Alert>
        )
        : coin ?
          ( // Mostrar la tarjeta solo si isCompraVisible es false y coin está disponible
            <Card sx={{ maxWidth: 300, objectFit: 'cover' }}>
              <CardMedia
                sx={{ height: 140 }}
                image={coin.iconUrl}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  Id: {coin.uuid}
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  Symbol {coin.symbol}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  Price: USD {coin.currentPrice}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleCompraClick}>
                  Comprar
                </Button>
              </CardActions>
            </Card>
          )
          :
          (
            'Cargando...'
          )}
    </Box>
  )
}

export default BuyCoin