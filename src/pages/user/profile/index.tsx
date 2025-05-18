import CoverImage from "@/assets/images/cover/cover_4.jpg";
import { useUserInfo } from "@/store/userStore";
import { Card } from "@/ui/card";
import { type CSSProperties } from "react";
import ProfileTab from "./profile-tab";
import AccountPage from "./account";
import Breadcrumbs from "@/utils/Breadcrumb";

function UserProfile() {
  const { avatar, username } = useUserInfo();

  const bgStyle: CSSProperties = {
    background: `url(${CoverImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div>
      <div className="p-2 mb-2 rounded-lg bg-muted">
        <Breadcrumbs />
      </div>
      <Card className="relative mb-6 h-[300px] flex-col rounded-2xl p-0! gap-0">
        <div style={bgStyle} className="h-full w-full">
          <div className="flex flex-col items-center justify-center pt-12 md:absolute md:bottom-6 md:left-6 md:flex-row md:pt-0">
            <img
              src={"https://vanthang.io.vn/avatar.jpg"}
              className="h-16 w-16 rounded-full md:h-32 md:w-32"
              alt=""
            />
            <div className="ml-6 mt-6 flex flex-col justify-center md:mt-0">
              <span className="mb-2 text-2xl font-medium text-common-white">
                {username}
              </span>
              <span className="text-center text-text-secondary md:text-left">
                TS FullStack
              </span>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex flex-col gap-6">
        <AccountPage />
        <ProfileTab />
      </div>
    </div>
  );
}

export default UserProfile;
