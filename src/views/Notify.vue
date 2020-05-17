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
      {{alterToDo}}
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
      websock: null,
    };
  },
  created() {
    this.initWebSocket();
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  computed: {
    alterToDo() {
      let date = new Date();
      if(date.getHours() - 6 <= 2 && date.getHours() - 6 >= -2) {
        return "該吃早飯了";
      } else if(date.getHours() - 12 <= 2 && date.getHours() - 12 >= -2) {
        return "該吃午飯了";
      } else if(date.getHours() - 7 <= 2 && date.getHours() - 7 >= -2){
        return "該吃晚飯了";
      } else {
        return "努力學習";
      }
    }
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://34.71.251.0:12345/ws";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
      this.websocketonopen();
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      let actions = { test: "12345" };
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
  },
};
</script>
