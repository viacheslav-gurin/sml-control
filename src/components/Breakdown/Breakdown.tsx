import React from 'react';
import accounting from 'accounting';
import { Field } from 'redux-form';

const divideValue = (value: any): string => value && accounting.formatNumber(value, 0, " ");

const Breakdown: any = (props: any) => {
    return (        
        <div className="tax-switch">
            <div className="custom-control custom-switch">
                <Field className="custom-control-input" name={`tax.${props.wageOption}`} component="input" type="checkbox" id={`tax.${props.wageOption}`} />
                <span className="before-switch">Указать с НДФЛ</span>        
                <label className="custom-control-label" htmlFor={`tax.${props.wageOption}`}></label>
                <span className="after-switch">Без НДФЛ</span>
            </div>
            <div>
                <Field className="sum-field-modifier" name={`sum.${props.wageOption}`} component="input" type="text" id={`sum.${props.wageOption}`} normalize={divideValue}/>
                <label htmlFor={`sum.${props.wageOption}`}>
                    { props.wageOption === 'perMonth' && <span> &#x20bd;</span> }
                    { props.wageOption === 'perDay' && <span> &#x20bd; в день</span> }
                    { props.wageOption === 'perHour' && <span> &#x20bd; в час</span> }              
                </label>
            </div>
            { props.sum > 0 && props.wageOption === 'perMonth' &&
                <div className="bg-warning warning-modifier">
                    <p>{accounting.formatNumber(props.sum, 0, " ")} &#x20bd; <span className="details-label">будет получать на руки</span></p>
                    <p>{accounting.formatNumber(props.tax, 0, " ")} &#x20bd; <span className="details-label">НДФЛ, 13% от оклада</span></p>
                    <p>{accounting.formatNumber(props.total, 0, " ")} &#x20bd; <span className="details-label">за сотрудника в месяц</span></p>
                </div>
            }
        </div>
    )
};

export default Breakdown;