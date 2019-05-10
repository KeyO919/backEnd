import db from '@/db'
import { filterChecked, transformFilture } from '@/utils/index'
import Cookies from 'js-cookie'


const tableSetting = {
    state: {
        personColumns: [],
    },
    getters: {
    },
    mutations: {
        SET_COlUMNS(state, { type, list }) {
            state[type] = list
            console.log(state[type])
            this.commit('UPDATE_DB', {
                key: type,
                value: list
            })
        },
        UPDATE_DB(state, { key, value }) {
            let userMobile = Cookies.get('wealth-uuid')
            const row = db.get(key).find({ 'wealth-uuid': userMobile })
            if (row.value()) {
                row.assign({ value }).write()
            } else {
                db.get(key).push({
                    'wealth-uuid': userMobile,
                    value
                }).write()
            }
        },
        DBTOVUEX(state, key) {
            let userMobile = Cookies.get('wealth-uuid')
            const row = db.get(key).find({ 'wealth-uuid': userMobile }).value()
            state[key] = row ? row.value : []
        }
    },
    actions: {
        TRANSFORM_COLUMNS({ commit, state }, { type, data ,s}) {
            return new Promise((resolve) => {
                if (state[type].length === 0) {
                    this.commit('SET_COlUMNS', {
                        type,
                        list: filterChecked(data)
                    })
                }
                resolve(transformFilture(state[type], data))
            })
        },
    }
}
export default tableSetting
