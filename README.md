<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Cấu Trúc Dự Án

Dự án này tuân theo kiến trúc mô-đun dựa trên nguyên tắc Domain-Driven Design (DDD). Dưới đây là tổng quan về cấu trúc dự án:

```
src/
├── app.controller.spec.ts      # Các bài kiểm tra đơn vị cho controller chính của ứng dụng
├── app.controller.ts           # Controller chính của ứng dụng
├── app.module.ts               # Module gốc của ứng dụng
├── app.service.ts              # Service chính của ứng dụng
├── main.ts                     # Điểm vào của ứng dụng
├── modules/
│   └── identity-access/        # Module Quản Lý Danh Tính và Truy Cập
│       ├── core/               # Logic nghiệp vụ cốt lõi
│       │   ├── test.auth-service.ts    # Các bài kiểm tra cho service xác thực
│       │   ├── dtos/           # Các đối tượng truyền dữ liệu (Data Transfer Objects)
│       │   │   └── login-dto.ts        # DTO cho đăng nhập
│       │   ├── entities/       # Các thực thể miền (Domain Entities)
│       │   │   └── testEntity.ts       # Thực thể kiểm tra
│       │   ├── interfaces/     # Các giao diện repository
│       │   │   └── repositories/
│       │   │       └── i-identity-access.repository.ts  # Giao diện repository cho identity-access
│       │   └── use-cases/      # Các trường hợp sử dụng ứng dụng
│       │       └── auth/
│       │           └── login.use-case.ts  # Trường hợp sử dụng đăng nhập
│       └── infrastructure/     # Lớp hạ tầng
│           ├── http/           # Các thành phần liên quan đến HTTP
│           │   ├── controllers/
│           │   │   └── test.Controller.ts  # Controller kiểm tra
│           │   └── middlewares/
│           │       └── identity-access.middleware.ts  # Middleware cho identity-access
│           ├── repositories/   # Triển khai repository
│           │   └── mongoDB/
│           │       ├── identity-access.respository.ts  # Repository cho identity-access sử dụng MongoDB
│           │       ├── mappings/
│           │       │   └── user.mapping.ts  # Ánh xạ cho người dùng
│           │       └── Schemas/
│           │           └── user.schema.ts  # Schema cho người dùng
│           └── websocket/      # Các trình xử lý WebSocket
│               ├── handlers/
│               │   └── message-sender.handler.ts  # Trình xử lý gửi tin nhắn
│               └── mappings/
│                   └── join-room.mapping.ts  # Ánh xạ tham gia phòng
└── shared/                     # Các tiện ích và cấu hình chia sẻ
    └── config/
        ├── mongoDB.config.ts   # Cấu hình MongoDB
        └── webSocket.config.ts # Cấu hình WebSocket

test/
├── app.e2e-spec.ts             # Các bài kiểm tra end-to-end
└── jest-e2e.json               # Cấu hình Jest cho e2e tests
```

### Mô Tả Chi Tiết Các Module Chính:

- **Module Identity-Access**: Xử lý xác thực, ủy quyền và quản lý người dùng.
  - **Core (Lõi)**: Chứa logic nghiệp vụ, thực thể miền, trường hợp sử dụng và giao diện. Đây là nơi định nghĩa các quy tắc kinh doanh và hành vi của miền.
    - `dtos/`: Chứa các DTO để truyền dữ liệu giữa các lớp, giúp tách biệt dữ liệu đầu vào/đầu ra.
    - `entities/`: Các thực thể miền đại diện cho các đối tượng kinh doanh chính.
    - `interfaces/`: Định nghĩa các giao diện cho repository, đảm bảo tách biệt giữa logic và triển khai.
    - `use-cases/`: Các trường hợp sử dụng ứng dụng, mô tả các hành động mà hệ thống có thể thực hiện.
  - **Infrastructure (Hạ Tầng)**: Triển khai các chi tiết kỹ thuật như lưu trữ dữ liệu, giao tiếp mạng và xử lý thời gian thực.
    - `http/`: Xử lý các yêu cầu HTTP, bao gồm controllers để định tuyến và middlewares để xử lý trước/sau yêu cầu.
    - `repositories/`: Triển khai cụ thể của repository, ở đây sử dụng MongoDB với mappings và schemas.
    - `websocket/`: Xử lý giao tiếp thời gian thực qua WebSocket, bao gồm handlers cho tin nhắn và mappings cho phòng.

- **Shared (Chia Sẻ)**: Chứa các cấu hình và tiện ích dùng chung trên toàn bộ dự án, như cấu hình cơ sở dữ liệu và WebSocket, để tránh trùng lặp mã.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
