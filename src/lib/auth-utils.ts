// ======================================================================
// Auth Utilities - ช่วยเก็บและตรวจสอบข้อมูลผู้ใช้
// ======================================================================

export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string; // ลับ - ไม่ส่งไปยัง client
}

export interface UserPublic {
  id: string;
  email: string;
  username: string;
}

// Hash password ด้วย simple method (สำหรับ demo; production ต้อง bcrypt บน server)
export const hashPassword = (password: string): string => {
  // สำหรับ frontend ใช้ simple encoding; server ต้อง use bcrypt
  return btoa(password); // base64 (ไม่ปลอดภัยจริงๆแต่พอสำหรับ demo)
};

export const verifyPassword = (password: string, hash: string): boolean => {
  return btoa(password) === hash;
};

// Check if user exists (by email or username)
export const userExists = (users: User[], emailOrUsername: string): boolean => {
  return users.some(
    (u) => u.email === emailOrUsername || u.username === emailOrUsername
  );
};

// Get user by email OR username
export const getUserByEmailOrUsername = (
  users: User[],
  emailOrUsername: string
): User | undefined => {
  return users.find(
    (u) => u.email === emailOrUsername || u.username === emailOrUsername
  );
};

// Generate unique ID
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
