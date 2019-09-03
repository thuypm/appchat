
<template>
            <div class="row justify-content-center h-100">
                   <Header />
                </div>
</template>

<script>
import header from './layouts/header.vue';
   export default {
         name: 'index',
  	    components: {
          'Header': header
      },
      data(){
          return{

          }
      }

   }
</script>
