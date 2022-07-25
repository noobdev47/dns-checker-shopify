import API from "./api"

const AuthService = {
  login: (data) => {
    return API.post("/login", data)
      .then(({ data }) => {
        setHeadersAndStorage(data);
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  register: (data) => {
    return API.post("/register", data)
      .then(({ data }) => {
        setOnlyUser(data);
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  sendRefferalToken: (ref) => {
    return API.get(`/useraffiliatestats/${ref}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  sendPasswordResetLink: (data) => {
    return API.post("/password/email", data)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  resetPassword: (data) => {
    return API.post(`/password/reset`, data)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  resendEmailVerification: (data) => {
    return API.post("/verification/resend", data)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  verifyEmailRequset: (user) => {
    return API.post(`/verification/verify/${user}`, {})
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  logout: () => {
    return API.post("/logout", {})
      .then(({ data }) => {
        API.defaults.headers["Authorization"] = ""
        localStorage.clear()
        // localStorage.removeItem("user");
        // localStorage.removeItem("token");
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  updateProfile: (data) => {
    return API.put("/user/settings/profile", data)
      .then(({ data }) => {
        // localStorage.setItem("user", JSON.stringify(data.data));
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  updatePassword: (data) => {
    return API.put("/user/settings/password", data)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
};

const setHeadersAndStorage = ({ user, token, expires_in }) => {
  API.defaults.headers["Authorization"] = `Bearer ${token}`
  localStorage.setItem("token", token)
  localStorage.setItem("gracePeriodCheck", 12)
  localStorage.setItem("expiresIn", expires_in)
  localStorage.setItem("user", JSON.stringify(user))
  // localStorage.setItem("warningCount", 0)
  // localStorage.setItem("warmupSuggestion", true)
  // localStorage.setItem('notificationSent', false)
  // localStorage.setItem("tourComplete", user.is_tour_completed === 1 ? true : false)
};

const setOnlyUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user))
  // localStorage.setItem("warningCount", 0)
  // localStorage.setItem("tourComplete", user.is_tour_completed === 1 ? true : false)
};

export default AuthService;