import { ID } from "@/interfaces/misc";

export default abstract class OrigamidApi {
  static domain = "https://dogsapi.origamid.dev/json";

  static async TOKEN_POST(formData: FormData) {
    return await fetch(this.domain + "/jwt-auth/v1/token", {
      method: "POST",
      body: formData,
    });
  }

  static TOKEN_VALIDATE_POST(token: string) {
    return {
      url: this.domain + "/jwt-auth/v1/token/validate",
      options: {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    };
  }

  static USER_GET(token: string) {
    return {
      url: this.domain + "/api/user",
      options: {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    };
  }

  static async USER_POST(body: Record<string, unknown>) {
    return await fetch(this.domain + "/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  static PHOTO_POST(formData: FormData, token: string) {
    return {
      url: this.domain + "/api/photo",
      options: {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      },
    };
  }

  static PHOTOS_GET({ page, total, user }: Record<string, unknown>) {
    return {
      url: `${this.domain}/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
      options: {
        method: "GET",
        cache: "no-store",
      },
    };
  }

  static PHOTO_GET(id: ID) {
    return {
      url: `${this.domain}/api/photo/${id}`,
      options: {
        method: "GET",
        cache: "no-store",
      },
    };
  }

  static COMMENT_POST(id: ID, body: Record<string, unknown>) {
    return {
      url: `${this.domain}/api/comment/${id}`,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      },
    };
  }

  static PHOTO_DELETE(id: ID) {
    return {
      url: `${this.domain}/api/photo/${id}`,
      options: {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      },
    };
  }

  static PASSWORD_LOST(body: Record<string, unknown>) {
    return {
      url: this.domain + "/api/password/lost",
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    };
  }

  static PASSWORD_RESET(body: Record<string, unknown>) {
    return {
      url: this.domain + "/api/password/reset",
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    };
  }

  static STATS_GET() {
    return {
      url: this.domain + "/api/stats",
      options: {
        method: "GET",
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      },
    };
  }
}
