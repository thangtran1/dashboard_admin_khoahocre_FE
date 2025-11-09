import { useState, useEffect } from "react";
import { getUserProfile, UserProfile } from "@/api/services/profileApi";
import { useUserActions, useUserToken } from "@/store/userStore";

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setUserInfo } = useUserActions();
  const { accessToken, refreshToken } = useUserToken();
  const transformUserData = (profileData: UserProfile) => ({
    id: profileData._id,
    email: profileData.email,
    username: profileData.name,
    avatar: profileData.avatar,
    role: profileData.role,
    status: profileData.status,
    phone: profileData.phone,
    dateOfBirth: profileData.dateOfBirth,
    address: profileData.address,
    bio: profileData.bio,
    lastLoginAt: profileData.lastLoginAt,
    loginCount: profileData.loginCount,
    isEmailVerified: profileData.isEmailVerified,
    createdAt: profileData.createdAt,
    updatedAt: profileData.updatedAt,
  });

  const fetchProfile = async () => {
    if (!accessToken || !refreshToken) {
      setLoading(false);
      return; 
    }
  
    try {
      setLoading(true);
      setError(null);
      const profileData = await getUserProfile();
      setProfile(profileData);
      setUserInfo(transformUserData(profileData));
    } catch (err: any) {
      setError(err.message || "Lỗi khi tải thông tin profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    setUserInfo(transformUserData(updatedProfile));
  };

  useEffect(() => {
    fetchProfile();

    // Listen for profile update events
    const handleProfileUpdate = (event: CustomEvent) => {
      const updatedProfile = event.detail;
      setProfile(updatedProfile);
      setUserInfo(transformUserData(updatedProfile));
    };

    window.addEventListener(
      "profileUpdated",
      handleProfileUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "profileUpdated",
        handleProfileUpdate as EventListener
      );
    };
  }, []);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile,
  };
};
