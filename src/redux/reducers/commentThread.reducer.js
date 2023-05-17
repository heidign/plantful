
const comments = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_COMMENTS':
            return action.payload;
        case 'ADD_BASE_COMMENT':
            return [...state, action.payload];
        case 'ADD_CHILDREN_COMMENTS':
            // creating new array
            let newArr = [];
            // looping through current comments
            for (let i = 0; i < state.length; i++) {
                // checking if id of current comment = parent_id of first child
                if (state[i].id === action.payload[0]?.parent_id) {
                    // spreading new array, adding current comment, adding all child comments
                    newArr = [...newArr, state[i], ...action.payload];
                    // otherwise push current comment to new array
                } else {
                    newArr.push(state[i]);
                }
            }
            return newArr;
        case 'REMOVE_CHILDREN':
            return state.filter((comment) => {
                if (!comment.path.split('.').includes(`${action.payload}`)) {
                    return comment
                }
            })
        default:
            return state;
    }
}

export default comments;