<template>
  <q-page class="flex flex-center">
    <accountPage></accountPage>
  </q-page>
</template>

<script>
import accountPage from '../components/WTLoginForm.vue'
export default {
  components: { accountPage },
  name: 'PageHomeScreen',
  data () {
    return {

    }
  }
}
</script>
