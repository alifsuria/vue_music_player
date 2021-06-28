<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{index}}</h1>
    <button variant="primary" @click="click(status)">THIS</button>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/composition-api"
export default {
  setup(_,origin){
    const index =computed(()=>origin.root.$store.state.song_index)
    const status = computed(()=>origin.root.$store.state.status);

    function click(){
      origin.root.$store.commit("player_status",{
        playing:true,
        paused:false,
        stopped:false
      })
    }


    onMounted(()=>{
    const arr = ["alaldwl","adwad",2,3,4,5,]
    console.log(arr["adwad"])
    console.log(status)
    })

    return{index,click}
  }

}
</script>

<style>

</style>