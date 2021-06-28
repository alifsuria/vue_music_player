import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar:false,
    song_index:0,
    playlist: [
      {
        title: "ASCA-Howling",
        src: require("../assets/music/ASCA v Howling/MP3/01.Howling.mp3"),
        image: require("../assets/music/ASCA v Howling/MP3/cover.jpg"),
        duration: "",
        show: true,
      },
      {
        title: "Sakura Mitsuki",
        src: require("../assets/music/[2013.03.13] Sakura Mitsutsuki/01 Sakura Mitsutsuki.mp3"),
        image: require("../assets/music/[2013.03.13] Sakura Mitsutsuki/cover.jpg"),
        duration: "",
        show: false,
      },
      {
        title: "Chiai Fijikawa - Bakemono to Yobarete",
        src: require("../assets/music/Chiai Fujikawa - Bakemono to Yobarete MP3/01.バケモノと呼ばれて.mp3"),
        image: require("../assets/music/Chiai Fujikawa - Bakemono to Yobarete MP3/Cover.jpg"),
        duration: "",
        show: false,
      },
      {
        title: "SawanoHiroyuki[nZk]mizuki- Avid",
        src: require("../assets/music/SawanoHiroyuki[nZk]mizuki - Avid (Single) 86 ED mp3/01. Avid.mp3"),
        image: require("../assets/music/SawanoHiroyuki[nZk]mizuki - Avid (Single) 86 ED mp3/cover.jpg"),
        duration: "",
        show: false,
      },
      {
        title: "Stereo Dive Foundation - STORYSEEKER",
        src: require("../assets/music/Stereo Dive Foundation - STORYSEEKER MP3/01 STORYSEEKER.mp3"),
        image: require("../assets/music/Stereo Dive Foundation - STORYSEEKER MP3/cover.jpg"),
        duration: "",
        show: false,
      },
      {
        title: "Zhou Shen - Rubia",
        src: require("../assets/music/Honkai Impact 3rd Valkyrie Theme Rubia (Performed by Zhou Shen) - Honkai Impact 3rd.mp3"),
        image: require("../assets/Cufflink_-_Notes_B_W_360x.jpg"),
        duration: "",
        show: false,
      },
      {
        title: "TIA - Starfall",
        src: require("../assets/music/New Valkyrie Theme [Starfall] (Performed by TIA RAY) - Honkai Impact 3rd OST.mp3"),
        image: require("../assets/Cufflink_-_Notes_B_W_360x.jpg"),
        duration: "",
        show: false,
      },
    ],
    status:{
      playing:false,
      paused:true,
      stopped:false
    }
  },
  mutations: {
    sidebar_show(state,payload){
      state.sidebar = payload
    },
    index_change(state,payload){
      state.song_index = payload
    },
    player_status(state,payload){
      state.status = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
