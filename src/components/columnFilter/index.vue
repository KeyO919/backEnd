<template>
<span class="ml-10">
    <el-button type="primary" size="small" icon="el-icon-setting" circle @click="innerVis = true"></el-button>
    <el-dialog title="表格自定义表头设置" :visible.sync="innerVis" width="40%" :append-to-body="apped">
        <el-checkbox-group v-model="checkedColumn">
            <el-row>
                <el-col v-for="item in columnsData" :key="item.key" :span="6" class="mb-10">
                    <el-checkbox :label="item.label"></el-checkbox>
                </el-col>
            </el-row>
        </el-checkbox-group>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleChange">取 消</el-button>
            <el-button type="primary" @click="submitChange">确 定</el-button>
        </div>
    </el-dialog>
</span>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    props: ['columnsData', 'type', 'apped'],
    data() {
        return {
            innerVis: false,
            checkedColumn: [],
        }
    },
    watch: {
        innerVis(val) {
            if (val) {
                this.checkedColumn = this.columnsDb
            }
        }
    },
    computed: {
        columnsDb() {
            if (!this.$store.getters[this.type]) {
                console.error(`请检查传入type是否正确`)
                return []
            } else {
                let newColumn = this.$store.getters[this.type].length > 0 ? this.$store.getters[this.type] : this.columnsData.map(item => {
                    return item.label
                })
                return newColumn
            }
        }
    },
    methods: {
        submitChange() {
            this.$store.commit('SET_COlUMNS', {
                type: this.type,
                list: this.checkedColumn
            })
            this.cancleChange()
        },
        cancleChange() {
            this.innerVis = false
        },
    }
}
</script>
