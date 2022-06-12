import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { CoursesModule } from './courses/courses.module';
import { ScheduleModule } from './schedule/schedule.module';
import { RolesModule } from './roles/roles.module';
import { User } from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { Schedule } from "./schedule/schedule.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { AppGateway } from './chats/app.gateway';
import { ChatsModule } from './chats/chats.module';
import * as path from "path";


@Module({
    controllers: [],
    providers: [AppGateway],
    imports: [ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
        },
        models: [User, Role, UserRoles, Schedule],
        autoLoadModels: true
      }),
        UsersModule,
        AssignmentsModule,
        CoursesModule,
        ScheduleModule,
        RolesModule,
        AuthModule,
        FilesModule,
        ChatsModule
    ],
})
export class AppModule {}