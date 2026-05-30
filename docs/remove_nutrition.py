# -*- coding: utf-8 -*-
import io

file_path = r"d:\NguyenLuat center\Download\BepCuaLuat\BepCuaLuat\BAOCAO_DETAI.md"

with io.open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace Table of Contents
old_toc = """   6.8. Chức năng Thống kê dinh dưỡng và chi phí
   6.9. Chức năng Xuất dữ liệu danh sách đi chợ (Export)"""

new_toc = """   6.8. Chức năng Xuất dữ liệu danh sách đi chợ (Export)"""

content = content.replace(old_toc, new_toc)

# 2. Replace Table 6.1 Rows
old_table_rows = """| 5 | Lập thực đơn tuần | Lên lịch chi tiết bữa ăn cho các ngày trong tuần | `meal_plans`, `meal_plan_items` | **C**reate, **R**ead, **U**pdate, **D**elete |
| 6 | Thống kê dinh dưỡng | Tổng hợp dưỡng chất và vẽ biểu đồ Calories | `meal_plans`, `recipes` | **R**ead |
| 7 | Danh sách đi chợ | Tổng hợp nguyên liệu cần mua từ thực đơn | `shopping_lists`, `shopping_list_items` | **C**reate, **R**ead, **U**pdate |
| 8 | Xuất danh sách đi chợ | Xuất tệp tin đính kèm định dạng `.txt` hoặc `.csv` | `shopping_lists`, `shopping_list_items` | **R**ead |
| 9 | Tìm kiếm và lọc | Tìm kiếm toàn văn bản và lọc theo tiêu chí | `recipes` | **R**ead |"""

new_table_rows = """| 5 | Lập thực đơn tuần | Lên lịch chi tiết bữa ăn cho các ngày trong tuần | `meal_plans`, `meal_plan_items` | **C**reate, **R**ead, **U**pdate, **D**elete |
| 6 | Danh sách đi chợ | Tổng hợp nguyên liệu cần mua từ thực đơn | `shopping_lists`, `shopping_list_items` | **C**reate, **R**ead, **U**pdate |
| 7 | Xuất danh sách đi chợ | Xuất tệp tin đính kèm định dạng `.txt` hoặc `.csv` | `shopping_lists`, `shopping_list_items` | **R**ead |
| 8 | Tìm kiếm và lọc | Tìm kiếm toàn văn bản và lọc theo tiêu chí | `recipes` | **R**ead |"""

content = content.replace(old_table_rows, new_table_rows)

# 3. Replace Section 6.8 block
old_section = """### 6.8. Chức năng Thống kê dinh dưỡng và chi phí
- Mục đích: Kiểm soát chế độ ăn uống lành mạnh và quản lý ngân sách sinh hoạt hợp lý.
- Cách hoạt động: Tổng hợp lượng Calories, Protein, Carbs, Fat và ước tính chi phí của tất cả món ăn nằm trong kế hoạch thực đơn tuần hiện tại.
- Dữ liệu đầu vào (Input): Thực đơn tuần được chọn.
- Dữ liệu đầu ra (Output): Bảng tổng hợp tổng lượng dinh dưỡng hằng ngày và tổng chi phí ngân sách dự kiến của cả tuần.
- Quy trình xử lý: Hệ thống đọc danh sách món ăn trong thực đơn -> Lấy thông tin chi tiết dinh dưỡng và chi phí từ bảng công thức -> Thực hiện phép tính cộng dồn trên máy chủ -> Trả về cấu trúc dữ liệu tổng hợp để vẽ biểu đồ dinh dưỡng.
- Đề xuất vị trí chèn ảnh: [HÌNH 6.7: BIỂU ĐỒ TRỰC QUAN HÓA DINH DƯỠNG VÀ ƯỚC TÍNH CHI PHÍ THỰC ĐƠN TUẦN]

---
*Hướng dẫn chụp ảnh minh họa cho Hình 6.7 (Sinh viên xóa phần hướng dẫn này sau khi chèn ảnh):*
- **Mục đích:** Minh chứng tính năng tự động tổng hợp dinh dưỡng và ước tính chi phí cho thực đơn tuần của người dùng, giúp tối ưu hóa ngân sách và chế độ ăn.
- **Cách chụp thực tế:**
  1. Truy cập vào tính năng Lập thực đơn tuần (`https://luat.tech/meal-plan`).
  2. Chọn một thực đơn tuần đã lên kế hoạch hoàn chỉnh (đã chọn các món ăn cho các bữa trong tuần).
  3. Kéo màn hình xuống phần hiển thị thông tin Dinh dưỡng & Chi phí. Tại đây sẽ xuất hiện các biểu đồ (ví dụ: biểu đồ tròn/cột phân tích tỷ lệ Calories, Protein, Carbs, Fat) và bảng ước tính tổng chi phí mua sắm.
  4. Chụp ảnh màn hình tập trung vào khu vực hiển thị các biểu đồ thống kê này.
---

### 6.9. Chức năng Xuất dữ liệu danh sách đi chợ (Export)
- Mục đích: Cho phép người dùng dễ dàng lưu trữ, chia sẻ hoặc mang danh sách nguyên liệu đi chợ ra cửa hàng thực phẩm mà không cần mở ứng dụng.
- Cách hoạt động: Xuất toàn bộ danh sách nguyên liệu cần mua từ kế hoạch tuần ra định dạng tệp tin Text (.txt) hoặc bảng tính CSV (.csv).
- Dữ liệu đầu vào (Input): Danh sách nguyên liệu cần mua hiện tại.
- Dữ liệu đầu ra (Output): Tệp tin tải xuống dạng `.txt` hoặc `.csv` chứa danh sách nguyên liệu sạch sẽ, rõ ràng kèm định lượng.
- Quy trình xử lý: Người dùng nhấn nút Export -> Client chuyển đổi danh sách đối tượng nguyên liệu thành chuỗi ký tự phân cách bằng dấu phẩy (CSV) hoặc định dạng danh sách gạch đầu dòng (Text) -> Trình duyệt kích hoạt sự kiện tải tệp tin tự động về máy tính người dùng.
- Đề xuất vị trí chèn ảnh: [HÌNH 6.8: TÍNH NĂNG VÀ TỆP TIN SAU KHI XUẤT DỮ LIỆU DANH SÁCH ĐI CHỢ THÀNH CÔNG]

---
*Hướng dẫn chụp ảnh minh họa cho Hình 6.8 (Sinh viên xóa phần hướng dẫn này sau khi chèn ảnh):*
- **Mục đích:** Minh chứng tính năng xuất dữ liệu danh sách đi chợ ra tệp tin vật lý để mang đi chợ hoạt động tốt.
- **Cách chụp thực tế:**
  1. Truy cập trang quản lý Danh sách đi chợ (`https://luat.tech/shopping-list`).
  2. Click vào nút "Xuất danh sách đi chợ" (chọn định dạng xuất là `.txt` hoặc `.csv`).
  3. Đợi trình duyệt tải tệp tin về máy tính. Mở tệp tin đó lên bằng công cụ đọc tương ứng (ví dụ: Mở tệp `.txt` bằng Notepad, mở tệp `.csv` bằng Microsoft Excel hoặc WPS Office).
  4. Thu nhỏ cửa sổ trình duyệt (đang hiển thị trang danh sách đi chợ trên web) và cửa sổ tệp tin vừa tải về, đặt chúng song song cạnh nhau trên màn hình máy tính.
  5. Chụp ảnh màn hình toàn cảnh để minh chứng rõ ràng sự trùng khớp dữ liệu giữa giao diện web Bếp của Luật và nội dung tệp tin đã được tải về.
---"""

