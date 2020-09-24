<template>
  <div >
      <form class="new">
        To: <br>
        <input type="text" class="new--to" v-model="to" placeholder="jon@example.com" ><br>
        Subject: <br>
        <input type="text" class="new--subject" v-model="subject" placeholder="Regarding blabla" ><br>
        Text: <br>
        <textarea class="new--text" v-model="text" ></textarea><br>
        <button type="submit" @click="e => {sendMail(e)}">Send the Mail</button>
    </form>
  </div>
</template>

<script>
import {config} from "../config.js"
export default {
    name: "Editor",
   data() {
        return {
            to: "",
            subject: "",
            text: ""
        }
    },
    methods: {
      sendMail(e) {
          e.preventDefault()
          const newMail = {to: this.to, subject: this.subject, text: this.text}
        console.log(newMail)
        fetch(config.backendUrl + "/mails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMail)
        }).then( data => {
            console.log("Send")
            if(data.status === 200) {
              console.log("Mail was sent!")
            }
        }, err => {console.error("cannot make post request to backend " + err)})
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea, input {
  width: 400px;
}
textarea {
  height: 300px;
}
</style>
