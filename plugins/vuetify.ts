// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import { VFileUpload } from 'vuetify/labs/VFileUpload'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'



export default defineNuxtPlugin((app) => {
 
  
  const vuetify = createVuetify({
        
    components:{
      VFileUpload
    },
    
  })
  app.vueApp.use(vuetify)

})