import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from "dotenv"; 
import { registerAs } from "@nestjs/config";

dotenvConfig({path: '.env.development'})

const config = {
    type: 'mysql',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: false, // se corren los sistemas de migracion , en desarrollo conviene que este en true
    logging: true,
    entities: ['dist/**/*.entity.{js,ts}'],
    migrations: ['dist/migrations/*.{js,ts}'],
}
export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions)