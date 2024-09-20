import axios from "axios";
//Cáu hình chuyển hướng trang khi không dùng hook
import { createBrowserHistory } from "history";

export const navigateHistory = createBrowserHistory();

export const TOKEN = "accessToken";
export const USER_LOGIN = "userLogin";

export function setCookie(name, value, days = 7) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

//setup interceptor (middleware) cho tất cả request(thông tin gửi đi đến server) và response (kết quả nhận từ server)
const DOMAIN = "https://apistore.cybersoft.edu.vn";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MCIsIkhldEhhblN0cmluZyI6IjA2LzAyLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczODgwMDAwMDAwMCIsIm5iZiI6MTcxMDY5NDgwMCwiZXhwIjoxNzM4OTQ3NjAwfQ.9cBkI6f0KeKWuML4s-ZFFHNoHg30rdn_Rj2ws6O9qD8";
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 3000, // giới hạn thời gian chờ kết quả từ server
});
//cấu hình cho request
http.interceptors.request.use((req) => {
  req.headers = {
    ...req.headers, //giữ lại các api có header riêng
    Authorization: `Bearer ${localStorage.getItem(TOKEN)}`, //thêm phần chung authorize
    TokenCybersoft: TOKEN_CYBERSOFT,
  };
  return req;
});

//Cấu hình response:
http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    //kiểm tra token có hợp lệ
    const jwtDecodeToken = decodeJWT(localStorage.getItem(TOKEN));
    if (jwtDecodeToken) {
      //khi decode token thành công mới check token còn hay hết hạn để refresh toke
      const isExpired = isTokenExpired(localStorage.getItem(TOKEN));
      //Nếu trước khi gửi token về server mà token hết hạn thì gọi api refresh token
      if (isExpired) {
        try {
          const response = await axios({
            url: "https://apistore.cybersoft.edu.vn/api/Users/RefeshToken",
            method: "post",
            headers: {
              Authorization: localStorage.getItem(TOKEN),
            },
          });
          localStorage.setItem(TOKEN, response.data.content.accessToken);
          navigateHistory.push(window.location.pathname);
        } catch (err) {
          //Nếu refresh thất bại thì yêu cầu login lại
          navigateHistory.push("/login");
        }
      }
    }

    switch (err?.response.status) {
      case 400:
        {
          //Chuyển hướng trang khi sai tham số
          alert("Sai tham số!");
          // window.location.href = '/'
          navigateHistory.push("/");
        }
        break;
      case 404:
        {
          alert("Đường đãn không tồn tại!");
          navigateHistory.push("/");
        }
        break;
      case 401:
        {
          /* 
            Trường hợp 2: Token không hợp lệ
          */
          navigateHistory.push('/login');
          }
        break;
      case 403:
        {
            //Token hợp lệ tuy nhiên chưa đủ quyền truy cập
            alert('yêu cầu quản trị viên mới có thể vào được! ');
            navigateHistory.push('/');
        }
        break;
      case 500:
        {
            alert('Lỗi hệ thống!');
            navigateHistory.push('/')
        }
        break;
    }
    return Promise.reject(err);
  }
);
/*
    statusCode: 
    200: Thành công 
    201: Dữ liệu đã được khởi tạo thành công
    400: Bad request (đường dẫn không hợp lệ)
    404: Not Found (không tìm thấy dữ liệu)
    401: Unauthorize (Lỗi không có quyền truy cập vào api đó)
    403: Forbidden (Không đủ quyền truy cập vào hệ thống)
    500: Error in server (Lỗi xảy ra tại server chưa biết lí do)
    => Vai trò frontend với lỗi 500: 
    + Test lại api qua post man hoặc swagger với dữ liệu mẫu từ backend (BE đúng thì coi lại code). Nếu như post man hoặc swagger bị sai thì báo backend xử lý. 

*/

function decodeJWT(token) {
  try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
  } catch (error) {
      console.error('Error decoding token:', error);
      return null;
  }
}

function isTokenExpired(token) {
  const decoded = decodeJWT(token);
  if (!decoded) {
      return true; // If the token can't be decoded, assume it's expired
  }
  const currentTime = Date.now() / 1000; // Current time in seconds
  if (decoded.exp && currentTime > decoded.exp) {
      return true; // Token is expired
  }

  return false; // Token is still valid
}
