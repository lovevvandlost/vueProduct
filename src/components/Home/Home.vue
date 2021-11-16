<!--
 * @Description: home组件
 * @Author:  
 * @Date: 2021-10-31 01:08:04
 * @LastEditTime: 2021-11-03 18:12:09
 * @LastEditors:  
-->
<template>
  <el-container class="homeContainer">
    <el-header>
      <div class="logo_box">
        <img src="../../assets/logo_home.png" alt="home_logo">
        <span>XX后台管理系统</span>
      </div>
      <el-button @click="handlerOut" type="info">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 折叠按钮 -->
        <div class="toggle-button" @click="handlerCollapse">|||</div>
        <el-menu :default-active="activePath" class="el-menu-vertical-demo" background-color="#333744" text-color="#fff" active-text-color="#409eff" unique-opened :collapse="isCollapse" :collapse-transition="false" router >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveActivePath( '/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      // 左侧菜单数据
      menuList: [],
      iconObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出按钮事件
    handlerOut () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    // 控制折叠按钮
    handlerCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存activePath
    saveActivePath(activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.homeContainer {
  height: 100%;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    color: #fff;
    font-size: 20px;
    .logo_box {
      display: flex;
      align-items: center;
      > span {
        margin-left: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .toggle-button {
      background-color: #4a5064;
      font-size: 10px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.3em;
      color: white;
      cursor: pointer;
    }
    .iconfont {
      margin-right: 10px;
    }
    .el-menu{
        border: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>