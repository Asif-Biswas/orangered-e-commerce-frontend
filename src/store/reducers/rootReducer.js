
const initialState={
    registrationContainer: false,
    forYouAndCategoryDone: false,
    firstTwoCategoryDone: false,
    canLoadMore: false,

    keyValue: 1,
    keyForPrice: 1,
    keyForNewCartItem: 1,
    keyValue2: 1,


    companyList: [],
    categoryList: [],

    totalItemInCart: 0,

    totalPrice: 0,
    totalPriceNow: 0,
    saving: 0,
    noItem: true,

    addNewItemInCart: [],

    fullName:'',
    fullAddress:'',
    email:'',
    phone:'',

    productId: 1,
    paymentDone: false,

    reloadPage: false,
    searchInput: '',
    goToSearch: false,

}


function rootReducer(state=initialState, action){
    switch (action.type){
        case 'goToSearch':
            return{
                ...state,
                searchInput: true
            }

        case 'searchInput':
            var inpt = action.payload
            return{
                ...state,
                searchInput: inpt
            }

        case 'reloadPage':
            return{
                ...state,
                reloadPage: !state.reloadPage
            }

        case 'paymentDone':
            return{
                ...state,
                paymentDone: !state.paymentDone
            }

        case 'productIdChanged':
            var id = action.payload
            return{
                ...state,
                productId: id,
                keyValue2: state.keyValue2 + 1
            }

        case 'phoneChanged':
            var data = action.payload
            return{
                ...state,
                phone: data
            }

            case 'emailChanged':
            data = action.payload
            return{
                ...state,
                email: data
            }

            case 'fullAddressChanged':
            data = action.payload
            return{
                ...state,
                fullAddress: data
            }

        case 'fullNameChanged':
            data = action.payload
            return{
                ...state,
                fullName: data
            }

        case 'keyForNewCartItem':
            return{
                ...state,
                keyForNewCartItem: state.keyForNewCartItem + 1
            }

        case 'cartItemDeleted':
            data = action.payload
            if(data.value === 'increase'){
                var totalPriceNow = state.totalPriceNow + data.priceNow
                var saving = state.saving + data.saving
                var totalItemInCart = state.totalItemInCart + 1
            }else{
                totalPriceNow = state.totalPriceNow - data.priceNow
                saving = state.saving - data.saving
                totalItemInCart = state.totalItemInCart - 1
            }
            return{
                ...state,
                totalPriceNow: totalPriceNow,
                saving: saving,
                totalItemInCart: totalItemInCart
            }

        case 'setAllprice':
            var total = action.payload
            return{
                ...state,
                totalPriceNow: total.total ,
                saving: total.saving,
                totalPrice: state.totalPriceNow + state.saving + total.total + total.saving
            }

        case 'priceChanged':
            var value = action.payload
            if(value.value === 'increased'){
                var totalPrice = state.totalPrice + value.price
                totalPriceNow = state.totalPriceNow + value.priceNow
                saving = state.saving + value.saving
            }else{
                totalPrice = state.totalPrice - value.price
                totalPriceNow = state.totalPriceNow - value.priceNow
                saving = state.saving - value.saving
            }
            //saving = totalPrice - totalPriceNow
            //var total = action.payload
            return{
                ...state,
                totalPrice: totalPrice,
                totalPriceNow: totalPriceNow,
                saving: saving,
                keyForPrice: state.keyForPrice + 1
            }

        case 'totalItemInCart':
            var total2 = action.payload
            return{
                ...state,
                totalItemInCart: total2,
            }

        case 'registrationContainer':
            return{
                ...state,
                registrationContainer: !state.registrationContainer,
            }

        case 'deleteFromCart':
            return{
                ...state,
                totalItemInCart: state.totalItemInCart - 1,
            }

        case 'itemInCart':
            return{
                ...state,
                totalItemInCart: state.totalItemInCart + 1,
            }

        case 'categoryList':
            var list = action.payload
            return{
                ...state,
                categoryList: list,
            }

        case 'companyList':
            var list2 = action.payload
            return{
                ...state,
                companyList: list2,
            }
    
        case 'forYouAndCategoryDone':
            return{
                ...state,
                forYouAndCategoryDone: !state.forYouAndCategoryDone,
            }

        case 'firstTwoCategoryDone':
            return{
                ...state,
                firstTwoCategoryDone: true,
            }
        
        case 'canLoadMore':
            return{
                ...state,
                canLoadMore: !state.canLoadMore,
            }

        case 'keyValue':
        return{
            ...state,
            keyValue: state.keyValue+1,
        }
        case 'keyValue2':
        return{
            ...state,
            keyValue2: state.keyValue2+1,
        }
            


        default:
            return state;
    }
}

export default rootReducer