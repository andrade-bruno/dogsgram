import { ID } from "@/interfaces/misc";
import { OrigamidFilterParams } from "@/interfaces/origamid/filter-params";

export default abstract class OrigamidApi {
  static domain = "https://dogsapi.origamid.dev/json";

  static async TOKEN_POST(formData: FormData) {
    return await fetch(this.domain + "/jwt-auth/v1/token", {
      method: "POST",
      body: formData,
    });
  }

  static async TOKEN_VALIDATE_POST(token: string) {
    return await fetch(this.domain + "/jwt-auth/v1/token/validate", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static async USER_GET(token: string) {
    return await fetch(this.domain + "/api/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
      },
    });
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

  static async PHOTO_POST(body: FormData, token: string) {
    return await fetch(this.domain + "/api/photo", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body,
    });
  }

  static async PHOTOS_GET(
    { page, total, user }: OrigamidFilterParams,
    options?: RequestInit
  ) {
    return await fetch(
      `${this.domain}/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
      {
        method: "GET",
        next: {
          revalidate: 30,
          tags: ["photos"],
        },
      }
    );
  }

  static async PHOTO_GET(id: ID) {
    return await fetch(`${this.domain}/api/photo/${id}`, {
      method: "GET",
      next: {
        revalidate: 60,
        tags: ["photos", "comment"],
      },
    });
  }

  static async COMMENT_POST(
    id: ID,
    body: Record<string, unknown>,
    token: string
  ) {
    return await fetch(`${this.domain}/api/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
  }

  static async PHOTO_DELETE(id: ID, token: string) {
    return await fetch(`${this.domain}/api/photo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static async PASSWORD_LOST(body: Record<string, unknown>) {
    return await fetch(this.domain + "/api/password/lost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  static async PASSWORD_RESET(body: Record<string, unknown>) {
    return await fetch(this.domain + "/api/password/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  static async STATS_GET(token: string) {
    return await fetch(this.domain + "/api/stats", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}
