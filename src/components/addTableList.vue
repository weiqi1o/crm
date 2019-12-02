<template>
    <div class="addList">
        <a-button type="primary" @click="showModal" icon="plus">添加</a-button>
        <addFrom
                :visible="visible"
                ref="collectionForm"
                @cancel="handleCancel"
                @create="handleCreate"
        />
    </div>
</template>
<script>
    import addFrom from './../components/addFrom'

    export default {
        name: "addTableList",
        components: {addFrom},
        data() {
            return {
                visible: false,
                // confirmLoading: false,
            };
        },
        methods: {
            showModal() {
                this.visible = true;
            },
            handleCancel(e) {
                this.visible = false;
            },
            //提交添加
            handleCreate() {
                const form = this.$refs.collectionForm.form;
                form.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    console.log('添加数据: ', values);
                    form.resetFields();
                    this.visible = false;
                    this.$message.success('添加成功');
                });
            }
        },
    };
</script>
<style scoped lang="less">
    .addList {
        text-align: start;
        padding: 20px;
        box-sizing: border-box;
    }

</style>




