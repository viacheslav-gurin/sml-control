import accounting from 'accounting';

interface Values {  
    tax: {
        [key: string]: boolean
    },
    sum: {
        [key: string]: string
    }
};

const initValues: Values = {
    tax: {
        perMonth: true,
        perDay: true,
        perHour: true 
      },
    sum: {
        perMonth: accounting.formatNumber(40000, 0, " "),
        perDay: accounting.formatNumber(1500, 0, " "),
        perHour: accounting.formatNumber(400, 0, " ")
      }
};

export default initValues;