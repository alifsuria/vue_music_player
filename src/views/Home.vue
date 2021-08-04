<template>
  <div class="text-center text-light w-100 container">
    <div class="">
      <h2 class="the-title">{{ state.playlist[song_index].title }}</h2>
      <audio id="song" ref="audioRef">
        audio didnt work
        <source v-bind:src="state.playlist[song_index].src" />
      </audio>
      <b-button
        v-if="status.playing"
        variant="outline-light"
        class="px-4 py-2 status-button"
        pill
        disabled
        >Now Playing</b-button
      >
      <b-button
        v-else-if="status.paused"
        variant="outline-light"
        class="px-4 py-2 status-button"
        pill
        disabled
        >Paused</b-button
      >
      <b-button
        v-else
        variant="outline-light "
        class="px-4 py-2 status-button"
        pill
        disabled
        >Stopped</b-button
      >
    </div>
    <b-row no-gutters class="mb-4 mt-4">
      <b-col cols="12" md="3" class="img-div">
        <div class="text-left">
          <img
            v-bind:src="
              state.playlist[song_index].image
                ? state.playlist[song_index].image
                : require('../assets/Cufflink_-_Notes_B_W_360x.jpg')
            "
            class="record-img"
            alt="Right image"
            ref="imageRef"
          />
        </div>
      </b-col>
      <b-col cols="0" md="9" class=""> </b-col>
    </b-row>
    <!-- Display  -->
    <Display :playlist="state.playlist" :current_time="state.current_time" />
    <!-- Action Button -->
    <b-row class="action-library">
      <b-col cols="12" sm="6" class="d-flex justify-content-around">
        <!-- Backward Button -->
        <h1 class="action-button" @click="backward(song_index)" id="backward">
          <font-awesome-icon :icon="['fas', 'backward']" />
        </h1>
        <!-- Play Button -->
        <!-- Pause Button -->
        <transition name="fade" mode="out-in">
          <h1
            :key="1"
            class="action-button"
            v-if="!status.playing"
            @click="play_song"
            id="play"
          >
            <font-awesome-icon :icon="['fas', 'play']" />
          </h1>
          <h1
            :key="2"
            class="action-button"
            v-else-if="!status.paused"
            id="paused"
            @click="pause_song"
          >
            <font-awesome-icon :icon="['fas', 'pause']" />
          </h1>
        </transition>

        <!-- Stop Button -->
        <h1
          class="action-button"
          v-bind:class="status.stopped === true ? 'disabled' : ''"
          id="stop"
          @click="stop_song"
        >
          <font-awesome-icon :icon="['fas', 'square']" />
        </h1>
        <!-- Fast Forward Button-->
        <h1
          class="action-button"
          @click="fast_forward(song_index)"
          id="forward"
        >
          <font-awesome-icon :icon="['fas', 'forward']" />
        </h1>
        <!-- Volume Button -->
        <div class="position-relative">
          <h1 class="action-button" id="volume" @click="opening_popup">
            <font-awesome-icon
              v-if="state.volume_level >= 0.6"
              :icon="['fas', 'volume-up']"
            />
            <font-awesome-icon
              v-else-if="
                state.volume_level <= 0.59 && state.volume_level >= 0.01
              "
              :icon="['fas', 'volume-down']"
            />
            <font-awesome-icon v-else :icon="['fas', 'volume-mute']" />
          </h1>
          <transition name="fade" mode="out-in">
            <div v-if="state.volume_popup" class="balloon">
              <input
                type="range"
                min="0"
                step="0.01"
                max="1"
                v-bind:value="state.volume_level"
                ref="volumeBarRef"
                id="volume-slider"
                @change="volume_bar"
              />
            </div>
          </transition>
        </div>
      </b-col>
      <b-col cols="12" sm="2" offset-md="4" class="d-flex playlist">
        <!-- Refresh Button -->
        <h2 class="action-button" @click="$emit('refresh')" id="refresh">
          <font-awesome-icon :icon="['fas', 'sync']" />
        </h2>
        <!-- List Button -->
        <div>
          <h2
            class="action-button"
            id="song-list"
            @click="sidebar_trigger(true)"
          >
            <font-awesome-icon :icon="['fas', 'th-list']" />
          </h2>
        </div>
      </b-col>
    </b-row>
    <!-- Progress Bar -->
    <b-row class="">
      <b-col class="">
        <div class="progress-box">
          <input
            type="range"
            min="0"
            value="0"
            max=""
            id="range-bar"
            ref="progressBar"
            @change="progress_bar"
          />
        </div>
      </b-col>
    </b-row>
    <!-- Sidebar -->
    <Sidebar
      @choose-song="choose_song"
      @sidebar-triggering="sidebar_trigger"
      :playlist="state.playlist"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import { computed, onMounted, reactive, ref } from "@vue/composition-api";
