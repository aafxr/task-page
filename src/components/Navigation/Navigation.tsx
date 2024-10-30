import clsx from "clsx";
import {NavLink, NavLinkRenderProps} from "react-router-dom";
import {PluseCircleIcon, ProfileIcon, UsersIcon,} from "../svg";
import "./Navigation.css";
import {BASE_URL} from "../../App";

interface NavigationProps {
    className?: string;
}

export function Navigation({className}: NavigationProps) {
    const navLinkClassName = ({isActive, isPending}: NavLinkRenderProps) =>
        'navigation-item ' + (isPending ? "pending" : isActive ? 'active' : "");

    return (
        <div className={clsx('navigation', className)}>
            <div className={'navigation-content'}>
                <NavLink to={BASE_URL + "contacts"} className={navLinkClassName}>
                    <div className='navigation-icon-container'>
                        <UsersIcon className="navigation-icon"/>
                    </div>
                </NavLink>
                <NavLink to={BASE_URL + "task/new"} className={navLinkClassName}>
                    <div className='navigation-icon-container'>
                        <PluseCircleIcon className="navigation-icon"/>
                    </div>
                </NavLink>
                <NavLink to={BASE_URL + 'tasks'} className={navLinkClassName}>
                    <div className='navigation-icon-container'>
                        <ProfileIcon className="navigation-icon"/>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}
