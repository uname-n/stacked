import { extendTheme } from '@chakra-ui/react'
import { theme as proTheme } from '@chakra-ui/pro-theme'

export const theme = extendTheme(
    {
        colors: { ...proTheme.colors, brand: proTheme.colors.purple },
    },
    proTheme,
)

