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
import userApi from "@/api/services/userApi";
import dayjs from "dayjs";
import ModalCreateEditUser from "./modal-create-edit-user";

export default function ManagementUserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editEmail, setEditEmail] = useState("");
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userApi.getUsers();
        setUsers(res.data.data);
      } catch {
        toast.error("Failed to load users", { closeButton: true });
      }
    };

    fetchData();
  }, []);

  const createUser = async () => {
    try {
      const res = await userApi.createUser({
        email: editEmail,
        name: editName,
        password: editPassword,
      });
      setUsers((prev) => [...prev, res.data.user]);
      toast.success("User created", { closeButton: true });
    } catch (err) {
      throw new err();
    }
  };
  const updateUser = async (userId: string) => {
    try {
      const res = await userApi.updateUser(userId, {
        email: editEmail,
        name: editName,
        role: editRole,
        password: editPassword,
      });
      const updated = res.data.user;

      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
      toast.success("User updated", { closeButton: true });
    } catch (err) {
      throw new err();
    }
  };

  const handleSaveUser = async () => {
    if (!editName.trim() || !editEmail.trim()) {
      toast.error("Email and name are required", { closeButton: true });
      return;
    }

    try {
      if (mode === "create") {
        await createUser();
      } else if (mode === "edit" && selectedUser?.id) {
        await updateUser(selectedUser.id);
      }
      onEditModalClose();
    } catch (error) {
      throw new error();
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Email", dataIndex: "email" },
    { title: "Name", dataIndex: "name" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (val: string) => dayjs(val).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (val: string) => dayjs(val).format("DD/MM/YYYY HH:mm"),
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
              setSelectedUser(record);
              setEditName(record.name);
              setEditEmail(record.email);
              setEditRole(record.role);
              onEditModalOpen();
            }}
          >
            <Pencil size={16} />
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={async () => {
              try {
                await userApi.deleteUser(record.id);
                setUsers((prev) => prev.filter((u) => u.id !== record.id));
                toast.success("User deleted", { closeButton: true });
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
            Manage Users
          </h2>
          <p className="text-sm text-muted-foreground">
            Create, update, and delete user accounts
          </p>
        </div>
        <Button
          className={buttonConfirm}
          onPress={() => {
            setMode("create");
            setSelectedUser(null);
            setEditName("");
            setEditEmail("");
            setEditRole("");
            setEditPassword("");
            onEditModalOpen();
          }}
        >
          <Plus size={16} className="mr-1" />
          Create New
        </Button>
      </div>

      <Input
        placeholder="Search by email or name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={inputClass}
      />

      <div className="overflow-auto py-6">
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          className="min-w-[700px]"
          bordered
          pagination={{ pageSize: 8 }}
        />
      </div>

      {isEditModalOpen && <div className="fixed inset-0 bg-black/50 z-40" />}

      <ModalCreateEditUser
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        mode={mode}
        email={editEmail}
        setEmail={setEditEmail}
        name={editName}
        setName={setEditName}
        role={editRole}
        setRole={setEditRole}
        password={editPassword}
        setPassword={setEditPassword}
        handleSave={handleSaveUser}
      />
    </div>
  );
}
