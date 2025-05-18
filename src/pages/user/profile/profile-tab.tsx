import { Icon } from "@/components/icon";
import { useUserInfo } from "@/store/userStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { faker } from "@faker-js/faker";

export default function ProfileTab() {
  const { username } = useUserInfo();
  const AboutItems = [
    {
      icon: <Icon icon="fa-solid:user" size={18} />,
      label: "Full Name",
      val: username,
    },
    {
      icon: <Icon icon="eos-icons:role-binding" size={18} />,
      label: "Role",
      val: "Developer",
    },
    {
      icon: <Icon icon="tabler:location-filled" size={18} />,
      label: "Country",
      val: "USA",
    },
    {
      icon: <Icon icon="ion:language" size={18} />,
      label: "Language",
      val: "English",
    },
    {
      icon: <Icon icon="ph:phone-fill" size={18} />,
      label: "Contact",
      val: "(123)456-7890",
    },
    {
      icon: <Icon icon="ic:baseline-email" size={18} />,
      label: "Email",
      val: username,
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <h1 className="text-2xl mb-4 font-semibold">Hồ sơ</h1>
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>{faker.lorem.paragraph()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {AboutItems.map((item) => (
                  <div className="flex" key={item.label}>
                    <div className="mr-2">{item.icon}</div>
                    <div className="mr-2">{item.label}:</div>
                    <div className="opacity-50">{item.val}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
