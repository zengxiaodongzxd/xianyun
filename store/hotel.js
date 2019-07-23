export const state = () => ({
    dataInfo:{},
    locationStr:'',
    // scenery:[],
    // traffic:[]
})

export const mutations = {
    setDataInfo(state,data){
        state.dataInfo=data
    },
    setLocationStr(state,data){
        state.locationStr=data
    }
    // setScenery(state,data){
    //     state.scenery=data
    // },
    // setTraffic(state,data){
    //     state.traffic=data
    // }
}