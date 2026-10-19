# ToolHub

**Ít thao tác hơn. Xong việc nhanh hơn.**

ToolHub là website tập hợp các công cụ nhỏ phục vụ lập trình, xử lý văn bản, bảo mật, thiết kế, mạng, marketing và công việc hằng ngày. Giao diện tiếng Việt, có tìm kiếm, phân nhóm, đánh dấu yêu thích và danh sách công cụ đã dùng gần đây.

Phần lớn thao tác được xử lý ngay trong trình duyệt. Người dùng có thể nhập nội dung, mở file tại máy, xem trước, sao chép hoặc tải kết quả mà không cần backend xử lý dữ liệu riêng của ứng dụng.

- **Website đã triển khai:** [Mở ToolHub](https://toolhub-workbench-huy.funlemon1.chatgpt.site/).
- **Hiện trạng tài liệu:** ngày 19/10/2026 — **52 công cụ**, 8 nhóm, **69 bài kiểm thử tự động**.
- **Kiến trúc:** website tĩnh dùng HTML, CSS và JavaScript; một số bộ xử lý được đóng gói bằng esbuild.
- **Thư mục xuất bản:** `dist/`.

> Quyền truy cập website do nền tảng hosting quản lý. Ứng dụng không tự xây dựng hệ thống đăng ký/đăng nhập; điều này không đồng nghĩa URL triển khai luôn được truy cập công khai. Giữ nguyên cấu hình chia sẻ hiện tại khi cập nhật.

## Mục lục

1. [Tổng quan và nguyên tắc](#1-tổng-quan-và-nguyên-tắc)
2. [Danh sách 52 công cụ](#2-danh-sách-52-công-cụ)
3. [Chạy dự án tại máy](#3-chạy-dự-án-tại-máy)
4. [Cấu trúc mã nguồn](#4-cấu-trúc-mã-nguồn)
5. [Build và quản lý thư viện](#5-build-và-quản-lý-thư-viện)
6. [Hướng dẫn sử dụng](#6-hướng-dẫn-sử-dụng)
7. [Dữ liệu và kết nối mạng](#7-dữ-liệu-và-kết-nối-mạng)
8. [Giới hạn và hành vi cần biết](#8-giới-hạn-và-hành-vi-cần-biết)
9. [Kiểm thử](#9-kiểm-thử)
10. [Thêm hoặc sửa công cụ](#10-thêm-hoặc-sửa-công-cụ)
11. [Triển khai](#11-triển-khai)
12. [Xử lý sự cố](#12-xử-lý-sự-cố)
13. [Quy ước đóng góp](#13-quy-ước-đóng-góp)
14. [Hướng phát triển](#14-hướng-phát-triển)
15. [Giấy phép và ghi nhận](#15-giấy-phép-và-ghi-nhận)

## 1. Tổng quan và nguyên tắc

### Dành cho ai?

- **Lập trình viên / QA:** định dạng dữ liệu, kiểm tra schema, JWT, regex, SQL, URL và tạo dữ liệu thử nghiệm.
- **Thiết kế / frontend:** xử lý màu, kiểm tra tương phản, tạo CSS, tối ưu SVG, chỉnh ảnh và tạo favicon.
- **Marketing / nội dung:** tạo UTM, meta tag, QR, robots.txt, xem trước SEO và làm sạch văn bản.
- **Người dùng hằng ngày:** quy đổi tiền tệ, tạo số ngẫu nhiên, bấm giờ, đếm ngược và Pomodoro.

### Nguyên tắc của sản phẩm

- Ưu tiên luồng **chọn công cụ → nhập nội dung → nhận kết quả**.
- Giữ cách trình bày nhất quán, có ví dụ và thông báo lỗi cụ thể.
- Ưu tiên xử lý cục bộ; ghi rõ những thao tác cần dịch vụ trực tuyến.
- Khi đầu vào hoặc tùy chọn thay đổi, các công cụ chuyên biệt thường vô hiệu hóa kết quả cũ đến khi xử lý lại.
- Thao tác nặng như regex, schema, SQL và tối ưu SVG chạy trong Web Worker, có giới hạn thời gian.
- Không có database, API backend, hệ thống thanh toán hoặc bộ lập lịch chạy trên máy chủ trong mã nguồn hiện tại.

## 2. Danh sách 52 công cụ

Danh sách dưới đây bám theo registry `tools` trong [`dist/app.js`](dist/app.js). ID là khóa nội bộ phục vụ mở công cụ, yêu thích và lịch sử sử dụng.

### Lập trình — 17 công cụ

| ID | Công cụ | Chức năng |
| --- | --- | --- |
| `schema` | JSON Schema Validator | Kiểm tra JSON theo schema, chỉ rõ đường dẫn và nguyên nhân lỗi. |
| `sql` | SQL Formatter | Định dạng SQL theo hệ cơ sở dữ liệu, từ khóa và kiểu thụt lề. |
| `yaml` | JSON ↔ YAML | Chuyển file cấu hình JSON và YAML, kiểm tra lỗi và tải kết quả. |
| `cron` | Cron Builder | Tạo lịch cron 5 trường, chọn múi giờ và xem các lần chạy tiếp theo. |
| `diff` | So sánh văn bản / JSON | Tìm dòng thêm, xóa và so sánh JSON bỏ qua thứ tự khóa. |
| `csv` | CSV ↔ JSON | Đổi dữ liệu bảng, chọn dấu phân cách và mở file tại máy. |
| `regex` | Regex Tester | Thử biểu thức, đánh dấu phần khớp và xem nhóm bắt. |
| `fakejson` | Tạo dữ liệu giả JSON | Tạo dữ liệu thử nghiệm theo schema, số lượng và mẫu có sẵn. |
| `jwt` | JWT Debugger | Giải mã token, kiểm tra thời hạn và xác minh chữ ký HMAC tại máy. |
| `json` | JSON Formatter | Định dạng, thu gọn và kiểm tra dữ liệu JSON. |
| `base64` | Base64 Encode / Decode | Mã hóa và giải mã Base64, hỗ trợ tiếng Việt. |
| `url` | URL Encode / Decode | Chuyển đổi ký tự đặc biệt trong đường dẫn URL. |
| `uuid` | UUID Generator | Tạo UUID v4 ngẫu nhiên cho ứng dụng của bạn. |
| `timestamp` | Unix Timestamp | Chuyển đổi thời gian Unix và ngày giờ địa phương. |
| `html` | HTML Encode / Decode | Chuyển ký tự HTML thành entity và giải mã an toàn. |
| `radix` | Chuyển đổi hệ số | Đổi số nguyên giữa hệ nhị phân, thập phân, hex và hệ 2–36. |
| `query` | Tách tham số URL | Đọc query string thành danh sách hoặc JSON, giữ tham số trùng. |

### Văn bản — 11 công cụ

| ID | Công cụ | Chức năng |
| --- | --- | --- |
| `urlextract` | Trích xuất URL | Lấy URL từ văn bản, lọc trùng và loại tham số theo dõi. |
| `cleaner` | Text Cleaner | Làm sạch khoảng trắng, ký tự ẩn, dòng trống và chuẩn hóa Unicode. |
| `markdown` | Markdown Editor | Soạn Markdown, xem trước trực tiếp và xuất HTML hoặc Markdown. |
| `signature` | Tạo chữ ký email | Tạo chữ ký chuyên nghiệp, xem trước và sao chép cho email. |
| `words` | Đếm từ & ký tự | Thống kê từ, ký tự và thời gian đọc văn bản. |
| `case` | Chuyển đổi kiểu chữ | Đổi chữ hoa, chữ thường và viết hoa đầu từ. |
| `slug` | Tạo slug tiếng Việt | Biến tiêu đề thành đường dẫn gọn gàng, dễ đọc. |
| `lines` | Xử lý dòng văn bản | Xóa dòng trùng lặp, sắp xếp và bỏ dòng trống. |
| `lorem` | Tạo văn bản mẫu | Tạo đoạn văn tiếng Việt hoặc Lorem ipsum cho thiết kế. |
| `emails` | Trích xuất email | Lấy email từ văn bản, bỏ trùng lặp và chuẩn hóa chữ thường. |
| `percent` | Tính phần trăm | Tính tỷ lệ phần trăm nhanh cho công việc hàng ngày. |

### Bảo mật — 2 công cụ

| ID | Công cụ | Chức năng |
| --- | --- | --- |
| `password` | Tạo mật khẩu | Tùy chỉnh nhóm ký tự, độ dài và tạo nhiều mật khẩu. |
| `hash` | Hash Text (Crypto) | Băm MD5, SHA, HMAC; xuất Hex/Base64 và đối chiếu kết quả. |

### Thiết kế — 9 công cụ

| ID | Công cụ | Chức năng |
| --- | --- | --- |
| `palette` | Tạo bảng màu | Phối 5 màu từ màu gốc, khóa màu yêu thích và xuất CSS / JSON. |
| `svgopt` | Tối ưu SVG | Thu gọn SVG tĩnh, giữ viewBox, xem trước và tải kết quả. |
| `crop` | Cắt, xoay & lật ảnh | Kéo chọn vùng cắt, chỉnh tọa độ, xoay và lật ảnh tại máy. |
| `batchimage` | Chuyển ảnh hàng loạt | Chuyển PNG / JPEG / WebP, đổi kích thước và tải nhiều ảnh trong ZIP. |
| `favicon` | Tạo favicon | Tạo PNG nhiều kích thước, favicon.ico, manifest và mã HTML. |
| `contrast` | Contrast Checker | Kiểm tra độ tương phản màu chữ và nền theo WCAG AA / AAA. |
| `cssgen` | CSS Generator | Tạo gradient, box shadow và border radius có xem trước trực tiếp. |
| `image` | Nén & đổi kích thước ảnh | Xử lý PNG, JPEG, WebP; giữ tỷ lệ và tải ảnh kết quả. |
| `color` | Chuyển đổi màu sắc | Chuyển mã màu HEX sang RGB và HSL. |

### Mạng — 3 công cụ

| ID | Công cụ | Chức năng |
| --- | --- | --- |
| `urlinspect` | Phân tích URL | Xem protocol, host, port, path, fragment và từng tham số query. |
| `subnet` | Subnet Calculator IPv4 | Tính mạng CIDR, subnet mask, broadcast và dải địa chỉ host. |
| `ip` | IP của tôi & tra cứu IP | Xem IP công khai, nhà mạng, ASN, múi giờ và vị trí ước tính. |

### Tài chính — 1 công cụ

| ID | Công cụ | Chức năng |
| --- | --- | --- |
| `currency` | Chuyển đổi tiền tệ | Quy đổi VND, USD, EUR và các đồng tiền khác theo tỷ giá mới nhất. |

### Hằng ngày — 4 công cụ

| ID | Công cụ | Chức năng |
| --- | --- | --- |
| `pomodoro` | Pomodoro | Chia phiên tập trung, nghỉ ngắn và nghỉ dài với thời lượng tùy chỉnh. |
| `countdown` | Đồng hồ đếm ngược | Đặt thời lượng hoặc ngày giờ đích, tạm dừng và nhận âm báo. |
| `random` | Tạo số ngẫu nhiên | Chọn khoảng, số lượng, số thập phân và tránh trùng lặp. |
| `stopwatch` | Đồng hồ bấm giờ | Bắt đầu, tạm dừng, ghi vòng và xuất thời gian từng vòng. |

### Marketing — 5 công cụ

| ID | Công cụ | Chức năng |
| --- | --- | --- |
| `robots` | Tạo robots.txt | Tạo quy tắc thu thập dữ liệu cho bot, đường dẫn và sitemap. |
| `seopreview` | Xem trước SEO | Mô phỏng tiêu đề, URL và mô tả trên kết quả tìm kiếm. |
| `qr` | Tạo / đọc QR Code | QR cho URL, văn bản, Wi-Fi, liên hệ và đọc QR từ ảnh. |
| `meta` | Tạo Meta Tag | Sinh thẻ SEO, Open Graph và Twitter Card cho trang web. |
| `campaign` | Tạo URL chiến dịch | Gắn UTM nguồn, phương tiện, chiến dịch và liên kết theo dõi. |

## 3. Chạy dự án tại máy

### 3.1. Chỉ chạy website từ bản có sẵn

`dist/` đã chứa HTML, CSS, JavaScript và các thư viện cần thiết. Không cần cài npm hoặc build lại để xem phiên bản đã được đóng gói trong repository.

Mở terminal tại thư mục chứa `package.json` của dự án:

```bash
cd toolhub
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Nếu terminal đã ở trong thư mục `toolhub/`, bỏ qua lệnh `cd toolhub`.

Sau đó mở [http://127.0.0.1:4173/](http://127.0.0.1:4173/). Dừng server bằng `Ctrl+C`.

Trên Windows, có thể thay `python3` bằng `py`. Nếu cổng 4173 đang được sử dụng, đổi thành một cổng khác, ví dụ 4174.

> Dùng HTTP server thay vì mở trực tiếp `dist/index.html` bằng `file://`. Web Worker và một số API trình duyệt có thể không hoạt động đúng khi mở file trực tiếp.

### 3.2. Chuẩn bị môi trường phát triển

- **Node.js 22 trở lên** và npm để cài dependency, build các bundle và chạy kiểm thử.
- **Python 3** nếu dùng lệnh preview phía trên.
- Trình duyệt hiện đại có JavaScript, Web Worker, Canvas, Web Crypto và `createImageBitmap`.
- HTTPS khi triển khai; localhost dùng được cho quá trình phát triển. Clipboard và một số API có thể phụ thuộc secure context và quyền của trình duyệt.

Môi trường kiểm tra tài liệu hiện tại: Node.js `24.14.1`, npm `11.11.0`. `package.json` chưa khai báo trường `engines`; khi nâng dependency, cần kiểm tra lại yêu cầu phiên bản Node của thư viện.

```bash
npm ci
npm test
```

`npm ci` dùng phiên bản đã khóa trong `package-lock.json`. Không cần tạo file `.env` hoặc khai báo API key cho các chức năng hiện có.

### 3.3. Các npm script có thật trong dự án

| Lệnh | Tác dụng |
| --- | --- |
| `npm test` | Chạy toàn bộ `tests/*.test.cjs` bằng Node test runner |
| `npm run build:next` | Build YAML, Markdown, cron, tương phản và CSS core |
| `npm run build:network` | Build schema, SQL, phân tích URL, subnet và trích xuất URL core |
| `npm run build:design` | Build màu, SVGO, hình học ảnh, ICO và ZIP core |

Hiện chưa có script `dev`, `start`, `build`, `lint` hoặc CI workflow được cung cấp trong repository. Dùng các lệnh cụ thể ở trên thay vì giả định có `npm run dev`.

## 4. Cấu trúc mã nguồn

```text
toolhub/
├── README.md
├── package.json
├── package-lock.json
├── .gitignore
├── .openai/
│   └── hosting.json           # Định danh Site và thư mục static
├── src/
│   ├── next-core.js           # Nguồn cho next-core bundle
│   ├── network-core.js        # Nguồn cho network-core bundle
│   └── design-core.js         # Nguồn cho design-core bundle
├── scripts/
│   ├── build-next.cjs
│   ├── build-network.cjs
│   └── build-design.cjs
├── dist/
│   ├── index.html            # Khung trang, dialog và thứ tự nạp script
│   ├── style.css             # Giao diện chính, responsive, font
│   ├── advanced.css          # Giao diện công cụ chuyên biệt
│   ├── app.js                # Registry, danh mục, tìm kiếm, điều phối
│   ├── logic.js              # Logic công cụ nền tảng
│   ├── signature.js          # Sinh chữ ký email
│   ├── currency.js           # Parse / tính / định dạng tiền tệ
│   ├── random-time.js        # Số ngẫu nhiên và stopwatch
│   ├── dev-tools.js          # Fake JSON, JWT, hash, meta, UTM
│   ├── advanced-core.js      # Diff, CSV, regex, QR payload, kích thước ảnh
│   ├── advanced-ui.js        # Workspace dùng chung và các pane ban đầu
│   ├── next-core.js          # Bundle sinh từ src/next-core.js
│   ├── next-ui.js
│   ├── daily-core.js         # Text Cleaner, robots, SEO, timer
│   ├── daily-ui.js
│   ├── network-core.js       # Bundle sinh từ src/network-core.js
│   ├── network-ui.js
│   ├── design-core.js        # Bundle sinh từ src/design-core.js
│   ├── design-ui.js
│   ├── regex-worker.js
│   ├── next-worker.js
│   ├── network-worker.js
│   ├── design-worker.js
│   └── vendor/               # QR, DOMPurify, NOTICE và LICENSE của thư viện
└── tests/
    └── *.test.cjs
```

### 4.1. Điểm quan trọng về `src/` và `dist/`

**`dist/` vừa chứa file viết trực tiếp vừa chứa bundle sinh tự động. Không xóa hoặc build đè toàn bộ thư mục này.**

| Nhóm | Sửa ở đâu? | Sau khi sửa |
| --- | --- | --- |
| `next-core.js`, `network-core.js`, `design-core.js` | File tương ứng trong `src/` | Chạy đúng script build để cập nhật bundle trong `dist/` |
| HTML, CSS, `app.js`, các `*-ui.js`, worker và module còn lại | File tương ứng trong `dist/` | Kiểm tra cú pháp, test và thử trên trình duyệt |
| QR / DOMPurify đã vendored | `dist/vendor/` | Cập nhật có kiểm soát, giữ license và kiểm tra hồi quy |

Không sửa thủ công ba bundle core sinh tự động: thay đổi sẽ mất khi build lại.

### 4.2. Luồng hoạt động

1. `index.html` nạp CSS và các script theo thứ tự phụ thuộc.
2. `app.js` dựng danh mục từ registry, xử lý lọc, tìm kiếm, yêu thích và mở dialog.
3. Công cụ cơ bản dùng form/kết quả chung; công cụ chuyên biệt dùng `ToolHubAdvanced`.
4. `ToolHubAdvanced.open()` tạo pane khi cần và giữ DOM của pane trong phiên hiện tại.
5. Factory trong `next-ui.js`, `daily-ui.js`, `network-ui.js`, `design-ui.js` quản lý tương tác từng nhóm.
6. Logic core xử lý dữ liệu; worker chạy các tác vụ dễ làm treo luồng giao diện.
7. Kết quả được render, sao chép hoặc tải bằng `Blob` và object URL.

Các module trình duyệt được chia sẻ qua các global `ToolHub*`; đây chưa phải ứng dụng React/Vue hoặc một hệ thống router SPA. Thứ tự script trong `index.html` có ý nghĩa.

## 5. Build và quản lý thư viện

### 5.1. Build toàn bộ ba bundle

Sau `npm ci`, chạy lần lượt:

```bash
npm run build:next
npm run build:network
npm run build:design
npm test
```

Các script chỉ tạo lại ba file `dist/*-core.js` tương ứng. Chúng **không** tự tạo lại HTML, CSS, UI, worker, QR vendor, bản sao DOMPurify hoặc các file NOTICE/LICENSE.

### 5.2. Thư viện chính

| Thư viện | Phiên bản trong package.json | Vai trò |
| --- | --- | --- |
| `js-yaml` | 5.5.0 | Đọc/ghi YAML |
| `marked` | 18.1.1 | Chuyển Markdown sang HTML |
| `dompurify` | 3.4.17 | Làm sạch HTML/SVG trước khi dùng trong giao diện |
| `cron-parser` | 5.10.2 | Phân tích cron, tính lịch theo múi giờ |
| `ajv` | 8.20.0 | Kiểm tra JSON Schema draft-07 và 2020-12 |
| `ajv-formats` | 3.0.1 | Các format như email, date-time, URI |
| `sql-formatter` | 15.9.0 | Định dạng các dialect SQL |
| `svgo` | 4.1.0 | Tối ưu SVG |
| `fflate` | 0.8.3 | Tạo ZIP tại trình duyệt |
| `esbuild` | 0.28.2 | Đóng gói JavaScript, là dev dependency |

QR dùng các bản vendored `qrcode-generator` 2.0.4 và `jsQR` 1.4.0. Hai thư viện QR này hiện không nằm trong `dependencies` của `package.json`.

### 5.3. Khi cập nhật dependency

1. Cập nhật phiên bản có chủ đích và lưu `package-lock.json`.
2. Build lại bundle liên quan.
3. Nếu cập nhật DOMPurify, đồng bộ bản trình duyệt vì build script không tự copy:

   ```bash
   cp node_modules/dompurify/dist/purify.min.js dist/vendor/purify.min.js
   ```

4. Đồng bộ NOTICE và license tương ứng trong `dist/vendor/`.
5. Chạy test, kiểm tra trực tiếp công cụ chịu ảnh hưởng.
6. Cập nhật khóa cache trên các URL tài nguyên đã đổi. Nếu thay bundle được worker nạp, cập nhật cả URL trong `importScripts(...)` để tránh trộn phiên bản cũ/mới.

## 6. Hướng dẫn sử dụng

### 6.1. Thao tác chung

1. Tìm công cụ theo tên hoặc chọn nhóm ở thanh điều hướng.
2. Mở công cụ; nhập nội dung hoặc dùng ví dụ nếu công cụ có hỗ trợ.
3. Chọn các tùy chọn và nhấn nút xử lý. Một số công cụ có xem trước trực tiếp.
4. Sao chép hoặc tải file khi kết quả đã sẵn sàng.
5. Chuyển sang công cụ khác bằng danh sách trong workspace; phần lớn dữ liệu được giữ trong phiên hiện tại.

Phím tắt hiện có:

| Phím | Phạm vi |
| --- | --- |
| `/` | Đưa con trỏ đến ô tìm kiếm khi không nhập liệu và workspace chưa mở |
| `Ctrl+Enter` / `⌘+Enter` | Chạy thao tác ở các ô nhập thuộc workspace chung có gắn handler; không áp dụng đồng loạt cho mọi pane chuyên biệt |
| `Esc` | Đóng dialog công cụ theo hành vi native của trình duyệt |

### 6.2. Một số quy trình thường dùng

**Kiểm tra JSON API:** mở JSON Formatter để định dạng → dùng JSON Schema Validator kiểm tra cấu trúc → dùng So sánh văn bản / JSON đối chiếu hai phiên bản. Tạo dữ liệu giả JSON là công cụ riêng, dùng schema phẳng dạng tên trường → loại dữ liệu; không phải trình sinh dữ liệu theo JSON Schema tiêu chuẩn.

**Chuẩn bị ảnh cho website:** dùng Cắt, xoay & lật ảnh chọn vùng cần thiết → dùng Nén & đổi kích thước ảnh hoặc Chuyển ảnh hàng loạt để xuất → dùng Tạo favicon nếu cần bộ biểu tượng. Tải file từ công cụ trước rồi mở ở công cụ tiếp theo; chưa có pipeline tự động chuyển ảnh giữa mọi công cụ.

**Chuẩn bị nội dung marketing:** tạo UTM cho liên kết → tạo QR từ URL → dùng Tạo Meta Tag và Xem trước SEO để chuẩn bị thông tin trang. Các công cụ này tạo nội dung, không tự chỉnh HTML của website đích hoặc gửi chiến dịch.

**Làm việc tập trung:** đặt thời lượng Pomodoro, bật âm báo nếu muốn, bắt đầu phiên. Khi hoàn thành, chuyển sang phiên nghỉ bằng nút tiếp theo. Không tự động chạy nối tiếp vô hạn.

## 7. Dữ liệu và kết nối mạng

### 7.1. Những gì được giữ trong trình duyệt

| Dữ liệu | Nơi giữ | Sau khi tải lại trang |
| --- | --- | --- |
| ID công cụ yêu thích | `localStorage`, khóa `toolhub-favorites` | Thường vẫn còn, tùy chế độ lưu trữ của trình duyệt |
| ID công cụ dùng gần đây | `localStorage`, khóa `toolhub-recent` | Thường vẫn còn |
| Nội dung nhập, bản nháp, file đã chọn, ảnh kết quả, phiên timer | Bộ nhớ JavaScript / DOM của trang | Mất |
| Cache tỷ giá | Bộ nhớ trang, thời gian sử dụng lại tối đa 10 phút | Mất |
| File người dùng đã tải xuống | Thư mục tải xuống do trình duyệt quản lý | Vẫn là file trên máy, không bị nút Xóa trong công cụ xóa đi |

Khóa HMAC/JWT không được đưa vào snapshot bản nháp của form chung. Không có cơ chế đồng bộ nội dung người dùng lên tài khoản hoặc database trong ứng dụng hiện tại.

### 7.2. Kết nối bên ngoài có trong mã nguồn

| Thành phần | Kết nối | Dữ liệu / lưu ý |
| --- | --- | --- |
| Tra cứu IP | `https://api.ip.sb/geoip` hoặc `/geoip/{ip}` | Dịch vụ nhận IP cần tra cứu và thông tin kết nối; vị trí chỉ là ước tính |
| Tiền tệ | `https://api.frankfurter.dev/v2/rate/{from}/{to}` | Gửi cặp mã tiền tệ; số tiền được tính trong trình duyệt |
| Font giao diện | Google Fonts qua CSS trong `style.css` | Có thể tải CSS và font từ Google; mất mạng có font fallback |
| Logo chữ ký email | URL HTTPS do người dùng nhập | Bản xem trước chữ ký có thể tải ảnh từ URL đó; iframe có sandbox và CSP riêng |
| Hosting | Nơi phục vụ HTML/CSS/JS | Hoạt động mạng và cơ chế truy cập của nền tảng hosting là lớp riêng với logic công cụ |

Các thư viện QR, bộ xử lý và DOMPurify được phân phối cùng tài nguyên website; không tải từ CDN thư viện lúc sử dụng. Mã nguồn hiện không tích hợp analytics riêng, quảng cáo hoặc tài khoản người dùng của ứng dụng.

**Không mô tả ToolHub là “hoàn toàn offline”.** Phần lớn công cụ không cần dịch vụ xử lý từ xa sau khi tài nguyên đã tải, nhưng IP, tỷ giá, font và logo có các ngoại lệ phía trên. Dự án chưa có service worker để bảo đảm hoạt động offline khi mở mới trang.

### 7.3. Các biện pháp xử lý nội dung

- Markdown được parse rồi làm sạch bằng DOMPurify; ảnh và nội dung nhúng bị tắt trong preview hiện tại.
- SVG được làm sạch trước khi tối ưu và kiểm tra lại trước khi hiển thị/xuất; script, ảnh nhúng, animation, thẻ style và tham chiếu ngoài bị loại bỏ.
- Giá trị người dùng trong các bảng kết quả được gán qua `textContent` thay vì chèn HTML tùy ý.
- Regex, schema, SQL, YAML/cron và SVG có worker/timeout để giảm nguy cơ treo giao diện.
- URL đọc từ QR không được tự mở; các công cụ phân tích/trích xuất URL không tự truy cập liên kết.
- JSON Schema chỉ hỗ trợ tham chiếu nội bộ bắt đầu bằng `#`, không tải remote schema.

Đây là mô tả các biện pháp đang có, không phải chứng nhận kiểm toán bảo mật. Khi bổ sung công cụ mới, cần giữ hoặc tăng mức bảo vệ hiện tại.

## 8. Giới hạn và hành vi cần biết

Các giới hạn dưới đây phản ánh mã nguồn hiện tại. `MB` ở các ngưỡng kiểm tra dung lượng thường là số byte thập phân; số “ký tự” trong nhiều kiểm tra đầu vào là `String.length` của JavaScript, không luôn bằng số ký tự nhìn thấy.

| Công cụ / nhóm | Giới hạn hoặc hành vi |
| --- | --- |
| So sánh văn bản / JSON | Tổng đầu vào 400.000 ký tự; tối đa 2.000 dòng mỗi bên sau xử lý; JSON có tùy chọn bỏ qua thứ tự khóa, vẫn giữ thứ tự mảng |
| CSV ↔ JSON | Đầu vào tối đa 2.000.000 ký tự; CSV mở file tối đa 2 MB; tối đa 20.000 bản ghi và 200 cột; header không trống/trùng |
| Nhận diện kiểu CSV | Mặc định giữ chuỗi; tùy chọn nhận diện số/bool/null; số nguyên vượt độ chính xác an toàn được giữ dạng chuỗi |
| JSON ↔ YAML | 200.000 ký tự đầu vào; kết quả tối đa 2.000.000 ký tự; không giữ comment, không nhận nhiều tài liệu YAML trong một file |
| Regex Tester | Pattern tối đa 5.000 ký tự; văn bản 100.000 ký tự; tối đa 500 phần khớp, có giới hạn độ dài kết quả; worker dừng sau 1,5 giây |
| JSON Schema | Schema 100.000 ký tự, dữ liệu 300.000 ký tự; draft-07 hoặc 2020-12; tối đa 100 lỗi hiển thị; không ép kiểu hay thêm default |
| SQL Formatter | 100.000 ký tự; 7 lựa chọn dialect; chỉ định dạng, không thực thi hoặc xác nhận nghiệp vụ; stored procedure không được hỗ trợ đầy đủ |
| Worker YAML/cron, schema/SQL, SVG | Dừng sau 3 giây; chuyển công cụ cũng hủy tác vụ đang xử lý |
| Cron Builder | Cron 5 trường, hỗ trợ số, `*`, danh sách, khoảng và bước; không chạy job; tính tối đa 10 lần tiếp theo trong phạm vi 50 năm |
| QR | Nội dung tối đa 2.000 byte UTF-8; dung lượng thực tế còn tùy mức sửa lỗi; tạo PNG 256/512/1024 px hoặc SVG; đọc một mã rõ nét từ file ảnh |
| Ảnh raster đầu vào | PNG/JPEG/WebP, tối đa 20 MB/ảnh, 32 megapixel, cạnh dài nhất 16.000 px |
| Nén / đổi kích thước ảnh | Kích thước đích 1–12.000 px mỗi cạnh, tối đa 32 megapixel; có tùy chọn phóng to; PNG không dùng tùy chọn chất lượng lossy |
| Cắt / xoay / lật | Vùng cắt phải nằm trong ảnh; góc 0/90/180/270°; lật trước khi xoay; JPEG nền trắng |
| Ảnh hàng loạt | Tối đa 20 file, tổng nguồn 60 MB, kết quả 80 MB; cạnh đích 1–8.000 px khi thu nhỏ; không phóng to |
| Ảnh xuất | Ảnh tĩnh, không giữ metadata; có thể lớn hơn file gốc; một số trình duyệt có thể trả định dạng dự phòng, phần mở rộng theo MIME thực tế |
| SVG Optimizer | 300.000 ký tự; độ chính xác 1–5 chữ số; chỉ SVG tĩnh; SVG dựa vào style/ảnh/animation bị loại có thể thay đổi hình thức |
| Favicon | 6 PNG: 16/32/48/180/192/512 px; ICO chứa 16/32/48 px; thêm manifest và HTML; tổng 9 file |
| Text Cleaner | 500.000 ký tự; chọn từng phép biến đổi; chuẩn hóa LF; giữ ZWJ/ZWNJ để không phá emoji ghép |
| Trích xuất URL | 500.000 ký tự, tối đa 5.000 ứng viên URL; chỉ HTTP/HTTPS; loại dấu câu là heuristic, cần kiểm tra URL đặc biệt |
| Phân tích URL | 20.000 ký tự; HTTP/HTTPS; giữ query trùng; mật khẩu trong phần authority được ẩn trong báo cáo |
| Subnet | Chỉ IPv4; hỗ trợ prefix /0–/32 và netmask liên tục; /31 theo quy ước point-to-point, /32 là một host |
| Số ngẫu nhiên | 1–1.000 kết quả; 0–6 chữ số thập phân; có lọc trùng và sắp xếp; khoảng bao gồm cả hai đầu |
| Fake JSON | 1–1.000 bản ghi, schema phẳng tối đa 30 trường; dữ liệu ví dụ, không bảo đảm giống một hệ thống dữ liệu thực |
| JWT | Giải mã JWS 3 phần; xác minh HMAC HS256/384/512; không hỗ trợ JWE 5 phần; decode không chứng minh chữ ký hợp lệ |
| Hash | MD5, SHA-1/256/384/512; HMAC cho nhóm SHA; không phải hệ thống lưu mật khẩu; giới hạn văn bản 1 triệu ký tự |
| Pomodoro / đếm ngược | Phải giữ trang mở; tiếp tục khi chuyển công cụ; tải lại/đóng trang mất phiên; âm báo có thể trễ khi tab nền hoặc thiết bị ngủ |
| SEO Preview | Mô phỏng, không cam kết giống kết quả Google; số ký tự không phải ngưỡng xếp hạng hay giới hạn cứng |
| robots.txt | Chỉ sinh file; không tự triển khai, không bảo vệ nội dung riêng tư và không bảo đảm loại URL khỏi kết quả tìm kiếm |
| Tỷ giá | Tham khảo theo ngày nguồn cung cấp, có thể là ngày làm việc gần nhất; chưa gồm phí và không phải giá mua/bán ngân hàng |

## 9. Kiểm thử

### 9.1. Chạy test tự động

Từ thư mục dự án:

```bash
npm test
```

Hoặc chạy một nhóm:

```bash
node --test tests/network.test.cjs
node --test tests/design.test.cjs
```

Mốc hiện tại: **69 test trong 10 file**, dùng `node:test` và `assert`. Một số bộ test nạp bundle trình duyệt qua VM để kiểm tra chính file đã build.

| File test | Phạm vi chính |
| --- | --- |
| `logic.test.cjs` | Mật khẩu, hệ cơ số, HTML, email và phân loại IP |
| `signature.test.cjs` | Template chữ ký, escape, URL và cấu hình |
| `currency.test.cjs` | Nhập số tiền, tính và định dạng kết quả |
| `random-time.test.cjs` | Số ngẫu nhiên, khoảng thập phân, stopwatch |
| `dev-tools.test.cjs` | Hash, HMAC, JWT, meta tag, UTM và fake JSON |
| `advanced.test.cjs` | Diff, CSV, regex, QR round-trip và kích thước ảnh |
| `next.test.cjs` | YAML, cron/DST/ngày nhuận, Markdown, tương phản và CSS |
| `daily.test.cjs` | Làm sạch văn bản, robots, SEO, duration và pause/resume timer |
| `network.test.cjs` | Schema, SQL, URL, subnet và trích xuất URL |
| `design.test.cjs` | HSL/HEX, phối màu, SVGO, crop, favicon, ICO và ZIP |

**Test logic không thay thế kiểm tra trình duyệt.** Canvas, Clipboard, file picker, download, âm thanh, worker và layout cần được thử trực tiếp. Repository chưa có bộ E2E tự động hoặc CI cấu hình sẵn.

### 9.2. Kiểm tra thủ công trước khi phát hành

- Mở công cụ từ danh mục và tìm kiếm; kiểm tra chuyển công cụ, đóng dialog, giữ nội dung trong phiên.
- Thử ví dụ, đầu vào đúng, đầu vào lỗi và các giới hạn quan trọng.
- Kiểm tra đổi tùy chọn có làm kết quả cũ bị vô hiệu hóa đúng không.
- Thử sao chép, tải file; kiểm tra nội dung, MIME, phần mở rộng và Unicode.
- Với ảnh: kiểm tra chiều rộng/cao thực, tỷ lệ, nền trong suốt, xoay/lật và file lớn hơn ảnh gốc.
- Với ZIP/ICO: mở ZIP, đếm file, kiểm tra kích thước PNG và payload ICO; không chỉ nhìn tên file.
- Với timer: thử tạm dừng, tiếp tục, đổi công cụ và quay lại sau khi tab nền.
- Với worker: thử tác vụ chậm, dừng hoặc chuyển công cụ; bảo đảm giao diện vẫn phản hồi.
- Với Markdown/SVG/HTML: thử nội dung chứa script, event handler và tài nguyên nhúng.
- Kiểm tra cả màn hình rộng và bố cục hẹp; dùng bàn phím cho nút/ô nhập.

## 10. Thêm hoặc sửa công cụ

### 10.1. Chọn module phù hợp

- Logic thuần có dependency npm: thêm vào `src/*-core.js` phù hợp rồi build lại.
- Công cụ nhỏ không cần bundler: có thể thêm vào core viết trực tiếp trong `dist/` theo cách các module đang dùng.
- UI chuyên biệt: thêm factory vào nhóm `*-ui.js` tương ứng.
- Công cụ đơn giản dùng form chung: tích hợp theo các nhánh hiện có trong `app.js`.

### 10.2. Đăng ký công cụ chuyên biệt

Ví dụ cấu trúc registry, chỉ dùng để hướng dẫn:

```js
{
  id: 'new-tool',
  name: 'Tên công cụ',
  desc: 'Mô tả chức năng ngắn, đúng hành vi.',
  cat: 'Lập trình',
  icon: '{}',
  tone: '#547a59',
  tint: '#edf4e9'
}
```

Các bước cần đồng bộ:

1. Thêm metadata vào `tools` trong `dist/app.js`; dùng ID duy nhất và tên nhóm đã tồn tại.
2. Thêm ID vào `ToolHubAdvanced.ids` nếu dùng workspace chuyên biệt.
3. Bổ sung nhánh dispatch trong `ToolHubAdvanced.open()` để gọi đúng UI factory.
4. Tạo pane qua helper `make`, `panel`, `field`, `ta`, `check`; giữ nhãn và thông báo tiếng Việt rõ ràng.
5. Nếu thêm file script, khai báo trong `index.html` trước module sử dụng nó.
6. Nếu tác vụ có thể nặng, đưa vào worker; thêm timeout và `pane.cancel` để hủy khi chuyển công cụ.
7. Hủy kết quả cũ khi đầu vào đổi, ngăn phản hồi async cũ ghi đè kết quả mới, thu hồi object URL và đóng bitmap khi không dùng.
8. Thêm test cho hành vi có rủi ro sai dữ liệu; thử thực tế các chức năng phụ thuộc trình duyệt.
9. Cập nhật danh sách công cụ, giới hạn và tài liệu này.

### 10.3. Quy tắc xử lý dữ liệu

- Không tải nội dung, file hoặc secret lên dịch vụ bên ngoài nếu chức năng chưa yêu cầu rõ.
- Không dùng `innerHTML` trực tiếp với dữ liệu người dùng chưa làm sạch.
- Với URL, kiểm tra protocol, thông tin đăng nhập và mục đích sử dụng; không tự mở URL được trích xuất.
- Không biến việc giải mã JWT thành kết luận đã xác thực.
- Không thêm mã thực thi SQL, shell hoặc cron vào công cụ chỉ có chức năng tạo/định dạng.
- Giới hạn kích thước và thời gian xử lý phù hợp với bộ nhớ trình duyệt.
- Không lưu credential, API key hoặc secret vào repo, `localStorage`, log hay artifact triển khai.

## 11. Triển khai

### 11.1. Cấu hình Sites hiện tại

File `.openai/hosting.json`:

```json
{
  "project_id": "appgprj_6ad5955969bc81918f84094e18b5e1f8",
  "static": {
    "directory": "dist"
  }
}
```

`project_id` là định danh của Site hiện tại, không phải API key. Giữ nguyên khi cập nhật Site này; chỉ tạo định danh mới nếu chủ đích tạo một Site khác.

Khi triển khai bằng Sites:

1. Xác nhận đúng Site, quyền sở hữu và phạm vi truy cập hiện tại.
2. Mở/đồng bộ nguồn bằng workflow của Sites và credential ngắn hạn.
3. Build các bundle đã sửa, chạy kiểm tra thích hợp.
4. Đồng bộ đúng commit nguồn rồi đóng gói artifact chứa manifest và tài nguyên static trong `dist/`.
5. Lưu version và deploy theo đúng phạm vi truy cập đang có.
6. Kiểm tra kết quả deployment đến trạng thái thành công; ghi nhận version/commit để có thể đối chiếu.

Credential của Sites chỉ được truyền an toàn cho workflow, không đưa vào README, đối số lệnh công khai hoặc file trong repo. Các helper Sites phụ thuộc môi trường Codex/Sites, không nằm trong `scripts/` của dự án; `npm run build:*` không tự deploy website.

### 11.2. Hosting static khác

Về mặt ứng dụng, có thể phục vụ nội dung `dist/` bằng một static HTTP server có HTTPS và hỗ trợ JavaScript/Web Worker. Khi chuyển hosting:

- Phục vụ `dist/index.html` và toàn bộ file JS/CSS/vendor/worker đi kèm.
- Giữ cấu trúc đường dẫn và MIME phù hợp; worker cần tải được file core qua `importScripts`.
- Không đưa `node_modules/`, token hoặc dữ liệu làm việc vào tài nguyên public.
- Nếu thay CSP, kiểm tra lại worker, Canvas, Clipboard, các API IP/tỷ giá và cơ chế biên dịch schema của Ajv; đừng áp dụng cấu hình tùy ý rồi giả định mọi công cụ vẫn hoạt động.
- Không mặc định dựa vào quyền riêng tư của Sites khi đổi sang hosting khác; cần cấu hình truy cập riêng ở nơi mới.
- Mã HTML do bộ favicon tạo dùng đường dẫn gốc `/...`; sửa lại nếu website đích phục vụ icon trong thư mục con.

## 12. Xử lý sự cố

| Hiện tượng | Kiểm tra / xử lý |
| --- | --- |
| Công cụ worker không chạy | Dùng HTTP/HTTPS, không mở `file://`; kiểm tra worker/core có trả 200 và đúng đường dẫn |
| Lỗi `ToolHub... is not defined` | Kiểm tra thứ tự script, file tải thiếu hoặc cache không đồng bộ; tải lại trang sau khi xác nhận tài nguyên phục vụ đầy đủ |
| Không sao chép được | Dùng HTTPS/localhost, kiểm tra quyền Clipboard; chọn nội dung hoặc tải file thay thế |
| `npm run dev` báo thiếu script | Dùng Python HTTP server; dự án chưa có script dev |
| Không tìm thấy `esbuild` khi build | Chạy `npm ci`, bảo đảm không bỏ qua dev dependencies trong môi trường build |
| Sửa `src/` nhưng giao diện vẫn dùng logic cũ | Chạy đúng `build:*`, kiểm tra bundle và khóa cache |
| IP hoặc tỷ giá không tải được | Kiểm tra Internet, CORS, trình chặn nội dung, giới hạn dịch vụ và thông báo timeout; các yêu cầu có thời gian chờ 12 giây |
| Tỷ giá không phải hôm nay | Xem ngày dữ liệu do nguồn trả về; ngày nghỉ có thể dùng dữ liệu ngày làm việc gần nhất |
| CSV hiển thị lệch cột | Chọn dấu phân cách phù hợp; kiểm tra header, số cột, dấu nháy và encoding UTF-8 |
| Schema báo lỗi `$ref` hoặc draft | Chọn đúng draft, dùng tham chiếu nội bộ `#`; remote reference không được tải |
| Regex/schema bị dừng | Giảm độ phức tạp hoặc kích thước đầu vào; không tăng timeout vô hạn để che tác vụ có thể treo |
| Ảnh xuất lớn hơn file nguồn | Đây là khả năng bình thường; đổi định dạng, giảm kích thước/chất lượng nếu phù hợp |
| SVG sau tối ưu khác hình gốc | Kiểm tra việc loại style, ảnh nhúng, animation và tham chiếu ngoài; công cụ hiện chỉ dành cho SVG tĩnh |
| Âm báo timer không phát / đến muộn | Âm thanh cần tương tác người dùng; kiểm tra tab, chế độ ngủ và chính sách âm thanh trình duyệt |
| Mất dữ liệu sau refresh | Đây là hành vi hiện tại: bản nháp và file chỉ ở bộ nhớ; tải kết quả cần giữ trước khi refresh |
| Chữ ký email khác bản xem trước | Mỗi email client hỗ trợ HTML khác nhau; thử gửi email kiểm tra và dùng cách dán chữ ký có định dạng |

## 13. Quy ước đóng góp

- Viết mô tả thay đổi theo vấn đề và hành vi sau khi sửa, kèm cách xác minh.
- Giữ giao diện và thông báo thống nhất với các công cụ hiện tại.
- Ưu tiên dependency đã có; nếu thêm thư viện, giải thích nhu cầu, ghim phiên bản, cập nhật lockfile và license.
- Chỉ build bundle có thay đổi và chạy các kiểm tra phù hợp; trước phát hành kiểm tra ảnh hưởng tới các công cụ dùng chung.
- Không thêm tính năng vào danh sách đã hoàn thành nếu mới có UI hoặc mock, chưa có xử lý thực.
- Không đổi ID công cụ tùy tiện vì ID được dùng trong yêu thích và lịch sử.
- Không đưa ảnh thử, file tải xuống, secret hoặc artifact tạm vào `dist/`.

## 14. Hướng phát triển

Các mục dưới đây là đề xuất, **chưa phải tính năng hiện có**:

- Lưu cấu hình tùy chọn hoặc bản nháp có sự kiểm soát và cơ chế xóa rõ ràng.
- Lazy-load bộ xử lý theo công cụ để giảm tài nguyên lúc mở trang.
- Tự lưu trữ font và đánh giá bổ sung PWA/offline cho các công cụ phù hợp.
- Test E2E cho upload/download, worker, timer, bàn phím và bố cục responsive.
- Chuẩn hóa script build tổng, kiểm tra cú pháp và quy trình CI khi dự án cần.
- Hợp nhất pipeline ảnh để chuyển kết quả giữa các công cụ mà không phải tải/mở lại.
- Bổ sung công cụ mới dựa trên nhu cầu thực tế, tránh tạo nhiều mục trùng chức năng.

## 15. Giấy phép và ghi nhận

Repository hiện **chưa có file LICENSE cấp dự án**. `private: true` trong `package.json` ngăn publish npm ngoài ý muốn; nó không tự xác định giấy phép sử dụng mã nguồn. Chủ dự án cần lựa chọn và bổ sung giấy phép trước khi chia sẻ/phân phối mã nguồn theo điều kiện cụ thể.

Các thư viện bên thứ ba có giấy phép riêng. Xem `dist/vendor/`, đặc biệt:

- `NOTICE.txt` — QR generator / reader.
- `NEXT-NOTICE.txt` — YAML, Markdown, DOMPurify và cron.
- `NETWORK-NOTICE.txt` — schema, SQL và các dependency liên quan.
- `DESIGN-NOTICE.txt` — SVGO, ZIP và các dependency liên quan.
- Các file `*-LICENSE.txt` đi kèm.

Nguồn dịch vụ và tài liệu được giao diện tham chiếu gồm [IP.SB](https://ip.sb/), [Frankfurter](https://frankfurter.dev/), [WCAG](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) và [Google Search Central](https://developers.google.com/search/docs). Việc ToolHub gọi hoặc tham khảo các nguồn này không có nghĩa các tổ chức đó bảo trợ dự án.
