import React, { useState, useRef, ReactEventHandler } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Breakdown from '../Breakdown/Breakdown';

const renderTooltip = (props: any) => {
    return (
        <Tooltip {...props}>
            МРОТ &ndash; минимальный размер оплаты труда. Разный для разных регионов.
        </Tooltip>
    )
};

let Control: any = (props: any) => {
    const {
        wageOptionsValue,
        sumValue,
        taxValue,
        totalValue,
        handleSubmit
    } = props;

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <div className="container">
        <div className="row">
            <div className="col-sm salary-control">
                <form onSubmit={handleSubmit(() => {})}>               
                    <p className="control-title">Сумма</p>
                    <div className="custom-control custom-radio">
                        <Field className="custom-control-input" name="wageOptions" component="input" type="radio" label="Оклад за месяц" id="option1" value="perMonth" />
                        <label className="custom-control-label" htmlFor="option1" data-placement="right">Оклад за месяц</label>
                    </div>
                    <div className="custom-control custom-radio vertically-aligned">
                        <Field className="custom-control-input" name="wageOptions" component="input" type="radio" id="option2" value="mrot" />
                        <label className="custom-control-label" htmlFor="option2">МРОТ
                        </label>

                        <>
                            <OverlayTrigger trigger={['hover', 'focus', 'click']} placement="right" overlay={renderTooltip}>
                                <input type="checkbox" className="toggle-icon" ref={target} data-toggle="tooltip" onClick={() => setShow(!show)}></input>
                            </OverlayTrigger>
                            <Overlay target={target.current} show={show} placement="right">
                                {renderTooltip}
                            </Overlay>
                        </>

                    </div>
                    <div className="custom-control custom-radio">
                        <Field className="custom-control-input" name="wageOptions" component="input" type="radio" id="option3" value="perDay" />
                        <label className="custom-control-label" htmlFor="option3">Оплата за день</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <Field className="custom-control-input" name="wageOptions" component="input" type="radio" id="option4" value="perHour" />
                        <label className="custom-control-label" htmlFor="option4">Оплата за час</label>
                    </div>
                    {
                        wageOptionsValue && wageOptionsValue !== 'mrot' && 
                        <Breakdown wageOption={wageOptionsValue} sum={sumValue} tax={taxValue} total={totalValue} />
                    }
                </form>
            </div>
            <div className="col-sm"></div>
            <div className="col-sm"></div>
        </div>
    </div>
    );
};

Control = reduxForm({
    form: 'salaryControl'
})(Control);

const selector = formValueSelector('salaryControl');

Control = connect(state => {
    const wageOptionsValue: any = selector(state, 'wageOptions');
    let initialSumValue: any = selector(state, `sum.${wageOptionsValue}`);
    let taxIncluded: string;
    let taxValue: number, sumValue: number, totalValue: number;

    if (initialSumValue) {
        initialSumValue = initialSumValue ? initialSumValue.split(' ').join('') * 1 : undefined;
    }
    taxIncluded = selector(state, `tax.${wageOptionsValue}`);
    taxValue = taxIncluded ? Math.round((initialSumValue * .13)) : Math.round(((initialSumValue * .13) / .87));
    sumValue = taxIncluded ? initialSumValue - taxValue : initialSumValue;
    totalValue = sumValue + taxValue;

    return {
        wageOptionsValue,
        sumValue,
        taxValue,
        totalValue,
        taxIncluded
    }
})(Control);

export default Control;