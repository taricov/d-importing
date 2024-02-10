// import {useI18n} from 'vue-i18n' 

// const {t, locale} = useI18n();

// export const tt = (translation) => {
//     return _.capitalize(t(translation))
    
//     }

export function convertDate(excelDate) {
    const year = excelDate.getFullYear() 
      const month = excelDate.getMonth()+1 < 10 ? `0${excelDate.getMonth()+1}` : excelDate.getMonth()+1
      const day = excelDate.getDate() < 10 ? `0${excelDate.getDate()}` : excelDate.getDate()
    return `${year}-${month}-${day}` 
    }