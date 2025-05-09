import { fakeAvatars } from "@/_mock/utils";
import { Icon } from "@/components/icon";
import { useUserInfo } from "@/store/userStore";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Progress } from "@/ui/progress";
import { faker } from "@faker-js/faker";
import { Avatar, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  avatar: string;
  name: string;
  date: string;
  leader: string;
  team: string[];
  status: number;
}

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

  const fakeProjectItems = () => {
    const arr: DataType[] = [];
    for (let i = 0; i <= 25; i += 1) {
      arr.push({
        key: faker.string.uuid(),
        avatar: faker.image.urlPicsumPhotos(),
        name: faker.company.buzzPhrase(),
        date: faker.date.past().toDateString(),
        leader: faker.person.fullName(),
        team: fakeAvatars(faker.number.int({ min: 2, max: 5 })),
        status: faker.number.int({ min: 50, max: 99 }),
      });
    }
    return arr;
  };

  const ProjectColumns: ColumnsType<DataType> = [
    {
      title: "NAME",
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex items-center">
          <img src={record.avatar} alt="" className="h-8 w-8 rounded-full" />
          <div className="ml-2 flex flex-col">
            <span className="font-semibold">{record.name}</span>
            <span className="text-xs opacity-50">{record.date}</span>
          </div>
        </div>
      ),
    },
    {
      title: "LEADER",
      dataIndex: "leader",
      render: (val) => <span className="opacity-50">{val}</span>,
    },
    {
      title: "TEAM",
      dataIndex: "team",
      render: (val: string[]) => (
        <Avatar.Group>
          {val.map((item) => (
            <Avatar src={item} key={item} />
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (val) => <Progress value={val} />,
    },
    {
      title: "ACTIONS",
      dataIndex: "action",
      render: () => (
        <Button variant="ghost" size="icon">
          <Icon icon="fontisto:more-v-a" />
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
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
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <Table
                rowSelection={{ type: "checkbox" }}
                columns={ProjectColumns}
                dataSource={fakeProjectItems()}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
