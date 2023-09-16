// theme.ts

// 1. import `extendTheme` function
import { ThemeConfig, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

// 3. extend the theme
const theme = extendTheme(
  withDefaultColorScheme({
  colorScheme: 'gray',
  components: ['Button'],
}), config)

export default theme