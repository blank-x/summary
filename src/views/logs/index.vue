<template>
  <div v-loading="loading" class="dashboard-container">
    <el-radio-group v-model="slideType" @change="changeSlideType">
      <el-radio label="one-in">横向动画</el-radio>
      <el-radio label="one-in2">纵向动画</el-radio>
      <el-radio label="one-in3">交错动画</el-radio>
      <el-radio label="one-in4">翻转动画</el-radio>
    </el-radio-group>
    <ul>
      <transition-group name="slide" tag="li" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <li
          v-for="(item ,index) in commitList"
          :key="item.sha"
          :data-index="index"
          class="TimelineItem"
          :class="{active:index===activeIndex,'container-3d':slideType==='one-in4'}"
          @mouseenter="mouseEnterItem(index)"
        >
          <div class="message-box">
            <a :href="item.html_url" target="_blank" class="message">{{ item.commit.message }}</a>
          </div>
          <div class="detail">
            <a v-if="item.committer" :href="item.committer.html_url"><img
              :src="item.committer.avatar_url"
              alt=""
              class="avatar"
            ></a>
            <img v-if="!item.committer" src="~@/assets/image/defaultAvatar.png" alt="" class="avatar">
            <div class="detail-text">
              <a v-if="item.committer" :href="item.committer.html_url" class="name">{{ item.commit.committer.name }}</a>
              <span v-if="!item.committer" class="name">{{ item.commit.committer.name }}</span>
              {{ $root.format(item.commit.committer.date) }}
            </div>
          </div>

        </li>
      </transition-group>
    </ul>
    <div v-if="commitList.length===0 && !loading" class="empty-txt">没有数据了</div>
    <div class="footer-btn-box">
      <el-button :disabled="pagination.page===1" @click="toPrev">上一页</el-button>
      <el-button @click="toNext">下一页</el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getListConfig } from '@/api/GitHub'
  // import defaultAvatar from '@/assets/image/defaultAvatar.png'
  export default {
    name: 'Dashboard',
    data() {
      return {
        commitList: [],
        activeIndex: null,
        loading: false,
        pagination: {
          page: 1,
          per_page: 10
        },
        cancel1: null,
        slideType: 'one-in'
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    created() {
      this.getList()
    },
    methods: {
      mouseEnterItem(index) {
        this.activeIndex = index
      },
      getList() {
        this.$ajax({
          ...getListConfig,
          params: this.pagination,
          cancelKey: 'cancel1',
          loadingKey: 'loading'
        }).then(res => {
          this.commitList = res
        }).catch((err) => {
          if (!err.data) {
            return
          }
          console.log(err.stop)
          err.stop()
          console.log(err)
        })
      },
      toPrev() {
        this.pagination.page--
        this.getList()
      },
      toNext() {
        if (this.commitList.length > 0) {
          this.pagination.page++
        }

        this.getList()
      },
      beforeEnter(el) {
        el.style.opacity = 0
      },
      enter(el, done) {
        const delay = el.dataset.index * 100
        if (this.slideType === 'one-in' || this.slideType === 'one-in2' || this.slideType === 'one-in4') {
          setTimeout(() => {
            el.style.transition = 'opacity 0.4s '
            el.style.opacity = 1
            el.style.animation = `${this.slideType} 0.4s  1`
            done()
          }, delay)
        } else if (this.slideType === 'one-in3') {
          const animation = el.dataset.index % 2 === 0 ? 'one-in 0.4s 1' : 'one-in3 0.4s 1'
          setTimeout(() => {
            el.style.transition = 'opacity 0.4s '
            el.style.opacity = 1
            el.style.animation = animation
            done()
          }, delay)
        }
      },
      leave(el) {
        el.style.transition = ''
        el.style.opacity = 0
        el.style.animation = ''
      },
      changeSlideType() {
        this.commitList.length = 0
        this.getList()
      }
    }
  }

</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .TimelineItem {
    padding: 8px 16px;
    border-radius: 6px;
    margin-bottom: 5px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
    border: 1px solid #eaecef;
    &.active {
      background-color: rgb(246 248 250);
    }
  }

  .message-box {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .message {
    font-size: 14px;
    color: #24292E;
    font-weight: 600;

    &:hover {
      color: #0366d6;
      text-decoration: underline;
    }
  }

  .detail {
    display: flex;
    align-items: center;
    margin-top: 4px;
    color: #586069;
  }

  .detail-text {
    font-size: 12px;
  }

  .name {
    font-size: 12px;
    color: #24292E;
    margin: 0 6px;
    font-weight: 600;
    line-height: 1.25;

    &:hover {
      text-decoration: underline;
    }
  }

  .date {
    font-size: 12px;
    line-height: 1.25;
    vertical-align: -3px;

  }

  .avatar {
    width: 20px;
    height: 20px;
  }

  .footer-btn-box {
    display: flex;
    justify-content: center;
  }
  .slide-type-change{
    margin-left: 30px;
  }

  .container-3d {
    transform-origin: center top;
    transform-style: preserve-3d;
    perspective: 1000px;
  }
</style>
<style>
  @keyframes one-in {
    from {
      transform: translateX(20%);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes one-in2 {
    from {
      transform: translateY(20%);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes one-in3 {
    from {
      transform: translateY(-20%);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes one-in4 {
    from {
      height: 100%;
      transform: rotateX(75deg);
    }
    to {
      height: 100%;
      transform: rotateX(0deg);
      /* transform-origin: 145%, 0; */
    }
  }

  .empty-txt{
    height: 150px;
    line-height: 150px;
    font-size: 12px;
    text-align: center;
  }
</style>
