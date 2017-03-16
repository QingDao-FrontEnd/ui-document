<style lang="scss">

html,
body {
    height: 100%;
}

body {
    padding-top: 60px;
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
    right: 0;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    background: #fff;
    z-index: 1;
}

.layout-title {
    width: 220px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #1ab394;
}

.layout-left .layout-logo {
    height: 60px;
    background-size: 140px;
    background-position: center;
}

.layout-left {
    height: 100%;
    width: 220px;
    background: #fff;
    overflow-y: auto;
    overflow-x: hidden;
}

.layout-left .ivu-menu-item {
    padding: 0!important;
    line-height: 41px;
    overflow: hidden;
}

.layout-left .ivu-menu-item a {
    display: block;
    padding: 0 24px 0 40px;
    color: inherit;
}

.layout-left-menu {
    min-height: 100%;
    padding-bottom: 30px;
}

.layout-left-menu::-webkit-scrollbar {
    background: transparent;
}

.layout-center {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
}

// .layout-content {
//     position: relative;
//     max-width: 800px;
//     margin: 0 auto;
//     padding: 20px 15px 40px 15px;
// }
.layout-left-menu .ivu-menu-submenu>.ivu-menu {
    display: block!important;
}

.layout-left-menu .ivu-menu-submenu>.ivu-menu .ivu-menu-item {
    height: 0;
    transition: height .3s ease;
}

.layout-left-menu .ivu-menu-submenu.ivu-menu-opened>.ivu-menu .ivu-menu-item {
    height: 41px;
}

</style>

<template>

<div class="layout ivu-row-flex">
    <div class="layout-header">
        <p class="layout-title">后台UI文档</p>
    </div>
    <div class="layout-left">
        <Menu class="layout-left-menu" :active-name="activedMenu" :open-names="openedMenu" theme="light" width="220px" :accordion="true" ref="menu">
            <template v-for="(group,index) in menu">
                <Menu-item :name="'/'+group.path" :key="group.path" v-if="!group.children">
                    <router-link :to="'/'+group.path">{{group.name}}</router-link>
                </Menu-item>
                <Submenu :name="group.path" :key="index" v-else>
                    <template slot="title">
                        <Icon type="android-apps"></Icon>
                        {{group.name}}
                    </template>
                    <Menu-item :name="'/'+group.path+'/'+child.path" v-for="child in group.children" :key="'/'+group.path+'/'+child.path">
                        <router-link :to="'/'+group.path+'/'+child.path">{{child.name}}</router-link>
                    </Menu-item>
                </Submenu>
            </template>
        </Menu>
    </div>
    <div class="ivu-col layout-center">
        <!-- <div class="layout-content"> -->
        <router-view></router-view>
        <!-- </div> -->
    </div>
</div>

</template>

<script>

// import menu from './json/menu.json'

export default {
    data() {
            return {
                theme2: 'light',
                activedMenu: 0,
                openedMenu: [],
                pathName: location.pathName,
                menu: null
            }
        },
        methods: {


        },
        mounted() {
            fetch('json/menu.json').then((res) => {
                return res.json()
            }).then((menu) => {
                this.menu = menu
                this.activedMenu = this.$route.path
                let open = this.$route.path.split('/')
                if (open.length == 3) {
                    this.openedMenu = [open[1]]
                }
                this.$nextTick(() => {
                    this.$refs.menu.updateActiveName()
                    this.$refs.menu.updateOpened()

                })
                this.$router.addRoutes([{
                    path: '/dashboard',
                    component: resolve => {
                        require.ensure(['./pages/dashboard.vue'], () => {
                            resolve(require('./pages/dashboard.vue'))
                        })
                    }
                }])
            }).catch((err) => {
                console.dir(err);
                console.log('出错了')
            })

        }
}

</script>
