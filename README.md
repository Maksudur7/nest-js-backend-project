## Nestjs project file structure

``` my-nest-project/
├── src/
│   ├── modules/                 # সব ফিচার মডিউল এখানে থাকে
│   │   ├── auth/                # Authentication সংক্রান্ত ফাইল
│   │   │   ├── dto/             # Data Transfer Objects (Login/Register validation)
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   └── courses/             # Course ম্যানেজমেন্ট (CRUD)
│   │       ├── dto/             # Create/Update Course DTOs
│   │       ├── entities/        # Database Schema/Entity
│   │       ├── courses.controller.ts
│   │       ├── courses.service.ts
│   │       └── courses.module.ts
│   ├── common/                  # Shared Guards, Interceptors, Middlewares
│   ├── app.module.ts            # মেইন রুট মডিউল (সব মডিউল এখানে যুক্ত হয়)
│   └── main.ts                  # অ্যাপ্লিকেশনের এন্ট্রি পয়েন্ট
├── test/                        # Testing ফাইলসমূহ
├── .env                         # Environment Variables (DB URL, Secret Keys)
├── nest-cli.json                # Nest CLI কনফিগারেশন
├── package.json                 # ডিপেন্ডেন্সি লিস্ট
└── tsconfig.json                # TypeScript কনফিগারেশন
