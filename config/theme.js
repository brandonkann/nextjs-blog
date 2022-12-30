import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
// Create a theme instance.
const theme = createTheme({
palette: {
   primary: {
      main: '#376ca1',
   },
   secondary: {
     main: '#376ca1',
   },
   error: {
   main: red.A400,
   },
  },
});
export default theme;