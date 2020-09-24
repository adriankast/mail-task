<template>
 <div>
   {{id}}
  </div>
</template>

<script>
export default {
    name: "MailDetails",
    props: {
        id: String
    },
    methods: {
        asdf: ()=>{
            console.log(this.id)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
