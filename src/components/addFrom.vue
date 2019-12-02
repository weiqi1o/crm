<template>
    <a-modal
            :visible="visible"
            title='新增客户'
            okText='添加'
            width="60%"
            cancelText="取消"
            @cancel="() => { $emit('cancel') }"
            @ok="() => { $emit('create') }"
    >
        <div class="contentModal">
            <a-form layout='vertical' :form="form">
                <a-form-item v-bind="formItemLayout">
                    <span slot="label">名称</span>
                    <a-input v-decorator ="verificationRules.name"/>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="E-mail">
                    <a-input v-decorator="verificationRules.email" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="手机号">
                    <a-input v-decorator="verificationRules.phone" style="width: 100%">
                        <a-select
                                slot="addonBefore"
                                v-decorator="verificationRules.prefix"
                                style="width: 70px"
                        >
                            <a-select-option value="86">
                                +86
                            </a-select-option>
                            <a-select-option value="87">
                                +87
                            </a-select-option>
                        </a-select>
                    </a-input>
                </a-form-item>
                <a-form-item label="头像" extra="" v-bind="formItemLayout">
                    <a-upload
                            name="avatar"
                            listType="picture-card"
                            class="avatar-uploader"
                            :fileList="fileList"
                            :showUploadList="false"
                            :initialValue ='initialValue'
                            :beforeUpload="beforeUpload"
                            @change="handleImgChange"
                            v-decorator="verificationRules.headPortrait"
                    >
                        <img v-if="imageUrl" :src="imageUrl" alt="avatar"/>
                        <div v-else>
                            <a-icon :type="loading ? 'loading' : 'plus'"/>
                            <div class="ant-upload-text">上传</div>
                        </div>
                    </a-upload>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="密码">
                    <a-input v-decorator="verificationRules.password" type="password"/>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="确认密码">
                    <a-input v-decorator="verificationRules.confirm" type="password"
                            @blur="handleConfirmBlur"
                    />
                </a-form-item>
                <a-form-item v-bind="formItemLayout">
                    <span slot="label">创建者</span>
                    <a-input
                            v-decorator="verificationRules.creator"
                    />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="出愿时间">
                    <a-date-picker placeholder="选择时间" v-decorator="verificationRules.datePicker"/>
                </a-form-item>
                <a-form-item v-bind="formItemLayout">
                    <span slot="label">专业</span>
                    <a-input v-decorator="verificationRules.major" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout">
                    <span slot="label">所报项目</span>
                    <a-input v-decorator="verificationRules.project"/>
                </a-form-item>
                <a-form-item v-bind="formItemLayout">
                    <span slot="label">期望院校</span>
                    <a-input  v-decorator="verificationRules.school" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout">
                    <span slot="label">备注</span>
                    <a-textarea
                            placeholder="备注"
                            :rows="4"
                            v-decorator="verificationRules.remark"
                    />
                </a-form-item>
                <a-form-item label="状态">
                    <a-radio-group v-decorator="verificationRules.status">
                        <a-radio value="a">
                            在读
                        </a-radio>
                        <a-radio value="b">
                            休读
                        </a-radio>
                        <a-radio value="c">
                            停读
                        </a-radio>
                        <a-radio value="d">
                            毕业
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </div>

    </a-modal>
</template>

<script>
    import {verificationRules,compareToFirstPassword,validateToNextPassword} from '@/rules/rules'
    import moment from 'moment';
    import 'moment/locale/zh-cn'
    moment.locale('zh-cn')
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    export default {
        name: "addFrom",
        props: ['visible'],
        data() {
            return {
                loading: false,
                imageUrl: '',
                verificationRules,
                fileList: [],
                previewVisible: false,
                initialValue:'',
                confirmDirty: false,
                formItemLayout: {
                    labelCol: {
                        xs: {span: 24},
                        sm: {span: 8},
                    },
                    wrapperCol: {
                        xs: {span: 24},
                        sm: {span: 16},
                    },
                }
            };
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'form_in_modal'});
        },
        methods: {

            handleCancel() {
                this.previewVisible = false;
            },
            handleConfirmBlur(e) {
                const value = e.target.value;
                this.confirmDirty = this.confirmDirty || !!value;
            },
            handleImgChange(info) {
                this.loading = true;
                getBase64(info.fileList[0].originFileObj, imageUrl => {
                    this.imageUrl = imageUrl;
                    this.loading = false;
                });
                this.handleUpload();
                return;

            },
            rulesImg(file) {
                const isJPG = file.type === 'image/jpeg';
                if (!isJPG) {
                    this.$message.error('请上传jpg格式图片!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('图片超过2MB!');
                }
                return isJPG && isLt2M;
            },
            beforeUpload(file){
                this.rulesImg(file)
                this.fileList = [...this.fileList, file];
                return false;
            },
            handleUpload() {
                const {fileList} = this;
                const formData = new FormData();
                fileList.forEach(file => {
                    formData.append('files[]', file);
                });
                this.uploading = true;
                this.initialValue = formData

            }
        }
    };
</script>

<style>
    .contentModal {
        width: 60%;
        margin: 0 auto;
        max-height: 60vh;
        overflow-y: auto;
    }

</style>
