import { Row, Col } from 'reactstrap';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import AddMerchant from '../../components/Manager/AddMerchant';
import { RootState } from '../../reducer';
import { useSelector } from 'react-redux';


const Sell = () => {
    const { merchantFormData, formErrors, isSubmitting, isLoading } = useSelector((state: RootState) => state.merchant);

    return (
        <div className='sell'>
            {isLoading && <LoadingIndicator />}
            <h3 className='text-uppercase'>Become A AAPAN Store Seller!</h3>
            <hr />
            <Row>
                <Col xs='12' md='6' className='order-2 order-md-1'>
                    <AddMerchant
                        merchantFormData={merchantFormData}
                        formErrors={formErrors}
                        isSubmitting={isSubmitting}
                        submitTitle='Submit'
                    />
                </Col>
                <Col xs='12' md='6' className='order-1 order-md-2'>
                    <Row>
                        <Col xs='12' className='order-2 order-md-1 text-md-center mb-3'>
                            <div className='agreement-banner-text'>
                                <h3>Would you like to sell your products on AAPAN shop!</h3>
                                <h5>Grow your business with AAPAN Shop</h5>
                                <b>Apply Today</b>
                            </div>
                        </Col>

                        <Col
                            xs='12'
                            className='order-1 order-md-2 text-center mb-3 mb-md-0'
                        >
                            <img
                                className='agreement-banner'
                                src={'/images/banners/agreement.svg'}
                                alt='agreement banner'
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}


export default Sell;