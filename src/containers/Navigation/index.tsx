// import React from 'react';
// import Header from '../Header';
// const Navigation: React.FC = ({ children }: any) => {
//     return (
//         <div>
//             <Header />
//             {children}
//         </div>
//     );
// }

// export default Navigation;

import React from 'react';

import { Link, NavLink as ActiveLink } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { RenderSuggestionParams, RenderSuggestion } from 'react-autosuggest';
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

// import actions from '../../actions';

import Button from '../../components/Common/Button';
import CartIcon from '../../components/Common/CartIcon';
import { BarsIcon } from '../../components/Common/Icon';
import MiniBrand from '../../components/Store//MiniBrand';
import Menu from '../NavigationMenu';
import Cart from '../Cart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { FetchStoreBrandsAction, fetchStoreBrands } from '../Brand/actions';
import { FetchCategoriesAction } from '../Category/interface';
import { fetchCategories, fetchStoreCategories } from '../Category/actions';
import { toggleBrand, toggleMenu, toggleCart } from './actions';
import { signOut } from '../Login/actions';
import { ClearAuthAction } from '../Authentication/action';
import { ThunkDispatch } from 'redux-thunk';
import { NavigationActionTypes } from './interface';
import {
    onSearch,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested

} from './actions';
import { navigate, NavigateActionType } from '../Navigate';
import { Product } from "../Product/interface";
type ActionsType =
    | NavigationActionTypes
    | FetchCategoriesAction
    | FetchStoreBrandsAction
    | NavigateActionType
    | ClearAuthAction;


