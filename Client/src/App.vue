<template>
  <div id="app">
    <span class="routerlink">      
      <router-link :to="{name: 'home'}" >Home</router-link>
      <br>
      <router-link :to="{name: 'editor'}" >new Mail</router-link>
    </span><br>
    <MailList class="maillist" />

    <div class="routerview">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import MailList from "./components/MailList.vue"


export default {
    name: "App",
    data() {
      return{
        
      }
    },
    components: {
      MailList
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.maillist {
  width: 30%;
  height: 100%;
}

.routerlink {
  left: 10%;
  position: absolute;
}

.routerview {
  width: 60%;
  right: 0;
  position: absolute;
}
</style>
