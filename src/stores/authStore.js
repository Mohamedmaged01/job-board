// import { defineStore } from "pinia";
// import { ref, computed } from "vue";
// import { useRouter } from "vue-router";
// import api from "@/services/api";

// export const useAuthStore = defineStore("auth", () => {
//   const user = ref(null);

//   const getCurrentUser = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       api
//         .get("/auth/me")
//         .then((response) => {
//           user.value = response.data;
//         })
//         .catch((error) => {
//           console.error("Error fetching user data:", error);
//           user.value = null;
//         });
//     }
//     return user;
//   };
//   user = getCurrentUser();
// });





// src/stores/authStore.js
// import { defineStore } from "pinia";
// import { ref } from "vue";
// import { useRouter } from "vue-router";

// export const useAuthStore = defineStore("auth", () => {
//   const user = ref(null);
//   const router = useRouter();

//   const users = [
//     {
//       id: 1,
//       email: "ahmed.hassan@example.com",
//       password: "123456", // موقّتًا غير مشفر علشان الديمو
//       role: "candidate",
//       name: "Ahmed Hassan",
//     },
//     {
//       id: 3,
//       email: "hr@techegypt.com",
//       password: "123456",
//       role: "employer",
//       name: "Omar El-Sherif",
//     },
//     {
//       id: 4,
//       email: "admin@jobboard.com",
//       password: "admin",
//       role: "admin",
//       name: "Admin User",
//     },
//   ];

//   const login = async (email, password) => {
//     const matchedUser = users.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (matchedUser) {
//       user.value = matchedUser;
//       localStorage.setItem("user", JSON.stringify(user.value));
//       return true;
//     } else {
//       throw new Error("Invalid credentials");
//     }
//   };

//   const logout = () => {
//     user.value = null;
//     localStorage.removeItem("user");
//     router.push("/login");
//   };

//   const getCurrentUser = () => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       user.value = JSON.parse(storedUser);
//     }
//   };

//   return {
//     user,
//     login,
//     logout,
//     getCurrentUser,
//   };
// });







// src/stores/authStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const error = ref(null); // حالة لتخزين رسالة الخطأ
  const router = useRouter();


  const login = async (email, password) => {
    error.value = null; // إعادة تعيين الخطأ عند كل محاولة تسجيل دخول جديدة

    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      user.value = matchedUser;
      localStorage.setItem("user", JSON.stringify(user.value));
      return true;
    } else {
      error.value = "Invalid email or password.";
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("user");
    router.push("/login");
  };

  const getCurrentUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  };

  return {
    user,
    error,       // ← أضفنا error هنا
    login,
    logout,
    getCurrentUser,
  };
});
