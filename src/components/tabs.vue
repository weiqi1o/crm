<template>
    <div class="tabs_">
        <a-tabs hideAdd v-model="activeKey" type="editable-card" @edit="onEdit" @change="callback">
            <a-tab-pane v-for="(item,index) in pathList" :tab="item.meta.title" :key="item.path" :closable="index==0 ? false:true">
                <a-breadcrumb class="breadcrumb">
                    <a-breadcrumb-item v-if="item.meta.params.openKeys.length>0" v-for=" i in item.meta.params.openKeys">
                        <router-link :to="i.path">{{ i.title }}</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>{{item.meta.title}}</a-breadcrumb-item>
                </a-breadcrumb>

                <div class="tabsTitle">{{item.meta.title}}</div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    var arr = [];
    export default {
        name: "tabs",
        data() {
            return {
                activeKey: '',
                pathList: [],
                newTabIndex: 0
            };
        },
        watch: {
            $route(newVal) {
                this.activeKey = newVal.path;
                var pathList = this.pathList;
                if(!pathList.some(item => item.path ==newVal.path)){
                    this.add(newVal.path,newVal.meta)
                }
            },
        },
        created() {
            this.activeKey = this.$route.path;
            this.pathList.push({
                path:this.$route.path,
                meta:this.$route.meta
            })
        },
        methods: {
            callback(key) {
                this.$router.push(key)
            },
            onEdit(targetKey, action) {
                this[action](targetKey);
            },
            add(path,meta) {
                const activeKey = path;
                this.pathList.push({
                    path:path,
                    meta:meta
                });
                this.activeKey = activeKey;

            },
            remove(targetKey) {
                let activeKey = this.activeKey;
                let lastIndex;
                this.pathList.forEach((pane, i) => {
                    if (pane.path === targetKey) {
                        lastIndex = i - 1;
                    }
                });
                const pathList = this.pathList.filter(pane => pane.path !== targetKey);
                if (pathList.length && activeKey === targetKey) {
                    if (lastIndex >= 0) {
                        activeKey = pathList[lastIndex].path;
                    } else {
                        activeKey = pathList[0].path;
                    }
                }
                this.pathList = pathList;
                if(!this.activeKey==activeKey){
                    this.$router.push(activeKey)
                }
                this.activeKey = activeKey;

            }
        },
    }
</script>

<style scoped>
    .tabs_ {
        text-align: start;
        padding: 0 20px;
        box-sizing: border-box;
        background: white;
        padding-bottom: 16px;
    }
    .tabsTitle{
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
    }
    .breadcrumb{
        margin-bottom: 16px;
    }

</style>
