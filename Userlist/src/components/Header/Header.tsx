import React from 'react'
import './header.css'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className="container-fluid headerSection">
            <div className="container my-0">
                <header className="d-flex flex-wrap justify-content-center py-3 ">
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <span className="fs-5 text-white">User List Using React and Redux</span>
                    </a>
                </header>
            </div>
        </div>
    )
}

export default Header