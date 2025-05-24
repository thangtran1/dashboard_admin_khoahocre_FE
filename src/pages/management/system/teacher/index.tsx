"use client";

import { useState, useEffect } from "react";
import { Table, Input, Popconfirm } from "antd";
import { toast } from "sonner";
import { Button, useDisclosure } from "@heroui/react";
import { Trash2, Pencil, Plus } from "lucide-react";
import {
  ALIGN_CENTER,
  buttonCancel,
  buttonConfirm,
  inputClass,
} from "@/utils/use-always";
import teacherApi from "@/api/services/teacherApi";
import ModalCreateEditTeacher from "./modal-create-edit";

export default function TeacherPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editName, setEditName] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [editBio, setEditBio] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await teacherApi.getTeachers();
        setTeachers(res.data.data);
      } catch {
        toast.error("Failed to load teachers", { closeButton: true });
      }
    };
    fetchData();
  }, []);

  const createTeacher = async (bio: string, name: string, avatar: string) => {
    try {
      const res = await teacherApi.createTeachers({ bio, name, avatar });
      setTeachers((prev) => [...prev, res.data.teacher]);
      toast.success("Teacher created", { closeButton: true });
    } catch (e) {
      throw e;
    }
  };

  const updateTeacher = async (id: string) => {
    try {
      const res = await teacherApi.updateTeachers(id, {
        bio: editBio,
        name: editName,
        avatar: editAvatar,
      });
      const updated = res.data.teacher;

      setTeachers((prev) => prev.map((t) => (t.id === id ? updated : t)));
      toast.success("Teacher updated", { closeButton: true });
    } catch (err) {
      throw err;
    }
  };

  const handleSaveTeacher = async () => {
    if (!editName.trim() || !editBio.trim()) {
      toast.error("Name and bio are required", { closeButton: true });
      return;
    }

    if (mode === "create") {
      await createTeacher(editBio, editName, editAvatar);
    } else if (mode === "edit" && selectedTeacher?.id) {
      await updateTeacher(selectedTeacher.id);
    }

    onEditModalClose();
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t?.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (value: string) => (
        <img
          src={value}
          alt="avatar"
          className="h-10 w-10 object-cover rounded-full"
        />
      ),
    },
    { title: "Name", dataIndex: "name" },
    { title: "Bio", dataIndex: "bio" },
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
              setSelectedTeacher(record);
              setEditName(record.name);
              setEditBio(record.bio);
              setEditAvatar(record.avatar);
              onEditModalOpen();
            }}
          >
            <Pencil size={16} />
            Edit
          </Button>

          <Popconfirm
            title="Are you sure to delete this teacher?"
            onConfirm={async () => {
              try {
                await teacherApi.deleteTeachers(record.id);
                setTeachers((prev) => prev.filter((u) => u.id !== record.id));
                toast.success("Teacher deleted", { closeButton: true });
              } catch (e) {
                toast.error("Failed to delete user");
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Manage Teachers
          </h2>
          <p className="text-sm text-muted-foreground">
            Create, update, and delete teacher records
          </p>
        </div>
        <Button
          className={buttonConfirm}
          onPress={() => {
            setMode("create");
            setSelectedTeacher(null);
            setEditName("");
            setEditBio("");
            setEditAvatar("");
            onEditModalOpen();
          }}
        >
          <Plus size={16} className="mr-1" />
          Create New
        </Button>
      </div>

      <div>
        <Input
          placeholder="Search by name or bio"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="overflow-auto">
        <Table
          dataSource={filteredTeachers}
          columns={columns}
          rowKey="id"
          className="min-w-[700px]"
          bordered
          pagination={{ pageSize: 8 }}
        />
      </div>

      {isEditModalOpen && <div className="fixed inset-0 bg-black/50 z-40" />}

      <ModalCreateEditTeacher
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        mode={mode}
        editName={editName}
        editAvatar={editAvatar}
        setEditName={setEditName}
        setEditAvatar={setEditAvatar}
        editBio={editBio}
        setEditBio={setEditBio}
        handleSave={handleSaveTeacher}
      />
    </div>
  );
}
