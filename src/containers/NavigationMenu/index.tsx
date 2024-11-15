import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';
import Button from '../../components/Common/Button';
import { CloseIcon } from '../../components/Common/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { toggleMenu } from '../Navigation/actions';
import { ThunkDispatch } from 'redux-thunk';
import { NavigationActionTypes } from '../Navigation/interface';
import { Category } from '../Category/interface';


const NavigationMenu = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, NavigationActionTypes>>();
    const handleCategoryClick = () => {
        dispatch(toggleMenu());
    };
    const { isMenuOpen } = useSelector((state: RootState) => state.navigation);
    const categories = useSelector((state: RootState) => state.category.storeCategories) as Category[];

    return (
        <div className='navigation-menu'>
            <div className='menu-header'>
                {isMenuOpen && (
                    <Button
                        borderless
                        variant='empty'
                        ariaLabel='close the menu'
                        icon={<CloseIcon />}
                        onClick={handleCategoryClick}
                    />
                )}
            </div>
            <div className='menu-body'>
                <Container>
                    <h3 className='menu-title text-uppercase'>Shop By Category</h3>
                    <nav role='navigation'>
                        <ul className='menu-list'>
                            {categories?.map((link, index) => (
                                <li key={index} className='menu-item'>
                                    <NavLink
                                        onClick={handleCategoryClick}
                                        to={'/shop/category/' + link.slug}
                                        className={'active-link'}
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Container>
            </div>
        </div>
    );
}



export default NavigationMenu;