import React from 'react'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className="container-fluid bg-light">
            <div className="container my-0">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <span className="fs-4">User List Using React and Redux</span>
                    </a>
                </header>
            </div>
        </div>
    )
}

export default Header