import Sidebar from "@/components/Sidebar.vue";
import Display from "@/components/Display.vue";
export default {
  name: "Home",
  components: { Sidebar, Display },
  setup(_, { root }) {
    const imageRef = ref(null);
    const progressBar = ref(null);
    const audioRef = ref(null);
    const sidebarRef = ref(null);
    const volumeBarRef = ref(null);
    const state = reactive({
      volume_level: 0.3,
      volume_popup: false,
      sidebar: false,
      current_time: "0:00",
      image_degree: 0,
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
      interval: {
        progress_interval: "",
        image_interval: "",
      },
    });

    const song_index = computed(() => root.$store.state.song_index);
    const status = computed(() => root.$store.state.status);
    onMounted(() => {
      audioRef.value.volume = state.volume_level;
      getting_duration();
    });

    const choose_song = (index) => {
      progressBar.value.value = 0;
      root.$store.commit("index_change", index);
      clearInterval(state.interval.progress_interval);
      state.playlist[song_index.value].show = true;
      document
        .querySelector("source")
        .setAttribute("src", state.playlist[song_index.value].src);
      audioRef.value.load();
      song_duration();
      let a = 2;
      let countdown = setInterval(() => {
        state.current_time = `-0:0${a--}`;
        console.log("countdown");
        if (a === 0) {
          setTimeout(() => {
            console.log("timeout");
            state.playlist[song_index.value].show = false;
            play_song();
            clearInterval(countdown);
            a = 3;
          }, 500);
        }
      }, 1000);
    };

    function pause_song() {
      audioRef.value.pause();
      root.$store.commit("player_status", {
        playing: false,
        paused: true,
        stopped: false,
      });
      clearInterval(state.interval.progress_interval);
      clearInterval(state.interval.image_interval);
    }

    function play_song() {
      clearInterval(state.interval.image_interval);
      rotating_image();
      audioRef.value.play();
      root.$store.commit("player_status", {
        playing: true,
        paused: false,
        stopped: false,
      });
      state.interval.progress_interval = setInterval(update_progress_bar, 500);
    }

    function stop_song() {
      audioRef.value.pause();
      audioRef.value.currentTime = 0;
      progressBar.value.value = 0;
      state.song_currentTime = 0;
      root.$store.commit("player_status", {
        playing: false,
        paused: false,
        stopped: true,
      });
      clearInterval(state.interval.progress_interval);
      clearInterval(state.interval.image_interval);
    }
    function fast_forward(index) {
      index === state.playlist.length - 1
        ? root.$store.commit("index_change", 0)
        : root.$store.commit("index_change", index + 1);
      choose_song(song_index.value);
    }
    function backward(index) {
      index === 0
        ? root.$store.commit("index_change", 6)
        : root.$store.commit("index_change", index - 1);
      choose_song(song_index.value);
    }
    function getting_duration() {
      state.playlist.forEach((music) => {
        let a = new Audio(music.src);
        a.onloadedmetadata = () => {
          let duration = format_time(a.duration);
          music.duration = duration;
        };
      });
    }
    const song_duration = () => {
      audioRef.value.onloadedmetadata = () => {
        format_time(audioRef.value.duration);
      };
    };

    const format_time = (second) => {
      let min = Math.floor(second / 60);
      let sec = Math.floor(second - min * 60);
      if (sec < 10) {
        sec = `0${sec}`;
      }
      return `${min}:${sec}`;
    };
    const progress_bar = () => {
      audioRef.value.currentTime = progressBar.value.value;
    };

    function update_progress_bar() {
      let current_time = format_time(audioRef.value.currentTime);
      state.current_time = current_time;
      progressBar.value.max = audioRef.value.duration;
      progressBar.value.value = audioRef.value.currentTime;
      if (state.current_time === state.playlist[song_index.value].duration) {
        console.log(song_index.value);
        fast_forward(song_index.value);
      }
    }

    const volume_bar = () => {
      let volume_range = parseFloat(volumeBarRef.value.value);
      console.log(volumeBarRef.value.value, volume_range);
      state.volume_level = volume_range;
      audioRef.value.volume = state.volume_level;
    };
    function opening_popup() {
      state.volume_popup = true;
      setTimeout(() => {
        state.volume_popup = false;
      }, 5000);
    }

    function rotating_image() {
      state.interval.image_interval = setInterval(() => {
        state.image_degree++;
        if (state.image_degree === 360) {
          state.image_degree = 0;
        }
        imageRef.value.style.transform = `rotate(${state.image_degree}deg)`;
      }, 10);
    }

    const sidebar_trigger = (boolean) =>
      boolean
        ? root.$store.commit("sidebar_show", true)
        : root.$store.commit("sidebar_show", false);

    // function refresh_list(){
    return {
      imageRef,
      status,
      song_index,
      sidebar_trigger,
      state,
      progressBar,
      opening_popup,
      choose_song,
      sidebarRef,
      audioRef,
      stop_song,
      rotating_image,
      progress_bar,
      volumeBarRef,
      volume_bar,
      song_duration,
      backward,
      fast_forward,
      pause_song,
      play_song,
    };
  },
};
</script>

<style scoped>
  /* .status-button{
    font-size: 0.9em !important;
  } */
@import url("../style/style.css");
</style>