new_section = """### 6.8. Chức năng Xuất dữ liệu danh sách đi chợ (Export)
- Mục đích: Cho phép người dùng dễ dàng lưu trữ, chia sẻ hoặc mang danh sách nguyên liệu đi chợ ra cửa hàng thực phẩm mà không cần mở ứng dụng.
- Cách hoạt động: Xuất toàn bộ danh sách nguyên liệu cần mua từ kế hoạch tuần ra định dạng tệp tin Text (.txt) hoặc bảng tính CSV (.csv).
- Dữ liệu đầu vào (Input): Danh sách nguyên liệu cần mua hiện tại.
- Dữ liệu đầu ra (Output): Tệp tin tải xuống dạng `.txt` hoặc `.csv` chứa danh sách nguyên liệu sạch sẽ, rõ ràng kèm định lượng.
- Quy trình xử lý: Người dùng nhấn nút Export -> Client chuyển đổi danh sách đối tượng nguyên liệu thành chuỗi ký tự phân cách bằng dấu phẩy (CSV) hoặc định dạng danh sách gạch đầu dòng (Text) -> Trình duyệt kích hoạt sự kiện tải tệp tin tự động về máy tính người dùng.
- Đề xuất vị trí chèn ảnh: [HÌNH 6.7: TÍNH NĂNG VÀ TỆP TIN SAU KHI XUẤT DỮ LIỆU DANH SÁCH ĐI CHỢ THÀNH CÔNG]

---
*Hướng dẫn chụp ảnh minh họa cho Hình 6.7 (Sinh viên xóa phần hướng dẫn này sau khi chèn ảnh):*
- **Mục đích:** Minh chứng tính năng xuất dữ liệu danh sách đi chợ ra tệp tin vật lý để mang đi chợ hoạt động tốt.
- **Cách chụp thực tế:**
  1. Truy cập trang quản lý Danh sách đi chợ (`https://luat.tech/shopping-list`).
  2. Click vào nút "Xuất danh sách đi chợ" (chọn định dạng xuất là `.txt` hoặc `.csv`).
  3. Đợi trình duyệt tải tệp tin về máy tính. Mở tệp tin đó lên bằng công cụ đọc tương ứng (ví dụ: Mở tệp `.txt` bằng Notepad, mở tệp `.csv` bằng Microsoft Excel hoặc WPS Office).
  4. Thu nhỏ cửa sổ trình duyệt (đang hiển thị trang danh sách đi chợ trên web) và cửa sổ tệp tin vừa tải về, đặt chúng song song cạnh nhau trên màn hình máy tính.
  5. Chụp ảnh màn hình toàn cảnh để minh chứng rõ ràng sự trùng khớp dữ liệu giữa giao diện web Bếp của Luật và nội dung tệp tin đã được tải về.
---"""

content = content.replace(old_section, new_section)

with io.open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done successfully!")
