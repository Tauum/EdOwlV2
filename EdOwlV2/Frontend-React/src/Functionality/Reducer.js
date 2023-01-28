export const initialState = {
    user: {},
    signUp: { firstName:"",lastName:"",email:"",dob:"" },
    error: {code: "", message:""},

    editQuiz: { title: "", subject:"",description:"", endContent:"", timeLimit: 0, value: 0, hidden: true, questions: [] },
    initialQuestion: { question: "", value: 0, explaination: "",  answers: Array.from({ length: 2 }, () => ({  content: "new", correct: false }))},
    initialAnswer: { content:"new", correct:false},

    editSwipe: { title: "", subject:"",description:"", endContent:"", value: 0, hidden: true, cards: [] },
    initialCard: { question: "", subText:"",imgURL:"",correct:false, value: 0, explaination: ""},

    editShifter: { title: "", subject:"",description:"", endContent:"", value: 0, hidden: true, definitions: [] },
    initialDefinition: { title: "", explaination:"",value:0},
    
    editExtra: { title:"",author:"",content:"",hidden:true,summary:"",video:"",views:"" },
    editUpdate: { content:"", redirect:"" },
    
    editPropagate: {title: "", subject:"", description: "", endContent:"", answer:"", value: 0, hidden:true, lives: 0 },
    defaultModule: { id: 0,  code: "", name: "", students: [], admins: [], quizzes: [], hangmen: [], extras: [], matches: [], feedbacks: [], swipes: [] }
};


const Reducer = (state, action) => {
    // console.log(action)
    switch (action.type) {
        case "SET_ERROR":
            return { ...state, error: action.error }
        
        case "SET_DISPLAY_OPTION":
            return {...state, displayOption: action.displayOption}

        case "SET_USER":
            return { ...state, user: action.user }

        case "CLEAR_USER":
            return { ...state, user: {} }
            
        case "CLEAR_STATE":
            return { initialState }

        case "SET_UPDATES": 
            return {...state, updates: action.updates}


        case "SET_EDIT_USER":
            return { ...state, editQuiz: action.editQuiz }

        default:
            return state;
    }

};

export default Reducer;

