import { React } from "react";
import BaseElement from "./Container";
import { Link } from "react-router-dom";
import Title from "./Title";
import "../../styles/index.scss";
import ProfilePicture from "../pictures/ProfilePicture";
import PropTypes from 'prop-types';


const ProfilePictureSelection = ({onClose}) => {

    return(
        <div className={"center-container login-background"}>
            <div className={"container-container"}>
                <BaseElement width={750} height={570}>
                    <div className={"flex flex-row justify-end"}>
                        <Link onClick={onClose}>X</Link>
                    </div>
                    <div>
                        <div className="profile-pictures">
                            <ProfilePicture username={"melvin"} saturation={20}> lightness={10}</ProfilePicture>
                        </div>
                    </div>
                </BaseElement>
            </div>
        </div>
    );
}
ProfilePictureSelection.propTypes = {
    onClose: PropTypes.func.isRequired,
};


export default ProfilePictureSelection;