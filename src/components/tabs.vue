<template>
    <div>
        <a-tabs class="tabs" v-model="activeKey" type="editable-card" @edit="onEdit">
            <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable" @click="callback(pane.key)" >
                <!--<div class="breadcrumb">-->
                    <!--<a-breadcrumb>-->
                        <!--<a-breadcrumb-item>Home</a-breadcrumb-item>-->
                        <!--<a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>-->
                        <!--<a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>-->
                        <!--<a-breadcrumb-item>An Application</a-breadcrumb-item>-->
                    <!--</a-breadcrumb>-->
                    <!--<br />-->
                    <!--<span class="activeBreadcrumb">当前页面</span>-->
                <!--</div>-->
                <span class="activeBreadcrumb">当前页面</span>
            </a-tab-pane>
        </a-tabs>

    </div>
</template>
<script>
    export default {
        name: 'tabs',
        data() {
            return {
                activeKey: '0',
                panes: [
                    {
                        title: '',
                        key: '0',
                        closable: false
                    }
                ],
                newTabIndex: 1,
            };
        },
        watch:{
            $route(to,from){
                this.add(to)
            }
        },
        methods: {
            callback(key) {
                console.log(key);
            },
            onEdit(targetKey, action) {
                this[action](targetKey);
                console.log(targetKey)
            },
            add(data) {
                const panes = this.panes;
                const activeKey = `${this.newTabIndex++}`;
                panes.push({title: data.meta.title, content: 'Content of new Tab', key: activeKey});
                this.panes = panes;
                this.activeKey = activeKey;
            },
            remove(targetKey) {
                let activeKey = this.activeKey;
                let lastIndex;
                this.panes.forEach((pane, i) => {
                    if (pane.key === targetKey) {
                        lastIndex = i - 1;
                    }
                });
                const panes = this.panes.filter(pane => pane.key !== targetKey);
                if (panes.length && activeKey === targetKey) {
                    if (lastIndex >= 0) {
                        activeKey = panes[lastIndex].key;
                    } else {
                        activeKey = panes[0].key;
                    }
                }
                this.panes = panes;
                this.activeKey = activeKey;
            },

        },
        mounted(){
            this.panes[0].title =  this.$route.meta.title;
            console.log(this.$route)
        }
    };
</script>
<style lang="less" >
    .tabs {
        text-align: start;
        background: white;
    }
    .ant-tabs-bar{
        padding-left: 16px;
    }
    .breadcrumb{
        padding-left:32px;
    }
    .activeBreadcrumb{
        display: block;
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 16px;
    }

    .ant-layout-content{
       min-height: auto;
    }
    .ant-tabs-extra-content{
        display: none;
    }

</style>
