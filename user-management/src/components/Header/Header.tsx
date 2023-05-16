import React from 'react'

type Props = {
    profileImg: string
}

const Header = (props: Props) => {
    return (
        <nav className="bg-white  h-12 w-full border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">User Management</span>
                <div className="flex items-center md:order-2">
                    <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={props.profileImg} alt="user" />
                    </button>
                </div>

            </div>
        </nav>
    )
}

export default Header