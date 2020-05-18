<template>
  <div style="padding: 5rem;">
    <div id="clockContent" v-bind:style="contentStyle" @click="clicked">
      <div class="wrapper">
        <p v-bind:style="instructionsStyle">{{ instruction }}</p>
        <h1 v-if="one" v-bind:class="faded">{{ timeOne }}</h1>
        <h1 v-if="two" v-bind:class="faded">{{ timeTwo }}</h1>
        <h1 v-if="three" v-bind:class="faded">{{ timeThree }}</h1>
        <h1 v-if="four" v-bind:class="faded">{{ timeFour }}</h1>
      </div>
    </div>
    <v-card :elevation="16">
      <v-card-title primary-title>
        <v-icon>mdi-arrow-right-drop-circle</v-icon>
        Live Stream
      </v-card-title>
      <v-card-text style="display: flex; justify-content: center;">
        <video-player
          class="vjs-custom-skin mb-4"
          :options="playerOptions"
          @ready="playerReadied"
        >
        </video-player>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      playerOptions: {
        // videojs and plugin options
        height: "600",
        sources: [
          {
            withCredentials: false,
            // type: "application/x-mpegURL",
            type: "video/mp4",
            // mp4
            src:
              "http://qagvkhggo.bkt.clouddn.com/video.mp4",
          },
        ],
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
        },
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        poster:
          "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg",
      },
    };
    
  },
  methods: {
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options;
      };
    },
  },
  mounted: {
  },
};
</script>
