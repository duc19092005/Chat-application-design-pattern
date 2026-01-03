# Module Identity-Access

## Mô Tả

Module này xử lý các chức năng liên quan đến quản lý danh tính và truy cập (Identity and Access Management), bao gồm xác thực, ủy quyền và quản lý người dùng. Module được xây dựng theo kiến trúc Domain-Driven Design (DDD) và Clean Architecture, chia thành các lớp: Application, Domain, Infrastructure và Presentation.

## Cấu Trúc Thư Mục

```
identity-access/
├── application/                 # Lớp ứng dụng - Chứa logic ứng dụng và giao tiếp với bên ngoài
│   ├── dtos/                    # Data Transfer Objects - Đối tượng truyền dữ liệu
│   │   └── login-dto.ts         # DTO cho yêu cầu đăng nhập
│   └── use-cases/               # Use Cases - Các trường hợp sử dụng ứng dụng
│       └── auth/
│           └── login.use-case.ts # Use case xử lý đăng nhập
├── domain/                      # Lớp miền - Logic nghiệp vụ cốt lõi
│   ├── entities/                # Domain Entities - Thực thể miền
│   │   ├── user-profile.entity.ts # Thực thể hồ sơ người dùng
│   │   └── user.entity.ts       # Thực thể người dùng
│   ├── enums/                   # Domain Enums - Các enum định nghĩa giá trị cố định trong miền
│   │   ├── account-completion.enum.ts # Enum trạng thái hoàn thành tài khoản
│   │   ├── account-status.enum.ts     # Enum trạng thái tài khoản
│   │   ├── login-method.enum.ts       # Enum phương thức đăng nhập
│   │   └── user-role.enum.ts          # Enum vai trò người dùng
│   └── repositories/            # Repository Interfaces - Giao diện repository
│       └── i-identity-access.repository.ts # Giao diện cho repository identity-access
├── infrastructure/              # Lớp hạ tầng - Triển khai chi tiết kỹ thuật
│   └── persistence/             # Lưu trữ dữ liệu
│       └── mongoDB/             # Triển khai MongoDB
│           ├── identity-access.respository.ts # Repository cụ thể cho MongoDB
│           ├── mappings/        # Ánh xạ dữ liệu
│           │   └── user.mapping.ts            # Ánh xạ cho người dùng
│           └── Schemas/         # Schema cơ sở dữ liệu
│               ├── user-profile.schema.ts     # Schema MongoDB cho hồ sơ người dùng
│               └── user.schema.ts             # Schema MongoDB cho người dùng
└── presentation/                # Lớp trình bày - Giao diện người dùng và API
    ├── http/                    # Xử lý HTTP requests
    │   ├── controllers/         # Controllers - Xử lý routing và responses
    │   │   └── test.Controller.ts # Controller kiểm tra (tạm thời)
    │   └── middlewares/         # Middlewares - Xử lý trước/sau requests
    │       └── identity-access.middleware.ts # Middleware cho identity-access
    └── websocket/               # Xử lý WebSocket connections
        ├── handlers/            # Handlers - Xử lý sự kiện WebSocket
        │   └── message-sender.handler.ts # Handler gửi tin nhắn
        └── mappings/            # Mappings - Ánh xạ dữ liệu WebSocket
            └── join-room.mapping.ts # Ánh xạ tham gia phòng
```

## Giải Thích Các Lớp

### Application Layer
- **Mục đích**: Chứa logic ứng dụng, use cases và DTOs. Đây là nơi định nghĩa các hành động mà hệ thống có thể thực hiện.
- **Ví dụ**: `login.use-case.ts` định nghĩa quy trình đăng nhập.

### Domain Layer
- **Mục đích**: Chứa logic nghiệp vụ cốt lõi, entities, enums và repository interfaces. Đây là trái tim của ứng dụng, không phụ thuộc vào framework hoặc công nghệ cụ thể.
- **Ví dụ**: `user.entity.ts` đại diện cho thực thể người dùng với các quy tắc kinh doanh; `user-role.enum.ts` định nghĩa các vai trò người dùng.

### Infrastructure Layer
- **Mục đích**: Triển khai các chi tiết kỹ thuật như database, external APIs, etc. Đây là nơi kết nối domain với thế giới bên ngoài.
- **Ví dụ**: `user.schema.ts` định nghĩa schema MongoDB cho collection users.

### Presentation Layer
- **Mục đích**: Xử lý giao diện người dùng, API endpoints và WebSocket connections. Đây là điểm vào của ứng dụng.
- **Ví dụ**: Controllers xử lý HTTP requests, middlewares xác thực tokens.

## Quy Tắc Phát Triển

- **Dependency Inversion**: Domain không phụ thuộc vào Infrastructure. Sử dụng interfaces trong Domain và triển khai trong Infrastructure.
- **Single Responsibility**: Mỗi class/file có một trách nhiệm duy nhất.
- **Clean Code**: Code dễ đọc, dễ bảo trì, với comments và naming conventions rõ ràng.

## Cách Sử Dụng

1. Thêm use cases mới trong `application/use-cases/`.
2. Định nghĩa entities và enums trong `domain/entities/` và `domain/enums/`.
3. Triển khai repositories trong `infrastructure/persistence/`.
4. Tạo controllers trong `presentation/http/controllers/`.

Để biết thêm chi tiết về toàn bộ dự án, xem [README.md](../../README.md) ở root.