<template>
  <div style="padding: 5rem;">
    <v-alert type="error">
      Someone had entered your dormity.
    </v-alert>
    <v-expansion-panels popout focusable>
      <v-expansion-panel v-for="(item, i) in alterInfoData" :key="i">
        <v-expansion-panel-header disable-icon-rotate>
          {{ item.dateTime }} - A person enter the room.
          <template v-slot:actions>
            <v-icon color="error">mdi-alert-circle</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- 顯示圖片 -->
          <viewer
            :options="options"
            :images="[item.img]"
            @inited="inited"
            class="viewer mb-2 mt-2"
            ref="viewer"
          >
            <template slot-scope="scope">
              <div style="display: flex; justify-content: center;">
                <img
                  class="displayImg"
                  v-for="(src, index) in scope.images"
                  :src="src"
                  :key="index"
                  height="300"
                />
              </div>
            </template>
          </viewer>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-alert type="info" class="mt-4">
      Somethings you have to do.
    </v-alert>

    <v-alert border="top" colored-border type="info" elevation="2">
      吃午飯了
    </v-alert>
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer/src/component";

export default {
  components: {
    Viewer,
  },
  data() {
    return {
      alterInfoData: [
        {
          dateTime: "9:54 PM",
          img:
            "https://images.unsplash.com/photo-1543674214-9a5c967100dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
        },
        {
          dateTime: "7:22 PM",
          img:
            "https://images.unsplash.com/photo-1543674214-9a5c967100dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
        },
        {
          dateTime: "1:22 AM",
          img:
            "https://images.unsplash.com/photo-1543674214-9a5c967100dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
        },
        {
          dateTime: "8:37 AM",
          img:
            "https://images.unsplash.com/photo-1543674214-9a5c967100dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
        },
        {
          dateTime: "12:11 PM",
          img:
            "https://images.unsplash.com/photo-1543674214-9a5c967100dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
        },
        {
          dateTime: "6:30 AM",
          img:
            "https://images.unsplash.com/photo-1543674214-9a5c967100dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
        },
        {
          dateTime: "5:55 PM",
          img:
            "https://images.unsplash.com/photo-1543674214-9a5c967100dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
        },
      ],
    };
  },
};
</script>
