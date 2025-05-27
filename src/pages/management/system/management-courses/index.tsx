"use client";

import { useState, useEffect } from "react";
import { Table, Input, Image, Popconfirm } from "antd";
import { toast } from "sonner";
import { Button } from "@heroui/react";
import { Trash2, Pencil, Plus } from "lucide-react";
import {
  ALIGN_CENTER,
  buttonCancel,
  buttonConfirm,
  inputClass,
} from "@/utils/use-always";
import coursesApi from "@/api/services/coursesApi";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await coursesApi.getCourses();
        setCourses(res.data.data);
      } catch {
        toast.error("Failed to load courses", { closeButton: true });
      }
    };
    fetchData();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Slug", dataIndex: "slug" },
    { title: "Title", dataIndex: "title" },
    { title: "Subtitle", dataIndex: "subtitle" },
    { title: "Price", dataIndex: "price" },
    { title: "OldPrice", dataIndex: "oldPrice" },
    {
      title: "Thumbnail",
      dataIndex: "image",
      render: (value: string) => (
        <Image
          width={60}
          height={60}
          src={value}
          style={{ objectFit: "cover", borderRadius: "9999px" }}
          preview={{ mask: <div>Xem ảnh</div> }}
          alt="thumbnail"
        />
      ),
    },
    {
      title: "DiscountCode",
      dataIndex: "discountCode",
      render: (value: string) => value ?? 0,
    },
    {
      title: "IsFree",
      dataIndex: "isFree",
      render: (value: boolean) => (value ? "Miễn phí" : "Không miễn phí"),
    },
    { title: "Level", dataIndex: "level" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Actions",
      align: ALIGN_CENTER,
      render: (_: unknown, record: any) => (
        <div className="flex justify-center gap-1">
          <Button
            className={buttonConfirm}
            size="sm"
            onPress={() => {
              setMode("edit");
              setSelectedCourse(record);
              onModalOpen();
            }}
          >
            <Pencil size={16} />
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this course?"
            onConfirm={async () => {
              try {
                await coursesApi.deleteCourses(record.slug);
                setCourses((prev) =>
                  prev.filter((c) => c.slug !== record.slug)
                );
                toast.success("Course deleted", { closeButton: true });
              } catch {
                toast.error("Failed to delete course");
              }
            }}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <Button className={buttonCancel} variant="light" size="sm">
              <Trash2 size={16} />
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const handleClick = () => {
    navigate("/management/system/created-courses");
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Manage courses
          </h2>
          <p className="text-sm text-muted-foreground">
            Create, update, and delete courses data
          </p>
        </div>
        <button className={buttonConfirm} onClick={handleClick}>
          <Plus size={16} className="mr-1" />
          Create New
        </button>
      </div>

      <Input
        placeholder="Search by slug or title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={inputClass}
      />

      <div className="overflow-auto">
        <Table
          dataSource={filteredCourses}
          columns={columns}
          rowKey="id"
          className="min-w-[700px]"
          bordered
          pagination={{ pageSize: 8 }}
        />
      </div>
    </div>
  );
}
