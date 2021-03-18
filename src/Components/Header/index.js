import React from 'react';

import Logo from '../Logo';
import InfoInput from '../InfoInput';

const Header = () => {
  return (
    <>
      <div className="row">
        <div className="col-xs-12 heading">
          INVOICE
			</div>
      </div>
      <div className="row branding">
        <div className="col-xs-6">
          <div className="invoice-number-container">
            <InfoInput
							label="Invoice #"
							id="invoice-number"
							type="text"
							info="invoice"
							name="invoice_number">
            </InfoInput>
          </div>
        </div>
        <div className="col-xs-6 logo-container">
          <Logo width={300} />
        </div>
      </div>
    </>
  )
}

export default Header;