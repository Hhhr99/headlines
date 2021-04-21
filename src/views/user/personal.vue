<template>
  <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <img :src="userinfo.head_img" alt/>
        <div class="profile-center">
          <div class="name">
            <span class="iconfont"
                  :class="{iconxingbienan:userinfo.gender===1,iconxingbienv:userinfo.gender===0}"></span>{{ userinfo.nickname }}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <my_cell title="我的关注" desc="关注的用户"></my_cell>
    <my_cell title="我的跟帖" desc="跟帖/回复"></my_cell>
    <my_cell title="我的收藏" desc="文章/视频"></my_cell>
    <my_cell title="设置"></my_cell>
    <my_button type="danger" style="margin-top: 20px">退出</my_button>
  </div>
</template>

<script>
import My_cell from "@/components/my_cell";
import My_button from "@/components/my_button";
import {getUserDetail} from "@/apis/user";
import axios from "axios";

export default {
  name: "personal",
  components: {My_button, My_cell},
  data() {
    return {
      userinfo: {}
    }
  },
  mounted() {
    console.log(this.$route.params.id)
    let id = this.$route.params.id
    getUserDetail(id)
        .then(res => {
          console.log(res)
          this.userinfo = res.data.data
          this.userinfo.head_img = axios.defaults.baseURL + this.userinfo.head_img
        })
        .catch(err => {
          console.log(err)
        })
  }
}
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}

a {
  color: #666;
}

.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>