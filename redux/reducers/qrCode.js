const initialState = {
    error: {},
    QRcode: {},
    data: {},
    deleteQr: {}
};

export const QRCode = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_QRCODE":
            return {
                ...state,
                data: action.payload.data,
            };
        case "GET_QRCODE":
            return {
                ...state,
                QRcode: action.payload,
            };
        case "DELETE_QR":
            return {
                ...state,
                deleteQr: action.payload.data,
            };
        case "SET_LOADING":
            return { ...state, error: action?.payload?.response };
        default:
            return state;
            break;
    }
};
