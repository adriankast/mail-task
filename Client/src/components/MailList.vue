<template>
  <div class="list" >
    <div class="mail" v-for="mail in mails" :key="mail.date[0]">
      <span class="mail--from">From: {{mail.from[0]}}</span> <br>
        <span class="mail--to">To: {{mail.to[0]}}</span> <br>
        <router-link :to="{name: 'mail', params: {id: mail.subject[0]}}">
          <span class="mail--subject"><b>{{mail.subject[0]}}</b></span> <br>
        </router-link><br>
      <span class="mail--date">{{mail.date[0]}}</span>
    </div>
  </div>
</template>

<script>
// show recent mails to,from,subject,date as a list
import {config} from "../config.js"
export default {
    name: "MailList",
    props: {
    },
    components: {
    },
    data() { return({
        mails: [],
    })},
    methods: {
        getMails() {
            fetch(config.backendUrl + "/mails").then( data => {
                if (data.status === 200) {
                    data.json().then( object => {
                        // this.todos = object
                        this.mails = object
                        console.log("Mails", this.mails)
                    }, err => {
                        console.error("Could not parse json " + err)
                    })
                }
            }, err => {
                console.error("Could not fetch data " + err)
            })
        }
    },
    created() {
        this.getMails()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  margin: 40px 0 0;
}

.mail {
  margin: 10px;
  background-color: lightblue;
  border-radius: 3px;
}
.mail--date {
  font-size: 0.7rem;
}
</style>