const Navigation = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, ActionsType>>();
    const { searchValue } = useSelector((state: RootState) => state.navigation);
    const { brands } = useSelector((state: RootState) => state.brand);
    const { categories } = useSelector((state: RootState) => state.category);
    const { cartItems } = useSelector((state: RootState) => state.cart);
    const { user } = useSelector((state: RootState) => state.account);
    const { authenticated } = useSelector((state: RootState) => state.authentication);
    const { isMenuOpen, isCartOpen, isBrandOpen, searchSuggestions: suggestions } = useSelector((state: RootState) => state.navigation);
    // suggestions[0]._id

    React.useEffect(() => {
        dispatch(fetchStoreBrands());
        dispatch(fetchStoreCategories());
    }, [fetchStoreBrands, fetchStoreCategories]);


    const handleToggleBrand = () => {
        dispatch(fetchStoreBrands());
        dispatch(toggleBrand());
    }

    const handleToggleMenu = () => {
        console.log("handle1    ");
        dispatch(fetchStoreCategories());
        dispatch(toggleMenu());
    }

    const getSuggestionValue = (suggestion: any) => {
        return suggestion.name;
    }

    const handleOnSuggestionsClearRequested = () => {
        dispatch(onSuggestionsClearRequested());
    }

    const handleOnSuggestionsFetchRequested = (value: { value: string }) => {
        dispatch(onSuggestionsFetchRequested(value));
    }

    const handleToggleCart = () => {
        dispatch(toggleCart());
    }

    type RenderSuggestion<Product> = (suggestion: Product, params: RenderSuggestionParams) => React.ReactNode;
    const renderSuggestion: RenderSuggestion<Product> = (suggestion: any, { query, isHighlighted }: RenderSuggestionParams) => {
        const BoldName = (suggestion: Product, query: string) => {
            const name = suggestion.name || "";
            const matches = AutosuggestHighlightMatch(name, query);
            const parts = AutosuggestHighlightParse(name, matches);

            return (
                <div>
                    {parts.map((part, index) => {
                        const className = part.highlight
                            ? 'react-autosuggest__suggestion-match'
                            : '';
                        return (
                            <span className={className} key={index}>
                                {part.text}
                            </span>
                        );
                    })}
                </div>
            );
        };

        return (
            <Link to={`/product/${suggestion.slug}`}>
                <div className='d-flex'>
                    <img
                        className='item-image'
                        src={`${suggestion.imageUrl
                            ? suggestion.imageUrl
                            : '/images/placeholder-image.png'
                            }`}
                    />
                    <div>
                        <Container>
                            <Row>
                                <Col>
                                    <span className='name'>{BoldName(suggestion, query)}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span className='price'>${suggestion.price}</span>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </Link>
        );
    }

    const inputProps = {
        placeholder: 'Search Products',
        value: searchValue,
        onChange: (_: any, { newValue }: any) => {
            onSearch(newValue);
        }
    };

    return (
        <header className='header fixed-mobile-header'>
            <div className='header-info'>
                <Container>
                    <Row>
                        <Col md='4' className='text-center d-none d-md-block'>
                            <i className='fa fa-truck' />
                            <span>Affordable Shipping</span>
                        </Col>
                        <Col md='4' className='text-center d-none d-md-block'>
                            <i className='fa fa-credit-card' />
                            <span>Payment Methods</span>
                        </Col>
                        <Col md='4' className='text-center d-none d-md-block'>
                            <i className='fa fa-phone' />
                            <span>Email us <a className="bg-primary" href="mailto:postmaster@aapan.shop">postmaster@aapan.shop</a> </span>
                        </Col>
                        <Col xs='12' className='text-center d-block d-md-none'>
                            <i className='fa fa-phone' />
                            <span> Need advice? Call us 951-999-9999</span>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row className='align-items-center top-header'>
                    <Col
                        xs={{ size: 12, order: 1 }}
                        sm={{ size: 12, order: 1 }}
                        md={{ size: 3, order: 1 }}
                        lg={{ size: 3, order: 1 }}
                        className='pr-0'
                    >
                        <div className='brand'>
                            {categories && categories.length > 0 && (
                                <Button
                                    borderless
                                    variant='empty'
                                    className='d-none d-md-block'
                                    ariaLabel='open the menu'
                                    icon={<BarsIcon />}
                                    onClick={() => handleToggleMenu()}
                                />
                            )}
                            <Link to='/'>
                                <h1 className='logo'><img src="/images/logo.png" width="30" />AAPAN shop</h1>
                            </Link>
                        </div>
                    </Col>
                    <Col
                        xs={{ size: 12, order: 4 }}
                        sm={{ size: 12, order: 4 }}
                        md={{ size: 12, order: 4 }}
                        lg={{ size: 5, order: 2 }}
                        className='pt-2 pt-lg-0'
                    >
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={handleOnSuggestionsFetchRequested}
                            onSuggestionsClearRequested={handleOnSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            onSuggestionSelected={(_, item) => {
                                // history.push(`/product/${item.suggestion.slug}`);
                                dispatch(navigate(`/product/${item.suggestion.slug}`));
                            }}
                        />
                    </Col>
                    <Col
                        xs={{ size: 12, order: 2 }}
                        sm={{ size: 12, order: 2 }}
                        md={{ size: 4, order: 1 }}
                        lg={{ size: 5, order: 3 }}
                        className='desktop-hidden'
                    >
                        <div className='header-links'>
                            <Button
                                borderless
                                variant='empty'
                                ariaLabel='open the menu'
                                icon={<BarsIcon />}
                                onClick={() => handleToggleMenu()}
                            />
                            <CartIcon cartItems={cartItems} onClick={handleToggleCart} />
                        </div>
                    </Col>
                    <Col
                        xs={{ size: 12, order: 2 }}
                        sm={{ size: 12, order: 2 }}
                        md={{ size: 9, order: 1 }}
                        lg={{ size: 4, order: 3 }}
                    // className='px-0'
                    >
                        <Navbar color='light' light expand='md' className='mt-1 mt-md-0'>
                            <CartIcon
                                className='d-none d-md-block'
                                cartItems={cartItems}
                                onClick={() => {
                                    // history.push('/cart');
                                    dispatch(navigate('/cart'));
                                }}
                            />
                            <Nav navbar>
                                {brands && brands.length > 0 && (
                                    <Dropdown
                                        nav
                                        inNavbar
                                        toggle={() => handleToggleBrand()}
                                        isOpen={isBrandOpen}
                                    >
                                        <DropdownToggle nav>
                                            Brands
                                            <span className='fa fa-chevron-down dropdown-caret'></span>
                                        </DropdownToggle>
                                        <DropdownMenu right className='nav-brand-dropdown'>
                                            <div className='mini-brand'>
                                                <MiniBrand
                                                    brands={brands}
                                                    toggleBrand={() => handleToggleBrand()}
                                                />
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                )}
                                <NavItem>
                                    <NavLink
                                        tag={ActiveLink}
                                        to='/shop'
                                        activeClassName='active'
                                    >
                                        Shop
                                    </NavLink>
                                </NavItem>
                                {authenticated ? (
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav>
                                            {user.firstName ? user.firstName : 'Welcome'}
                                            <span className='fa fa-chevron-down dropdown-caret'></span>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem
                                                // onClick={() => history.push('/dashboard')}
                                                onClick={() => dispatch(navigate('/dashboard'))}
                                            >
                                                Dashboard
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() => dispatch(signOut())}
                                            >
                                                Sign Out
                                            </DropdownItem>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                ) : (
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav>
                                            Welcome!
                                            <span className='fa fa-chevron-down dropdown-caret'></span>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={() =>
                                                // history.push('/login')
                                                dispatch(navigate('/login'))
                                            }>
                                                Login
                                            </DropdownItem>
                                            <DropdownItem onClick={() =>
                                                // history.push('/register')
                                                dispatch(navigate('/register'))
                                            }>
                                                Sign Up
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                )}
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Container>

            {/* hidden cart drawer */}
            <div
                className={isCartOpen ? 'mini-cart-open' : 'hidden-mini-cart'}
                aria-hidden={`${isCartOpen ? false : true}`}
            >
                <div className='mini-cart'>
                    <Cart />
                </div>
                <div
                    className={
                        isCartOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
                    }
                    onClick={handleToggleCart}
                />
            </div>

            {/* hidden menu drawer */}
            <div
                className={isMenuOpen ? 'mini-menu-open' : 'hidden-mini-menu'}
                aria-hidden={`${isMenuOpen ? false : true}`}
            >
                <div className='mini-menu'>
                    <Menu />
                </div>
                <div
                    className={
                        isMenuOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
                    }
                    onClick={handleToggleMenu}
                />
            </div>
        </header>
    );
};

export default Navigation;