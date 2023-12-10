import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { userTypes } from "../../helpers/constants";
import Language from '../Language/Language';
import avatar from '../../assets/images/profile.png';
import './HeaderInfo.scss';

// header info component shows the user name, user type, user photo and language
export default function HeaderInfo() {
    const { i18n } = useTranslation();
    const { userName, userType } = useSelector(state => state.auth);
    const userPhoto = localStorage.getItem("userPhoto") || avatar;
    const lang = i18n.language;

    return (
        <div className="header-container">
            <Link className="header-info" to={"/profile"} >
                <img src={userPhoto} alt="userImage" loading="lazy" />
                <p>
                    {userName.length > 10 ? userName.slice(0, 7) + ".." : userName}
                    <br />
                    <span>
                        {userTypes.find(item => item.id == userType)[lang === "ar" ? "nameAr" : "nameEn"]}
                    </span>
                </p>
            </Link>
            <Language />
        </div>
    )
}
