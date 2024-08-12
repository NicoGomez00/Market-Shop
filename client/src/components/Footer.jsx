import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import React from 'react'

const Footer = () => {
    const theme = useTheme()
    console.log(theme)
  return (
    <Box component={'footer'} sx={{
        width:'100%',
        height: '200px',
        background: `${theme.palette.primary.main}`
    }}>

    </Box>
  )
}

export default Footer
