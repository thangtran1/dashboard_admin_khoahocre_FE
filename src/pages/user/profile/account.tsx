import { useState, useRef, useEffect } from "react";
import { useUserInfo, useUserActions } from "@/store/userStore";
import { Pencil, Save } from "lucide-react";

const AccountPage = () => {
  const user = useUserInfo();
  const { setUserInfo } = useUserActions();
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    phone: user.status || "",
    birthday: user.role || "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const refs = {
    username: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    birthday: useRef<HTMLInputElement>(null),
  };

  const handleChange = (field: keyof typeof formData, v: string) =>
    setFormData((f) => ({ ...f, [field]: v }));

  const toggleEdit = () => setIsEditing((e) => !e);

  const handleSave = () => {
    setUserInfo({ ...user, ...formData, id: user.id || "" });
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) refs.username.current?.focus();
  }, [isEditing]);

  return (
    <div>
      {/* Edit Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Tài khoản</h1>
        <button
          onClick={isEditing ? handleSave : toggleEdit}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              isEditing
                ? "border border-primary hover:bg-primary"
                : "border border-primary  hover:bg-primary"
            }`}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              Lưu
            </>
          ) : (
            <>
              <Pencil className="w-4 h-4" />
              Chỉnh sửa
            </>
          )}
        </button>
      </div>

      {/* Form */}
      <div className="grid border border-border rounded-lg p-4 grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Tên", field: "username", type: "text" },
          { label: "Email", field: "email", type: "email" },
          { label: "Số điện thoại", field: "phone", type: "tel" },
          { label: "Ngày sinh", field: "birthday", type: "date" },
        ].map(({ label, field, type }) => (
          <div key={field} className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">{label}</label>
            <input
              ref={refs[field as keyof typeof refs]}
              type={type}
              value={String(formData[field as keyof typeof formData] ?? "")}
              onChange={(e) =>
                handleChange(field as keyof typeof formData, e.target.value)
              }
              disabled={!isEditing}
              className={`w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring focus:ring-blue-500
                ${
                  isEditing
                    ? "border-border"
                    : "border-border cursor-not-allowed"
                }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountPage;
