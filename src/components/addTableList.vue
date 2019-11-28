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
                // sub:false
            };
        },
        methods: {
            showModal() {
                this.visible = true;
            },
            handleCancel(e) {
                this.visible = false;
            },
            handleCreate() {
                const form = this.$refs.collectionForm.form;
                form.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    console.log('Received values of form: ', values);
                    form.resetFields();
                    this.visible = false;
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




