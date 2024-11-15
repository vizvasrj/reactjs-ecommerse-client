import React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar } from 'reactstrap';
import Button from '../../Common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import Links from "../../../containers/Dashboard/links";
import { User } from '../../../containers/Users/models';
import { DashboardActionTypes, toggleDashboardMenu } from '../../../containers/Dashboard/actions';

interface Link {
    prefix?: string;
    to: string;
    name: string;
    provider?: string[];
}


const AccountMenu: React.FC = () => {

    const dispatch = useDispatch<ThunkDispatch<RootState, null, DashboardActionTypes>>();
    const user = useSelector((state: RootState) => state.account.user) as User;
    const isMenuOpen = useSelector((state: RootState) => state.dashboard.isMenuOpen);
    const links = Links[user.role] as Link[];

    const toggleMenu = () => {
        dispatch(toggleDashboardMenu());
    }

    const getAllowedProvider = (link: Link) => {
        if (!link.provider) return true;

        const userProvider = user.provider ?? '';
        if (!userProvider) return true;

        return link.provider.includes(userProvider);
    };

    return (
        <div className='panel-sidebar'>
            <Button
                text='Dashboard Menu'
                className={`${isMenuOpen ? 'menu-panel' : 'menu-panel collapse'}`}
                aria-expanded={isMenuOpen ? 'true' : 'false'}
                // aria-label={isMenuOpen ? 'dashboard menu expanded' : 'dashboard menu collapse'}
                onClick={toggleMenu}
            />
            <h3 className='panel-title'>Account</h3>
            <Navbar color='light' light expand='md'>
                <Collapse isOpen={isMenuOpen} navbar>
                    <ul className='panel-links'>
                        {links?.map((link, index) => {
                            const PREFIX = link.prefix ? link.prefix : '';
                            const isProviderAllowed = getAllowedProvider(link);
                            if (!isProviderAllowed) return null;
                            return (
                                <li key={index}>
                                    <NavLink to={PREFIX + link.to} className='active-link'>
                                        {link.name}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default AccountMenu;