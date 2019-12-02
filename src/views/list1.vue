<template>
    <div>
        <addTableList></addTableList>
        <a-table bordered :pagination='pagination' :columns="columns" :dataSource="data" :scroll="scroll">
            <a slot="action" slot-scope="text" href="javascript:;">action</a>
            <!--标签-->
            <span slot="tags" slot-scope="tags">
            <a-tag
                    v-for="tag in tags"
                    :color="tag==='停读' ? 'volcano' : (tag =='修读' ? 'geekblue':(tag=='毕业'? 'cyan': 'green'))"
                    :key="tag"
            >
                {{tag.toUpperCase()}}
            </a-tag>
        </span>
            <!--标签结束-->
            <!--搜索-->
            <a-icon
                    slot="filterIcon"
                    slot-scope="filtered"
                    type="search"
                    :style="{ color: filtered ? '#108ee9' : undefined }"
            />
            <div
                    slot="filterDropdown"
                    slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                    style="padding: 8px"
            >
                <a-input
                        v-ant-ref="c => searchInput = c"
                        :placeholder="`姓名搜索`"
                        :value="selectedKeys[0]"
                        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="() => handleSearch(selectedKeys, confirm)"
                        style="width: 188px; margin-bottom: 8px; display: block;"
                />
                <a-button
                        type="primary"
                        @click="() => handleSearch(selectedKeys, confirm)"
                        icon="search"
                        size="small"
                        style="width: 90px; margin-right: 8px"
                >查找
                </a-button
                >
                <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px"
                >重置
                </a-button
                >
            </div>
            <template slot="customRender" slot-scope="text">
            <span v-if="searchText">
        <template
                v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
                  v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                  :key="i"
                  class="highlight"
          >{{fragment}}</mark
          >
          <template v-else
          >{{fragment}}</template
          >
        </template>
      </span>
                <template v-else
                >{{text}}
                </template
                >
            </template>
            <!--搜索结束-->
            <!--删除-->
            <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                        v-if="data.length"
                        title="确认删除?"
                        okText="确认"
                        @cancel="cancelDelete()"
                        cancelText="取消"
                        @confirm="() => onDelete(record.key)"
                >
                    <a href="javascript:;">Delete</a>
                </a-popconfirm>
            </template>
            <!--删除结束-->
        </a-table>
    </div>

