<style lang="scss">

html, body {
    height: 100%;
}
body{
    padding-top:60px;
}
// *::-webkit-scrollbar {
//     width: 8px;
//     height: 0;
//     background: #e7eaec;
//     display: block;
// }
// *::-webkit-scrollbar-thumb {
//     background: #a3adb4;
//     border-radius: 4px;
//     -webkit-box-shadow: none;
//     visibility: visible;
//     border: none;
// }
// *::-webkit-scrollbar-track {
//     -webkit-box-shadow: none;
//     width: 8px;
//     background: transparent !important;
//     border: none;
// }
.layout {
    height: 100%;
    background: #f5f7f9;
    position: relative;
}
.layout-header {
    position: fixed;
    top: 0;
    right:0;
    height: 60px;
    width:100%;
    display: flex;
    align-items:center;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    background: #fff;
    z-index: 1;
}
.layout-title {
    width:220px;
    text-align: center;
    font-size:20px;
    font-weight: bold;
    color:#1ab394;
}
.layout-left .layout-logo {
    height: 60px;
    background-size: 140px;
    background-position: center;
}

.layout-left {
    height:100%;
    width: 220px;
    background: #fff;
    overflow-y: auto;
    overflow-x: hidden;
}
.layout-left .ivu-menu-item {
    padding: 0!important;
    line-height:41px;
    overflow: hidden;
}
.layout-left .ivu-menu-item a{
    display: block;
    padding: 0 24px 0 40px;
    color:inherit;
}
.layout-left-menu{
    min-height:100%;
    padding-bottom: 30px;
}
.layout-left-menu::-webkit-scrollbar {
    background: transparent;
}

.layout-center{
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
}
.layout-content {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 15px 40px 15px;
}
.layout-left-menu .ivu-menu-submenu>.ivu-menu{
    display:block!important;
}
.layout-left-menu .ivu-menu-submenu>.ivu-menu .ivu-menu-item {
    height:0;
    transition: height .3s ease;
}
.layout-left-menu .ivu-menu-submenu.ivu-menu-opened>.ivu-menu .ivu-menu-item {
    height:41px;
}



</style>

<template>

<div class="layout ivu-row-flex" id="app">
    <div class="layout-header">
        <p class="layout-title">后台UI文档</p>
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
    </div>
    <div class="layout-left">
        <Menu class="layout-left-menu" :active-name="activedMenu" :open-names="openedMenu" theme="light" width="220px" :accordion="true" ref="menu">
            <template v-for="(group,index) in menu">
                <Menu-item :name="group.name" :key="group.name" v-if="!group.children">
                    <router-link :to="'/'+group.path">{{group.name}}</router-link>
                </Menu-item>
                <Submenu :name="group.name" :key="index" v-else>
                    <template slot="title">
                        <Icon type="android-apps"></Icon>
                        {{group.name}}
                    </template>
                    <Menu-item :name="group.name+'/'+child.name" v-for="child in group.children" :key="group.name+'/'+child.name">
                        <router-link :to="'/'+group.path+'/'+child.path">{{child.name}}</router-link>
                    </Menu-item>
                </Submenu>
            </template>


        </Menu>
    </div>
    <div class="ivu-col layout-center">
        <div class="layout-content">
            <router-view></router-view>
        </div>
    </div>
</div>

</template>

<script>
import menu from './json/menu.json'
console.dir(menu);

export default {
    name: 'app',
    data() {
        return {
            theme2: 'light',
            activedMenu: 0,
            openedMenu: [],
            pathName: location.pathName,
            menu: null
        }
    },
    methods:{


    },
    mounted() {
        this.menu = menu
        // this.menu.every((e) => {
        //     e.Childs.every((e) => {
        //         if (e.Muid == this.activedMenu) {
        //             this.openedMenu = [e.ParentMuid]
        //             return false
        //         } else {
        //             return true
        //         }
        //     })
        //     if (!this.openedMenu) {
        //         return true
        //     }
        // })
        // this.$nextTick(() => {
        //     this.$refs.menu.updateActiveName()
        //     this.$refs.menu.updateOpened()
        // })
    }
}

</script>
