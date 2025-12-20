import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import { Message } from './Message';

export const PrivateLayout = () => {
    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-auto p-0">
                    <Nav />
                </div>

                <main className="col p-3 outlet-container">
                    <Message />
                    <Outlet />
                </main>

            </div>
        </div>
    )
}