</template>
<script>
    import addTableList from './../components/addTableList'

    const data = [
        {
            key: 'id',
            id:'id',
            name: '阿桑蚕丝',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读'],


        },
        {
            key: '11',
            id:'0',
            title:'0',
            name: '删除撒',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读'],


        },
        {
            key: '22',
            id:'1',
            title:'0',
            name: '四川省',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业'],


        },
        {
            key: '33',
            id:'2',
            title:'0',
            name: '而且我',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业','停读'],


        },
        {
            key: '44',
            id:'3',
            title:'0',
            name: '加哦',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业','停读'],


        },
        {
            key: '55',
            id:'4',
            title:'0',
            name: '哈哈',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业','停读'],


        },
        {
            key: '66',
            id:'5',
            title:'0',
            name: '不能',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业','停读'],


        },
        {
            key: '77',
            id:'6',
            title:'0',
            name: '搜索',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业','停读'],


        },
        {
            key: '88',
            id:'7',
            title:'0',
            name: '纷纷',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业','停读'],


        },
        {
            key: '99',
            id:'8',
            title:'0',
            name: '卡路里',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业','停读'],


        },
        {
            key: '110',
            id:'9',
            title:'0',
            name: '搞个',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业','停读'],


        },
        {
            key: '120',
            id:'10',
            title:'0',
            name: '都是',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业','停读'],


        },
        {
            key: '130',
            id:'11',
            title:'0',
            name: '不管不顾',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业','停读'],


        },
        {
            key: '140',
            id:'12',
            title:'0',
            name: '哦哦',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业','停读'],


        },
        {
            key: '150',
            id:'13',
            title:'0',
            name: '额外',
            phone: '1234556789',
            email: '邮箱',
            HeadPortrait:'头像',
            pId:'0',
            password:'12345',
            creator:'www',
            time:'2019-11-01',
            major:'v城市的',
            project:'电风扇',
            school:'东京大学',
            remarks:'备注',
            status: ['在读', '修读','毕业','停读'],


        }
    ];


    export default {
        name: "list1",
        components:{addTableList},
        data() {
            return {
                data,
                scroll: {
                    x: 2680,
                    y: 'calc( 100vh - 216px)'
                },
                columns: [
                    {
                        title: 'ID', width: 50, dataIndex: 'id', key: '0', fixed: 'left',
                    },
                    {title: '名称', width: 120, dataIndex: 'name', key: '00',fixed: 'left',
                        scopedSlots: {
                            filterDropdown: 'filterDropdown',
                            filterIcon: 'filterIcon',
                            customRender: 'customRender',
                        },
                        onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
                        onFilterDropdownVisibleChange: visible => {
                            if (visible) {
                                setTimeout(() => {
                                    this.searchInput.focus();
                                }, 0);
                            }
                        }
                    },
                    {title: '邮箱', width: 200, dataIndex: 'email', key: '1'},
                    {title: '手机号', width: 200, dataIndex: 'phone', key: '2',
                        scopedSlots: {
                            filterDropdown: 'filterDropdown',
                            filterIcon: 'filterIcon',
                            customRender: 'customRender',
                        },
                        onFilter: (value, record) => record.phone.toString().toLowerCase().includes(value.toLowerCase()),
                        onFilterDropdownVisibleChange: visible => {
                            if (visible) {
                                setTimeout(() => {
                                    this.searchInput.focus();
                                }, 0);
                            }
                        }
                    },
                    {title: '头像', width: 200, dataIndex: 'HeadPortrait', key: '3'},
                    {title: '平台用户ID', width: 200, dataIndex: 'pId', key: '4'},
                    {title: '密码', width: 200, dataIndex: 'password', key: '5'},
                    {title: '创建者', width: 200, dataIndex: 'creator', key: '6',
                        scopedSlots: {
                            filterDropdown: 'filterDropdown',
                            filterIcon: 'filterIcon',
                            customRender: 'customRender',
                        },
                        onFilter: (value, record) => record.creator.toString().toLowerCase().includes(value.toLowerCase()),
                        onFilterDropdownVisibleChange: visible => {
                            if (visible) {
                                setTimeout(() => {
                                    this.searchInput.focus();
                                }, 0);
                            }
                        }},
                    {title: '出愿时间', width: 130, dataIndex: 'time', key: '7',
                        scopedSlots: {
                            filterDropdown: 'filterDropdown',
                            filterIcon: 'filterIcon',
                            customRender: 'customRender',
                        },
                        onFilter: (value, record) => record.time.toString().toLowerCase().includes(value.toLowerCase()),
                        onFilterDropdownVisibleChange: visible => {
                            if (visible) {
                                setTimeout(() => {
                                    this.searchInput.focus();
                                }, 0);
                            }
                        }},
                    {title: '专业', width: 200, dataIndex: 'major', key: '8',
                        scopedSlots: {
                            filterDropdown: 'filterDropdown',
                            filterIcon: 'filterIcon',
                            customRender: 'customRender',
                        },
                        onFilter: (value, record) => record.major.toString().toLowerCase().includes(value.toLowerCase()),
                        onFilterDropdownVisibleChange: visible => {
                            if (visible) {
                                setTimeout(() => {
                                    this.searchInput.focus();
                                }, 0);
                            }
                        }},
                    {title: '所报项目', width: 200, dataIndex: 'project', key: '9',
                        scopedSlots: {
                            filterDropdown: 'filterDropdown',
                            filterIcon: 'filterIcon',
                            customRender: 'customRender',
                        },
                        onFilter: (value, record) => record.project.toString().toLowerCase().includes(value.toLowerCase()),
                        onFilterDropdownVisibleChange: visible => {
                            if (visible) {
                                setTimeout(() => {
                                    this.searchInput.focus();
                                }, 0);
                            }
                        }},
                    {title: '期望院校', width: 200, dataIndex: 'school', key: '10',
                        scopedSlots: {
                            filterDropdown: 'filterDropdown',
                            filterIcon: 'filterIcon',
                            customRender: 'customRender',
                        },
                        onFilter: (value, record) => record.school.toString().toLowerCase().includes(value.toLowerCase()),
                        onFilterDropdownVisibleChange: visible => {
                            if (visible) {
                                setTimeout(() => {
                                    this.searchInput.focus();
                                }, 0);
                            }
                        }},
                    {title: '备注', width: 200, dataIndex: 'remarks', key: '11'},
                    {title: '状态', width: 250, dataIndex: 'status', key: '12',scopedSlots: {customRender: 'tags'},},
                    {
                        title: 'Action',
                        key: 'operation',
                        fixed: 'right',
                        width: 100,
                        scopedSlots: {customRender: 'operation'},
                    },
                ],
                searchText: '',
                searchInput: null,
                pagination: {
                    pageSize: 20, // 默认每页显示数量
                }
            };
        },
        methods: {
            handleSearch(selectedKeys, confirm) {
                confirm();
                this.searchText = selectedKeys[0];
            },

            handleReset(clearFilters) {
                clearFilters();
                this.searchText = '';
            },
            onDelete(key) {
                const dataSource = [...this.data];
                this.data = dataSource.filter(item => item.key !== key);
                this.$message.error('删除成功！');
            },
            cancelDelete(){
                this.$message.warning('已取消！');
            }
        }
    };
</script>

<style lang="less">
    .ant-table-pagination.ant-pagination {
        float: initial !important;
    }

</style>
