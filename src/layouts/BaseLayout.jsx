import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import AdminRoutes from "../routes/AdminRoutes"
import "./BaseLayout.scss"

export default function BaseLayout() {
    return (
        <div className="base-layout">
            <Header />
            <Sidebar />
            <div className="base-layout-content">
                <AdminRoutes />
            </div>
        </div>
    )
}
