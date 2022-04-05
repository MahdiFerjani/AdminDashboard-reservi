// ** Initial State
const initialState = {
    vouchers: [],
    paramss: {},
    currentMails: null,
    emailsMetas: {},
    selectedMailss: []
  }
  const VouchersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_Vouchers':
        console.log(action)
        // ** If currentMail is not null / undefined then find and set currentMail
   
        return {
          ...state,
          vouchers: action.data
        
        }
      case 'GET_MAILS':
        console.log(action)
        // ** If currentMail is not null / undefined then find and set currentMail
   
        return {
          ...state,
          mails: action.data,
          params: action.params
        }
        case 'GET_PLATS':
          console.log(action)
          // ** If currentMail is not null / undefined then find and set currentMail
          
          return {
            ...state,
            plats: action.data,
            params: action.params
          }
      case 'PAGINATE_MAIL':
        // ** Find current mail & add hasNextMail & hasPreviousMail props to current mail object based on index
        const data = action.data
        const dataIndex = state.mails.findIndex(i => i.id === data.id)
        dataIndex === 0 ? (data.hasPreviousMail = false) : (data.hasPreviousMail = true)
        dataIndex === state.mails.length - 1 ? (data.hasNextMail = false) : (data.hasNextMail = true)
        return { ...state, currentMail: data }
      case 'UPDATE_MAILS':
        // ** Find and updated mail
        function updateMailData(email) {
          Object.assign(email, action.dataToUpdate)
        }
        state.mails.forEach(email => {
          if (action.emailIds.includes(email.id)) updateMailData(email)
        })
        return { ...state }
      case 'UPDATE_MAIL_LABEL':
        return { ...state }
      case 'SELECT_CURRENT_MAIL':
        return { ...state, currentMail: action.mail }
      case 'SELECT_MAIL':
        // ** Select mails
        const selectedMails = state.selectedMails
        if (!selectedMails.includes(action.id)) {
          selectedMails.push(action.id)
        } else {
          selectedMails.splice(selectedMails.indexOf(action.id), 1)
        }
        return { ...state, selectedMails }
      case 'SELECT_ALL_MAIL':
        // ** Select all mails
        const selectAllMails = []
        if (action.val) {
          selectAllMails.length = 0
          state.mails.forEach(mail => selectAllMails.push(mail.id))
        } else {
          selectAllMails.length = 0
        }
        return { ...state, selectedMails: selectAllMails }
      case 'RESET_SELECT_MAILS':
        // ** Reset(remove) all selected mails
        return { ...state, selectedMails: [] }
      default:
        return state
    }
  }
  
  export default VouchersReducer
  