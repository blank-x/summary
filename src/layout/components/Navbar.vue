<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmCAMAAAAOARRQAAAA4VBMVEUbFRUaFxcwMDAaFRX///8iHh79/f0dGBhUUFDT0tK4t7cwKyuysbHNy8syLS34+PhoZWUrJiYfGhrw8PDu7e3Z2Nivrq6npaVxbm5jYGDe3d3DwsKamJh7eHhtampXU1NCPj76+vr39vbg39/b29vR0NDBv7+Cf39aVlZNSUklICDy8vLq6enk5OTi4eHa2dnHxsa1s7NfW1s0Ly/o6OjV1NS8u7utq6ukoqKem5uSj491cnJdWVlXVFRRTU1IREQ+OTk4NDQuKionIiL09PS2tLSVkpKPjY2Kh4eHhISpp6evBPJsAAAAA3RSTlPmhwVTsZLPAAADoklEQVRo3u3aaVMaMRzHcWx+e7EHN+U+CoigghTv+6hV+/5fUOsITeIsm38WatuZ/T5TGT4SkrAEUp+2UuwPl9r6lNpiH9BWKsU+IJqyfgmTMCyshEmYv8t0WuczZ1LMZIoT5/G80mFs48y4Ut7Du4pe5WGjzE75C0LLeJcbY7IOIiq1rE0w7SkU1S7XZlwPhNLz9ZhqAaS+Zddg8g2QOzXiMuM6NPJz8RjXgVb9eRzGrUGz/bk+M3agXT+ny+TriJFvaDINxOqzHlPl/+Cw4ZuIyBw0hgdY1tJhXL4qv77++HKIFe09B4wxm6/TOw3G41vw22gbQw5nMli2+/L2Z2sXy47pTBu/G7BF9ydmzxtedQLjFxp02sNyzZwFbBEfNVTJzFTYFPlv5Vkk/+IEv5tYRCYLXpmROgWvQmQcaYaSOgOvZpGYHQjVaUwaQlUSU4bQIY3pQ+iYwozlq4tbihJArHtPYCoQ244xaGgSGHnMcjTmoSeNGoGRrvouGLEshHYtJdOBUM9i1I4gNFIyLQg9M3JN6clRMucQuqEztxA6UzIz8ApMo8PV8zMVvdOUdBgfvJ6SmSh2GtLSKSqZInhpHeYEvK6SychDTO8RQnkVI+5ovg6zDSFLxeyDt6/DTKUpqmIG4Jl5MiIPQ03FyI/dpis3EPKVzAmEvtOZZwillUwDQg6dOYDQqZLJQuyOqrhd6fVDybgQ86jMZ/mVXcmwGsRGNKVjShfWTM2cQmxgUBTjQB4DAtOC1DZh7VhpaF9y5L5AKj1WPpYypMyAwLDPkNu/ilbsHuRmTMnw9Vw49peT9NGOQDwT77JJDPOXF/b3Z1hUerLzIaPVPi+FHElpvfEovL4drPKXn8yRJ83uUXraRVgXRMYq8R0tC55vSbeqI7SeQWTY9WK4X+QJcROxJHmXjMbw+zZtxoz+yn10gJA8RmdyRf5sBst7a7B3PYUou64Gw1rCqYDRPDJhlr7Pw28k14x1mHKwmLm5sC1nh3yYory6izpcvMb76pYuYzhvhyPXGkz/Icax3dul1Jfh6n0Gcnt3cQ4hA2dxNfQ0mueN251AwUzvYh6ppiH2NZqpP8Q9ILbOIpm2NMesNY67K8WIw4srYVU21zu8z/3gzOp147lrfxRhLze17Cpmov4oglC+4kQN2tGFwZQMrVG5i4IbssGaM5tt8kMvt30f8sS1X9fSf/pJYcIkTMIkTMJsivlXvqCW+qAv9X3QVxR/AveXsgHzlAQ9AAAAAElFTkSuQmCC" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'

  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
